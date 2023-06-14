import { Field, useFormik } from "formik";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import clientRequestValidation from "../../../validations/clientRequestValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const STATUS_LISTS = [
  {
    label: "PENDING",
    value: "pending",
  },
  {
    label: "HOLD",
    value: "hold",
  },
  {
    label: "ACTIVE",
    value: "active",
  },
  {
    label: "CLOSED",
    value: "closed",
  },
];

const EditClientRequestModal = ({
  open = false,
  closeModalHandler,
  type,
  client_id,
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
      last_called: data.last_called || "",
      request_date: data.request_date || "",
      salary: data.salary || "",
      total_requirement: data.total_requirement || "",
      status: data.status || "",
    },
    validationSchema: clientRequestValidation,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const {
          position,
          last_called,
          request_date,
          salary,
          total_requirement,
          status,
        } = values;
        const payload = {
          position: position,
          last_called: last_called,
          request_date: request_date,
          salary: salary,
          total_requirement: total_requirement,
          status: status,
        };
        console.log("ssss", payload);
        // await axios.post("/api/client-request", payload);
        const xx = await axios.patch(`/api/client-request/${data.id}`, payload);
        openSnackBar("Berhasil mengubah Client Request");
        router.replace(`/management/client/detail/${client_id}`);
        handleReset();
        setLoading(false);
        closeModalHandler();
      } catch (error) {
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
            Ubah Request
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
                  Last Called
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
              <CustomFormLabel htmlFor="salary">Salary</CustomFormLabel>
              <CustomTextField
                required
                id="salary"
                name="salary"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("salary")}
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
                {STATUS_LISTS.map((item, index) => (
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
