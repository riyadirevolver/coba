import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import BaseService from "../../../services/base";
import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import moment from "moment";
import { LocalizationProvider } from "@mui/lab";
const upTransition = Transition("up");

const EditEventDateModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  
  const service = new BaseService("/api/eventDate");

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

  const onEditJobLevel = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, date, start_date,start_end } = target;

      const payload = {
        name: name.value,
        date: date.value,
        start_date: start_date.value,
        start_end: start_end.value
        
      };
      await service.patch(data.id, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Event Date");
      closeModalHandler();
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Event Date");
      return;
    }
  };

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
        <form onSubmit={onEditJobLevel}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Edit Event Date
          </DialogTitle>
          <DialogContent>
            <DialogContentText required component="div">
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.name}
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="date">Date</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.date}
                id="date"
                name="date"
                fullWidth
                size="small"
                variant="outlined"
              />

              {/* start date */}
              <CustomFormLabel htmlFor="start_date">Start Date</CustomFormLabel>
              <CustomTextField
                required
                id="start_date"
                name="start_date"
                defaultValue={
                  data.start_date
                    ? moment(data.start_date).format("DD MMM YYYY")
                    : "-"
                }
                onChange={(e) => setStartDate(e.target.value)}
                //type="date"
                fullWidth
                size="small"
                variant="outlined"
                disabled
              />

              {/* startEnd  */}
              <CustomFormLabel htmlFor="start_date">Start End</CustomFormLabel>
              <CustomTextField
                required
                id="start_end"
                name="start_end"
                defaultValue={
                  data.start_end
                    ? moment(data.start_end).format("DD MMM YYYY")
                    : "-"
                }
                //type="date"
                onChange={(e) => setStartEnd(e.target.value)}
                fullWidth
                size="small"
                variant="outlined"
                disabled
              />

              <LocalizationProvider date></LocalizationProvider>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Simpan"}
            </Button>
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
EditEventDateModal.propTypes = {
  open: PropTypes.bool,
};

export default EditEventDateModal;
