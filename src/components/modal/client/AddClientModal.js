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
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import axios from "axios";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
import NextApi from "../../../../lib/services/next-api";

const upTransition = Transition("up");

const AddClientModal = ({ open = false, closeModalHandler, type, token }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const { userList, openUser, setOpenUser, loadingUser } = useFetchUser(token);
  const [payload, setPayload] = useState({
    pic_id: null,
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

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const { name_client, contact, description } = target;
    try {
      const data = {
        name: name_client.value,
        pic_id: payload.pic_id,
        contact: contact.value,
        description: description.value,
      };
      await NextApi().post("/api/client", data);
      console.log("first", data);
      setLoading(false);
      openSnackBar("Berhasil menambahkan client");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal mendaftarkan client");
      return;
    }
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
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah Client
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="name_client">
                Nama Client
              </CustomFormLabel>
              <CustomTextField
                required
                id="name_client"
                name="name_client"
                fullWidth
                size="small"
                variant="outlined"
              />
              {/* <CustomFormLabel htmlFor="pic_id">PIC</CustomFormLabel>
              <CustomTextField
                required
                id="pic_id"
                name="pic_id"
                fullWidth
                size="small"
                variant="outlined"
              /> */}
              <CustomFormLabel htmlFor="input-placement">
                PIC (People In Charge)
              </CustomFormLabel>
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
                    pic_id: newInputValue?.id,
                  }));
                }}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    required
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
              <CustomFormLabel htmlFor="contact">Contact</CustomFormLabel>
              <CustomTextField
                required
                id="contact"
                name="contact"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="description">Deskripsi</CustomFormLabel>
              <CustomTextField
                required
                id="description"
                name="description"
                fullWidth
                size="small"
                variant="outlined"
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
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddClientModal.defaultProps = {
  open: false,
};
AddClientModal.propTypes = {
  open: PropTypes.bool,
};
export default AddClientModal;
