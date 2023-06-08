import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { Transition } from "react-spring";
import { useSnackbar } from "../../../hooks/useSnackbar";
import FeatherIcon from "feather-icons-react";
import activityRequest from "../../../constants/activityRequest";
import axios from "axios";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";

const ApproveModal = ({ open = false, closeModalHandler, type, data }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      ></IconButton>
    </React.Fragment>
  );

  const create = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const payload = {
        is_approved: true,
      };
      await axios.post(`/api/approval/leave/${data.id}`, payload);

      setLoading(false);
      openSnackBar("Berhasil menyetujui permintaan cuti");
      closeModalHandler();
      router.reload();
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar(
        `Gagal menyetujui permintaan cuti: ${error.response.data.message}`
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
        open={open && type === "approve"}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Setujui Permintaan Cuti
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              id="alret-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin menyetujui permintaan cuti?
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: 700,
                  }}
                >
                  {data?.fullname}
                </span>
              </Typography>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Setujui"}
            </Button>

            <Button onClick={closeModalHandler} color="secondary">
              Tidak
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ApproveModal;
