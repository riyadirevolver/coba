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

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { STATUS_CANDIDATE_SENT_LISTS } from "../../../../utils/constant/listConstant";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import useFetchPersonJC from "../../../hooks/fetch/useFetchPersonJC";
import candidateSentValidation from "../../../validations/candidateSentValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const STATUS_CODE = {
  process: 0,
  test: 1,
  interview: 2,
  rejected: 3,
  hired: 3,
};

const EditCandidateSentModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
  token,
  session,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { personJCList, openPersonJC, setOpenPersonJC, loadingPersonJC } =
    useFetchPersonJC(token);
  const {
    clientRequestList,
    openClientRequest,
    setOpenClientRequest,
    loadingClientRequest,
  } = useFetchClientRequest(token, session?.client_id);
  const [payload, setPayload] = useState({
    jc_person_id: null,
    client_request_id: null,
  });

  const optionLabelPersonJC = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const optionLabelClientRequest = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.position + " - " + option?.client_data?.name;
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

  const handleReset = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      status: data.status || "",
      notes: data.notes || "",
      test_date: data.test_date || "",
      interview_date: data.interview_date || "",
    },
    validationSchema: candidateSentValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { status, notes, test_date, interview_date } = values;
        const payloadData = {
          ...(payload.client_request_id && {
            client_request_id: payload.client_request_id,
          }),
          ...(payload.jc_person_id && {
            jc_person_id: payload.jc_person_id,
          }),
          status: status,
          notes: notes,
          ...(test_date !== "" && {
            test_date: test_date,
          }),
          ...(interview_date !== "" && {
            interview_date: interview_date,
          }),
        };
        const res = await NextApi().patch(
          `/api/candidate-sent/${data.id}`,
          payloadData
        );
        await NextApi().post("/api/candidate-sent-logs", {
          ...payloadData,
          ...(!payload.client_request_id && {
            client_request_id: data.client_request_id,
          }),
          ...(!payload.jc_person_id && {
            jc_person_id: data.jc_person_id,
          }),
          candidate_sent_id: res.data.id,
          created_by: res.data.created_by,
        });
        openSnackBar("Berhasil mengubah Kandidat");
        router.replace(router.pathname);
        handleReset();
        setLoading(false);
        closeModalHandler();
      } catch (error) {
        openSnackBar("Gagal mengubah Kandidat");
        console.log(error);
        setLoading(false);
      }
      setSubmitting(false);
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
            Ubah Kandidat
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-placement">
                Project
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                readOnly
                handleHomeEndKeys
                defaultValue={
                  `${data?.client_request_data?.position} - ${data?.client_request_data?.client_data?.name}` ||
                  ""
                }
                options={clientRequestList}
                getOptionLabel={optionLabelClientRequest}
                loading={loadingClientRequest}
                open={openClientRequest}
                onOpen={() => {
                  setOpenClientRequest(true);
                }}
                onClose={() => {
                  setOpenClientRequest(false);
                }}
                onChange={(e, newInputValue) => {
                  setPayload((prevState) => ({
                    ...prevState,
                    client_request_id: newInputValue?.id,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    required
                    size="small"
                    placeholder="Pilih Project"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingClientRequest ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
              <CustomFormLabel htmlFor="input-placement">
                Nama Kandidat
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                readOnly
                options={personJCList}
                defaultValue={data?.jc_person_data?.name}
                getOptionLabel={optionLabelPersonJC}
                loading={loadingPersonJC}
                open={openPersonJC}
                onOpen={() => {
                  setOpenPersonJC(true);
                }}
                onClose={() => {
                  setOpenPersonJC(false);
                }}
                onChange={(e, newInputValue) => {
                  setPayload((prevState) => ({
                    ...prevState,
                    jc_person_id: newInputValue?.id,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    required
                    size="small"
                    placeholder="Pilih Nama Kandidat"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingPersonJC ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
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
                {STATUS_CANDIDATE_SENT_LISTS.map((item, index) => (
                  <MenuItem
                    value={item.value}
                    key={index}
                    disabled={item.status_code <= STATUS_CODE[data?.status]}
                  >
                    {item.value}
                  </MenuItem>
                ))}
              </Select>
              {formik.values.status === "test" && (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomFormLabel htmlFor="test_date">
                      Tanggal Test
                    </CustomFormLabel>
                    <DateTimePicker
                      required
                      id="test_date"
                      name="test_date"
                      ampm={false}
                      value={formik.values.test_date}
                      onChange={(date) =>
                        formik.setFieldValue("test_date", date)
                      }
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          fullWidth
                          size="small"
                          variant="outlined"
                          error={
                            formik.touched.test_date &&
                            !!formik.errors.test_date
                          }
                          helperText={
                            formik.touched.test_date && formik.errors.test_date
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </>
              )}
              {formik.values.status === "interview" && (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CustomFormLabel htmlFor="interview_date">
                      Tanggal Interview
                    </CustomFormLabel>
                    <DateTimePicker
                      required
                      id="interview_date"
                      name="interview_date"
                      ampm={false}
                      value={formik.values.interview_date}
                      onChange={(date) =>
                        formik.setFieldValue("interview_date", date)
                      }
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          fullWidth
                          size="small"
                          variant="outlined"
                          error={
                            formik.touched.interview_date &&
                            !!formik.errors.interview_date
                          }
                          helperText={
                            formik.touched.interview_date &&
                            formik.errors.interview_date
                          }
                        />
                      )}
                    />
                  </LocalizationProvider>
                </>
              )}
              <CustomFormLabel htmlFor="notes">Catatan</CustomFormLabel>
              <CustomTextField
                required
                id="notes"
                name="notes"
                fullWidth
                size="small"
                variant="outlined"
                {...formik.getFieldProps("notes")}
                error={formik.touched.notes && !!formik.errors.notes}
                helperText={formik.touched.notes && formik.errors.notes}
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

EditCandidateSentModal.defaultProps = {
  open: false,
};
EditCandidateSentModal.propTypes = {
  open: PropTypes.bool,
};
export default EditCandidateSentModal;
