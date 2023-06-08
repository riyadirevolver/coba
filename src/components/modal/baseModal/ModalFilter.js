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
import CloseIcon from "@mui/icons-material/Close";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import PropTypes from "prop-types";
const upTransition = Transition("up");

const ModalFilter = ({
  open = false,
  closeModalHandler,
  title = "Form Filter",
  children,
  maxWidth = "sm",
  sx,
}) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={closeSnackBar}
    >
      <CloseIcon color="danger" />
    </IconButton>
  );

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent:'space-between'
          }}
        >
          <Typography variant="body1" fontWeight={600}>{title}</Typography>
          {action}
        </DialogTitle>
        <DialogContent
          sx={{
            ...sx,
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};
ModalFilter.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
};
export default ModalFilter;
