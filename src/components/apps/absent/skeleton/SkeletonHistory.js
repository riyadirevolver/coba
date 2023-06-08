import { Box, Grid, Skeleton, Typography } from "@mui/material";
import React from "react";

const SkeletonHistory = () => {
  return (
    <Box mt="35px">
      {/* <Skeleton
        variant="text"
        width={200}
        sx={{
          mb: 1,
        }}
      /> */}
      <Grid container spacing={2}>
        {[...Array(10)].map((_, idx) => (
          <Grid item sm={12} xs={12} key={idx}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={160}
              sx={{
                borderRadius: 3,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkeletonHistory;
