import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  MenuItem,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import { update } from "../../../../lib/services/user";

import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
import BaseMaps from "../../maps/BaseMaps";
const upTransition = Transition("up");

const EditLocationModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const service = new BaseService("/api/locations");

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

  const onEditUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, latitude, longitude, description } = target;

      const payload = {
        name: name.value,
        latitude: latitude.value,
        longitude: longitude.value,
        description: description.value,
      };
      await service.patch(data.id, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Location Point");
      closeModalHandler();
      router.replace(router.pathname);
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Location Point");
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
        <form onSubmit={onEditUser}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Location Point
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="name">Nama</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.name}
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="latitude">Latitude</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.latitude}
                id="latitude"
                name="latitude"
                fullWidth
                size="small"
                variant="outlined"
                disabled
              />

              <CustomFormLabel htmlFor="longitude">Longitude</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.longitude}
                id="longitude"
                name="longitude"
                fullWidth
                size="small"
                variant="outlined"
                disabled
              />
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <BaseMaps
                  onClick={(e) => {
                    setLong(e.lng);
                    setLat(e.lat);
                  }}
                />
              </Box>

              <CustomFormLabel htmlFor="description">
                Description
              </CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.description}
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
EditLocationModal.propTypes = {
  open: PropTypes.bool,
};
export default EditLocationModal;
