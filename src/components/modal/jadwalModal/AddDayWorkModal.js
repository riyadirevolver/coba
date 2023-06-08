import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import useHandleModal from "../../../hooks/useHandleModal";
import {
  typeHari,
  typeIdHari,
  typeSchedule,
} from "../../../constants/schedule";
const upTransition = Transition("up");

const AddDayWorkModal = ({
  open = false,
  closeModalHandler,
  type,
  shifting,
  handleSubmit,
}) => {
  const router = useRouter();
  // modal ke panggil
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [page, setPage] = React.useState(0);
  const [schedule, setSchedule] = React.useState(typeSchedule);
  const [waktu, setWaktu] = React.useState(shifting.data);
  const [workDay, setWorkDay] = React.useState(typeIdHari);
  const [hari, setHari] = React.useState(typeHari);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const handleChange = (value, day) => {
    const days = {};
    typeHari.map((i) => {
      if (i.name === day) {
        days[day] = value;
      }
    });
    setWorkDay((prev) => ({ ...prev, ...days }));
  };

  const handleClickSubmit = () => {
    handleSubmit?.(workDay);
    closeModalHandler();
  };
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Dialog
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Jumlah Hari Kerja
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            component="div"
          >
            <Box>
              {hari.map((day) => (
                <Box key={day.id} display="flex" sx={{ m: 2 }}>
                  <Box width={80}>
                    <CustomFormLabel htmlFor="tJadwal">
                      {day.name}
                    </CustomFormLabel>
                  </Box>
                  <Select
                    fullWidth
                    defaultValue={workDay}
                    value={workDay[`${day.name}`]}
                    onChange={(e) => handleChange(e.target.value, day.name)}
                  >
                    <MenuItem value={"2"}>Libur</MenuItem>
                    
                    {waktu.map((shift, index) => (
                      <MenuItem value={shift.id} key={index}>
                        {shift.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              ))}
            </Box>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClickSubmit}
            color="primary"
            variant="contained"
          >
            Terapkan
          </Button>

          <Button onClick={closeModalHandler} color="secondary">
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddDayWorkModal.defaultProps = {
  open: false,
};
AddDayWorkModal.propTypes = {
  open: PropTypes.bool,
};
export default AddDayWorkModal;