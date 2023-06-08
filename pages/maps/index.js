import React from 'react';
import GoogleMapReact from 'google-map-react';
import APP_CONFIG from '../../app.config';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Grid, IconButton } from '@mui/material';
import GoogleMaps from '../../src/components/maps';

export default function Maps() {
  return (
    <Grid container>
      <Grid item lg={12} sx={{ p: 4 }}>
        <GoogleMaps />
      </Grid>
    </Grid>
  );
}
