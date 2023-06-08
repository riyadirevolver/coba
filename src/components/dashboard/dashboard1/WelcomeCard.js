import React from "react";
import Image from "next/image";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import imgsvg from "../../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg";

const WelcomeCard = () => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
    }}
  >
    <Box className="bg-img-1">
      <Image src={imgsvg} alt="welcome-img" />
    </Box>

    <CardContent>
      <Typography
        sx={{
          marginTop: "8px",
          marginBottom: "0px",
          lineHeight: "35px",
          position: "relative",
          zIndex: 9,
        }}
        variant="h3"
        gutterBottom
      >
        Hey Julia, <br /> Download Latest Report
      </Typography>
      <Button
        sx={{
          marginTop: "15px",
        }}
        variant="contained"
        color="primary"
      >
        Download
      </Button>
    </CardContent>
  </Card>
);

export default WelcomeCard;
