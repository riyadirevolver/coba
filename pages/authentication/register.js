import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";

import img1 from "../../assets/images/backgrounds/login-bg.svg";
import LogoIcon from "../../src/layouts/logo/LogoIcon";

const Register = () => (
  <Grid container sx={{ height: "100vh", justifyContent: "center" }}>
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
            <Typography fontWeight="700" variant="h2">
              Welcome to Flexy
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                color="textSecondary"
                variant="h6"
                fontWeight="400"
                sx={{
                  mr: 1,
                }}
              >
                Already have an Account?
              </Typography>
              <NextLink href="/authentication/login">
                <Typography
                  fontWeight="500"
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                >
                  Sign In
                </Typography>
              </NextLink>
            </Box>
            <Box
              sx={{
                mt: 4,
              }}
            >
              <CustomFormLabel htmlFor="name">Name</CustomFormLabel>
              <CustomTextField id="name" variant="outlined" fullWidth />
              <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
              <CustomTextField id="email" variant="outlined" fullWidth />
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 3,
                }}
              />

              <NextLink href="/">
                <Button
                  color="secondary"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    pt: "10px",
                    pb: "10px",
                  }}
                >
                  Sign Up
                </Button>
              </NextLink>

              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                  mt: "20px",
                  mb: "20px",
                  "&::before": {
                    content: '""',
                    background: (theme) =>
                      `${
                        theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"
                      }`,
                    height: "1px",
                    width: "100%",
                    position: "absolute",
                    left: "0",
                    top: "13px",
                  },
                }}
              >
                <Typography
                  component="span"
                  color="textSecondary"
                  variant="h6"
                  fontWeight="400"
                  sx={{
                    position: "relative",
                    padding: "0 12px",
                    background: (theme) =>
                      `${theme.palette.mode === "dark" ? "#282c34" : "#fff"}`,
                  }}
                >
                  or sign in with
                </Typography>
              </Box>

              <Box>
                <Button
                  variant="outlined"
                  size="large"
                  display="flex"
                  alignitems="center"
                  justifycontent="center"
                  sx={{
                    width: "100%",
                    borderColor: (theme) =>
                      `${
                        theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                      }`,
                    borderWidth: "2px",
                    textAlign: "center",
                    mt: 2,
                    pt: "10px",
                    pb: "10px",
                    "&:hover": {
                      borderColor: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                        }`,
                      borderWidth: "2px",
                    },
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <GoogleIcon
                      sx={{
                        color: (theme) => theme.palette.error.main,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        ml: 1,
                        color: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? theme.palette.grey.A200
                              : "#13152a"
                          }`,
                      }}
                    >
                      Google
                    </Typography>
                  </Box>
                </Button>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={6}>
                  <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                      width: "100%",
                      borderColor: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                        }`,
                      borderWidth: "2px",
                      textAlign: "center",
                      mt: 2,
                      pt: "10px",
                      pb: "10px",
                      "&:hover": {
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <FacebookIcon
                        sx={{
                          color: (theme) => theme.palette.secondary.main,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 1,
                          color: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? theme.palette.grey.A200
                                : "#13152a"
                            }`,
                        }}
                      >
                        Facebook
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                      width: "100%",
                      borderColor: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                        }`,
                      borderWidth: "2px",
                      textAlign: "center",
                      mt: 2,
                      pt: "10px",
                      pb: "10px",
                      "&:hover": {
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <TwitterIcon
                        sx={{
                          color: (theme) => theme.palette.primary.main,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 1,
                          color: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? theme.palette.grey.A200
                                : "#13152a"
                            }`,
                        }}
                      >
                        Twitter
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
Register.layout = "Blank";
export default Register;
