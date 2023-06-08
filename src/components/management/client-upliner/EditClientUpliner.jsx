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
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { uploadFile } from "../../../../lib/services/upload";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useEditUser from "../../../hooks/user-register/useEditUser";
import useFetchUnit from "../../../hooks/user-register/useFetchUnit";
import useUploadPhoto from "../../../hooks/user-register/useUploadPhoto";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import MenuTitle from "../../typography/MenuTitle";

const IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const EditClientUpliner = ({ user, session }) => {
  const router = useRouter();
  const { unitList, openUnit, setOpenUnit, loadingUnit } = useFetchUnit(
    session.token,
    session.company_id
  );

  const { handleDeletePoster, onSelectFile, preview, banner } = useUploadPhoto(
    `${IMAGE_URL}/${user.photo}`
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

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const { doSubmit, loading } = useEditUser(user.id);

  const [payload, setPayload] = useState({
    photo: user.photo,
    fullname: user.fullname,
    email: user.email,
    job_departement_id: user.job_departement_id,
  });

  const editUser = async (event) => {
    event.preventDefault();

    if (!preview) {
      openSnackBar("Foto tidak boleh kosong");
      return;
    }

    if (banner) {
      try {
        const upload = await uploadFile(banner);
        payload.photo = upload.id;
      } catch (error) {
        openSnackBar("Terjadi kesalahan pada server: 801");
        return;
      }
    }

    await doSubmit({
      data: payload,
      onSuccess: () => {
        openSnackBar("Berhasil ubah client upliner");
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
        <Grid lg={6} item sx={{ p: "15px" }}>
          <MenuTitle title="Edit Client Upliner" />
        </Grid>
      </Grid>
      <Card sx={{ p: 0 }}>
        <form onSubmit={editUser}>
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
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Upload Foto Karyawan
                </CustomFormLabel>
                <Grid container item lg={3}>
                  <Grid item display="flex">
                    <Button variant="contained" component="label">
                      Upload
                      <input
                        type="file"
                        hidden
                        name="logo"
                        accept="image/*"
                        onChange={onSelectFile}
                        onClick={(event) => {
                          event.target.value = null;
                        }}
                      />
                    </Button>
                  </Grid>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Grid
                    item
                    display="flex"
                    alignItems="center"
                    justifyContent={"left"}
                    textAlign="left"
                  >
                    <Typography>* File harus dibawah 2 MB</Typography>
                  </Grid>
                </Grid>
                {preview && (
                  <Grid container sx={{ mt: 2 }}>
                    <Grid item>
                      <Image
                        src={preview}
                        alt="company_logo"
                        width={200}
                        height={200}
                      />
                    </Grid>
                    <Grid item>
                      <Tooltip title="Hapus">
                        <IconButton onClick={handleDeletePoster}>
                          <FeatherIcon icon="x" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                )}
              </Grid>
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
                <CustomFormLabel htmlFor="input-placement">
                  Unit
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  defaultValue={user.job_departement?.name}
                  options={unitList}
                  getOptionLabel={optionLabel}
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
            </Grid>
          </CardContent>

          <Divider />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              {preview ? (
                <Button
                  color="primary"
                  variant="contained"
                  disabled={loading}
                  type="submit"
                  fullWidth
                  sx={{ fontWeight: 700, fontSize: "20px" }}
                >
                  {loading ? <CircularProgress color="success" /> : "Ubah"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled
                  sx={{
                    backgroundColor: "rgb(144, 202, 249) !important",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ fontWeight: 700, fontSize: "20px" }}
                  >
                    Upload foto dahulu
                  </Typography>
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default EditClientUpliner;
