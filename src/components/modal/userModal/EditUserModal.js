import React, { useState } from "react";

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
import { ROLE_LISTS } from "../../../../utils/constant/listConstant";
import userValidation from "../../../validations/userValidation";
import useFetchClient from "../../../hooks/fetch/useFetchClient";
const upTransition = Transition("up");

const EditUserModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  token,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [payload, setPayload] = React.useState({
    client_id: null,
  });

  const { clientList, openClient, setOpenClient, loadingClient } =
    useFetchClient(token);

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
        const payloadData = {
          nik: nik,
          fullname: fullname,
          email: email,
          phone: phone,
          role: role,
          ...(role === "client" && {
            client_id: payload.client_id,
          }),
          ...(role !== "client" && {
            client_id: null,
          }),
        };
        await NextApi().patch(`/api/users/${data.id}`, payloadData);
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
              <CustomFormLabel htmlFor="nik">*NIK</CustomFormLabel>
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
              <CustomFormLabel htmlFor="fullname">*Nama User</CustomFormLabel>
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
              <CustomFormLabel htmlFor="email">*Email</CustomFormLabel>
              <CustomTextField
                required
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
              <CustomFormLabel htmlFor="role">*Role</CustomFormLabel>
              <Select
                required
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
              {formik.values.role === "client" && (
                <>
                  <CustomFormLabel htmlFor="input-placement">
                    Nama Perusahaan
                  </CustomFormLabel>
                  <Autocomplete
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={clientList}
                    defaultValue={clientList[data?.client_id - 1]}
                    getOptionLabel={(option) => option.name}
                    loading={loadingClient}
                    open={openClient}
                    onOpen={() => {
                      setOpenClient(true);
                    }}
                    onClose={() => {
                      setOpenClient(false);
                    }}
                    onChange={(e, newInputValue) => {
                      setPayload((prevState) => ({
                        ...prevState,
                        client_id: newInputValue?.id,
                      }));
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        size="small"
                        placeholder="Pilih Nama Perusahaan"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingClient ? (
                                <CircularProgress color="inherit" size={20} />
                              ) : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </>
              )}
              <CustomFormLabel htmlFor="phone">*Telepon</CustomFormLabel>
              <CustomTextField
                required
                id="phone"
                name="phone"
                fullWidth
                size="small"
                variant="outlined"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                inputProps={{
                  maxLength: 14,
                }}
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
