import React from "react";

import { Grid, Card, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import icons from "../../data/featherIcons/data";

const FeatherIcons = () => (
  <Grid container spacing={0}>
    {icons.map((icon) => (
      <Grid item xs={6} sm={3} lg={2} key={icon.text}>
        <Card
          sx={{
            textAlign: "center",
          }}
        >
          <FeatherIcon icon={icon.text} />
          <Typography
            color="textSecondary"
            sx={{
              fontSize: "14px",
              mt: "10px",
            }}
          >
            {icon.text}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default FeatherIcons;
