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

import { useRouter } from "next/dist/client/router";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

import { useFormik } from "formik";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import clientValidation from "../../../validations/clientValidation";
import {
  DESCRIPTION_LISTS,
  STATUS_LAST_CALLED_LISTS,
  UNDER_DIKA_LISTS,
} from "../../../../utils/constant/listConstant";
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
  const {
    userList,
    openUser,
    setOpenUser,
    loadingUser,
    loadingText,
    setTempQuery: setUserTempQuery,
  } = useFetchUser(token);
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
      client_email: data.email || "",
      status_called: data.status_called || "",
      last_called: data.last_called || "",
      contact: data.contact || "",
      description: data.description || "",
      under_dika: (data.under_dika == true ? 1 : 2) || "",
    },
    validationSchema: clientValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const {
        client_name,
        client_email,
        status_called,
        last_called,
        contact,
        description,
        under_dika,
      } = values;
      const payloadData = {
        name: client_name,
        ...(payload.pic_id && {
          pic_id: payload.pic_id,
        }),
        email: client_email,
        status_called: status_called,
        last_called: last_called,
        contact: contact,
        description: description,
        under_dika: under_dika == 2 ? false : true,
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
              {/* <CustomFormLabel htmlFor="client_email">
                Email Klien
              </CustomFormLabel>
              <CustomTextField
                required
                id="client_email"
                name="client_email"
                type="email"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("client_email")}
                error={
                  formik.touched.client_email && !!formik.errors.client_email
                }
                helperText={
                  formik.touched.client_email && formik.errors.client_email
                }
              /> */}
              <CustomFormLabel htmlFor="status_called">
                Stasus Dihubungi
              </CustomFormLabel>
              <Select
                name="status_called"
                size="small"
                fullWidth
                value={formik.values.status_called || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("status_called", value);
                }}
              >
                {STATUS_LAST_CALLED_LISTS.map((item, index) => (
                  <MenuItem value={item.title} key={index}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
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
                id="free-solo-with-text-demo"
                defaultValue={data?.pic_data?.fullname}
                options={userList}
                getOptionLabel={optionLabel}
                filterOptions={(x) => x}
                onInputChange={(e, newInputValue) =>
                  setUserTempQuery(newInputValue)
                }
                loading={loadingUser}
                loadingText={loadingText}
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
                          {loadingUser && loadingText == "loading..." ? (
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
                Jenis Perusahaan
              </CustomFormLabel>
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
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              <CustomFormLabel htmlFor="under_dika">
                Status Under DIKA
              </CustomFormLabel>
              <Select
                name="under_dika"
                size="small"
                fullWidth
                defaultValue={true}
                value={formik.values.under_dika || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("under_dika", value);
                }}
              >
                {UNDER_DIKA_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
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
