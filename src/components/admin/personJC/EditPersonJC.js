import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  createFilterOptions,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import NextApi from "../../../../lib/services/next-api";
import { useSnackbar } from "../../../hooks/useSnackbar";
import personJCValidation from "../../../validations/personJCValidation";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import MenuTitle from "../../typography/MenuTitle";
import useFetchSkill from "../../../hooks/fetch/useFetchSkill";
import useFetchInterestPosition from "../../../hooks/fetch/useFetchInterestPosition";
import useFetchZip from "../../../hooks/fetch/useFetchZip";
import { GENDER_LISTS } from "../../../../utils/constant/listConstant";

const filter = createFilterOptions();

const EditPersonJC = ({ id_user, data, classData }) => {
  console.log("vvvvvv", data);
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [skill, setSkill] = React.useState([]);
  const [interestPosition, setInterestPosition] = React.useState([]);
  console.log("ininini", interestPosition);
  const [willingJakarta, setWillingJakarta] = React.useState(false);
  const [province, setProvince] = React.useState("");

  const arraySkill = data?.skills?.split(",").map((item) => ({ title: item }));
  const arrayInterest = data?.interest_positions
    ?.split(",")
    .map((item) => ({ title: item }));

  const defaultProvince = data?.current_domicile?.split(", ");

  console.log("ccccc", defaultProvince);

  const { setOpenSkill, skillList, openSkill, loadingSkill } = useFetchSkill();
  const { setOpenInterest, interestList, openInterest, loadingInterest } =
    useFetchInterestPosition();
  const {
    loadingZip,
    openZip,
    setOpenZip,
    setTempQuery: setZipTempQuery,
    searchZip,
  } = useFetchZip();

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

  const autoCompleteOnChangeSkill = (event, newValue) => {
    if (typeof newValue === "string") {
      setSkill({
        title: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      setSkill({
        title: newValue.inputValue,
      });
    } else {
      const mapInputValue = newValue.map((value) => {
        if (value.inputValue) {
          value.title = value.inputValue;
        }
        return value;
      });
      setSkill(mapInputValue);
    }
  };
  const autoCompleteOnChangeInterest = (event, newValue) => {
    if (typeof newValue === "string") {
      setInterestPosition({
        title: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      setInterestPosition({
        title: newValue.inputValue,
      });
    } else {
      const mapInputValue = newValue.map((value) => {
        if (value.inputValue) {
          value.title = value.inputValue;
        }
        return value;
      });
      setInterestPosition(mapInputValue);
    }
  };

  const autocompleteOnChangeZip = (event, newValue) => {
    if (typeof newValue === "string") {
      setProvince({
        propinsi: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setProvince({
        propinsi: newValue.inputValue,
      });
    } else {
      setProvince(newValue);
    }
  };

  const optionLabel = (option) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.title;
  };

  const filterOptionsSkill = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const selected = skill.some((option) => inputValue === option.title);
    if (inputValue !== "" && !selected) {
      filtered.push({
        inputValue,
        title: `Tambahkan "${inputValue}"`,
      });
    }
    return filtered;
  };
  const filterOptionsInterest = (options, params) => {
    const filtered = filter(options, params);
    const { inputValue } = params;
    const selected = interestPosition.some(
      (option) => inputValue === option.title
    );
    if (inputValue !== "" && !selected) {
      filtered.push({
        inputValue,
        title: `Tambahkan "${inputValue}"`,
      });
    }
    return filtered;
  };

  const renderOptions = (props, option) => <li {...props}>{option.title}</li>;

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setWillingJakarta(true);
    } else {
      setWillingJakarta(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullname: data.name || "",
      email: data.email || "",
      date_of_birth: data.date_of_birth || "",
      number_id: data.number_id || "",
      batch: data.batch || "",
      mobile_phone_number: data.mobile_phone_number || "",
      education: data.education || "",
      school_name: data.school_name || "",
      ipk_value: data.ipk_value || "",
      majoring: data.majoring || "",
      job_experience: data.job_experience || "",
      company_name: data.company_name || "",
      last_position: data.last_position || "",
      join_date: data.join_date || "",
      nipp_code: data.nipp_code || "",
      facebook: data.facebook || "",
      instagram: data.instagram || "",
      linkedin: data.linkedin || "",
      nilai_accurate: data.nilai_accurate || "",
      nilai_cognitive: data.nilai_cognitive || "",
      nilai_proactive: data.nilai_proactive || "",
      class_id: data.class_id || "",
      channel_payment: data.channel_payment || "",
      gender: data.gender || "",
    },
    validationSchema: personJCValidation,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        const {
          fullname,
          email,
          date_of_birth,
          number_id,
          batch,
          mobile_phone_number,
          education,
          school_name,
          ipk_value,
          majoring,
          job_experience,
          company_name,
          last_position,
          join_date,
          nipp_code,
          facebook,
          instagram,
          linkedin,
          nilai_accurate,
          nilai_cognitive,
          nilai_proactive,
          class_id,
          channel_payment,
          gender,
        } = values;
        const payload = {
          name: fullname,
          email: email,
          date_of_birth: date_of_birth,
          number_id: number_id,
          batch: batch,
          mobile_phone_number: mobile_phone_number,
          education: education,
          school_name: school_name,
          ipk_value: ipk_value,
          majoring: majoring,
          job_experience: job_experience,
          company_name: company_name,
          last_position: last_position,
          join_date: join_date,
          nipp_code: nipp_code,
          facebook: facebook,
          instagram: instagram,
          linkedin: linkedin,
          nilai_accurate: nilai_accurate,
          nilai_cognitive: nilai_cognitive,
          nilai_proactive: nilai_proactive,
          class_id: class_id,
          channel_payment: channel_payment,
          gender: gender,
          willing_work_jakarta: willingJakarta,
          ...(skill.length > 0 && {
            skills: skill.map((item) => item.title).join(","),
          }),
          ...(interestPosition.length > 0 && {
            interest_positions: interestPosition
              .map((item) => item.title)
              .join(","),
          }),
          ...(province && {
            current_domicile: `${province.kabupaten}, ${province.propinsi}`,
          }),
        };
        const response = await NextApi().patch(
          `/api/person-jc/${id_user}`,
          payload
        );
        openSnackBar("Berhasil merubah User JC");
        router.replace("/management/user-jc");
        setLoading(false);
      } catch (error) {
        console.log(error);
        openSnackBar("Gagal merubah User JC");
        setLoading(false);
      }
      setSubmitting(false);
    },
  });

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
          <MenuTitle title="Ubah User JC" />
        </Grid>
      </Grid>
      <Card sx={{ p: 0 }}>
        <form onSubmit={formik.handleSubmit}>
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
            <Box sx={{ ml: 1 }}>Informasi Akun</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="fullname">Nama</CustomFormLabel>
                <CustomTextField
                  required
                  id="fullname"
                  name="fullname"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("fullname")}
                  error={formik.touched.fullname && !!formik.errors.fullname}
                  helperText={formik.touched.fullname && formik.errors.fullname}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="gender">
                  Jenis Kelamin
                </CustomFormLabel>
                <Select
                  name="gender"
                  size="small"
                  fullWidth
                  value={formik.values.gender || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    formik.setFieldValue("gender", value);
                  }}
                >
                  {GENDER_LISTS.map((item, index) => (
                    <MenuItem value={item.value} key={index}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                <CustomTextField
                  required
                  id="email"
                  name="email"
                  type="email"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="date_of_birth">
                  Tanggal Lahir
                </CustomFormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formik.values.date_of_birth}
                    onChange={(date) =>
                      formik.setFieldValue("date_of_birth", date)
                    }
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={
                          formik.touched.date_of_birth &&
                          !!formik.errors.date_of_birth
                        }
                        helperText={
                          formik.touched.date_of_birth &&
                          formik.errors.date_of_birth
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="number_id">No. KTP</CustomFormLabel>
                <CustomTextField
                  required
                  id="number_id"
                  name="number_id"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  inputProps={{
                    maxLength: 14,
                  }}
                  {...formik.getFieldProps("number_id")}
                  error={formik.touched.number_id && !!formik.errors.number_id}
                  helperText={
                    formik.touched.number_id && formik.errors.number_id
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="mobile_phone_number">
                  No. Telepon
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="mobile_phone_number"
                  name="mobile_phone_number"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  inputProps={{
                    maxLength: 14,
                  }}
                  {...formik.getFieldProps("mobile_phone_number")}
                  error={
                    formik.touched.mobile_phone_number &&
                    !!formik.errors.mobile_phone_number
                  }
                  helperText={
                    formik.touched.mobile_phone_number &&
                    formik.errors.mobile_phone_number
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="nipp_code">Kode NIP</CustomFormLabel>
                <CustomTextField
                  required
                  id="nipp_code"
                  name="nipp_code"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("nipp_code")}
                  error={formik.touched.nipp_code && !!formik.errors.nipp_code}
                  helperText={
                    formik.touched.nipp_code && formik.errors.nipp_code
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="skills">Keahlian</CustomFormLabel>
                <Autocomplete
                  multiple
                  onChange={autoCompleteOnChangeSkill}
                  filterOptions={filterOptionsSkill}
                  defaultValue={
                    arraySkill ===
                    [
                      {
                        title: "",
                      },
                    ]
                      ? []
                      : arraySkill
                  }
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={skillList}
                  loading={loadingSkill}
                  open={openSkill}
                  onOpen={() => {
                    setOpenSkill(true);
                  }}
                  onClose={() => {
                    setOpenSkill(false);
                  }}
                  filterSelectedOptions
                  getOptionLabel={optionLabel}
                  renderOption={renderOptions}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Masukan keahlian, tambahkan jika tidak ada"
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="interest_positions">
                  Posisi yang diminati
                </CustomFormLabel>
                <Autocomplete
                  multiple
                  onChange={autoCompleteOnChangeInterest}
                  filterOptions={filterOptionsInterest}
                  defaultValue={
                    arrayInterest ===
                    [
                      {
                        title: "",
                      },
                    ]
                      ? []
                      : arrayInterest
                  }
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={interestList}
                  loading={loadingInterest}
                  open={openInterest}
                  onOpen={() => {
                    setOpenInterest(true);
                  }}
                  onClose={() => {
                    setOpenInterest(false);
                  }}
                  filterSelectedOptions
                  getOptionLabel={optionLabel}
                  renderOption={renderOptions}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      placeholder="Masukan posisi yang diminati, tambahkan jika tidak ada"
                      size="small"
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="input-name">
                  Domisili saat ini
                </CustomFormLabel>
                <Autocomplete
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  limitTags={2}
                  filterOptions={(x) => x}
                  id="free-solo-with-text-demo"
                  options={searchZip}
                  loading={loadingZip}
                  onChange={autocompleteOnChangeZip}
                  defaultValue={
                    data?.current_domicile && {
                      kabupaten: defaultProvince[0],
                      propinsi: defaultProvince[1],
                    }
                  }
                  onInputChange={(e, newInputValue) =>
                    setZipTempQuery(newInputValue)
                  }
                  getOptionLabel={(option) =>
                    option.kabupaten + ", " + option.propinsi
                  }
                  renderOption={(props, option) => (
                    <li {...props}>{`${option.kabupaten ?? ""} - ${
                      option.propinsi ?? ""
                    }`}</li>
                  )}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      size="small"
                      placeholder={"Cari berdasarkan kota"}
                    />
                  )}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControlLabel
                  label="Bersedia ditempatkan di Jakarta"
                  name="is_for_male"
                  control={
                    <Checkbox
                      onChange={handleCheckbox}
                      defaultChecked={
                        data?.willing_work_jakarta === 1 ? true : false
                      }
                    />
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
            <Box sx={{ ml: 1 }}>Informasi Pendidikan & Pengalaman</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="education">
                  Pendidikan Terakhir
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="education"
                  name="education"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("education")}
                  error={formik.touched.education && !!formik.errors.education}
                  helperText={
                    formik.touched.education && formik.errors.education
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="school_name">
                  Nama Sekolah
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="school_name"
                  name="school_name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("school_name")}
                  error={
                    formik.touched.school_name && !!formik.errors.school_name
                  }
                  helperText={
                    formik.touched.school_name && formik.errors.school_name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="ipk_value">Nilai IPK</CustomFormLabel>
                <CustomTextField
                  required
                  id="ipk_value"
                  name="ipk_value"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("ipk_value")}
                  error={formik.touched.ipk_value && !!formik.errors.ipk_value}
                  helperText={
                    formik.touched.ipk_value && formik.errors.ipk_value
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="majoring">Jurusan</CustomFormLabel>
                <CustomTextField
                  required
                  id="majoring"
                  name="majoring"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("majoring")}
                  error={formik.touched.majoring && !!formik.errors.majoring}
                  helperText={formik.touched.majoring && formik.errors.majoring}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="job_experience">
                  Pengalaman Pekerjaan
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="job_experience"
                  name="job_experience"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("job_experience")}
                  error={
                    formik.touched.job_experience &&
                    !!formik.errors.job_experience
                  }
                  helperText={
                    formik.touched.job_experience &&
                    formik.errors.job_experience
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="company_name">
                  Nama Perusahaan
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="company_name"
                  name="company_name"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("company_name")}
                  error={
                    formik.touched.company_name && !!formik.errors.company_name
                  }
                  helperText={
                    formik.touched.company_name && formik.errors.company_name
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="last_position">
                  Posisi Terakhir Menjabat
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="last_position"
                  name="last_position"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("last_position")}
                  error={
                    formik.touched.last_position &&
                    !!formik.errors.last_position
                  }
                  helperText={
                    formik.touched.last_position && formik.errors.last_position
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
            <Box sx={{ ml: 1 }}>Informasi Bootcamp</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="join_date">
                  Tanggal Bergabung (Join Date)
                </CustomFormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    required
                    id="join_date"
                    name="join_date"
                    value={formik.values.join_date}
                    onChange={(date) => formik.setFieldValue("join_date", date)}
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        fullWidth
                        size="small"
                        variant="outlined"
                        error={
                          formik.touched.join_date && !!formik.errors.join_date
                        }
                        helperText={
                          formik.touched.join_date && formik.errors.join_date
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="class_id">Kelas</CustomFormLabel>
                <Select
                  name="class_id"
                  size="small"
                  fullWidth
                  value={formik.values.class_id || ""}
                  onChange={(event) => {
                    const { value } = event.target;
                    formik.setFieldValue("class_id", value);
                  }}
                >
                  {classData.map((item, index) => (
                    <MenuItem value={item.Class_ID} key={index}>
                      {item.Class_Name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="batch">Batch</CustomFormLabel>
                <CustomTextField
                  required
                  id="batch"
                  name="batch"
                  fullWidth
                  size="small"
                  variant="outlined"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  inputProps={{
                    maxLength: 3,
                  }}
                  {...formik.getFieldProps("batch")}
                  error={formik.touched.batch && !!formik.errors.batch}
                  helperText={formik.touched.batch && formik.errors.batch}
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="channel_payment">
                  Pembayaran
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="channel_payment"
                  name="channel_payment"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("channel_payment")}
                  error={
                    formik.touched.channel_payment &&
                    !!formik.errors.channel_payment
                  }
                  helperText={
                    formik.touched.channel_payment &&
                    formik.errors.channel_payment
                  }
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="nilai_accurate">
                  Nilai Accurate
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="nilai_accurate"
                  name="nilai_accurate"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("nilai_accurate")}
                  error={
                    formik.touched.nilai_accurate &&
                    !!formik.errors.nilai_accurate
                  }
                  helperText={
                    formik.touched.nilai_accurate &&
                    formik.errors.nilai_accurate
                  }
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="nilai_cognitive">
                  Nilai Cognitive
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="nilai_cognitive"
                  name="nilai_cognitive"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("nilai_cognitive")}
                  error={
                    formik.touched.nilai_cognitive &&
                    !!formik.errors.nilai_cognitive
                  }
                  helperText={
                    formik.touched.nilai_cognitive &&
                    formik.errors.nilai_cognitive
                  }
                />
              </Grid>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="nilai_proactive">
                  Nilai Proactive
                </CustomFormLabel>
                <CustomTextField
                  required
                  id="nilai_proactive"
                  name="nilai_proactive"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("nilai_proactive")}
                  error={
                    formik.touched.nilai_proactive &&
                    !!formik.errors.nilai_proactive
                  }
                  helperText={
                    formik.touched.nilai_proactive &&
                    formik.errors.nilai_proactive
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
            <Box sx={{ ml: 1 }}>Informasi Sosial Media</Box>
          </Box>
          <CardContent
            sx={{
              pb: "30px",
              pr: "30px",
              pl: "30px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="facebook">Facebook</CustomFormLabel>
                <CustomTextField
                  id="facebook"
                  name="facebook"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("facebook")}
                  error={formik.touched.facebook && !!formik.errors.facebook}
                  helperText={formik.touched.facebook && formik.errors.facebook}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="instagram">Instagram</CustomFormLabel>
                <CustomTextField
                  id="instagram"
                  name="instagram"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("instagram")}
                  error={formik.touched.instagram && !!formik.errors.instagram}
                  helperText={
                    formik.touched.instagram && formik.errors.instagram
                  }
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomFormLabel htmlFor="linkedin">Linkedin</CustomFormLabel>
                <CustomTextField
                  id="linkedin"
                  name="linkedin"
                  fullWidth
                  size="small"
                  variant="outlined"
                  {...formik.getFieldProps("linkedin")}
                  error={formik.touched.linkedin && !!formik.errors.linkedin}
                  helperText={formik.touched.linkedin && formik.errors.linkedin}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Grid container sx={{ p: 2 }} spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                disabled={loading}
                type="submit"
              >
                {loading ? "Submitting..." : "Simpan"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default EditPersonJC;
