import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import Transition from "../../transition";
import { MomentDateID } from "../../../../utils/momentId";
import { GENDER_LIST } from "../../../../utils/constant/changeLabel";
import axios from "axios";

const upTransition = Transition("up");

const DetailPersonJCModal = ({
  open = false,
  closeModalHandler,
  type,
  data,
}) => {
  const router = useRouter();
  return (
    <>
      <Dialog
        open={open && type === "detail"}
        TransitionComponent={upTransition}
        onClose={closeModalHandler}
        fullWidth
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" variant="h4">
          Detail User Juara Coding
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            component="div"
          >
            <Box
              display="flex"
              alignItems="center"
              p="16px 24px"
              sx={{
                backgroundColor: "primary.light",
                color: "primary.main",
                ml: -3,
                mr: -3,
                mb: 2,
              }}
            >
              <FeatherIcon icon="alert-circle" width="18" />
              <Box sx={{ ml: 1 }}>Informasi Akun</Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nama"
                  fullWidth
                  defaultValue={data.name || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Tanggal Lahir"
                  fullWidth
                  defaultValue={MomentDateID(data.date_of_birth) || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Jenis Kelamin"
                  fullWidth
                  defaultValue={GENDER_LIST[data?.gender] || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="No. KTP"
                  fullWidth
                  defaultValue={data.number_id || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Kode NIP"
                  fullWidth
                  defaultValue={data.nipp_code || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="No Telepon"
                  fullWidth
                  defaultValue={data.mobile_phone_number || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Domisili saat ini"
                  fullWidth
                  defaultValue={data?.current_domicile || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Bahasa Pemrograman"
                  fullWidth
                  defaultValue={data?.skills || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Posisi yang diminati"
                  fullWidth
                  defaultValue={data?.interest_positions || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Riwayat Bekerja"
                  fullWidth
                  defaultValue={data?.job_status || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Status Rekomendasikan"
                  fullWidth
                  defaultValue={
                    data?.recommended == true
                      ? "Direkomendasikan"
                      : "Tidak Direkomendasikan"
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Bersedia ditempatkan di Jakarta"
                  fullWidth
                  defaultValue={
                    data?.willing_work_jakarta == true ? "Siap" : "Tidak Siap"
                  }
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Blacklist"
                  fullWidth
                  defaultValue={data?.blacklist == true ? "Ya" : "Tidak"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              p="16px 24px"
              sx={{
                backgroundColor: "primary.light",
                color: "primary.main",
                ml: -3,
                mr: -3,
                mb: 2,
                mt: 2,
              }}
            >
              <FeatherIcon icon="alert-circle" width="18" />
              <Box sx={{ ml: 1 }}>Informasi Pendidikan & Pengalaman</Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Pendidikan Terakhir"
                  fullWidth
                  defaultValue={data.education || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nama Sekolah"
                  fullWidth
                  defaultValue={data.school_name || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nilai IPK"
                  fullWidth
                  defaultValue={data.ipk_value || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Jurusan"
                  fullWidth
                  defaultValue={data.majoring || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Status Pekerjaan"
                  fullWidth
                  defaultValue={data.job_experience || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nama Perusahaan"
                  fullWidth
                  defaultValue={data.company_name || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Posisi Terakhir Menjabat"
                  fullWidth
                  defaultValue={data.last_position || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              p="16px 24px"
              sx={{
                backgroundColor: "primary.light",
                color: "primary.main",
                ml: -3,
                mr: -3,
                mb: 2,
                mt: 2,
              }}
            >
              <FeatherIcon icon="alert-circle" width="18" />
              <Box sx={{ ml: 1 }}>Informasi Bootcamp</Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Tanggal Bergabung (Join Date)"
                  fullWidth
                  defaultValue={MomentDateID(data.join_date) || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Kelas"
                  fullWidth
                  defaultValue={data.class_id || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Status Bootcamp"
                  fullWidth
                  defaultValue={data.bootcamp_status || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Pembayaran"
                  fullWidth
                  defaultValue={data.channel_payment || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Batch"
                  fullWidth
                  defaultValue={data.batch || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nilai Accurate"
                  fullWidth
                  defaultValue={data.nilai_accurate || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nilai Cognitive"
                  fullWidth
                  defaultValue={data.nilai_cognitive || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Nilai Proactive"
                  fullWidth
                  defaultValue={data.nilai_proactive || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              alignItems="center"
              p="16px 24px"
              sx={{
                backgroundColor: "primary.light",
                color: "primary.main",
                ml: -3,
                mr: -3,
                mb: 2,
                mt: 2,
              }}
            >
              <FeatherIcon icon="alert-circle" width="18" />
              <Box sx={{ ml: 1 }}>Informasi Sosial Media</Box>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Facebook"
                  fullWidth
                  defaultValue={data.facebook || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Instagram"
                  fullWidth
                  defaultValue={data.instagram || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-read-only-input"
                  label="Linkedin"
                  fullWidth
                  defaultValue={data.linkedin || "-"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModalHandler} color="secondary">
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DetailPersonJCModal.defaultProps = {
  open: false,
};
DetailPersonJCModal.propTypes = {
  open: PropTypes.bool,
};
export default DetailPersonJCModal;
