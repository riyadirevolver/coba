import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import moment from "moment";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import Transition from "../../transition";
import PropTypes from "prop-types";
import APP_CONFIG from "../../../../app.config";
import { useRouter } from "next/router";
const upTransition = Transition("up");

const getInfoWindowString = (data) => `
    <div>
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px">
        ${data.user.fullname.toUpperCase()}
      </div>
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 10px">
        ${moment(data.time_in).format("DD MMM YYYY, HH:mm:ss")}
      </div>
      <img width="200" height="200" src="${APP_CONFIG.baseUrl}/uploads/${
  data.check_in_photo
}">
    </div>`;

const handleApiLoaded = (map, maps, data) => {
  const markers = [];
  const infowindows = [];
  markers.push(
    new maps.Marker({
      position: {
        lat: Number(data?.latitude),
        lng: Number(data?.longitude),
      },
      map,
    })
  );

  infowindows.push(
    new maps.InfoWindow({
      content: getInfoWindowString(data),
    })
  );

  let activeWindows = false;
  markers.forEach((marker, i) => {
    marker.addListener("click", () => {
      if (activeWindows) {
        activeWindows.close();
      }
      activeWindows = infowindows[i];
      infowindows[i].open(map, marker);
    });
  });

  markers.forEach((marker, i) => {
    infowindows[i].open(map, marker);
  });
};

const MapUserModal = ({ open = false, closeModalHandler, type, data }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

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

  const defaultProps = {
    center: {
      lat: Number(data?.latitude),
      lng: Number(data?.longitude),
    },
    zoom: 20,
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
        open={open && type === "map"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {data?.longitude === null ? (
          "data kosong"
        ) : (
          <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                handleApiLoaded(map, maps, data)
              }
            />
          </div>
        )}
        <DialogActions>
          <Button onClick={closeModalHandler} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

MapUserModal.defaultProps = {
  open: false,
};
MapUserModal.propTypes = {
  open: PropTypes.bool,
};
export default MapUserModal;
