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
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import axios from "axios";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
import GoogleMaps from "../../maps";
import BaseMaps from "../../maps/BaseMaps";
import { Marker } from "@react-google-maps/api";
const upTransition = Transition("up");

const AddLocationModal = ({ open = false, closeModalHandler, type }) => {
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

  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name, latitude, longitude, description } = target;

      const data = {
        name: name.value,
        latitude: latitude.value,
        longitude: longitude.value,
        description: description.value,
        
      };

      // await service.post('a');
      await axios.post("/api/locations", data);
      setLoading(false);
      openSnackBar("Berhasil Tambah Location Point");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Tambah Location Point");
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
            Tambah Location Point
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="name">Nama</CustomFormLabel>
              <CustomTextField
                required
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />

              <CustomFormLabel htmlFor="name">Latitude</CustomFormLabel>
              <CustomTextField
                required
                id="latitude"
                name="latitude"
                value={lat}
                disabled
                fullWidth
                size="small"
                variant="outlined"
              />

              <CustomFormLabel htmlFor="name">Longitude</CustomFormLabel>
              <CustomTextField
                required
                id="longitude"
                name="longitude"
                disabled
                value={long}
                fullWidth
                size="small"
                variant="outlined"
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

              <CustomFormLabel htmlFor="name">Description</CustomFormLabel>
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

AddLocationModal.defaultProps = {
  open: false,
};
AddLocationModal.propTypes = {
  open: PropTypes.bool,
};
export default AddLocationModal;
