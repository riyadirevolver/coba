import React, { useState } from "react";

import {
  Button,
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
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

import { useFormik } from "formik";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import userValidation from "../../../validations/userValidation";
const upTransition = Transition("up");

const ROLE_LISTS = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Client",
    value: "client",
  },
  {
    label: "Manager",
    value: "manager",
  },
];

const EditUserModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [role, setRole] = useState(data.role);
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

  const onEditUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const { nama_user, email, phone, nik } = target;

    const payload = {
      nik: nik.value,
      fullname: nama_user.value,
      email: email.value,
      phone: phone.value,
      role: role,
    };
    try {
      await NextApi().patch(`/api/users/${data.id}`, payload);
      setLoading(false);
      openSnackBar("Berhasil Mengubah User");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Mengubah User");
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      nik: data.nik || "",
      fullname: data.fullname || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role || "",
    },
    validationSchema: userValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { nik, fullname, email, phone, role } = values;
        const payload = {
          nik: nik,
          fullname: fullname,
          email: email,
          phone: phone,
          role: role,
        };
        await NextApi().patch(`/api/users/${data.id}`, payload);
        openSnackBar("Berhasil mengubah user");
        router.replace(router.pathname);
        setLoading(false);
        closeModalHandler();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit User
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="nik">NIK</CustomFormLabel>
              <CustomTextField
                required
                id="nik"
                name="nik"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("nik")}
                error={formik.touched.nik && !!formik.errors.nik}
                helperText={formik.touched.nik && formik.errors.nik}
              />
              <CustomFormLabel htmlFor="fullname">Nama User</CustomFormLabel>
              <CustomTextField
                required
                id="fullname"
                name="fullname"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("fullname")}
                error={formik.touched.fullname && !!formik.errors.fullname}
                helperText={formik.touched.fullname && formik.errors.fullname}
              />
              <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.email}
                id="email"
                name="email"
                type="email"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
              />
              <CustomFormLabel htmlFor="role">Role</CustomFormLabel>
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
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
              <CustomTextField
                required
                id="phone"
                name="phone"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && !!formik.errors.phone}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Submitting..." : "Simpan"}
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
EditUserModal.propTypes = {
  open: PropTypes.bool,
};
export default EditUserModal;
