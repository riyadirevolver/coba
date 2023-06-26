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
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const FilterClientRequestModal = ({
  open = false,
  closeModalHandler,
  type,
  token,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [payload, setPayload] = React.useState({
    posisi: null,
  });

  const {
    clientRequestList,
    openClientRequest,
    setOpenClientRequest,
    loadingClientRequest,
  } = useFetchClientRequest(token, router.query.id);

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
            ...(payload.posisi && {
              position: payload.posisi,
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
            Filter Client
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="input-placement">
                Posisi
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={clientRequestList}
                getOptionLabel={(option) => option.position}
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
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder="Pilih Posisi"
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

FilterClientRequestModal.defaultProps = {
  open: false,
};
FilterClientRequestModal.propTypes = {
  open: PropTypes.bool,
};
export default FilterClientRequestModal;
