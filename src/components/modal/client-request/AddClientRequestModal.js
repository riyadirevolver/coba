import { useFormik } from "formik";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { uploadFile } from "../../../../lib/services/upload";
import { formatRupiah } from "../../../../utils/formatRupiah";
import useUploadPhoto from "../../../hooks/useUploadPhoto";
import clientRequestValidation from "../../../validations/clientRequestValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { STATUS_CLIENT_REQUEST_LISTS } from "../../../../utils/constant/listConstant";

const upTransition = Transition("up");

const AddClientRequestModal = ({
  open = false,
  closeModalHandler,
  type,
  client_id,
}) => {
  const router = useRouter();
  const [salaryText, setSalaryText] = useState("");

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

  const { handleDeletePoster, onSelectFile, errorFiles, gambar, pesan } =
    useUploadPhoto(undefined);

  const formik = useFormik({
    initialValues: {
      position: "",
      last_called: "",
      request_date: "",
      total_requirement: "",
      status: "",
    },
    validationSchema: clientRequestValidation,

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const {
          position,
          last_called,
          request_date,
          total_requirement,
          status,
        } = values;
        const data = {
          client_id: client_id,
          position: position,
          last_called: last_called,
          request_date: request_date,
          salary: Number(salaryText.replace(/Rp. /g, "").split(".").join("")),
          total_requirement: total_requirement,
          status: status,
        };
        const response = await NextApi().post("/api/client-request", data);
        if (gambar.length > 0) {
          gambar.map(async (item) => {
            const upload = await uploadFile(item);
            const payloadAttachment = {
              client_request_id: response.data.id,
              url: upload.id,
              file_name: item.name,
            };
            await NextApi().post("/api/client-attachment", payloadAttachment);
          });
        }

        openSnackBar("Berhasil menambahkan Client Request");
        router.replace(`/management/client/request/${client_id}`);
        handleReset();
        setLoading(false);
        closeModalHandler();
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setSubmitting(false);
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
            Tambah Client Request
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="position">Position</CustomFormLabel>
              <CustomTextField
                required
                id="position"
                name="position"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("position")}
                error={formik.touched.position && !!formik.errors.position}
                helperText={formik.touched.position && formik.errors.position}
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
                <CustomFormLabel htmlFor="request_date">
                  Tanggal Permintaan
                </CustomFormLabel>
                <DatePicker
                  required
                  id="request_date"
                  name="request_date"
                  // label="Tanggal Permintaan"
                  value={formik.values.request_date}
                  onChange={(date) =>
                    formik.setFieldValue("request_date", date)
                  }
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="outlined"
                      error={
                        formik.touched.request_date &&
                        !!formik.errors.request_date
                      }
                      helperText={
                        formik.touched.request_date &&
                        formik.errors.request_date
                      }
                    />
                  )}
                />
              </LocalizationProvider>
              <CustomFormLabel htmlFor="salary">Gaji</CustomFormLabel>
              <CustomTextField
                id="salary"
                name="salary"
                variant="outlined"
                value={formatRupiah(String(salaryText))}
                onChange={(e) => setSalaryText(e.target.value)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                inputProps={{
                  maxLength: 14,
                }}
                fullWidth
                size="small"
              />
              <CustomFormLabel htmlFor="total_requirement">
                Total Permintaan
              </CustomFormLabel>
              <CustomTextField
                required
                id="total_requirement"
                name="total_requirement"
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
                {...formik.getFieldProps("total_requirement")}
                error={
                  formik.touched.total_requirement &&
                  !!formik.errors.total_requirement
                }
                helperText={
                  formik.touched.total_requirement &&
                  formik.errors.total_requirement
                }
              />
              <CustomFormLabel htmlFor="status">Status</CustomFormLabel>
              <Select
                name="status"
                size="small"
                fullWidth
                value={formik.values.status || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("status", value);
                }}
              >
                {STATUS_CLIENT_REQUEST_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              <CustomFormLabel htmlFor="upload">
                Upload (Opsional)
              </CustomFormLabel>
              <CustomTextField
                type="file"
                name="image"
                accept="image/*"
                onChange={onSelectFile}
                multiple
                fullWidth
                size="small"
                variant="outlined"
                inputProps={{ multiple: true }}
                error={errorFiles}
                helperText={pesan}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading || errorFiles === true}
              type="submit"
            >
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button
              onClick={() => {
                closeModalHandler();
                handleReset();
                setSalaryText("");
                handleDeletePoster();
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

AddClientRequestModal.defaultProps = {
  open: false,
};
AddClientRequestModal.propTypes = {
  open: PropTypes.bool,
};
export default AddClientRequestModal;
