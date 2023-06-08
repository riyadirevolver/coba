import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import Transition from "../../transition";

const upTransition = Transition("up");

const DeleteScheduleModal = ({ open = false, closeModalHandler, type, data }) => {
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
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const res = await axios.delete(`/api/schedule/${data.id}`);
      setLoading(false);
      openSnackBar("Berhasil hapus jadwal");
      closeModalHandler();
      router.replace(router.pathname);
			router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal hapus jadwal");
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
        open={open && type === "delete"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Hapus Jadwal
          </DialogTitle>
          <DialogContent>
            <DialogContent id="alert-dialog-slide-description" component="div">
              <Typography variant="body1">
                Apakah anda ingin menghapus jadwal
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: 700,
                  }}
                >
                  {data.name}
                </span>
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting.." : "Ya"}
              </Button>
              <Button onClick={closeModalHandler} color="secondary">
                Tidak
              </Button>
            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default DeleteScheduleModal;
