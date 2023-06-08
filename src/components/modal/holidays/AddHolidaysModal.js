import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import moment from "moment";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
const upTransition = Transition("up");

const AddHolidaysModal = ({ open = false, closeModalHandler, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

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

  const create = async (event) => {
    setLoading(true);
    try {
      event.preventDefault();
      const { target } = event;
      const { type, remark, hdate } = target;
      if (!hdate.value || !remark.value || !type.value) {
        setLoading(false);
        openSnackBar("Data tidak boleh kosong");
        return;
      }
      const data = {
        type: type.value,
        remark: remark.value,
        hdate: hdate.value,
      };
      await axios.post("/api/holidays", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Hari Libur");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Hari Libur");
      return;
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
          <DialogTitle id="alert-dialog-title" variant="h4">
            Tambah Hari Libur
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              {/* hdate */}
              <CustomFormLabel htmlFor="name">Tanggal</CustomFormLabel>
              <CustomTextField
                required
                id="hdate"
                name="hdate"
                type="date"
                fullWidth
                size="small"
                variant="outlined"
              />

              {/* type */}
              <CustomFormLabel>Tipe</CustomFormLabel>
              <CustomSelect
                required
                id="type"
                name="type"
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Pilih type"
                defaultValue="LIBUR"
                onChange={(e) => {
                  (prevState) => ({
                    ...prevState,
                    type: e.target.value,
                  });
                }}
              >
                {[
                  {
                    key: "LIBUR",
                    value: "Libur",
                  },
                  {
                    key: "CUTI BERSAMA",
                    value: "Cuti Bersama",
                  },
                ].map((option, index) => (
                  <MenuItem key={index} value={option.key}>
                    {option.value}
                  </MenuItem>
                ))}
              </CustomSelect>

              {/* remark */}
              <CustomFormLabel htmlFor="name">Deskripsi</CustomFormLabel>
              <CustomTextField
                required
                id="remark"
                name="remark"
                fullWidth
                size="small"
                placeholder="Hari Spesial"
                variant="outlined"
              />
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

export default AddHolidaysModal;
