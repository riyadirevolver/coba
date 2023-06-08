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
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import { AutoFixOffSharp } from "@mui/icons-material";
import axios from "axios";
import { useSnackbar } from "../../../hooks/useSnackbar";
const upTransition = Transition("up");

const DeletePosisiModal = ({ open = false, closeModalHandler, type, data }) => {
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
      await axios.delete(`/api/position/${data.id}`);
      setLoading(false);
      openSnackBar("Berhasil Delete Position");
      closeModalHandler();
      router.replace(router.pathname);
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Delete Position");
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
            Hapus Posisi
          </DialogTitle>
          <DialogContent>
            <DialogContent id="alert-dialog-slide-description" component="div">
              <Typography variant="body1">
                Apakah anda ingin menghapus Position
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

export default DeletePosisiModal;
