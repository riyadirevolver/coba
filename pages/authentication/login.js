import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React, { useState } from "react";

import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";

import banner from "../../assets/images/logos/juara_coding_logo.png";
import useLogin from "../../src/hooks/useLogin";

const Login = () => {
  const { loading, handleLogin, color, message, open, setOpen } = useLogin();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Grid container sx={{ height: "100vh", justifyContent: "space-around" }}>
      <Grid
        item
        lg={5.5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component={"div"}
          className="logo-hadir"
          sx={{
            position: "relative",
            padding: "100px",
          }}
        >
          <Image src={banner} alt="bg" />
        </Box>
      </Grid>
      <Grid
        item
        lg={6.5}
        display="flex"
        alignItems="center"
        sx={{
          background: "#00C298",
          width: "100%",
          boxShadow: "inset 15.4103px 0px 41.0942px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          width={"70%"}
          sx={{
            p: 0,
            color: "white",
            margin: "0 auto",
          }}
        >
          <Typography
            fontWeight="700"
            fontSize={"80px"}
            textAlign={"center"}
            mb={8}
          >
            Login
          </Typography>
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity={color || "info"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2, mt: 2, width: "100%" }}
            >
              <Typography color={"white"}>{message}</Typography>
            </Alert>
          </Collapse>
          <Box>
            <form onSubmit={(e) => handleLogin(e)}>
              <CustomFormLabel htmlFor="email" sx={{ fontSize: "20px" }}>
                Email
              </CustomFormLabel>
              <CustomTextField
                id="email"
                name="email"
                type="email"
                variant="outlined"
                sx={{
                  input: { color: "white" },
                  border: "2px solid white",
                  borderRadius: "4px",
                }}
                fullWidth
              />
              <CustomFormLabel
                name="password"
                htmlFor="password"
                sx={{ fontSize: "20px" }}
              >
                Password
              </CustomFormLabel>
              <CustomTextField
                id="password"
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                fullWidth
                sx={{
                  mb: 10,
                  input: { color: "white" },
                  border: "2px solid white",
                  borderRadius: "4px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        <FeatherIcon
                          color="white"
                          icon={passwordVisible ? "eye" : "eye-off"}
                          width="20"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                color="inherit"
                variant="contained"
                disabled={loading}
                size="large"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "white",
                  color: "#00C298",
                  pt: "15px",
                  pb: "15px",
                  fontWeight: "700",
                  fontSize: "24px",
                  borderRadius: "100px",
                }}
              >
                {loading ? <CircularProgress size={20} /> : "Masuk"}
              </Button>
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

Login.layout = "Blank";

export default Login;
