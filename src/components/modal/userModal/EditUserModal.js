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

import axios from "axios";
import PropTypes from "prop-types";
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
  const [role, setRole] = useState(data.role ?? "");
  const [loading, setLoading] = useState(false);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon ico-n="x" />
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
      await axios.patch(`/api/users/${data.id}`, payload);
      setLoading(false);
      openSnackBar("Berhasil Mengubah user");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Mengubah user");
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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={onEditUser}>
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
                defaultValue={data.nik}
                id="nik"
                name="nik"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="nama_user">Nama User</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.fullname}
                id="nama_user"
                name="nama_user"
                fullWidth
                size="small"
                variant="outlined"
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
              />
              <CustomFormLabel htmlFor="role">Role</CustomFormLabel>
              <Select
                size="small"
                fullWidth
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
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
                defaultValue={data.phone}
                id="phone"
                name="phone"
                fullWidth
                size="small"
                variant="outlined"
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
