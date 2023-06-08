import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import BaseService from "../../../services/base";
import PropTypes from "prop-types";


import FeatherIcon from "feather-icons-react";
import APP_CONFIG from "../../../../app.config";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
const upTransition = Transition("up");

const EditDepartementsModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const service = new BaseService("/api/departemens");

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

  const onEditJobLevel = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name } = target;

      const payload = {
        name: name.value,
      };
      await service.patch(data.id, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Departements");
      closeModalHandler();
      router.replace(router.pathname);
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Departements");
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
        <form onSubmit={onEditJobLevel}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Edit Departements
          </DialogTitle>
          <DialogContent>
            <DialogContentText required component="div">
              <CustomFormLabel htmlFor="name">Nama Departements</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.name}
                id="name"
                name="name"
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
EditDepartementsModal.propTypes = {
  open: PropTypes.bool,
};

export default EditDepartementsModal;