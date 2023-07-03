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
  Snackbar,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import clientValidation from "../../../validations/clientValidation";
const upTransition = Transition("up");

const EditClientModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  token,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { userList, openUser, setOpenUser, loadingUser } = useFetchUser(token);
  const [payload, setPayload] = useState({
    pic_id: null,
  });

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.fullname;
  };

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
      client_name: data.name || "",
      last_called: data.last_called || "",
      contact: data.contact || "",
      description: data.description || "",
    },
    validationSchema: clientValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const { client_name, last_called, contact, description } = values;
      const payloadData = {
        name: client_name,
        ...(payload.pic_id && {
          pic_id: payload.pic_id,
        }),
        last_called: last_called,
        contact: contact,
        description: description,
      };
      try {
        await NextApi().patch(`/api/client/${data.id}`, payloadData);
        openSnackBar("Berhasil mengubah klien");
        router.replace(router.pathname);
        setLoading(false);
        closeModalHandler();
        handleReset();
      } catch (error) {
        openSnackBar("Gagal mengubah klien");
        console.log(error);
        setLoading(false);
      }
    },
  });

  const onEditClient = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const { name_client, contact, description } = target;

    const payloadData = {
      name: name_client.value,
      pic_id: payload.pic_id,
      contact: contact.value,
      description: description.value,
    };
    try {
      await NextApi().patch(`/api/client/${data.id}`, payloadData);
      setLoading(false);
      openSnackBar("Berhasil Mengubah client");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Mengubah client");
      return;
    }
  };

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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Klien
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
              <CustomFormLabel htmlFor="input-placement">
                *PIC (People In Charge)
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                defaultValue={data?.pic_data?.fullname}
                options={userList}
                getOptionLabel={optionLabel}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CustomFormLabel htmlFor="last_called">
                  Terakhir Dipanggil
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
              <CustomFormLabel htmlFor="contact">*Kontak</CustomFormLabel>
              <CustomTextField
                required
                id="contact"
                name="contact"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("contact")}
                error={formik.touched.contact && !!formik.errors.contact}
                helperText={formik.touched.contact && formik.errors.contact}
              />
              <CustomFormLabel htmlFor="description">Deskripsi</CustomFormLabel>
              <CustomTextField
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
EditClientModal.propTypes = {
  open: PropTypes.bool,
};
export default EditClientModal;
