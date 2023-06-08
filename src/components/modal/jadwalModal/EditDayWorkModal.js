import React, { useEffect, useState } from "react";

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
  Grid,
  Typography,
  Select,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import useHandleModal from "../../../hooks/useHandleModal";
import { typeHari, typeSchedule } from "../../../constants/schedule";
const upTransition = Transition("up");

const EditDayWorkModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
  jadwal,
  shifting,
  handleSubmit,
}) => {
  const router = useRouter();
  // modal ke panggil
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [page, setPage] = React.useState(0);
  const [schedule, setSchedule] = React.useState(typeSchedule);
  const [workDay, setWorkDay] = React.useState(null);
  const [waktu, setWaktu] = React.useState(shifting.data);
  const hari = data.workday.sort((a, b) => a.day - b.day);

  useEffect(() => {
    if (!workDay || workDay === null) {
      const newData = {};
      const days = data.workday.map((elm) => elm.name);
      data.workday.forEach((item, idx) => {
        newData[days[idx]] = data?.workday.filter(
          (v) => v.name === days[idx]
        )[0].shifting_id;
      });
      setWorkDay(newData);
    }
  }, [data.workday, workDay]);

  const handleChange = (value, day) => {
    setWorkDay((prevState) => ({
      ...prevState,
      [day]: value,
    }));
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
        open={open && type === "edit"}
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
              {workDay &&
                [
                  {
                    name: "Senin",
                  },
                  {
                    name: "Selasa",
                  },
                  {
                    name: "Rabu",
                  },
                  {
                    name: "Kamis",
                  },
                  {
                    name: "Jumat",
                  },
                  {
                    name: "Sabtu",
                  },
                  {
                    name: "Minggu",
                  },
                ].map((day, idx) => {
                  return (
                    <Box key={day.id} display="flex" sx={{ m: 2 }}>
                      <Box width={80}>
                        <CustomFormLabel htmlFor="tJadwal">
                          {day.name}
                        </CustomFormLabel>
                      </Box>
                      <Select
                        fullWidth
                        displayEmpty
                        value={workDay[`${day.name}`]}
                        onChange={(e) => handleChange(e.target.value, day.name)}
                      >
                        <MenuItem value={null}>Libur</MenuItem>
                        {waktu.map((shift, index) => (
                          <MenuItem value={shift.id} key={index}>
                            {shift.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  );
                })}
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

EditDayWorkModal.defaultProps = {
  open: false,
};
EditDayWorkModal.propTypes = {
  open: PropTypes.bool,
};
export default EditDayWorkModal;
