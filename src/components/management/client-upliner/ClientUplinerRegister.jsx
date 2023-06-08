import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useFetchUnit from "../../../hooks/user-register/useFetchUnit";
import useRegister from "../../../hooks/user-register/useRegister";
import useUploadPhoto from "../../../hooks/user-register/useUploadPhoto";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import MenuTitle from "../../typography/MenuTitle";

const ClientUplinerRegister = ({ session }) => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { unitList, openUnit, setOpenUnit, loadingUnit } = useFetchUnit(
    session.token,
    session.company_id
  );

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </>
  );

  const { doSubmit, loading } = useRegister();

  const [payload, setPayload] = useState({
    fullname: null,
    email: null,
    password: null,
    nik: "0",
    role_id: "client",
    job_position_id: null,
    job_level_id: null,
    upliner_id: null,
    employee_type_id: null,
    job_departement_id: null,
    leave_amount: 0,
    shifting_id: null,
    shift_type: "NON_SHIFT",
    location_point_id: null,
    isVerified: true,
    job_level: null,
    schedule_id: null,
    required_selfie: null,
  });

  const register = async (event) => {
    event.preventDefault();

    await doSubmit({
      data: payload,
      onSuccess: () => {
        openSnackBar("Berhasil mendaftarkan client upliner");
        router.replace("/management/client-upliner");
      },
      onError: (msg) => {
        openSnackBar(msg);
      },
    });
  };

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Grid container>
        <Grid item lg={6} sx={{ p: "15px" }}>
          <MenuTitle title="Registrasi Client Upliner" />
        </Grid>
      </Grid>
      <Card sx={{ p: 0 }}>
        <form onSubmit={register}>
          <Box
            display="flex"
            alignItems="center"
            p={2}
            sx={{
              backgroundColor: "primary.light",
              color: "primary.main",
            }}
          >
            <FeatherIcon icon="alert-circle" width="18" />
            <Box sx={{ ml: 1 }}>Account Information</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-title">
                  Nama Karyawan
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="fullname"
                  name="fullname"
                  variant="outlined"
                  placeholder="Nama Karyawan"
                  inputProps={{
                    minLength: 2,
                  }}
                  fullWidth
                  size="small"
                  value={payload.fullname || ""}
                  onChange={(e) =>
                    setPayload((prevState) => ({
                      ...prevState,
                      fullname: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-code">Email</CustomFormLabel>
                <CustomTextField
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  inputProps={{
                    autoComplete: "email",
                    maxLength: 120,
                  }}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={payload.email || ""}
                  onChange={(e) =>
                    setPayload((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-job_category">
                  Password
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="password"
                  name="password"
                  autoComplete="off"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  inputProps={{
                    autoComplete: "new-password",
                    minLength: 8,
                    maxLength: 100,
                  }}
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={payload.password || ""}
                  onChange={(e) =>
                    setPayload((prevState) => ({
                      ...prevState,
                      password: e.target.value,
                    }))
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          <FeatherIcon
                            color="black"
                            icon={passwordVisible ? "eye-off" : "eye"}
                            width="20"
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Unit
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={unitList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingUnit}
                  open={openUnit}
                  onOpen={() => {
                    setOpenUnit(true);
                  }}
                  onClose={() => {
                    setOpenUnit(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      job_departement_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Unit"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingUnit ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </React.Fragment>
                        ),
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-title">
                  Tipe Upliner
                </CustomFormLabel>

                <CustomSelect
                  required
                  id="role_id"
                  name="role_id"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Pilih Tipe Upliner"
                  defaultValue="client"
                  onChange={(e) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      role_id: e.target.value,
                    }));
                  }}
                >
                  {[
                    {
                      key: "client",
                      value: "Upliner V2",
                    },
                    {
                      key: "client3",
                      value: "Upliner V3",
                    },
                  ].map((option, index) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                color="primary"
                variant="contained"
                disabled={loading}
                type="submit"
                fullWidth
                sx={{ fontWeight: 700, fontSize: "20px" }}
              >
                {loading ? <CircularProgress color="success" /> : "Daftar"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default ClientUplinerRegister;
