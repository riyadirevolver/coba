import { Grid, Skeleton } from "@mui/material";
import React from "react";

const SkeletonActivity = () => {
  return (
    <Grid container spacing={2} mt="26px">
      {[...Array(6)].map((_, idx) => (
        <Grid item sm={2} xs={3} key={idx}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={90}
            sx={{
              borderRadius: "16px",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonActivity;
