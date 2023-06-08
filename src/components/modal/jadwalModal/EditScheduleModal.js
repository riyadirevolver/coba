import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  Grid,
  TextField,
  Box,
  MenuItem,
  FormHelperText,
} from "@mui/material";
// icon
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FeatherIcon from "feather-icons-react";

import { useSnackbar } from "../../../hooks/useSnackbar";
import { useRouter } from "next/dist/client/router";
import moment from "moment";

import BaseService from "../../../services/base";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
// tanggal
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Transition from "../../transition";
import { typeSchedule } from "../../../constants/schedule";
import axios from "axios";
import useHandleModal from "../../../hooks/useHandleModal";
import EditDayWorkModal from "./EditDayWorkModal";
const upTransition = Transition("up");

const EditScheduleModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  shifting,
}) => {
  const router = useRouter();

  // panggil modal
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  //  memanggil data jadwal workday
  const [dataJadwal, setDataJadwal] = React.useState([]);
  const [textDataJadwal, setTextJadwal] = React.useState({
    data: data?.workday,
  });

  //  memanggil tanggal
  const [tanggal, setTanggal] = React.useState(moment().format("YYYY-MM-DD"));

  // memanggil tipe jadwal
  const [jadwal, setJadwal] = React.useState(1);
  const handleChangeHari = (event) => {
    setTextJadwal(event.target.value);
  };
  const handleChangeJadwal = (event) => {
    setJadwal(event.target.value);
  };

  // mengubah teks tipe hari jadwal
  const work = data?.workday?.filter((v) => v.shifting_id != null).length;
  const freeDay = data?.workday?.filter((v) => v.shifting_id === null).length;
  const updateWork = dataJadwal.filter((v) => v.shifting_id != null).length;
  const updateFreeDay = dataJadwal.filter((v) => v.shifting_id === null).length;
  const textHariKerja = work + " hari kerja " + freeDay + " libur";
  const textUpdateHariKerja =
    updateWork + " hari kerja " + updateFreeDay + " libur";

  const service = new BaseService("/api/schedule");

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

  const handleDataWorkDay = (dataWorkDay) => {
    const keys = Object.keys(dataWorkDay);
    const workday = [];
    const workDayShifting = {};
    keys.map((val, idx) => {
      workday.push({
        name: keys[idx],
        day: idx + 1,
        shifting_id: dataWorkDay[val],
      });
    });
    const jadwal = { workday };
    setDataJadwal(workday);
  };

  const onEditJadwal = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!dataJadwal || dataJadwal.length >= 1) {
      try {
        const { target } = event;
        const { nameJadwal, companyID, typeJadwal, t_keterlambatan } = target;
        const payload = {
          name: nameJadwal.value,
          type: typeJadwal.value,
          effective_date: tanggal,
          // t_keterlambatan: t_keterlambatan.value,
          workday: dataJadwal,
        };
        await service.patch(data.id, payload);
        await axios.patch(`/api/schedule/${data.id}`, payload);
        setLoading(false);
        openSnackBar("Berhasil mengubah jadwal");
        closeModalHandler();
        router.replace(router.pathname);
        router.reload();
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        openSnackBar("Gagal mengubah jadwal");
        return;
      }
    } else {
      setLoading(false);
      openSnackBar("Harap mengedit data hari terdahulu");
    }
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
      <Dialog
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={onEditJadwal}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Edit Data Jadwal
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    style={{ marginTop: "10px", width: "250px" }}
                    id="typeJadwal"
                    select
                    name="typeJadwal"
                    label="Tipe Jadwal"
                    value={jadwal}
                    defaultValue={parseInt(jadwal)}
                    onChange={handleChangeJadwal}
                    helperText="Silahkan pilih jadwal"
                  >
                    {typeSchedule.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ mt: 1.2 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Tanggal Efektif"
                        value={tanggal}
                        name="effective_date"
                        id="effective_date"
                        onChange={(newValue) => {
                          setTanggal(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Grid>
              </Grid>

              <CustomFormLabel htmlFor="nameJadwal">
                Nama Jadwal Kerja
              </CustomFormLabel>
              <CustomTextField
                required
                id="nameJadwal"
                name="nameJadwal"
                fullWidth
                defaultValue={data?.name}
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="name">Hari kerja</CustomFormLabel>
              <CustomTextField
                style={{ width: "85%", marginRight: "10px" }}
                required
                id="name"
                name="name"
                value={
                  !dataJadwal || dataJadwal.length >= 1
                    ? textUpdateHariKerja
                    : textHariKerja
                }
                InputProps={{
                  readOnly: true,
                }}
                onChange={handleChangeHari}
                size="small"
                variant="outlined"
                onClick={() => handleOpenModal("edit")}
              />
              <EditDayWorkModal
                open={openModal}
                type={modalType}
                shifting={shifting}
                data={data}
                closeModalHandler={handleCloseModal}
                handleSubmit={(workday) => handleDataWorkDay(workday)}
              />
              <Button
                style={{ width: "10%" }}
                color="primary"
                variant="contained"
                onClick={() => handleOpenModal("edit")}
              >
                <ArrowForwardIosIcon />
              </Button>
              {!dataJadwal || dataJadwal.length >= 1 ? (
                <FormHelperText style={{ color: "green", margin: "5px" }}>
                  data hari kerja berhasil di perbarui
                </FormHelperText>
              ) : (
                <FormHelperText style={{ color: "red", margin: "5px" }}>
                  harap untuk mengedit data hari kerja
                </FormHelperText>
              )}
              <CustomFormLabel htmlFor="t_keterlambatan">
                Toleransi Keterlambatan
              </CustomFormLabel>
              <CustomTextField
                required
                id="t_keterlambatan"
                name="t_keterlambatan"
                fullWidth
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={24}
                size="small"
                variant="outlined"
              />
              <Button
                sx={{ mt: 2 }}
                color="primary"
                variant="contained"
                disabled={loading}
                // type="submit"
              >
                {loading ? "Submitting..." : "+ Assign Karyawan"}
              </Button>
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading}
              type="submit"
            >
              {loading ? "Mengubah..." : "Simpan"}
            </Button>
            <Button onClick={closeModalHandler} color="secondary">
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

EditScheduleModal.propTypes = {
  open: PropTypes.bool,
};

export default EditScheduleModal;
