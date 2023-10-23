import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import PropTypes from "prop-types";
import Transition from "../../transition";

const upTransition = Transition("up");

const DetailJobDescriptionModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
}) => {
  console.log("dadadadad", data);
  return (
    <>
      <Dialog
        open={open && type === "job-description"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          {`Detail Deskripsi Pekerjaan ${data?.client_data?.name} - ${data?.position}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            component="div"
          >
            <Typography
              textAlign="justify"
              dangerouslySetInnerHTML={{ __html: data?.job_description }}
            />
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModalHandler} color="secondary">
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DetailJobDescriptionModal.defaultProps = {
  open: false,
};
DetailJobDescriptionModal.propTypes = {
  open: PropTypes.bool,
};
export default DetailJobDescriptionModal;
