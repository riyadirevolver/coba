/* eslint-disable @next/next/no-img-element */

import {
  Autocomplete,
  Box,
  Button,
  FilledInput,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardCard from "../baseCard/DashboardCard";
import { useState } from "react";
import { uploadFile } from "../../../lib/services/upload";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import APP_CONFIG from "../../../app.config";
import { useRouter } from "next/dist/client/router";
import shiftType from "../../constants/shiftType";
// import { yupResolver } from "@hookform/resolvers/yup"; update soon
const { baseUrl } = APP_CONFIG;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const shiftTypes = [
  {
    id: shiftType.SHIFT,
    name: "shift",
  },
  {
    id: shiftType.NON_SHIFT,
    name: "non shift",
  },
];

const EditUserRegistration = ({ data, companyId }) => {
  const [dataUser, nikUser] = React.useState(data ?? []);

  const [loading, setLoading] = useState(false);
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const [departemens, setDepartmens] = useState(null);
  const [departemensId, setDepartmentsId] = useState(null);
  const [uplinerId, setUplinerId] = useState(null);

  const [jobPositionId, setJobPositionId] = useState(null);
  const [locationPoint, setLocationPoint] = useState(null);
  const [employeeType, setEmployeeType] = useState(null);

  const [shifting, setShifting] = useState(null);
  const [shiftType, setShiftType] = useState(null);

  const [jobLevel, setJobLevel] = useState(data?.job_level?.level);
  const [jobLevelId, setJobLevelId] = useState(null);

  const [overTime, setOverTime] = useState(false);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const refForm = useRef();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onHandleImage = async (e) => {
    const url = e.target.files[0];
    const object = URL.createObjectURL(url);
    const uploadResponse = await uploadFile(url);
    const { id } = uploadResponse;
    setImagePreview(object);
    setImage(id);
  };

  // job level
  const [dataJobLevel, setDataLevel] = useState([]);
  const handleClickJobLevel = async () => {
    if (dataJobLevel.length === 0) {
      const res = await axios.get("/api/joblevels");
      const { data } = await res.data;
      setDataLevel(data);
    }
  };

  const [dataUpliner, setDataUpliner] = useState([]);
  const handleClickUpliner = async () => {
    if (jobLevel) {
      const res = await axios.get("/api/upliner", {
        params: {
          level_id: jobLevel ? jobLevel : data?.job_level?.level,
        },
      });
      const { data } = await res.data;
      setDataUpliner(data);
    }
  };

  // shifiting
  const [dataShifting, setDataShifting] = useState([]);
  const handleClickShifting = async () => {
    if (dataShifting.length === 0) {
      const res = await axios.get("/api/shifting");
      const { data } = await res.data;
      setDataShifting(data);
    }
  };

  // employee
  const [dataEmployeeType, setDataEmployeeType] = useState([]);
  const handleCLickEmployeeType = async () => {
    if (dataEmployeeType.length === 0) {
      const res = await axios.get("/api/employee-type");
      const { data } = await res.data;
      setDataEmployeeType(data);
    }
  };

  // departement
  const [dataDepartments, setDataDepartments] = useState([]);
  const handleCLickDepartments = async () => {
    if (dataDepartments.length === 0) {
      const res = await axios.get("/api/departements");
      const { data } = await res.data;
      setDataDepartments(data);
    }
  };

  // job position
  const [dataJobPosition, setDataPosition] = useState([]);
  const handleCLickJobPosition = async () => {
    if (dataJobPosition.length === 0) {
      const res = await axios.get("/api/jobs/job-position");
      const { data } = await res.data;
      setDataPosition(data);
    }
  };

  // location point
  const [dataLocationPoint, setDataLocationPoint] = useState([]);
  const handleCLickLocationPoint = async () => {
    if (dataLocationPoint.length === 0) {
      const res = await axios.get("/api/locations");
      const { data } = await res.data;
      setDataLocationPoint(data);
    }
  };

  const create = async (item) => {
    try {
      const payload = {
        fullname: dataUser.value ?? item?.fullname,
        email: data.email ?? item?.email,
        password: item?.password,
        nik: nikUser.value ?? item?.nik,
        job_position_id: jobPositionId ?? data?.job_position_id,
        job_level_id: jobLevelId ?? data?.job_level_id,
        upliner_id: uplinerId ?? data?.upliner_id,
        employee_type_id: employeeType ?? data?.employee_type_id,
        job_departement_id: departemensId ?? data?.job_departement_id,
        photo: data.photo,
        company_id: companyId ?? data?.company_id,
        leave_amount: Number(item?.dayOff) ?? data?.leave_amount,
        shifting_id: shifting ?? data?.shifting_id,
        shift_type: shiftType ?? data?.shiftType,
        location_point_id: locationPoint ?? data?.location_point_id,
        isVerified: true,
        is_overtime: overTime ?? data?.is_overtime,
      };
      if (data) {
        await axios.patch(`/api/users/${data?.id}`, payload);
        router.replace("/management/user");
      } else {
        await axios.post("/api/users", payload);
        router.replace(router.pathname);
      }
      alert("Berhasil mengubah data");
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Gagal");
    }
  };

  const getOptionSelected = (option, value) => {
    const optionTitle = typeof option === "string" ? option : option.name;
    const valueTitle = typeof value === "string" ? value : value.name;
    return optionTitle === valueTitle;
  };
  const optionLabel = (option) => {
    // Value selected with enter, right from the input
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    // Regular option
    return option.name;
  };
  const getOptionSelectedUpliner = (option, value) => {
    const valueTitle = value.fullname ?? value;
    return option.fullname === valueTitle ? true : true;
  };
  const optionLabelUpliner = (option) => {
    if (typeof option === "string") {
      return option;
    }
    return option.fullname;
  };

  const handleSearchUpliner = async (e, v) => {
    if (jobLevel) {
      const { data } = await axios.get("/api/upliner", {
        params: {
          // type: type.SEARCH,
          level_id: jobLevel,
          fullname: v,
        },
      });
      setDataUpliner(data.data);
    }
  };

  return (
    <DashboardCard title="Silahkan edit anggota karyawanmu disini!">
      <form onSubmit={handleSubmit(create)} ref={refForm}>
        <Box>
          {/* user information */}
          <Typography variant="h5">User Information</Typography>
          <Box p={2}>
            <Box py={2}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <InputLabel sx={{ mb: 1 }}>Foto Wajah</InputLabel>
                  <FilledInput
                    type="file"
                    name="image"
                    onChange={onHandleImage}
                    disabled={data?.photo ? true : false}
                    // {...register("image")}
                  />
                </Grid>
                <Grid item md={6}>
                  {data?.photo ? (
                    <Box
                      height={130}
                      width={130}
                      sx={{
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={`${BASE_URL}/uploads/${data?.photo}`}
                        alt="profile"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                  ) : (
                    imagePreview && (
                      <Box
                        height={130}
                        width={130}
                        sx={{
                          borderRadius: "50px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Box>
                    )
                  )}
                </Grid>
              </Grid>
            </Box>

            <Box py={2}>
              <InputLabel sx={{ mb: 1 }}>Fullname</InputLabel>
              <TextField
                required
                id="fullname"
                name="fullname"
                defaultValue={data?.fullname}
                placeholder="Fullname"
                type="text"
                size="small"
                fullWidth
                {...register("fullname")}
              />
            </Box>

            <Box py={2}>
              <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
              <TextField
                required
                type="email"
                name="email"
                defaultValue={data?.email}
                placeholder="Email"
                size="small"
                fullWidth
                {...register("email")}
                disabled={data?.email ? true : false}
              />
            </Box>
            <Box py={2}>
              <InputLabel sx={{ mb: 1 }}>Password</InputLabel>
              <TextField
                autoComplete="password"
                required
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                defaultValue={data?.password ?? null}
                size="small"
                fullWidth
                {...register("password")}
                disabled={data && data?.email ? true : false}
              />
            </Box>
          </Box>
        </Box>
        {/* Job Information */}
        <Box mt={3}>
          <Typography variant="h5">Job Information</Typography>
          <Box p={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>NIK</InputLabel>
                  <TextField
                    required
                    type="text"
                    name="nik"
                    defaultValue={data?.nik}
                    placeholder="NIK"
                    size="small"
                    fullWidth
                    {...register("nik")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Job Level</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="jobLevel"
                    name="jobLevel"
                    options={dataJobLevel}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.job_level?.name}
                    onChange={(e, v) => {
                      setJobLevelId(v?.id), setJobLevel(v?.level);
                    }}
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    // {...register("jobLevel")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select job Level"
                        onClick={handleClickJobLevel}
                        required
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Tipe Karyawan</InputLabel>
                  <Autocomplete
                    required
                    id="employeeType"
                    name="employeeType"
                    options={dataEmployeeType}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.employee_type?.name}
                    onChange={(e, v) => setEmployeeType(v?.id)}
                    fullWidth
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select job "
                        onClick={handleCLickEmployeeType}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Upliner</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="upliner"
                    name="upliner"
                    options={dataUpliner}
                    noOptionsText={"Loading..."}
                    onInputChange={handleSearchUpliner}
                    defaultValue={data?.upliner?.fullname}
                    onChange={(e, v) => {
                      setUplinerId(v?.id);
                    }}
                    getOptionLabel={optionLabelUpliner}
                    isOptionEqualToValue={getOptionSelectedUpliner}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.fullname}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Upliner "
                        onClick={handleClickUpliner}
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Departemen</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="departemens"
                    name="departemens"
                    options={dataDepartments}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.job_departement?.name}
                    onChange={(e, v) => {
                      setDepartmentsId(v?.id), setDepartmens(v?.level);
                    }}
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        onClick={handleCLickDepartments}
                        placeholder="Select Departemen "
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Job Position</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="jobPosition"
                    name="jobPosition"
                    options={dataJobPosition}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.job_position?.name}
                    onChange={(e, v) => {
                      setJobPositionId(v?.id);
                    }}
                    getOptionLabel={optionLabel}
                    isOptionEqualToValue={getOptionSelected}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        onClick={handleCLickJobPosition}
                        placeholder="Select job Level "
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Lokasi Kerja</InputLabel>

                  <Autocomplete
                    required
                    disablePortal
                    id="locationPoint"
                    name="locationPoint"
                    options={dataLocationPoint}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.location_point?.name}
                    onChange={(e, v) => {
                      setLocationPoint(v?.id);
                    }}
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        onClick={handleCLickLocationPoint}
                        placeholder="Select location point "
                        aria-label="Select location point"
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Jam Kerja</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="shifting"
                    name="shifting"
                    options={dataShifting}
                    noOptionsText={"Loading..."}
                    defaultValue={data?.shifting?.name}
                    onChange={(e, v) => {
                      setShifting(v?.id);
                    }}
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    // {...register("shifting")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Shifting"
                        onClick={handleClickShifting}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Lembur</InputLabel>
                  <Select
                    name="overtime"
                    id="overtime"
                    fullWidth
                    placeholder="Lembur"
                    size="small"
                    value={overTime}
                    onChange={(e) => setOverTime(e.target.value)}
                  >
                    <MenuItem value={true}>Ya</MenuItem>
                    <MenuItem value={false}>Tidak</MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Tipe Jadwal</InputLabel>
                  <Autocomplete
                    required
                    disablePortal
                    id="shiftType"
                    name="shiftType"
                    options={shiftTypes}
                    defaultValue={
                      data?.shift_type === "SHIFT" ? "shift" : "non shift"
                    }
                    noOptionsText={"Loading ..."}
                    onChange={(e, v) => {
                      setShiftType(v?.id);
                    }}
                    isOptionEqualToValue={getOptionSelected}
                    getOptionLabel={optionLabel}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.name}
                        </li>
                      );
                    }}
                    // {...register("shifting")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="select tipe jadwal"
                        onClick={handleClickShifting}
                        required
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box py={2}>
                  <InputLabel sx={{ mb: 1 }}>Jumlah Cuti</InputLabel>
                  <TextField
                    type="number"
                    name="dayOff"
                    size="small"
                    fullWidth
                    defaultValue={data?.leave_amount}
                    {...register("dayOff")}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {data?.photo ?? image ? (
          <Button variant="contained" type="submit" fullWidth size="large">
            <Typography
              variant="button"
              sx={{ fontWeight: 700, fontSize: "20px" }}
            >
              SUBMIT
            </Typography>
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
      </form>
    </DashboardCard>
  );
};

export default EditUserRegistration;
