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
import BaseService from "../../../services/base";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import { LocalizationProvider } from "@mui/lab";
import CustomSelect from "../../forms/custom-elements/CustomSelect";
const upTransition = Transition("up");

const EditHolidaysModal = ({ open = false, closeModalHandler, data, type }) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const service = new BaseService("/api/holidays");

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

  const editHolidays = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { type, remark, hdate } = target;
      if (!hdate.value || !remark.value || !type.value) {
        setLoading(false);
        openSnackBar("Data tidak boleh kosong");
        return;
      }
      const payload = {
        type: type.value,
        remark: remark.value,
        hdate: hdate.value,
      };
      await service.patch(data.id, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Hari Libur");
      closeModalHandler();
      router.replace(router.pathname);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Hari Libur");
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
        open={open && type === "edit"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form onSubmit={editHolidays}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Edit Hari Libur
          </DialogTitle>
          <DialogContent>
            <DialogContentText required component="div">
              {/* start date */}
              <CustomFormLabel htmlFor="hdate">Tanggal</CustomFormLabel>
              <CustomTextField
                required
                id="hdate"
                name="hdate"
                defaultValue={data.hdate}
                type="date"
                fullWidth
                size="small"
                variant="outlined"
              />
              <LocalizationProvider date></LocalizationProvider>
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
                defaultValue={data.type}
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
              {/* deskripsi */}
              <CustomFormLabel htmlFor="remark">Deskripsi</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.remark}
                id="remark"
                name="remark"
                fullWidth
                size="small"
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
              {loading ? "Submitting..." : "Simpan"}
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

export default EditHolidaysModal;
