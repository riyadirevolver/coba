import React, { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  IconButton,
  MenuItem,
  Grid,
  FormHelperText,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import axios from "axios";
import TextField from "@mui/material/TextField";
import moment from "moment";
import AddDayWorkModal from "./AddDayWorkModal";
import useHandleModal from "../../../hooks/useHandleModal";
// import tanggal
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { typeSchedule } from "../../../constants/schedule";

const upTransition = Transition("up");

const AddScheduleModal = ({
  open = false,
  closeModalHandler,
  type,
  shifting,
}) => {
  const router = useRouter();

  // panggil modal
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [dataJadwal, setDataJadwal] = React.useState([]);
  //  memanggil tanggal
  const [tanggal, setTanggal] = React.useState(moment().format("YYYY-MM-DD"));

  // memanggil tipe jadwal
  const [jadwal, setJadwal] = React.useState("");
  const handleChange = (event) => {
    setJadwal(event.target.value);
  };

  // mengubah teks tipe hari jadwal
  const work = dataJadwal.filter((v) => v.shifting_id != "2").length;
  const freeDay = dataJadwal.filter((v) => v.shifting_id === "2").length;
  const textHariKerja = work + " hari kerja " + freeDay + " libur";

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
  // membuat create data
  const create = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!dataJadwal || dataJadwal.length >= 1) {
      try {
        const { target } = event;
        const { nameJadwal, companyID, typeJadwal, t_keterlambatan } = target;
        const data = {
          name: nameJadwal.value,
          type: typeJadwal.value,
          effective_date: tanggal,
          workday: dataJadwal,
        };
        await axios.post("/api/schedule", data);
        setLoading(false);
        openSnackBar("Berhasil menambahkan jadwal");
        closeModalHandler();
        router.reload();
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        openSnackBar("Gagal menambahkan jadwal");
        return;
      }
    } else {
      setLoading(false);
      openSnackBar("Isi terlebih dahulu hari kerja");
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
        open={open && type === "add"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={create}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah Data Jadwal
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <Grid container spacing={5}>
                <Grid item xs={6}>
                  <TextField
                    required
                    style={{ marginTop: "10px", width: "250px" }}
                    id="typeJadwal"
                    select
                    name="typeJadwal"
                    label="Tipe Jadwal"
                    value={jadwal}
                    onChange={handleChange}
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
                        label="Tanggal Effective"
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
                size="small"
                variant="outlined"
              />
              <CustomFormLabel htmlFor="name">Hari kerja</CustomFormLabel>
              <CustomTextField
                style={{ width: "85%", marginRight: "10px" }}
                required
                id="name"
                name="name"
                value={work === 0 && freeDay === 0 ? "-" : textHariKerja}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                variant="outlined"
                onClick={() => handleOpenModal("add")}
              />
              <AddDayWorkModal
                open={openModal}
                type={modalType}
                shifting={shifting}
                closeModalHandler={handleCloseModal}
                handleSubmit={(workday) => handleDataWorkDay(workday)}
              />
              <Button
                style={{ width: "10%" }}
                color="primary"
                variant="contained"
                onClick={() => handleOpenModal("add")}
              >
                <ArrowForwardIosIcon />
              </Button>
              {!dataJadwal || dataJadwal.length >= 1 ? (
                <FormHelperText style={{ color: "green", margin: "5px" }}>
                  data hari kerja berhasil diisi
                </FormHelperText>
              ) : (
                <FormHelperText style={{ color: "red", margin: "5px" }}>
                  data tidak boleh kosong
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
              {loading ? "Submitting..." : "Tambah"}
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

AddScheduleModal.defaultProps = {
  open: false,
};
AddScheduleModal.propTypes = {
  open: PropTypes.bool,
};
export default AddScheduleModal;
