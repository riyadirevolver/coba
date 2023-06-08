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
  MenuItem,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import APP_CONFIG from "../../../../app.config";
import { uploadFile } from "../../../../lib/services/upload";
import useEditUser from "../../../hooks/user-register/useEditUser";
import useEmployeeType from "../../../hooks/user-register/useEmployeeType";
import useFetchDivision from "../../../hooks/user-register/useFetchDivision";
import useFetchJobLevel from "../../../hooks/user-register/useFetchJobLevel";
import useFetchLocationPoint from "../../../hooks/user-register/useFetchJobLocation";
import useFetchPosition from "../../../hooks/user-register/useFetchJobPosition";
import useFetchSchedule from "../../../hooks/user-register/useFetchSchedule";
import useFetchUpliner from "../../../hooks/user-register/useFetchUpliner";
import useFetchUplinerClient from "../../../hooks/user-register/useFetchUplinerClient";
import useUploadPhoto from "../../../hooks/user-register/useUploadPhoto";
import { useSnackbar } from "../../../hooks/useSnackbar";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import MenuTitle from "../../typography/MenuTitle";
import useFetchUplinerClient3 from "../../../hooks/user-register/useFetchUplinerClient3";
import useFetchUnit from "../../../hooks/user-register/useFetchUnit";

const IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const EditUserRegister = ({ user, session }) => {
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

  const { handleDeletePoster, onSelectFile, preview, banner } = useUploadPhoto(
    `${IMAGE_URL}/${user.photo}`
  );

  const {
    loadingUpliner,
    openUpliner,
    setOpenUpliner,
    setTempQuery,
    uplinerList,
    setJobLevel,
  } = useFetchUpliner(session.token, session.companyId, user.job_level?.level);

  const {
    loadingUplinerClient,
    openUplinerClient,
    setOpenUplinerClient,
    setTempQueryClient,
    uplinerClientList,
    setJobLevelClient,
  } = useFetchUplinerClient(session.token, session.companyId);

  const {
    loadingUplinerClient3,
    openUplinerClient3,
    setOpenUplinerClient3,
    setTempQueryClient3,
    uplinerClientList3,
  } = useFetchUplinerClient3(session.token, session.companyId);

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

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const optionLabelUpliner = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.fullname;
  };

  const { doSubmit, loading } = useEditUser(user.id);

  const [payload, setPayload] = useState({
    photo: user.photo,
    fullname: user.fullname,
    email: user.email,
    nik: user.nik,
    job_position_id: user.job_position_id,
    job_level_id: user.job_level_id,
    upliner_id: user.upliner_id,
    upliner2_id: user.upliner2_id,
    upliner3_id: user.upliner3_id,
    employee_type_id: user.employee_type_id,
    division_id: user.division_id,
    job_departement_id: user.job_departement_id,
    leave_amount: user.leave_amount ?? 0,
    shift_type: user.shift_type ?? "NON_SHIFT",
    location_point_id: user.location_point_id,
    isVerified: true,
    schedule_id: user.user_schedule?.schedule_id,
    required_selfie: user.required_selfie,
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
        openSnackBar("Berhasil edit user");
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
        <Grid lg={6} item sx={{ p: "15px" }}>
          <MenuTitle title="Edit User" />
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
                  defaultValue={user.division?.name}
                  options={divisionList}
                  getOptionLabel={optionLabel}
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
              {/* division name */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Divisi (HRIS)
                </CustomFormLabel>
                <CustomTextField
                  disabled
                  defaultValue={user?.division_name ?? "-"}
                  fullWidth
                  size="small"
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
                  defaultValue={user.employee_type?.name}
                  getOptionLabel={optionLabel}
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

              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Posisi Kerja
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={positionList}
                  defaultValue={user.job_position?.name}
                  getOptionLabel={optionLabel}
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

              {/* position name */}
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-placement">
                  Posisi Kerja (HRIS)
                </CustomFormLabel>
                <CustomTextField
                  disabled
                  defaultValue={user?.unit_name ?? "-"}
                  fullWidth
                  size="small"
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
                  defaultValue={user.job_level?.name}
                  getOptionLabel={optionLabel}
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
                  Jabatan (HRIS)
                </CustomFormLabel>
                <CustomTextField
                  disabled
                  defaultValue={user?.position_name ?? "-"}
                  fullWidth
                  size="small"
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
                  defaultValue={user?.upliner_data?.fullname}
                  options={uplinerList}
                  loading={loadingUpliner}
                  onInputChange={(e, newInputValue) =>
                    setTempQuery(newInputValue)
                  }
                  getOptionLabel={optionLabelUpliner}
                  renderOption={(props, option) => (
                    <li {...props}>{`${option.nik ?? ""} - ${
                      option.fullname
                    }`}</li>
                  )}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner_id: newInputValue?.id ?? null,
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
                  //disabled={!payload.job_level_id ?? true}
                  handleHomeEndKeys
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  defaultValue={user?.upliner2_data?.fullname}
                  options={uplinerClientList}
                  loading={loadingUplinerClient}
                  open={openUplinerClient}
                  onOpen={() => {
                    setOpenUplinerClient(true);
                  }}
                  onClose={() => {
                    setOpenUplinerClient(false);
                  }}
                  onInputChange={(e, newInputValue) =>
                    setTempQueryClient(newInputValue)
                  }
                  getOptionLabel={optionLabelUpliner}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                    >{`${option.fullname} - ${option.job_departement.name}`}</li>
                  )}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner2_id: newInputValue?.id ?? null,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      size="small"
                      placeholder="Pilih Atasan Client (Optional)"
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
                  //disabled={!payload.job_level_id ?? true}
                  handleHomeEndKeys
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  defaultValue={user?.upliner3_data?.fullname}
                  options={uplinerClientList3}
                  loading={loadingUplinerClient3}
                  open={openUplinerClient3}
                  onOpen={() => {
                    setOpenUplinerClient3(true);
                  }}
                  onClose={() => {
                    setOpenUplinerClient3(false);
                  }}
                  onInputChange={(e, newInputValue) =>
                    setTempQueryClient3(newInputValue)
                  }
                  getOptionLabel={optionLabelUpliner}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                    >{`${option.fullname} - ${option.job_departement.name}`}</li>
                  )}
                  onChange={(e, newInputValue) => {
                    setPayload((prevState) => ({
                      ...prevState,
                      upliner3_id: newInputValue?.id ?? null,
                    }));
                  }}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      size="small"
                      placeholder="Pilih Atasan Client V3 (Optional)"
                    />
                  )}
                />
              </Grid>
              {/* end upliner client */}
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
                  defaultValue={user.location_point?.name}
                  options={locationPointList}
                  getOptionLabel={optionLabel}
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
                  value={payload.shift_type || ""}
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
                    <MenuItem key={option.key} value={option.key || ""}>
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
                  defaultValue={user.user_schedule?.schedule?.name}
                  options={scheduleList}
                  getOptionLabel={optionLabel}
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
                  value={payload.required_selfie}
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
                  defaultValue={payload.leave_amount || 0}
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

export default EditUserRegister;
