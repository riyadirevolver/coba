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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import clientValidation from "../../../validations/clientValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { DESCRIPTION_LISTS } from "../../../../utils/constant/listConstant";

const upTransition = Transition("up");

const AddClientModal = ({ open = false, closeModalHandler, type, token }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { userList, openUser, setOpenUser, loadingUser } = useFetchUser(token);
  const [payload, setPayload] = useState({
    pic_id: null,
  });

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
      client_name: "",
      last_called: "",
      contact: "",
      description: "",
    },
    validationSchema: clientValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const { client_name, last_called, contact, description } = values;
      const data = {
        name: client_name,
        pic_id: payload.pic_id,
        last_called: last_called,
        contact: contact,
        description: description,
      };
      try {
        await NextApi().post("/api/client", data);
        openSnackBar("Berhasil menambahkan klien");
        router.replace(router.pathname);
        setLoading(false);
        closeModalHandler();
        handleReset();
      } catch (error) {
        openSnackBar("Gagal menambahkan klien");
        console.log(error);
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
            Tambah Klien
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="client_name">
                *Nama Klien
              </CustomFormLabel>
              <CustomTextField
                required
                id="client_name"
                name="client_name"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("client_name")}
                error={
                  formik.touched.client_name && !!formik.errors.client_name
                }
                helperText={
                  formik.touched.client_name && formik.errors.client_name
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomFormLabel htmlFor="last_called">
                  Terakhir Dihubungi
                </CustomFormLabel>
                <DatePicker
                  required
                  id="last_called"
                  name="last_called"
                  // label="Last Called"
                  value={formik.values.last_called}
                  onChange={(date) => formik.setFieldValue("last_called", date)}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={
                        formik.touched.last_called &&
                        !!formik.errors.last_called
                      }
                      helperText={
                        formik.touched.last_called && formik.errors.last_called
                      }
                    />
                  )}
                />
              </LocalizationProvider>
              <CustomFormLabel htmlFor="input-placement">
                *PIC (People In Charge)
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={userList}
                getOptionLabel={(option) => option.fullname}
                loading={loadingUser}
                open={openUser}
                onOpen={() => {
                  setOpenUser(true);
                }}
                onClose={() => {
                  setOpenUser(false);
                }}
                onChange={(e, newInputValue) => {
                  setPayload((prevState) => ({
                    ...prevState,
                    pic_id: newInputValue?.id,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    required
                    size="small"
                    placeholder="Pilih PIC (People In Charge)"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingUser ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <CustomFormLabel htmlFor="contact">*No telp PIC</CustomFormLabel>
              <CustomTextField
                required
                id="contact"
                name="contact"
                fullWidth
                size="small"
                variant="outlined"
                placeholder="masukkan nomor Telepon PIC"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                {...formik.getFieldProps("contact")}
                error={formik.touched.contact && !!formik.errors.contact}
                helperText={formik.touched.contact && formik.errors.contact}
              />
              <CustomFormLabel htmlFor="description">
                *Deskripsi
              </CustomFormLabel>
              {/* <CustomTextField
                required
                id="description"
                name="description"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("description")}
                error={
                  formik.touched.description && !!formik.errors.description
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              /> */}
              <Select
                required
                name="description"
                size="small"
                fullWidth
                value={formik.values.description || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("description", value);
                }}
              >
                {DESCRIPTION_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
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

AddClientModal.defaultProps = {
  open: false,
};
AddClientModal.propTypes = {
  open: PropTypes.bool,
};
export default AddClientModal;
