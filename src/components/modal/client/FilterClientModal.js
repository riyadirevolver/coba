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
import * as Yup from "yup";

import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import useFetchClientRequest from "../../../hooks/fetch/useFetchClientRequest";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import useFetchClient from "../../../hooks/fetch/useFetchClient";

const upTransition = Transition("up");

const FilterClientModal = ({
  open = false,
  closeModalHandler,
  type,
  token,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [payload, setPayload] = React.useState({
    pic_name: null,
    client_name: null,
  });

  const { userList, openUser, setOpenUser, loadingUser } = useFetchUser(token);
  const { clientList, openClient, setOpenClient, loadingClient } =
    useFetchClient(token);

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
      // client_name: null,
      // pic_name: null,
    },
    validationSchema: Yup.object().shape({
      // client_name: Yup.string().nullable(true),
      // pic_name: Yup.string().nullable(true),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        //   const { client_name } = values;
        //   console.log("zzzzzzzzzz", client_name);
        router.replace({
          query: {
            ...router.query,
            // "batch[$like]": `%${batch}%`,
            ...(payload.client_name && {
              "name[$like]": payload.client_name,
            }),
            ...(payload.pic_name && {
              pic_name: payload.pic_name,
            }),
          },
        });
        openSnackBar("Berhasil filter user Juara Coding");
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
                Nama Klien
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
                    client_name: newInputValue?.name,
                  }));
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
              <CustomFormLabel htmlFor="input-placement">PIC</CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                options={userList}
                getOptionLabel={(option) => option.fullname}
                loading={loadingUser}
                open={openUser}
                onOpen={() => {
                  setOpenUser(true);
                }}
                onClose={() => {
                  setOpenUser(false);
                }}
                onChange={(e, newInputValue) => {
                  setPayload((prevState) => ({
                    ...prevState,
                    pic_name: newInputValue?.fullname,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder="Pilih PIC (People In Charge)"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingUser ? (
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
