/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import BaseMaps from "../../../src/components/maps/BaseMaps";

const baseMap = () => {
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  return (
    <Container>
      <Box mb={3}>
        <Typography variant="h3">How to use BaseMaps components</Typography>
        <Typography variant="body2">
          will update if need more feature
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 700 }}>
          how to get long and lat
        </Typography>
        <Typography variant="body1">
          please import Base Map from our project for the example{" "}
          <b>import BaseMaps "../../src/components/maps/BaseMaps"</b>
        </Typography>
        <Typography varian="body1">
          for example get <b>Long</b> and <b>lat</b> please use event{" "}
          <code>onClick</code> event onClick will return from base
          ReactGoogleMap libraries
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="body1">
          <b>Long: {long}</b>
        </Typography>
        <Typography variant="body1">
          <b>Lat: {lat}</b>
        </Typography>
      </Box>
      <BaseMaps
        onClick={(e) => {
          setLong(e.lng);
          setLat(e.lat);
        }}
        yesIWantToUseGoogleMapApiInternals
      />
    </Container>
  );
};

export default baseMap;
