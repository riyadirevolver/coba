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
import { update } from "../../../../lib/services/user";

import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
const upTransition = Transition("up");

const RejectModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const service = new BaseService("/api/approval");
  const [rejectReason, setRejectReason] = useState("");

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackBar}
    >
      <FeatherIcon icon="x" />
    </IconButton>
  );

  const onEditUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { rejectReason } = target;

      const payload = {
        is_approved: false,
        reject_notes: rejectReason.value,
      };

      console.log(data);

      await axios.patch(`/api/approval/overtime/${data.id}`, payload);

      setLoading(false);
      openSnackBar("Berhasil menolak permintaan lembur");
      closeModalHandler();
      router.replace(router.pathname);
      setRejectReason("");
    } catch (error) {
      setLoading(false);
      openSnackBar(
        `Gagal menolak permintaan lembur: ${error.response.data.message}`
      );
      setRejectReason("");
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
        open={open && type === "reject"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={onEditUser}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tolak Permintaan Lembur
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="rejectReason">
                Alasan (Wajib diisi)
              </CustomFormLabel>
              <CustomTextField
                required
                id="rejectReason"
                name="rejectReason"
                type="text"
                fullWidth
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
              {loading ? "Submitting..." : "Tolak"}
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
RejectModal.propTypes = {
  open: PropTypes.bool,
};
export default RejectModal;
