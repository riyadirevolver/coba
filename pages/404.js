import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import NextLink from "next/link";

const Error = () => (
  <Box
    display="flex"
    flexDirection="column"
    height="100vh"
    textAlign="center"
    justifyContent="center"
    sx={{ backgroundColor: "#e4f5ff" }}
  >
    <Container maxWidth="md">
      <Typography
        align="center"
        variant="h1"
        sx={{
          pt: 2,
          color: (theme) =>
            `${
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.87)"
                : "rgba(0, 0, 0, 0.87)"
            }`,
        }}
      >
        404
      </Typography>
      <Typography
        align="center"
        variant="h4"
        sx={{
          pt: 1,
          pb: 3,
          color: (theme) =>
            `${
              theme.palette.mode === "dark"
                ? "rgba(0, 0, 0, 0.87)"
                : "rgba(0, 0, 0, 0.87)"
            }`,
        }}
      >
        This page could not be found.
      </Typography>
      <NextLink href="/">
        <Button color="primary" variant="contained" disableElevation>
          Back to Home
        </Button>
      </NextLink>
    </Container>
  </Box>
);
Error.layout = "Blank";
export default Error;
