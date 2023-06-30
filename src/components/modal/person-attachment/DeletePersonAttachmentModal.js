import React, { useState } from "react";

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
import FeatherIcon from "feather-icons-react";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import NextApi from "../../../../lib/services/next-api";
import Transition from "../../transition";

const upTransition = Transition("up");

const DeletePersonAttachmentModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
  person_id,
}) => {
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

  const handleDelete = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      await NextApi().delete(`/api/person-attachment/${data.id}`);
      setLoading(false);
      openSnackBar("Berhasil menghapus person attachment");
      closeModalHandler();
      router.replace(`/management/user-jc/attachment/${person_id}`);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar(`Gagal menghapus person attachment`);
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
        <form onSubmit={handleDelete}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Hapus Person Attachment
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin menghapus person attachment
                {/* <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: 700,
                  }}
                >
                  {data.name}
                </span> */}
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
              {loading ? "Submitting..." : "Ya"}
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

export default DeletePersonAttachmentModal;