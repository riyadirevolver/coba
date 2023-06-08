import GoogleMapReact from "google-map-react";
import moment from "moment";
import React, { useState } from "react";
import APP_CONFIG from "../../../app.config";

// export const getServerSideProps = WithAuth;

const getInfoWindowString = (data) => `
    <div>
      <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px">
        ${data.user?.fullname?.toUpperCase()}
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

  data?.data
    .filter((x) => x.latitude && x.longitude)
    .forEach((x) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: Number(x.latitude),
            lng: Number(x.longitude),
          },
          map,
        })
      );

      infowindows.push(
        new maps.InfoWindow({
          content: getInfoWindowString(x),
        })
      );
    });

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

  // infowindows.push(new maps.InfoWindow({
  //   content: getInfoWindowString(place),
  // }));

  markers.forEach((marker, i) => {
    marker.addListener("click", () => {
      infowindows[i].open(map, marker);
    });
  });
};

function GoogleMaps({ data }) {
  const defaultProps = {
    center: {
      lat: -6.24058,
      lng: 106.85593,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%", overflow: "hidden" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: APP_CONFIG.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, data)}
      />
    </div>
  );
}

export default GoogleMaps;
