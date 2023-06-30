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

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useFormik } from "formik";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { STATUS_CANDIDATE_SENT_LISTS } from "../../../../utils/constant/listConstant";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import candidateSentValidation from "../../../validations/candidateSentValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const AddSubmitCandidateModal = ({
  open = false,
  closeModalHandler,
  type,
  token,
  data,
  session,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
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
      status: "",
      notes: "",
    },
    validationSchema: candidateSentValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const { status, notes } = values;
        const payloadData = {
          client_request_id: payload.client_request_id,
          jc_person_id: data?.id,
          status: status,
          notes: notes,
        };
        const res = await NextApi().post("/api/candidate-sent", payloadData);
        await NextApi().post("/api/candidate-sent-logs", {
          ...payloadData,
          candidate_sent_id: res.data.id,
          created_by: res.data.created_by,
        });
        openSnackBar("Berhasil membuat kandidat");

        handleReset();
        setLoading(false);
        closeModalHandler();
        if (session?.role === "client") {
          return router.replace("/client/candidate-sent");
        }
        router.replace("/management/candidate-sent");
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
            Submit Kandidat
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-placement">
                Klien Request
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={clientRequestList}
                getOptionLabel={(option) =>
                  option.position + " - " + option?.client_data?.name
                }
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
                    placeholder="Pilih Client Request"
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
              <CustomTextField
                id="candidate_name"
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                size="small"
                defaultValue={data?.name ?? ""}
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
                  <MenuItem value={item.value} key={index}>
                    {item.value}
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

AddSubmitCandidateModal.defaultProps = {
  open: false,
};
AddSubmitCandidateModal.propTypes = {
  open: PropTypes.bool,
};
export default AddSubmitCandidateModal;
