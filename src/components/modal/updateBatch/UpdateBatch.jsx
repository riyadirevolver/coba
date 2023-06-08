import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  CardContent,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ConvertBase64 } from "../../../../utils/convertBase64";
import { ADD_BATCH } from "../../../constants/tables/@types";
import useEditUserBatch from "../../../hooks/user-register/useEditUserBatch";
import useEmployeeType from "../../../hooks/user-register/useEmployeeType";
import useFetchDivision from "../../../hooks/user-register/useFetchDivision";
import useFetchJobLevel from "../../../hooks/user-register/useFetchJobLevel";
import useFetchLocationPoint from "../../../hooks/user-register/useFetchJobLocation";
import useFetchPosition from "../../../hooks/user-register/useFetchJobPosition";
import useFetchSchedule from "../../../hooks/user-register/useFetchSchedule";
import useFetchUpliner from "../../../hooks/user-register/useFetchUpliner";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useUserSession } from "../../../hooks/useUserSession";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import CloseIcon from "@mui/icons-material/Close";

const upTransition = Transition("up");

const UpdateBatch = ({
  open = false,
  closeModalHandler,
  type,
  data,
  session: newSession,
  result,
}) => {
  const session = new ConvertBase64(newSession).decode();
  const { data: dataSession, error } = useUserSession();
  const companyId = dataSession?.data?.companyId;

  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const { divisionList, openDivision, setOpenDivision, loadingDivision } =
    useFetchDivision(session, companyId);

  const { positionList, openPosition, setOpenPosition, loadingPosition } =
    useFetchPosition(session, companyId);

  const { jobLevelList, openJobLevel, setOpenJobLevel, loadingJobLevel } =
    useFetchJobLevel(session, companyId);

  const {
    loadingLocationPoint,
    locationPointList,
    openLocationPoint,
    setOpenLocationPoint,
  } = useFetchLocationPoint(session, companyId);

  const {
    employeeTypeList,
    loadingEmployeeType,
    openEmployeeType,
    setOpenEmployeeType,
  } = useEmployeeType(session, companyId);

  const {
    loadingUpliner,
    openUpliner,
    setOpenUpliner,
    setTempQuery,
    uplinerList,
    setJobLevel,
  } = useFetchUpliner(session, companyId);

  const { loadingSchedule, openSchedule, scheduleList, setOpenSchedule } =
    useFetchSchedule(session, companyId);

  const { doSubmitBatch, loading } = useEditUserBatch(
    data.map((user) => user.id)
  );

  const [payload, setPayload] = useState({
    job_position_id: null,
    job_level_id: null,
    upliner_id: null,
    employee_type_id: null,
    job_departement_id: null,
    leave_amount: 0,
    shift_type: "NON_SHIFT",
    location_point_id: null,
    isVerified: true,
    schedule_id: null,
    required_selfie: false,
  });

  const createBatch = async (e) => {
    e.preventDefault();
    const newPayload = [];
    data.forEach((item) => {
      const newItem = { ...item, ...payload };
      newPayload.push(newItem);
    });

    await doSubmitBatch({
      data: newPayload,
      onSuccess: () => {
        closeModalHandler();
        result("Berhasil edit user");
      },
      onError: (msg) => {
        result("Gagal edit user");
      },
    });
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
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

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Box>
        <Dialog
          maxWidth={"lg"}
          open={open && type === ADD_BATCH}
          // TransitionComponent={upTransition}
          onClose={closeModalHandler}
          fullWidth
        >
          <DialogTitle
            id="alert-dialog-slide-title"
            component={Box}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Ubah data user dichecklist</Typography>
            <IconButton onClick={closeModalHandler}>
              <CloseIcon color="danger" fontSize="large" />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <form onSubmit={createBatch}>
              <Box
                display="flex"
                alignItems="center"
                p={2}
                sx={{
                  backgroundColor: "primary.light",
                  color: "primary.main",
                }}
              >
                <FeatherIcon icon="alert-circle" />
                <Box sx={{ ml: 1 }}>Informasi Kerja</Box>
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
                      // defaultValue={user.job_departement?.name}
                      options={divisionList}
                      getOptionLabel={optionLabel}
                      loading={loadingDivision}
                      open={openDivision}
                      renderOption={(props, option) => {
                        return (
                          <li {...props} key={option.id}>
                            {option.name}
                          </li>
                        );
                      }}
                      onOpen={() => {
                        setOpenDivision(true);
                      }}
                      onClose={() => {
                        setOpenDivision(false);
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
                      Posisi Kerja
                    </CustomFormLabel>
                    <Autocomplete
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      options={positionList}
                      // defaultValue={user.job_position?.name}
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
                      // defaultValue={user.job_level?.name}
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
                      Atasan
                    </CustomFormLabel>
                    <Autocomplete
                      selectOnFocus
                      clearOnBlur
                      disabled={!payload.job_level_id ?? true}
                      handleHomeEndKeys
                      filterOptions={(x) => x}
                      id="free-solo-with-text-demo"
                      // defaultValue={user.upliner?.fullname}
                      options={uplinerList}
                      loading={loadingUpliner}
                      onInputChange={(e, newInputValue) => {
                        setTempQuery(newInputValue);
                      }}
                      getOptionLabel={optionLabelUpliner}
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
                      // defaultValue={user.employee_type?.name}
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
                      // defaultValue={user.location_point?.name}
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
                      // defaultValue={user.user_schedule?.schedule?.name}
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

                  <Grid item lg={4} md={12} sm={12} xs={12}>
                    <CustomFormLabel htmlFor="input-title">
                      Selfie
                    </CustomFormLabel>

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
                      value={payload.leave_amount || 0}
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
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default UpdateBatch;
