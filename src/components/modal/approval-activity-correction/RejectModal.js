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

const RejectModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  id_user,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const service = new BaseService("/api/approval-business-trips");
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
        is_approve: false,
        reject_reason: rejectReason.value,
        approved_by: id_user,
      };

      const res = await axios.patch(
        `/api/approval-activity-correction/${data.id}`,
        payload
      );

      setLoading(false);
      openSnackBar("Berhasil menolak permintaan koreksi absen");
      closeModalHandler();
      router.replace(router.pathname);
      setRejectReason("");
    } catch (error) {
      setLoading(false);
      closeModalHandler();
      openSnackBar(
        error.response.data.message ?? "Gagal menolak permintaan koreksi"
      );
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
            Tolak Permintaan Koreksi
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
