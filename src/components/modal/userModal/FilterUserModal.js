import { useFormik } from "formik";
import React from "react";

import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import * as Yup from "yup";

import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import useFetchClient from "../../../hooks/fetch/useFetchClient";
import { ROLE_LISTS } from "../../../../utils/constant/listConstant";

const upTransition = Transition("up");

const FilterUserModal = ({ open = false, closeModalHandler, type, token }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

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

  const handleClose = () => {
    closeModalHandler();
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      role: "",
    },
    validationSchema: Yup.object().shape({
      role: Yup.string().nullable(true),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { role } = values;
        router.replace({
          query: {
            role: role,
          },
        });
        openSnackBar("Pencarian user behasil ditemukan");
        handleClose();
      } catch (error) {
        console.log(error);
        openSnackBar("Pencarian user gagal ditemukan");
        handleClose();
      }
      setSubmitting(false);
    },
  });

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
        open={open && type === "filter"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Filter Client
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-placement">Role</CustomFormLabel>
              <Select
                name="role"
                size="small"
                fullWidth
                value={formik.values.role || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("role", value);
                }}
              >
                {ROLE_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {"Filter"}
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
              color="secondary"
            >
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

FilterUserModal.defaultProps = {
  open: false,
};
FilterUserModal.propTypes = {
  open: PropTypes.bool,
};
export default FilterUserModal;
