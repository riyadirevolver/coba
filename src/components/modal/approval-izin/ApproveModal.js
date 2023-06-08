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
import { useSnackbar } from "../../../hooks/useSnackbar";
import axios from "axios";

// const upTransition = Transition("up");

const ApproveModal = ({ open = false, closeModalHandler, type, data }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // functional components
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
        activity_type: "IZIN",
        activity_id: data.id,
        is_approved: true,
      };

      await axios.post("/api/approval", payload);
      setLoading(false);
      openSnackBar("Berhasil Izin User");
      closeModalHandler();
      //router.replace(router.pathname);
      router.reload();
    } catch (error) {
      console.log(error);
      const errString = JSON.stringify(error);
      const err = JSON.parse(errString);
      if (err?.status === 409) {
        openSnackBar("User Sudah Izin");
        closeModalHandler();
        setLoading(false);
      } else {
        setLoading(false);
        closeModalHandler();
        openSnackBar("Gagal Izin User");
      }
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
        // TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Approved User
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              id="alret-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin approval user?
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
              {loading ? "Approved..." : "Ya"}
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
