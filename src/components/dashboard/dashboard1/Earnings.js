import React from "react";
import FeatherIcon from "feather-icons-react";
import { Card, CardContent, Typography, Box, Fab } from "@mui/material";

const Earnings = () => (
  <Card
    sx={{
      backgroundColor: (theme) => theme.palette.secondary.main,
      color: "white",
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="flex-start">
        <Typography
          variant="h3"
          sx={{
            marginBottom: "0",
          }}
          gutterBottom
        >
          Earnings
        </Typography>
        <Box
          sx={{
            marginLeft: "auto",
          }}
        >
          <Fab
            size="medium"
            aria-label="add"
            color="default"
            elevation="0"
            sx={{
              boxShadow: "none",
            }}
          >
            <FeatherIcon icon="dollar-sign" />
          </Fab>
        </Box>
      </Box>
      <Typography
        variant="h1"
        fontWeight="500"
        sx={{
          marginBottom: "0",
          marginTop: "15px",
        }}
        gutterBottom
      >
        $93,438.78
      </Typography>
      <Typography
        variant="h6"
        fontWeight="400"
        sx={{
          marginBottom: "0",
          opacity: "0.6",
        }}
        gutterBottom
      >
        Monthly Revenue
      </Typography>
    </CardContent>
  </Card>
);

export default Earnings;
