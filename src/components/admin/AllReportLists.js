import {
  Alert,
  Autocomplete,
  Button,
  Card,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import useFetchUserDebounce from "../../hooks/report/useFetchUserDebounce";
import useFetchUserNIK from "../../hooks/report/useFetchUserNIK";
import useGenerateLaporan from "../../hooks/report/useGenerateLaporan";
import { useSnackbar } from "../../hooks/useSnackbar";
import useFetchUnit from "../../hooks/user-register/useFetchUnit";
import CustomFormLabel from "../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../forms/custom-elements/CustomTextField";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";

const AllReportLists = ({ token, companyId }) => {
  const router = useRouter();

  const [nik, setNik] = useState(null);
  const [unit, setUnit] = useState(null);
  const [userId, setUserId] = useState(null);
  const [uplinerId, setUplinerId] = useState(null);

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const { loadingNIK, nikList, setTempQuery } = useFetchUserNIK(token);
  const {
    loadingUser,
    openUser,
    setOpenUser,
    setTempQuery: setUserTempQuery,
    userList,
  } = useFetchUserDebounce(token);

  const { setOpenUnit, loadingUnit, openUnit, unitList } = useFetchUnit(token);

  const { generate, loading } = useGenerateLaporan();
  const [value, setValue] = useState([null, null]);

  const getMaxDate = (date) => {
    if (!date) {
      return date;
    }
    const startTime = new Date(date).getTime();
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    return new Date(startTime + daysInMonth * 24 * 60 * 60 * 1000);
  };

  const maxDate = useMemo(() => getMaxDate(value[0]), [value]);

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);

  const create = async (event) => {
    event.preventDefault();

    await generate({
      data: {
        date_from: moment(date[0].startDate).format("YYYY-MM-DD"),
        date_to: moment(date[0].endDate).format("YYYY-MM-DD"),
        company_id: companyId,
        user_id: userId,
        upliner_id: uplinerId,
        job_department_id: unit,
        nik: nik,
        division_name: null,
      },
      onSuccess: () => openSnackBar("Berhasil generate report"),
      onError: (msg) => openSnackBar(msg),
    });
  };

  const onReset = () => {
    router.reload();
  };

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

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Card sx={{ mb: 3, overflow: "unset" }}>
        <Alert sx={{ mb: 1 }} variant="filled" severity="info">
          Maksimal penarikan data 31 hari
        </Alert>
        <form id="generate-report" onSubmit={create}>
          <Grid container spacing={5} rowSpacing={1} sx={{ mb: 3 }}>
            <Grid item lg={12} md={4} sm={12} xs={12}>
              <CustomFormLabel htmlFor="input-placement">
                Tanggal Penarikan Data
              </CustomFormLabel>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  required
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  maxDate={maxDate}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} required size="small" />
                      <Box sx={{ mx: 2 }}> sampai </Box>
                      <TextField {...endProps} required size="small" />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider> */}
              <DateRangePicker
                editableDateInputs={true}
                onChange={(item) => {
                  setDate([item.selection]);
                  setClearInputDate(false);
                  setValue([item.selection.startDate, item.selection.endDate]);
                }}
                maxDate={value[0] === null ? undefined : maxDate}
                moveRangeOnFirstSelection={false}
                ranges={date}
                clearInputDate={clearInputDate}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomFormLabel htmlFor="input-placement">NIK</CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                filterOptions={(x) => x}
                id="free-solo-with-text-demo"
                options={nikList}
                loading={loadingNIK}
                onInputChange={(e, newInputValue) =>
                  setTempQuery(newInputValue)
                }
                onChange={(e, v) => setNik(v?.nik ?? null)}
                getOptionLabel={(option) => option.nik}
                renderOption={(props, option) => (
                  <li {...props}>{`${option.nik ?? ""} - ${
                    option.fullname
                  }`}</li>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    fullWidth
                    size="small"
                    placeholder="Cari berdasarkan NIK"
                  />
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomFormLabel htmlFor="input-name">Nama User</CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                filterOptions={(x) => x}
                id="free-solo-with-text-demo"
                options={userList}
                loading={loadingUser}
                onChange={(e, v) => setUserId(v?.id ?? null)}
                onInputChange={(e, newInputValue) =>
                  setUserTempQuery(newInputValue)
                }
                getOptionLabel={(option) => option.fullname}
                renderOption={(props, option) => (
                  <li {...props}>{`${option.nik ?? ""} - ${
                    option.fullname
                  }`}</li>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder={"Cari berdasarkan nama"}
                  />
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomFormLabel htmlFor="input-name">
                Nama Upliner
              </CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                filterOptions={(x) => x}
                id="free-solo-with-text-demo"
                options={userList}
                loading={loadingUser}
                onChange={(e, v) => setUplinerId(v?.id ?? null)}
                onInputChange={(e, newInputValue) =>
                  setUserTempQuery(newInputValue)
                }
                getOptionLabel={(option) => option.fullname}
                renderOption={(props, option) => (
                  <li {...props}>{`${option.nik ?? ""} - ${
                    option.fullname
                  }`}</li>
                )}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    size="small"
                    placeholder={"Cari berdasarkan upliner"}
                  />
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <CustomFormLabel htmlFor="input-placement">Unit</CustomFormLabel>
              <Autocomplete
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                onChange={(e, v) => setUnit(v?.id ?? null)}
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
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
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
          <Grid container spacing={3}>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
              >
                {loading ? "Memproses" : "Generate"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                type="button"
                onClick={onReset}
                size="large"
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default AllReportLists;
