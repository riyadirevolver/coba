import React, { useState } from "react";

import {
  Box,
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
  Typography,
} from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { RESPONSE_CANDIDATE_LISTS } from "../../../../utils/constant/listConstant";
import { STATUS_CANDIDATE_SENT_LISTS } from "../../../../utils/constant/statusCandidateConstant";
import useFetchPersonJC from "../../../hooks/fetch/useFetchPersonJC";
import { useUserSession } from "../../../hooks/useUserSession";
import candidateSentValidation from "../../../validations/candidateSentValidation";
import ClientDropdown from "../../forms/Dropdown/ClientDropdown";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const AddSubmitCandidateModalV2 = ({
  open = false,
  closeModalHandler,
  type,
  token,
  dataUser,
  session,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const { data: userLogin, error } = useUserSession();

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

  const handleReset = () => {
    formik.resetForm();
  };

  const [formList, setFormList] = useState([{ id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const handleAddForm = () => {
    setFormList([...formList, { id: nextId }]);
    setNextId(nextId + 1);
  };

  const handleRemoveForm = (id) => {
    const indexToRemove = formList.findIndex((form) => form.id === id);
    if (indexToRemove !== -1) {
      setFormList((prevFormList) =>
        prevFormList.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleChange = (id, fieldName, value) => {
    setFormList(
      formList.map((form) => {
        if (form.id === id) {
          return { ...form, [fieldName]: value };
        }
        return form;
      })
    );
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
        const payloadData = formList.map((item, idx) => {
          return {
            client_id: item?.client_id,
            client_request_id: item?.client_request_id,
            jc_person_id: dataUser?.id ?? jc_person_id,
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
            created_by: userLogin.data.id,
          };
        });
        const res = await NextApi().post("/api/candidate-sent", payloadData);
        const csLog = res.data.map((item, idx) => {
          return {
            ...item,
            candidate_sent_id: item.id,
            created_by: item.created_by,
          };
        });
        await NextApi().post("/api/candidate-sent-logs", csLog);
        setFormList([{ id: 1 }]);
        openSnackBar("Berhasil membuat kandidat");
        //   router.replace(router.pathname);
        router.replace("/submit-kandidat/semua");
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
        open={open && type === "submit_candidate"}
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
              {formList.map((form) => (
                <div key={form.id}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: -1,
                      mt: 2,
                    }}
                  >
                    <Typography variant="h4">Form Client</Typography>
                    {formList.length > 1 && (
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => handleRemoveForm(form.id)}
                      >
                        <FeatherIcon icon="trash" size={20} />
                      </Button>
                    )}
                  </Box>
                  <ClientDropdown
                    session={session}
                    token={token}
                    idx={form.id}
                    handleChange={(a, b, c) => handleChange(a, b, c)}
                  />
                </div>
              ))}
              <Box display="flex" justifyContent="end" mt={2}>
                <Button variant="contained" onClick={handleAddForm}>
                  Tambah Client
                </Button>
              </Box>
              <CustomFormLabel htmlFor="input-placement">
                Nama Kandidat
              </CustomFormLabel>
              <CustomTextField
                id="candidate_name"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                defaultValue={dataUser?.name ?? ""}
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

AddSubmitCandidateModalV2.defaultProps = {
  open: false,
};
AddSubmitCandidateModalV2.propTypes = {
  open: PropTypes.bool,
};
export default AddSubmitCandidateModalV2;
