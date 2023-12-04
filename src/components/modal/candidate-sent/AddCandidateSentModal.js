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
import { STATUS_CANDIDATE_SENT_LISTS } from "../../../../utils/constant/statusCandidateConstant";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import useFetchPersonJC from "../../../hooks/fetch/useFetchPersonJC";
import candidateSentValidation from "../../../validations/candidateSentValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { RESPONSE_CANDIDATE_LISTS } from "../../../../utils/constant/listConstant";
import useFetchClient from "../../../hooks/fetch/useFetchClient";

const upTransition = Transition("up");

const AddCandidateSentModal = ({
  open = false,
  closeModalHandler,
  type,
  token,
  session,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { clientList, openClient, setOpenClient, loadingClient } =
    useFetchClient(token);

  const {
    personJCList,
    openPersonJC,
    setOpenPersonJC,
    loadingPersonJC,
    loadingText,
    setTempQuery: setPersonTempQuery,
  } = useFetchPersonJC(token);

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

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.position;
  };

  const handleReset = () => {
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      client_id: "",
      client_request_id: "",
      jc_person_id: "",
      status: "",
      notes: "",
      test_date: "",
      interview_date: "",
      candidate_response: null,
    },
    validationSchema: candidateSentValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const {
          status,
          notes,
          test_date,
          interview_date,
          candidate_response,
          client_request_id,
          jc_person_id,
        } = values;
        const payloadData = {
          client_request_id: client_request_id,
          jc_person_id: jc_person_id,
          notes: notes,
          candidate_response: candidate_response,
          ...(status && {
            status: status,
          }),
          ...(test_date !== "" && {
            test_date: test_date,
          }),
          ...(interview_date !== "" && {
            interview_date: interview_date,
          }),
        };
        const res = await NextApi().post("/api/candidate-sent", payloadData);
        await NextApi().post("/api/candidate-sent-logs", {
          ...payloadData,
          candidate_sent_id: res.data.id,
          created_by: res.data.created_by,
        });
        openSnackBar("Berhasil membuat kandidat");
        router.replace(router.pathname);
        handleReset();
        setLoading(false);
        closeModalHandler();
      } catch (error) {
        openSnackBar("Gagal membuat kandidat");
        console.log(error);
        setLoading(false);
      }
      setSubmitting(false);
    },
  });

  const {
    clientRequestList,
    openClientRequest,
    setOpenClientRequest,
    loadingClientRequest,
    setClientRequestList,
  } = useFetchClientRequest(
    token,
    session?.client_id ?? formik?.values?.client_id,
    session?.role
  );

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
            Tambah Kandidat
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              {!session?.client_id && (
                <React.Fragment>
                  <CustomFormLabel htmlFor="input-placement">
                    Client
                  </CustomFormLabel>
                  <Autocomplete
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={clientList}
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
                      formik.setFieldValue("client_id", newInputValue?.id);
                      formik.setFieldValue("client_request_id", "");
                      setClientRequestList([]);
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        size="small"
                        placeholder="Pilih Nama Klien"
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
                </React.Fragment>
              )}
              {(formik.values.client_id || session?.client_id) && (
                <React.Fragment>
                  <CustomFormLabel htmlFor="input-placement">
                    Project
                  </CustomFormLabel>
                  <Autocomplete
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={clientRequestList}
                    getOptionLabel={optionLabel}
                    loading={loadingClientRequest}
                    open={openClientRequest}
                    onOpen={() => {
                      setOpenClientRequest(true);
                    }}
                    onClose={() => {
                      setOpenClientRequest(false);
                    }}
                    onChange={(e, newInputValue) => {
                      formik.setFieldValue(
                        "client_request_id",
                        newInputValue?.id
                      );
                    }}
                    onInputChange={(event, newInputValue) => {
                      if (newInputValue === "") {
                        formik.setFieldValue("client_id", null);
                      }
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
                </React.Fragment>
              )}
              <CustomFormLabel htmlFor="input-placement">
                Nama Kandidat
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={personJCList}
                getOptionLabel={(option) => option.name}
                loading={loadingPersonJC}
                loadingText={loadingText}
                filterOptions={(x) => x}
                onInputChange={(e, newInputValue) =>
                  setPersonTempQuery(newInputValue)
                }
                open={openPersonJC}
                onOpen={() => {
                  setOpenPersonJC(true);
                }}
                onClose={() => {
                  setOpenPersonJC(false);
                }}
                onChange={(e, newInputValue) => {
                  formik.setFieldValue("jc_person_id", newInputValue?.id);
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
                          {loadingPersonJC && loadingText == "loading..." ? (
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
                // required
                name="status"
                size="small"
                fullWidth
                displayEmpty
                value={formik.values.status || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("status", value);
                }}
              >
                {!session?.client_id && (
                  <MenuItem value="sent">Kirim Kandidat</MenuItem>
                )}
                {STATUS_CANDIDATE_SENT_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
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
              <CustomFormLabel htmlFor="candidate_response">
                Respon Kandidat
              </CustomFormLabel>
              <Select
                name="candidate_response"
                size="small"
                fullWidth
                value={formik.values.candidate_response || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("candidate_response", value);
                }}
              >
                {RESPONSE_CANDIDATE_LISTS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
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

AddCandidateSentModal.defaultProps = {
  open: false,
};
AddCandidateSentModal.propTypes = {
  open: PropTypes.bool,
};
export default AddCandidateSentModal;
