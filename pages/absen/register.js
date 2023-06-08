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
import ServiceAdapter from "../../lib/services";
import { uploadFile } from "../../lib/services/upload";
import CustomFormLabel from "../../src/components/forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../src/components/forms/custom-elements/CustomTextField";
import useUploadPhoto from "../../src/hooks/useUploadPhoto";
const RegisterAbsen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { handleDeletePoster, onSelectFile, preview, gambar, pesan } =
    useUploadPhoto();

  const handleRegister = async (event) => {
    event.preventDefault();
    setLoading(true);
    setOpen(false);
    if (!gambar) {
      setMessage(pesan);
      setColor("error");
      setOpen(true);
      setLoading(false);
      return;
    }
    try {
      const upload = await uploadFile(gambar);
      const dataImage = upload.id;
      const { target } = event;
      const { nik, fullname, email, password } = target;
      const payload = {
        nik: nik.value,
        fullname: fullname.value,
        email: email.value,
        password: password.value,
        company_code: "DIKA",
        is_mobile: true,
        photo: dataImage,
      };
      await ServiceAdapter().post("/users", payload);
      setColor("success");
      setMessage("berhasil register, silahkan menunggu di approve oleh admin");
      setOpen(true);
      event.target.reset();
      setLoading(false);
    } catch (error) {
      setMessage(
        error.response.data.message ?? "terjadi kesalahan pada server"
      );
      setColor("error");
      setOpen(true);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };
  return (
    <Box
      sx={{
        width: "300px",
        display: "flex",
        m: "0 auto",
        p: "20px 0",
      }}
    >
      <Box width="100%">
        <Box sx={{ textAlign: "center", mb: "3vh" }}>
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
        <form onSubmit={(e) => handleRegister(e)}>
          <CustomFormLabel
            htmlFor="nik"
            sx={{ color: "#1BA0E2", fontWeight: "700" }}
          >
            NIK
          </CustomFormLabel>
          <CustomTextField
            required
            id="nik"
            name="nik"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Masukan NIK kamu disini"
            sx={{
              background: "#1ba0e20d",
              borderRadius: "6px",
              border: "1px solid #1ba0e20d",
            }}
          />
          <CustomFormLabel
            htmlFor="fullname"
            sx={{ color: "#1BA0E2", fontWeight: "700" }}
          >
            Nama Lengkap
          </CustomFormLabel>
          <CustomTextField
            required
            id="fullname"
            name="fullname"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Masukan nama lengkap kamu disini"
            sx={{
              background: "#1ba0e20d",
              borderRadius: "6px",
              border: "1px solid #1ba0e20d",
            }}
          />
          <CustomFormLabel
            htmlFor="email"
            sx={{ color: "#1BA0E2", fontWeight: "700" }}
          >
            Email
          </CustomFormLabel>
          <CustomTextField
            required
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
            required
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
          <CustomFormLabel
            htmlFor="image"
            sx={{ color: "#1BA0E2", fontWeight: "700", mt: "3vh" }}
          >
            Upload Selfie
          </CustomFormLabel>
          <CustomTextField
            required
            type="file"
            name="image"
            accept="image/*"
            onChange={onSelectFile}
            fullWidth
            size="small"
            variant="outlined"
            sx={{
              background: "#1ba0e20d",
              borderRadius: "6px",
              border: "1px solid #1ba0e20d",
            }}
          />
          <Typography color="red" fontSize="small">
            {!gambar ? pesan : ""}
          </Typography>

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
            {loading ? <CircularProgress size={25} /> : "Daftar"}
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
          <Typography>Sudah punya akun ? masuk</Typography>
          <Button
            sx={{ ml: "-10px" }}
            onClick={() => {
              router.push("/absen/login");
            }}
          >
            disini
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
RegisterAbsen.layout = "Blank";
export default RegisterAbsen;
