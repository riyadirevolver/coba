import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../assets/images/backgrounds/hadir-logo.png";
import ServiceAdapter from "../../lib/services";

import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import { AUTH_MANAGEMENT_CODE } from "../../utils/auth-absen";

const ResetPasswordRequest = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("success");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [template, setTemplate] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setOpen(false);
    try {
      const { target } = event;
      const { email } = target;
      console.log("first", email.value);
      const payload = {
        action: AUTH_MANAGEMENT_CODE.sendResetPassword,
        value: {
          email: email.value,
        },
      };
      await ServiceAdapter().post("/auth-management", payload);
      setColor("success");
      setMessage("Link reset password terkirim, silahkan cek inbox email");
      setOpen(true);
      setTemplate(true);
      event.target.reset();
      setLoading(false);
      setTimeout(() => {
        router.replace({
          pathname: "/absen/reset-password",
          query: {
            email: payload.value.email,
            message: "success",
          },
        });
      }, 5000);
    } catch (error) {
      setMessage(
        error.response.data.message ?? "Terjadi kesalahan pada server"
      );
      setColor("error");
      setOpen(true);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "90vh",
          width: "300px",
          display: "flex",
          m: "0 auto",
          alignItems: "center",
        }}
      >
        <Box width="100%">
          <Box sx={{ textAlign: "center", mb: "5vh" }}>
            <Image src={logo} alt="bg" width={"100px"} height={"140px"} />
          </Box>
          <Collapse in={open}>
            <Alert
              variant="filled"
              severity={color}
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
              sx={{ mb: 2 }}
            >
              <Typography color={"white"}>{message}</Typography>
            </Alert>
          </Collapse>

          {!template && (
            <>
              <form onSubmit={(e) => handleSubmit(e)}>
                <CustomFormLabel
                  htmlFor="email"
                  sx={{ color: "#1BA0E2", fontWeight: "700" }}
                >
                  Email
                </CustomFormLabel>
                <CustomTextField
                  id="email"
                  name="email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Masukan Email kamu disini"
                  sx={{
                    background: "#1ba0e20d",
                    borderRadius: "6px",
                    border: "1px solid #1ba0e20d",
                  }}
                />
                <Button
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  size="large"
                  type="submit"
                  fullWidth
                  sx={{
                    pt: "10px",
                    pb: "10px",
                    mt: "5vh",
                    background: "#1BA0E2",
                    fontWeight: "600",
                    borderRadius: "100px",
                  }}
                >
                  {loading ? <CircularProgress size={25} /> : "Submit"}
                </Button>
              </form>

              <Box
                mt="5vh"
                width="300px"
                display="flex"
                m="5vh auto 0"
                alignItems="center"
                justifyContent="center"
              >
                <Typography>Kembali ke halaman</Typography>
                <Button
                  sx={{ ml: "-10px" }}
                  onClick={() => {
                    router.push("/absen/login");
                  }}
                >
                  Login
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

ResetPasswordRequest.layout = "Blank";
export default ResetPasswordRequest;
