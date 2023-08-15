import { useFormik } from "formik";
import React from "react";

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

import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import useFetchClient from "../../../hooks/fetch/useFetchClient";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";

const upTransition = Transition("up");

const FilterClientModal = ({
  open = false,
  closeModalHandler,
  type,
  token,
  session,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [payload, setPayload] = React.useState({
    client_id: null,
    posisi: null,
    client_name: null,
  });

  const { clientList, openClient, setOpenClient, loadingClient } =
    useFetchClient(token);

  const {
    clientRequestList,
    openClientRequest,
    setOpenClientRequest,
    loadingClientRequest,
  } = useFetchClientRequest(token, session?.client_id);

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
      search: "",
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        router.replace({
          query: {
            ...router.query,
            ...(payload.client_id && {
              client_id: payload.client_id,
            }),
            ...(payload.posisi && {
              position: payload.posisi,
            }),
            ...(payload.client_name && {
              client_name: payload.client_name,
            }),
          },
        });
        openSnackBar("Berhasil filter klien request");
        closeModalHandler();
      } catch (error) {
        console.log(error);
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
        open={open && type === "filter"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Filter Kandidat Sent
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              {session?.role === "admin" && (
                <>
                  <CustomFormLabel htmlFor="input-placement">
                    Nama Perusahaan
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
                      setPayload((prevState) => ({
                        ...prevState,
                        client_id: newInputValue?.id,
                      }));
                    }}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        size="small"
                        placeholder="Pilih Nama Perusahaan"
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
                </>
              )}

              <CustomFormLabel htmlFor="input-placement">
                Permintaan Klien
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
                    posisi: newInputValue?.position,
                    client_name: newInputValue?.client_data?.name,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder="Pilih Permintaan Klien"
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" type="submit">
              {"Filter"}
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

FilterClientModal.defaultProps = {
  open: false,
};
FilterClientModal.propTypes = {
  open: PropTypes.bool,
};
export default FilterClientModal;
