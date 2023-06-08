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

const ApproveModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
  id_user,
}) => {
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
        is_approve: true,
        approved_by: id_user,
      };
      await axios.patch(
        `/api/approval-activity-correction/${data.id}`,
        payload
      );
      setLoading(false);
      openSnackBar("Berhasil menyetujui koreksi absen");
      closeModalHandler();
      router.replace(router.pathname);
    } catch (error) {
      setLoading(false);
      closeModalHandler();
      openSnackBar(error.response.data.message ?? "Gagal menyetujui koreksi");
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
            Setujui Permintaan Koreksi
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              id="alret-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin menyetujui permintaan koreksi?
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
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ApproveModal;
