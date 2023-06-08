import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import img1 from "../../assets/images/backgrounds/login-bg.svg";

import LogoIcon from "../../src/layouts/logo/LogoIcon";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";

const ResetPassword = () => (
  <Grid
    container
    spacing={0}
    sx={{ height: "100vh", justifyContent: "center" }}
  >
    <Grid
      item
      xs={12}
      sm={12}
      lg={6}
      sx={{
        background: (theme) =>
          `${theme.palette.mode === "dark" ? "#1c1f25" : "#ffffff"}`,
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: {
              xs: "relative",
              lg: "absolute",
            },
            height: { xs: "auto", lg: "100vh" },
            right: { xs: "auto", lg: "-50px" },
            margin: "0 auto",
          }}
        >
          <Image src={img1} alt="bg" maxWidth="812" />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{
            p: 4,
            position: "absolute",
            top: "0",
          }}
        >
          <LogoIcon />
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
      <Grid container spacing={0} display="flex" justifyContent="center">
        <Grid item xs={12} lg={9} xl={6}>
          <Box
            sx={{
              p: 4,
            }}
          >
            <Typography variant="h2" fontWeight="700">
              Forgot your password?
            </Typography>

            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{
                mt: 2,
              }}
            >
              Please enter the email address associated with your account and We
              will email you a link to reset your password.
            </Typography>

            <Box
              sx={{
                mt: 4,
              }}
            >
              <CustomFormLabel htmlFor="reset-email">
                Email Adddress
              </CustomFormLabel>
              <CustomTextField id="reset-email" variant="outlined" fullWidth />

              <NextLink href="/">
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    pt: "10px",
                    pb: "10px",
                    mt: 4,
                  }}
                >
                  Reset Password
                </Button>
              </NextLink>
              <NextLink href="/authentication/login">
                <Button
                  color="secondary"
                  size="large"
                  fullWidth
                  sx={{
                    pt: "10px",
                    pb: "10px",
                    mt: 2,
                  }}
                >
                  Back to Login
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
ResetPassword.layout = "Blank";
export default ResetPassword;
