import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const ActivitySummary = ({ summaryData }) => {
  return (
    <Box mt="26px">
      <Grid container spacing={2}>
        {summaryData &&
          summaryData?.map((summary, idx) => (
            <Grid item sm={2} xs={3} key={idx}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    backgroundColor: "rgba(29, 202, 255, 0.05)",
                    borderRadius: "10px",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    priority
                    src={`/static/images/icons/${summary.icon}.svg`}
                    alt={summary.icon}
                    width="39px"
                    height="39px"
                  />
                </Box>
                <Typography textAlign="center">{summary.label}</Typography>
                <Typography fontWeight={700}>{summary.value}</Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ActivitySummary;
