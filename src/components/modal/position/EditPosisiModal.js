import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import FeatherIcon from "feather-icons-react";
import BaseService from "../../../services/base";
import PropTypes from "prop-types";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
const upTransition = Transition("up");
const EditPosisiModal = ({
  open = false,
  closeModalHandler,
  data,
  type,
  departement,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  // const [jobDepartement, setJobDepartement] = React.useState(departement.data);
  // const [jobDepartementID, setJobDepartementID] = React.useState(null);
  const service = new BaseService("/api/position");

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

  const onEditPosisi = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const { target } = event;
      const { name } = target;
      const payload = {
        name: name.value,
        // job_departements_id: jobDepartementID,
      };
      await service.patch(data.id, payload);
      setLoading(false);
      openSnackBar("Berhasil Edit Posisi");
      closeModalHandler();
      router.replace(router.pathname);
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Edit Posisi");
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
        <form onSubmit={onEditPosisi}>
          <DialogTitle id="alert-dialog-title" variant="h4">
            Edit Posisi
          </DialogTitle>

          <DialogContent>
            <DialogContentText required component="div">
              <CustomFormLabel htmlFor="name">Nama Posisi</CustomFormLabel>
              <CustomTextField
                required
                defaultValue={data.name}
                id="name"
                name="name"
                fullWidth
                size="small"
                variant="outlined"
              />

              {/* <CustomFormLabel htmlFor="nama">Nama Departement</CustomFormLabel>
              <Select
                size="small"
                fullWidth
                defaultValue={departement.name}
                value={jobDepartementID || ""}
                onChange={(e) => setJobDepartementID(e.target.value)}
              >
                {jobDepartement.map((job, index) => (
                  <MenuItem value={job.id} key={index}>
                    {job.name}
                  </MenuItem>
                ))}
              </Select> */}
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
EditPosisiModal.propTypes = {
  open: PropTypes.bool,
};

export default EditPosisiModal;
