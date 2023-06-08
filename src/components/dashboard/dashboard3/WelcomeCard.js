import React from "react";
import Image from "next/image";
import { Card, CardContent, Button, Typography, Box } from "@mui/material";
import FeatherIcon from "feather-icons-react";
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
          marginBottom: "0px",
          lineHeight: "35px",
          position: "relative",
          zIndex: 9,
          mt: "15px",
        }}
        variant="h4"
        gutterBottom
      >
        Congratulation Julia
      </Typography>
      <Box
        sx={{
          display: {
            sm: "flex",
            xs: "block",
          },
          alignItems: "flex-end",
        }}
      >
        <Typography
          fontWeight="700"
          sx={{
            marginTop: "8px",
            marginBottom: "0px",
            lineHeight: "35px",
            position: "relative",
            zIndex: 9,
          }}
          variant="h2"
          gutterBottom
        >
          $39,358
        </Typography>
        <Box ml="10px">
          <FeatherIcon
            icon="arrow-up-left"
            style={{
              height: "14px",
              width: "14px",
            }}
          />
        </Box>

        <Typography
          fontWeight="700"
          sx={{
            lineHeight: "30px",
            position: "relative",
            zIndex: 9,
            marginTop: "12px",
            marginBottom: "0px",
          }}
          variant="h6"
          gutterBottom
        >
          +9%
        </Typography>
      </Box>

      <Button
        sx={{
          marginTop: "15px",
        }}
        variant="contained"
        color="secondary"
      >
        Download
      </Button>
    </CardContent>
  </Card>
);

export default WelcomeCard;
