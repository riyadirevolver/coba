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
  InputAdornment,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { ROLE_LISTS } from "../../../../utils/constant/listConstant";
import useFetchClient from "../../../hooks/fetch/useFetchClient";
import userValidation from "../../../validations/userValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const AddUserModal = ({ open = false, closeModalHandler, type, token }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [payload, setPayload] = React.useState({
    client_id: null,
  });
  const [loading, setLoading] = useState(false);
  const {
    clientList,
    openClient,
    setOpenClient,
    loadingClient,
    loadingText,
    setTempQuery: setClientTempQuery,
  } = useFetchClient(token);

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
      nik: "",
      fullname: "",
      email: "",
      password: "",
      phone: "",
      role: "",
    },
    validationSchema: userValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { nik, fullname, email, password, phone, role } = values;
        const data = {
          nik: nik,
          fullname: fullname,
          email: email,
          password: password,
          phone: phone,
          role: role,
          ...(role === "client" && {
            client_id: payload.client_id,
          }),
        };
        await NextApi().post("/api/users", data);
        openSnackBar("Berhasil menambahkan user");
        router.replace(router.pathname);
        setLoading(false);
        closeModalHandler();
        handleReset();
      } catch (error) {
        console.log(error);
        openSnackBar("Gagal menambahkan user");
        setLoading(false);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
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
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah User
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
              <CustomFormLabel htmlFor="password">*Password</CustomFormLabel>
              <CustomTextField
                required
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("password")}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <FeatherIcon
                          color="black"
                          icon={passwordVisible ? "eye" : "eye-off"}
                          width="20"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                    getOptionLabel={(option) => option.name}
                    loading={loadingClient}
                    loadingText={loadingText}
                    filterOptions={(x) => x}
                    onInputChange={(e, newInputValue) =>
                      setClientTempQuery(newInputValue)
                    }
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
                              {loadingClient && loadingText == "loading..." ? (
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
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button
              onClick={() => {
                closeModalHandler();
                handleReset();
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

AddUserModal.defaultProps = {
  open: false,
};
AddUserModal.propTypes = {
  open: PropTypes.bool,
};
export default AddUserModal;
