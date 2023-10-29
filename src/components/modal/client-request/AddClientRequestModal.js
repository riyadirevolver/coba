import { useFormik } from "formik";
import React, { useState } from "react";

import {
  Autocomplete,
  Button,
  Card,
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
  createFilterOptions,
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
import useJobPosition from "../../../hooks/fetch/useFetchJobPosition";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const upTransition = Transition("up");
const filter = createFilterOptions();

const AddClientRequestModal = ({
  open = false,
  closeModalHandler,
  type,
  client_id,
  session,
}) => {
  const router = useRouter();
  const [salaryText, setSalaryText] = useState("");
  const [payload, setPayload] = useState({
    position: null,
  });

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
  const {
    setOpenJobPosition,
    jobPositionList,
    openJobPosition,
    loadingJobPosition,
  } = useJobPosition(session?.token);

  const filterOptionsJobPosition = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;

    const selected = jobPositionList.some(
      (option) => inputValue === option.name
    );

    if (inputValue !== "" && !selected) {
      filtered.push({
        inputValue,
        name: `Tambahkan "${inputValue}"`,
      });
    }

    return filtered;
  };

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const renderOptions = (props, option) => <li {...props}>{option.name}</li>;

  const formik = useFormik({
    initialValues: {
      position: "",
      request_date: "",
      total_requirement: "",
      status: "",
      job_description: "",
    },
    validationSchema: clientRequestValidation,

    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { request_date, total_requirement, status, job_description } =
          values;
        const data = {
          client_id: client_id ?? session?.client_id,
          position: payload.position,
          request_date: request_date,
          salary: Number(salaryText.replace(/Rp. /g, "").split(".").join("")),
          total_requirement: total_requirement,
          status: status,
          job_description: job_description,
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
            Tambah Project
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="position">Position</CustomFormLabel>
              {/* <CustomTextField
                required
                id="position"
                name="position"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("position")}
                error={formik.touched.position && !!formik.errors.position}
                helperText={formik.touched.position && formik.errors.position}
              /> */}
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={jobPositionList}
                filterOptions={filterOptionsJobPosition}
                getOptionLabel={optionLabel}
                renderOption={renderOptions}
                loading={loadingJobPosition}
                open={openJobPosition}
                onOpen={() => {
                  setOpenJobPosition(true);
                }}
                onClose={() => {
                  setOpenJobPosition(false);
                }}
                onChange={(e, newValue) => {
                  if (newValue?.inputValue) {
                    setPayload((prevState) => ({
                      ...prevState,
                      position: newValue.inputValue,
                    }));
                  } else {
                    setPayload((prevState) => ({
                      ...prevState,
                      position: newValue?.name || null,
                    }));
                  }
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    required
                    size="small"
                    placeholder="Pilih Posisi"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingJobPosition ? (
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
              <CustomFormLabel htmlFor="salary">
                Gaji (Opsional)
              </CustomFormLabel>
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
              <CustomFormLabel htmlFor="job_description">
                Deskripsi Pekerjaan
              </CustomFormLabel>
              {/* <CustomTextField
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
              /> */}
              <Card>
                <ReactQuill
                  onChange={(value) => {
                    formik.setFieldValue("job_description", value);
                  }}
                  modules={{
                    clipboard: { matchVisual: false },
                  }}
                  placeholder="Type here..."
                />
              </Card>
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
