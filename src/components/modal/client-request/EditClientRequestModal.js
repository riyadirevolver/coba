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
  InputAdornment,
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
import { STATUS_CLIENT_REQUEST_LISTS } from "../../../../utils/constant/listConstant";
import clientRequestValidation from "../../../validations/clientRequestValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const EditClientRequestModal = ({
  open = false,
  closeModalHandler,
  type,
  client_id,
  session,
  data,
}) => {
  const router = useRouter();
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

  const formik = useFormik({
    initialValues: {
      position: data.position || "",
      request_date: data.request_date || "",
      salary:
        String(data.salary)
          .replace(/\D/g, "")
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "",
      total_requirement: data.total_requirement || "",
      status: data.status || "",
      job_description: data.job_description || "",
    },
    validationSchema: clientRequestValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const {
          position,
          request_date,
          salary,
          total_requirement,
          status,
          job_description,
        } = values;
        const payload = {
          position: position,
          request_date: request_date,
          // salary: Number(salary.replace(/Rp. /g, "").split(".").join("")),
          salary: Number(salary.replace(/[^\d]/g, "").replace(/^0+/, "")),
          total_requirement: total_requirement,
          status: status,
          job_description: job_description,
        };
        await NextApi().patch(`/api/client-request/${data.id}`, payload);
        openSnackBar("Berhasil mengubah Client Request");
        handleReset();
        setLoading(false);
        closeModalHandler();
        if (session?.role === "client") {
          return router.replace(router.pathname);
        }
        router.replace(`/management/client/request/${client_id}`);
      } catch (error) {
        console.log(error);
        setLoading(false);
        openSnackBar("Gagal mengubah Client Request");
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
            Ubah Client Request
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
                fullWidth
                size="small"
                variant="outlined"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                InputProps={{
                  maxLength: 14,
                  startAdornment: (
                    <InputAdornment position="start">Rp.</InputAdornment>
                  ),
                }}
                onChange={(event) => {
                  const { value } = event.target;
                  const formattedValue = value
                    .replace(/\D/g, "")
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                  formik.setFieldValue("salary", formattedValue);
                }}
                value={formik.values.salary}
                error={formik.touched.salary && !!formik.errors.salary}
                helperText={formik.touched.salary && formik.errors.salary}
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
              <CustomFormLabel htmlFor="job_description">
                Deskripsi Pekerjaan
              </CustomFormLabel>
              <CustomTextField
                required
                id="job_description"
                name="job_description"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("job_description")}
                error={
                  formik.touched.job_description &&
                  !!formik.errors.job_description
                }
                helperText={
                  formik.touched.job_description &&
                  formik.errors.job_description
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
              {loading ? "Submitting..." : "Ubah"}
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

EditClientRequestModal.defaultProps = {
  open: false,
};
EditClientRequestModal.propTypes = {
  open: PropTypes.bool,
};
export default EditClientRequestModal;
