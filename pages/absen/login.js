import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../assets/images/backgrounds/hadir-logo.png";

import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import useLoginAbsen from "../../src/hooks/useLoginAbsen";
import BaseModal from "../../src/components/modal/baseModal/BaseModal";

const LoginAbsen = () => {
  const router = useRouter();
  const {
    loading,
    handleLogin,
    color,
    message,
    open,
    setOpen,
    showOsModal,
    closeOsModal,
  } = useLoginAbsen();
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
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
        <form onSubmit={(e) => handleLogin(e)}>
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
          <CustomFormLabel
            htmlFor="password"
            sx={{ color: "#1BA0E2", fontWeight: "700", mt: "3vh" }}
          >
            Password
          </CustomFormLabel>
          <CustomTextField
            id="password"
            type={passwordVisible ? "text" : "password"}
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Masukan password kamu disini"
            sx={{
              background: "#1ba0e20d",
              borderRadius: "6px",
              border: "1px solid #1ba0e20d",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    <FeatherIcon
                      color="black"
                      icon={passwordVisible ? "eye" : "eye-off"}
                      width="20"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            sx={{
              mt: "2vh",
              color: "#1BA0E299",
            }}
            onClick={() => {
              router.push("/absen/reset-password-request");
            }}
          >
            Lupa password ?
          </Button>
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
            {loading ? <CircularProgress size={25} /> : "Masuk"}
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
          <Typography>Belum punya akun ? buat</Typography>
          <Button
            sx={{ ml: "-10px" }}
            onClick={() => {
              router.push("/absen/register");
            }}
          >
            disini
          </Button>
          {/* <NextLink href="/absen/register">
            <Typography sx={{ textDecoration: "none", color: "#1BA0E2" }}>
              disini
            </Typography>
          </NextLink> */}
        </Box>
      </Box>
      <BaseModal
        open={showOsModal}
        title="Absen web hanya tersedia untuk perangkat IOS"
        message={
          "Bagi pengguna Android silahkan gunakan Aplikasi HADIR khusus pengguna Android"
        }
        sxTitle={{
          fontWeight: 700,
          fontSize:16,
          borderBottom:'1px solid #e2e2e2'
        }}
        actionButtonText="Close"
        closeModalHandler={closeOsModal}
      />
    </Box>
  );
};
LoginAbsen.layout = "Blank";
export default LoginAbsen;
