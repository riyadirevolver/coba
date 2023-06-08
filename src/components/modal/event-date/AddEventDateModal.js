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
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import moment from "moment";
const upTransition = Transition("up");

const AddEventDateModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [startDate, setStarDate] = React.useState(null);
  const [startEnd, setStartEnd] = React.useState(null);

  

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

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, date, start_date, start_end } = target;

      const data = {
        name: name.value,
        date: date.value,
        start_date: start_date.value,
        start_end: start_end.value
      };
      await axios.post("/api/eventDate", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Event Date");
      closeModalHandler();
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Event Date");
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
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Tambah Acara
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <CustomFormLabel htmlFor="name">Nama Acara</CustomFormLabel>
              <CustomTextField
                required
                id="name"
                name="name"
                fullWidth
                size="small"
                placeholder="Hari Spesial"
                variant="outlined"
              />

              {/* date */}
              <CustomFormLabel htmlFor="date">Date</CustomFormLabel>
              <CustomTextField
                required
                id="date"
                name="date"
                fullWidth
                placeholder="12"
                size="small"
                variant="outlined"
              />

              {/* start date */}
              <CustomFormLabel htmlFor="start_date">Tanggal Mulai</CustomFormLabel>
              <CustomTextField
                required
                id="start_date"
                name="start_date"
                type="date"
                fullWidth
                placeholder="start_date"
                size="small"
                variant="outlined"
              />

              {/* end date */}
              <CustomFormLabel htmlFor="start_end">Tanggal Akhir</CustomFormLabel>
              <CustomTextField
                required
                id="start_end"
                name="start_end"
                type="date"
                fullWidth
                placeholder="start_end"
                size="small"
                variant="outlined"
              />
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Tambah"}
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

export default AddEventDateModal;
