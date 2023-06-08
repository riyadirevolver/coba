import React from "react";
import { Grid } from "@mui/material";
import {
  FbOrdinaryForm,
  FbDefaultForm,
  FbBasicHeaderForm,
  FbReadonlyForm,
  FbDisabledForm,
  FbLeftIconForm,
  FbRightIconForm,
  FbInputVariants,
} from "../../../src/components/forms/fb-elements/index";

const FormLayouts = () => (
  <Grid container spacing={0}>
    <Grid item lg={12} md={12} xs={12}>
      <FbOrdinaryForm />
    </Grid>
    <Grid item lg={12} md={12} xs={12}>
      <FbInputVariants />
    </Grid>
    <Grid item lg={12} md={12} xs={12}>
      <FbDefaultForm />
    </Grid>
    <Grid item lg={12} md={12} xs={12}>
      <FbBasicHeaderForm />
    </Grid>
    <Grid item lg={12} md={12} xs={12}>
      <FbReadonlyForm />
    </Grid>
    <Grid item lg={12} md={12} xs={12}>
      <FbDisabledForm />
    </Grid>
    <Grid item lg={6} md={12} xs={12}>
      <FbLeftIconForm />
    </Grid>
    <Grid item lg={6} md={12} xs={12}>
      <FbRightIconForm />
    </Grid>
  </Grid>
);

export default FormLayouts;
