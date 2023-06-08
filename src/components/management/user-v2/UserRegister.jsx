import { LoadingButton } from "@mui/lab";
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
  Tooltip,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { uploadFile } from "../../../../lib/services/upload";
import useEmployeeType from "../../../hooks/user-register/useEmployeeType";
import useFetchDivision from "../../../hooks/user-register/useFetchDivision";
import useFetchJobLevel from "../../../hooks/user-register/useFetchJobLevel";
import useFetchLocationPoint from "../../../hooks/user-register/useFetchJobLocation";
import useFetchPosition from "../../../hooks/user-register/useFetchJobPosition";
import useFetchSchedule from "../../../hooks/user-register/useFetchSchedule";
import useFetchUpliner from "../../../hooks/user-register/useFetchUpliner";
import useFetchUplinerClient from "../../../hooks/user-register/useFetchUplinerClient";
import useRegister from "../../../hooks/user-register/useRegister";
import useUploadPhoto from "../../../hooks/user-register/useUploadPhoto";
import { useSnackbar } from "../../../hooks/useSnackbar";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import MenuTitle from "../../typography/MenuTitle";
import useFetchUplinerClient3 from "../../../hooks/user-register/useFetchUplinerClient3";
import useFetchUnit from "../../../hooks/user-register/useFetchUnit";

const UserRegister = ({ session }) => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { divisionList, openDivision, setOpenDivision, loadingDivision } =
    useFetchDivision(session.token, session.company_id);

  const { unitList, openUnit, setOpenUnit, loadingUnit } = useFetchUnit(
    session.token,
    session.company_id
  );

  const { positionList, openPosition, setOpenPosition, loadingPosition } =
    useFetchPosition(session.token, session.company_id);

  const { jobLevelList, openJobLevel, setOpenJobLevel, loadingJobLevel } =
    useFetchJobLevel(session.token, session.companyId);

  const {
    employeeTypeList,
    loadingEmployeeType,
    openEmployeeType,
    setOpenEmployeeType,
  } = useEmployeeType(session.token, session.companyId);

  const {
    loadingLocationPoint,
    locationPointList,
    openLocationPoint,
    setOpenLocationPoint,
  } = useFetchLocationPoint(session.token, session.companyId);

  const { handleDeletePoster, onSelectFile, preview, banner } =
    useUploadPhoto();

  const {
    loadingUpliner,
    openUpliner,
    setOpenUpliner,
    setTempQuery,
    uplinerList,
    setJobLevel,
  } = useFetchUpliner(session.token, session.companyId);

  const {
    loadingUplinerClient3,
    openUplinerClient3,
    setOpenUplinerClient3,
    setTempQueryClient3,
    uplinerClientList3,
  } = useFetchUplinerClient3(session.token, session.companyId);

  const {
    loadingUplinerClient,
    openUplinerClient,
    setOpenUplinerClient,
    setTempQueryClient,
    uplinerClientList,
  } = useFetchUplinerClient(session.token, session.companyId);

  const { loadingSchedule, openSchedule, scheduleList, setOpenSchedule } =
    useFetchSchedule(session.token, session.companyId);

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
    nik: null,
    job_position_id: null,
    job_level_id: null,
    upliner_id: null,
    upliner2_id: null,
    employee_type_id: null,
    division_id: null,
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

    if (!banner) {
      openSnackBar("Foto tidak boleh kosong");
      return;
    }

    try {
      const upload = await uploadFile(banner);
      payload.photo = upload.id;
    } catch (error) {
      openSnackBar("Terjadi kesalahan pada server: 801");
    }

    await doSubmit({
      data: payload,
      onSuccess: () => {
        openSnackBar("Berhasil mendaftarkan user");
        router.replace("/management/user");
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
          <MenuTitle title="Registrasi User" />
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
                        onChange={onSelectFile || ""}
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
                <CustomFormLabel htmlFor="input-title">NIK</CustomFormLabel>
                <CustomTextField
                  required
                  id="nik"
                  name="nik"
                  variant="outlined"
                  placeholder="NIK"
                  inputProps={{
                    minLength: 2,
                  }}
                  fullWidth
                  size="small"
                  value={payload.nik || ""}
                  onChange={(e) =>
                    setPayload((prevState) => ({
                      ...prevState,
                      nik: e.target.value,
                    }))
                  }
                />
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
            </Grid>
          </CardContent>
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
            <Box sx={{ ml: 1 }}>Work Information</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Divisi
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={divisionList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingDivision}
                  open={openDivision}
                  onOpen={() => {
                    setOpenDivision(true);
                  }}
                  onClose={() => {
                    setOpenDivision(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      division_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Divisi"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingDivision ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Posisi Kerja
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={positionList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingPosition}
                  open={openPosition}
                  onOpen={() => {
                    setOpenPosition(true);
                  }}
                  onClose={() => {
                    setOpenPosition(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      job_position_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Posisi Kerja"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingPosition ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Jabatan
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={jobLevelList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingJobLevel}
                  open={openJobLevel}
                  onOpen={() => {
                    setOpenJobLevel(true);
                  }}
                  onClose={() => {
                    setOpenJobLevel(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setJobLevel(newInputValue?.level);
                    setPayload((prevState) => ({
                      ...prevState,
                      job_level_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Jabatan"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingJobLevel ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Atasan
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  disabled={!payload.job_level_id ?? true}
                  handleHomeEndKeys
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  options={uplinerList}
                  loading={loadingUpliner}
                  onInputChange={(e, newInputValue) =>
                    setTempQuery(newInputValue)
                  }
                  getOptionLabel={(option) => option.fullname}
                  renderOption={(props, option) => (
                    <li {...props}>{`${option.nik ?? ""} - ${
                      option.fullname
                    }`}</li>
                  )}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      size="small"
                      placeholder={
                        payload.job_level_id
                          ? "Cari Atasan (optional)"
                          : "Pilih Jabatan Dulu"
                      }
                    />
                  )}
                />
              </Grid>

              {/* upliner client */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Atasan Client V2
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  onInputChange={(e, newInputValue) =>
                    setTempQueryClient(newInputValue)
                  }
                  getOptionLabel={(option) => option.fullname}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                    >{`${option.fullname} - ${option.job_departement.name}`}</li>
                  )}
                  options={uplinerClientList}
                  loading={loadingUplinerClient}
                  open={openUplinerClient}
                  onOpen={() => {
                    setOpenUplinerClient(true);
                  }}
                  onClose={() => {
                    setOpenUplinerClient(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner2_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      // required
                      size="small"
                      placeholder="Pilih Atasan Client V2 (Optional)"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingUplinerClient ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Atasan Client V3
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  onInputChange={(e, newInputValue) =>
                    setTempQueryClient3(newInputValue)
                  }
                  getOptionLabel={(option) => option.fullname}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                    >{`${option.fullname} - ${option.job_departement.name}`}</li>
                  )}
                  options={uplinerClientList3}
                  loading={loadingUplinerClient3}
                  open={openUplinerClient3}
                  onOpen={() => {
                    setOpenUplinerClient3(true);
                  }}
                  onClose={() => {
                    setOpenUplinerClient3(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner3_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      // required
                      size="small"
                      placeholder="Pilih Atasan Client V3 (Optional)"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingUplinerClient3 ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Tipe Kontrak
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={employeeTypeList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingEmployeeType}
                  open={openEmployeeType}
                  onOpen={() => {
                    setOpenEmployeeType(true);
                  }}
                  onClose={() => {
                    setOpenEmployeeType(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      employee_type_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Tipe Kontrak"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingEmployeeType ? (
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
            <Box sx={{ ml: 1 }}>Pengaturan Absensi</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={3}>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Lokasi Kerja
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={locationPointList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingLocationPoint}
                  open={openLocationPoint}
                  onOpen={() => {
                    setOpenLocationPoint(true);
                  }}
                  onClose={() => {
                    setOpenLocationPoint(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      location_point_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      size="small"
                      placeholder="Pilih Lokasi Kerja"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingLocationPoint ? (
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
                <CustomFormLabel htmlFor="input-placement">
                  Tipe Shift
                </CustomFormLabel>
                <CustomSelect
                  required
                  id="shift_type"
                  name="shift_type"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Pilih Tipe Shift"
                  defaultValue="NON_SHIFT"
                  onChange={(e) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      shift_type: e.target.value,
                    }));
                  }}
                >
                  {[
                    {
                      key: "SHIFT",
                      value: "Shift",
                    },
                    {
                      key: "NON_SHIFT",
                      value: "Non Shift",
                    },
                  ].map((option, index) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Jadwal Kerja
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={scheduleList}
                  getOptionLabel={(option) => option.name}
                  loading={loadingSchedule}
                  open={openSchedule}
                  onOpen={() => {
                    setOpenSchedule(true);
                  }}
                  onClose={() => {
                    setOpenSchedule(false);
                  }}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      schedule_id: newInputValue?.id,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      required
                      size="small"
                      placeholder="Pilih Jadwal Kerja"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingSchedule ? (
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

              {/* selfie */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-title">Selfie</CustomFormLabel>

                <CustomSelect
                  required
                  id="required_selfie"
                  name="required_selfie"
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Pilih Tipe Selfie"
                  onChange={(e) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      required_selfie: e.target.value,
                    }));
                  }}
                >
                  {[
                    {
                      key: true,
                      value: "Selfie",
                    },
                    {
                      key: false,
                      value: "No Selfie",
                    },
                  ].map((option, index) => (
                    <MenuItem key={option.key} value={option.key}>
                      {option.value}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-title">
                  Jumlah Cuti
                </CustomFormLabel>
                <CustomTextField
                  id="title"
                  name="title"
                  defaultValue={0}
                  type="number"
                  variant="outlined"
                  placeholder="Jumlah Cuti"
                  inputProps={{
                    maxLength: 2,
                    min: 0,
                  }}
                  fullWidth
                  size="small"
                  onChange={(e) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      leave_amount: e.target.value,
                    }));
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>

          <Divider />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <LoadingButton
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
                loading={loading}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default UserRegister;
