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

const ApproveAppModal = ({
  open = false,
  closeModalHandler,
  type,
  datax,
  checkUpliner,
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

  const handleApprove = async (event) => {
    setLoading(true);
    event.preventDefault();
    // const upliner = checkUpliner(datax);
    const payload = {
      // ...(upliner === "is_approved_client3" && { is_approved_client3: true }),
      // ...(upliner === "is_approved_client" && { is_approved_client: true }),
      // ...(upliner === "is_approved" && { is_approved: true }),
      is_approved: true,
    };
    try {
      await axios.patch(`/api/overtime/${datax.id}`, payload);
      // setMessage("Berhasil Approved");
      setLoading(false);
      openSnackBar("Berhasil Approved");
      closeModalHandler();
      router.replace(
        {
          pathname: "/apps/absent/overtime/" + datax.id,
        },
        null,
        { shallow: true }
      );
      setTimeout(() => {
        router.reload(window.location.pathname);
      }, 2000);
    } catch (error) {
      console.log(error);
      closeModalHandler();
      openSnackBar(
        error.response.data.message ?? "Terjadi kesalahan pada server"
      );
      setLoading(false);
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
        <form
          onSubmit={(e) => {
            handleApprove(e);
          }}
        >
          <DialogTitle id="alert-dialog-title" variant="h4">
            Approved User
          </DialogTitle>

          <DialogContent>
            <DialogContentText
              id="alret-dialog-slide-description"
              component="div"
            >
              <Typography variant="body1">
                Apakah anda ingin approval user
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: 700,
                  }}
                >
                  {datax?.user?.fullname}
                </span>{" "}
                ?
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

export default ApproveAppModal;
