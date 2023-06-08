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
import React, { useState } from "react";
import { useSnackbar } from "../../../hooks/useSnackbar";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import Transition from "../../transition";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import BaseService from "../../../services/base";
import APP_CONFIG from "../../../../app.config";
import { route } from "next/dist/server/router";
import { useRouter } from "next/dist/client/router";
const upTransition = Transition("up");

const AddDepartementsSettingsModal = ({
  open = false,
  closeModalHandler,
  type,
  departement,
}) => {
  const router = useRouter();
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const [jobDepartement, setJobDepartement] = React.useState(departement.data);
  const [jobDepartementID, setJobDepartementID] = React.useState(null);
 
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
    event.preventDefault();
    try {
      const { target } = event;
      const { name } = target;
      const data = {
        //company_id: APP_CONFIG.companyID,

        job_departement_id: jobDepartementID,
        required_selfie: true,
      };
      await axios.post("/api/departements-settings", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Departemens");
      closeModalHandler();
      router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Departemens");
      return;
    }
  };

  const handleChangeOut = async (event, data) => {
    event.preventDefault();
    try {
      const payload = {
        required_selfie: event.target.checked,
      };
      await axios.patch(`/api/departements-settings/${data.job_departement_id}`,payload);
      router.reload();      
      alert("Sukses");
    } catch (error) {
      console.log(error);
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
            Tambah Departemens Setting
          </DialogTitle>
          <DialogContent>
           
            <DialogContentText id="alert-slide-description" component="div">
              <CustomFormLabel htmlFor="nama">Nama Departemens</CustomFormLabel>
              <Select
                size="small"
                fullWidth
                value={jobDepartementID || ""}
                onChange={(e) => setJobDepartementID(e.target.value)}
              >
                {jobDepartement.map((job, index) => (
                  <MenuItem value={job.id} key={index}>
                    {job.name}
                  </MenuItem>
                ))}
              </Select>
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

export default AddDepartementsSettingsModal;
