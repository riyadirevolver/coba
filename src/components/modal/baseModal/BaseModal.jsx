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
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import PropTypes from "prop-types";
const upTransition = Transition("up");

const BaseModal = ({
  open = false,
  closeModalHandler,
  title,
  message: modalMessage,
  messageImage,
  sxTitle,
  sxMessage,
  sxAction,
  sx,
  actionButtonText = "Oke",
}) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

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
        open={open}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        // fullWidth
      >
        <DialogTitle>
          <Typography
            variant="body1"
            sx={{
              ...sxTitle,
            }}
          >
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            ...sx,
          }}
        >
          {messageImage && (
            <Box>
              <Image
                src={messageImage}
                width={300}
                height={200}
                alt="not found"
              />
            </Box>
          )}
          <Typography
            variant="body1"
            sx={{
              ...sxMessage,
            }}
          >
            {modalMessage}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            ...sxAction,
          }}
        >
          <Button
            onClick={closeModalHandler}
            color="primary"
            variant="contained"
          >
            {actionButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
BaseModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
};
export default BaseModal;
