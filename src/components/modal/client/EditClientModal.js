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

import { useRouter } from "next/dist/client/router";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

import axios from "axios";
import PropTypes from "prop-types";
import useFetchUser from "../../../hooks/fetch/useFetchUser";
const upTransition = Transition("up");

const ROLE_LISTS = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Client",
    value: "client",
  },
  {
    label: "Manager",
    value: "manager",
  },
];

const EditClientModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  token,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { userList, openUser, setOpenUser, loadingUser } = useFetchUser(token);
  const [payload, setPayload] = useState({
    pic_id: null,
  });

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.fullname;
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

  const onEditClient = async (event) => {
    setLoading(true);
    event.preventDefault();
    const { target } = event;
    const { name_client, contact, description } = target;

    const payloadData = {
      name: name_client.value,
      pic_id: payload.pic_id,
      contact: contact.value,
      description: description.value,
    };
    try {
      await axios.patch(`/api/client/${data.id}`, payloadData);
      setLoading(false);
      openSnackBar("Berhasil Mengubah client");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Mengubah client");
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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={onEditClient}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Client
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
                defaultValue={data.name}
                id="name_client"
                name="name_client"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="input-placement">
                PIC (People In Charge)
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                defaultValue={data?.pic_data?.fullname}
                options={userList}
                getOptionLabel={optionLabel}
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
                defaultValue={data.contact}
                id="contact"
                name="contact"
                type="contact"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="description">Deskripsi</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.description}
                id="description"
                name="description"
                type="description"
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
              {loading ? "Submitting..." : "Simpan"}
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
EditClientModal.propTypes = {
  open: PropTypes.bool,
};
export default EditClientModal;
