import {
  Button,
  ButtonGroup,
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
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import BaseService from "../../../services/base";
import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react";
import APP_CONFIG from "../../../../app.config";
import axios from "axios";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
const upTransition = Transition("up");

const EditDepartementsSettingModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  departement,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [jobDepartement, setJobDepartement] = React.useState(departement.data);
  const [selfie, setSelfie] = React.useState(data?.required_selfie);
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

  const service = new BaseService("/api/departements-settings");
  const onEditJobLevel = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const payload = {
        required_selfie: true,
      };
      await service.patch(data.job_departement_id, payload);
      //await axios.patch(`/api/departements-settings/${data.id}`,payload)
      setLoading(false);
      openSnackBar("Berhasil Edit Departements Setting");
      closeModalHandler();
      //router.replace(router.pathname);
      //router.reload();
      return;
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      openSnackBar("Gagal Edit Departements Setting");
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
            Edit Departements Setting
          </DialogTitle>
          <DialogContent>
            <DialogContentText required component="div">
              <CustomFormLabel htmlFor="name">
                Nama Departements Setting
              </CustomFormLabel>
              <Select
                size="small"
                fullWidth
                value={selfie}
                onChange={(e) => setSelfie(e.target.value)}
              >
                <MenuItem value={false}>false</MenuItem>
                <MenuItem value={true}>true</MenuItem>
              </Select>
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
EditDepartementsSettingModal.propTypes = {
  open: PropTypes.bool,
};

export default EditDepartementsSettingModal;
