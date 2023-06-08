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
  Grid,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
// import { register } from "../../../../lib/services/user";
import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [jamDatang, setDatangJam] = React.useState(null);
  const [jamKeluar, setJamKeluar] = React.useState(null);

  const useJamDatang = (datang) => {
    setDatangJam(datang);
  };

  const useJamKeluar = (keluar) => {
    setJamKeluar(keluar);
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

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, from, to } = target;

      const data = {
        name: name.value,
        from: moment(jamDatang.$d).format("HH:mm:ss"),
        to: moment(jamKeluar.$d).format("HH:mm:ss"),
      };

      // await service.post('a');
      await axios.post("/api/shiftings", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Shifting");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Shifting");
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
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah Shifting
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="name">Nama</CustomFormLabel>
              <CustomTextField
                required
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <Box sx={{ mt: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Jam Masuk"
                        name="from"
                        id="from"
                        ampm={false}
                        value={jamDatang}
                        onChange={(newValue) => {
                          setDatangJam(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mt: 3 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Jam Pulang"
                        name="to"
                        id="to"
                        ampm={false}
                        value={jamKeluar}
                        onChange={(newValue) => {
                          setJamKeluar(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>
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

AddUserModal.defaultProps = {
  open: false,
};
AddUserModal.propTypes = {
  open: PropTypes.bool,
};
export default AddUserModal;
