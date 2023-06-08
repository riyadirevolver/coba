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
  TextField,
  Divider,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";

import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyForm } from "../../../validations/company";

const upTransition = Transition("up");

const AddCompanySetting = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(companyForm),
  });
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

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        fullname: data.fullName,
        email: data.email,
        nik: "0",
        company: {
          name: data.companyName,
          industry: data.industry,
        },
      };

      await axios.post("/api/company", payload);
      setLoading(false);
      openSnackBar("Berhasil menambahkan data company ");

      closeModalHandler();
      router.replace(router.pathname);
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal menambahkan data company ");
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
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box py={3}>
            <DialogTitle id="alert-dialog-slide-title" variant="h4">
              Tambah Perusahaan
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                component="div"
              >
                <Box mb={3}>
                  <Typography color="black">Form Perusahaan</Typography>
                  <CustomFormLabel htmlFor="companyName">
                    Nama Perusahaan
                  </CustomFormLabel>
                  <TextField
                    required
                    name="companyName"
                    type="text"
                    fullWidth
                    size="small"
                    variant="outlined"
                    {...register("companyName")}
                    error={!!errors["companyName"]}
                    helperText={errors.companyName?.message}
                  />

                  <CustomFormLabel htmlFor="industry">Industry</CustomFormLabel>
                  <TextField
                    required
                    name="industry"
                    type="text"
                    fullWidth
                    size="small"
                    variant="outlined"
                    {...register("industry")}
                    error={!!errors["industry"]}
                    helperText={
                      errors["industry"] && errors["industry"]?.message
                    }
                  />
                </Box>
                <Divider variant="fullWidth" />
                <Box mt={3}>
                  <Box>
                    <Typography color="black">Form user</Typography>
                    <Typography variant="caption">
                      Form user ini digunakan untuk menambahkan user admin untuk
                      perusahaan yang didaftarkan
                    </Typography>
                  </Box>
                  <CustomFormLabel htmlFor="fullName">Fullname</CustomFormLabel>
                  <TextField
                    required
                    name="fullName"
                    type="text"
                    fullWidth
                    size="small"
                    variant="outlined"
                    {...register("fullName")}
                    error={!!errors["fullName"]}
                    helperText={errors.fullName?.message}
                  />
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField
                    required
                    name="industry"
                    type="email"
                    fullWidth
                    size="small"
                    variant="outlined"
                    {...register("email")}
                    error={!!errors["email"]}
                    helperText={errors.email?.message}
                  />
                </Box>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting..." : "Tambah"}
              </Button>
              <Button
                onClick={closeModalHandler}
                type="submit"
                color="secondary"
              >
                Batal
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
    </>
  );
};

AddCompanySetting.defaultProps = {
  open: false,
};
AddCompanySetting.propTypes = {
  open: PropTypes.bool,
};
export default AddCompanySetting;
