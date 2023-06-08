import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  Grid,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";

import PropTypes from "prop-types";
import BaseService from "../../../services/base";
const upTransition = Transition("up");

const EditShiftingModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [jamDatang, setDatangJam] = useState("");
  const [jamKeluar, setJamKeluar] = useState("");
  const service = new BaseService("/api/shiftings");

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

  const onEditShifting = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, from, to } = target;

      const payload = {
        name: name.value,
        from: from?.value ?? jamDatang,
        to: to?.value ?? jamKeluar,
      };

      await service.patch(data.id, payload);
      // await axios.patch(`/api/shiftings/${data.id}`, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Shifting");
      closeModalHandler();
      router.replace(router.pathname);
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Shifting");
      return;
    }
  };

  const useJamDatang = (datang) => {
    setDatangJam(datang);
  };

  const useJamKeluar = (keluar) => {
    setJamKeluar(keluar);
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
        <form onSubmit={onEditShifting}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Shifting
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="name">Nama</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data?.name}
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <CustomFormLabel htmlFor="form">Jam Masuk</CustomFormLabel>
                  <CustomTextField
                    required
                    defaultValue={data?.from}
                    id="from"
                    name="from"
                    onChange={(e) => setDatangJam(e.target.value)}
                    type="time"
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CustomFormLabel htmlFor="to">Jam Keluar</CustomFormLabel>
                  <CustomTextField
                    required
                    id="to"
                    name="to"
                    defaultValue={data?.to}
                    type="time"
                    onChange={(e) => setJamKeluar(e.target.value)}
                    fullWidth
                    size="small"
                    variant="outlined"
                  />
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
EditShiftingModal.propTypes = {
  open: PropTypes.bool,
};
export default EditShiftingModal;
