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
import axios from "axios";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
const upTransition = Transition("up");

const AddPosisiModal = ({
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
        name: name.value,
        job_departements_id: jobDepartementID,
      };
       await axios.post("/api/position", data);
      setLoading(false);
      openSnackBar("Berhasil Menambahkan Position");
      closeModalHandler();
       router.reload();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal Menambahkan Position");
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
            Tambah Position
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-slide-description" component="div">
              <CustomFormLabel htmlFor="name">Nama Position</CustomFormLabel>
              <CustomTextField
                required
                id="name"
                name="name"
                size="small"
                variant="outlined"
                fullWidth
                placeholder="Nama Position"
              />
              <CustomFormLabel htmlFor="nama">Nama Departement</CustomFormLabel>
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

export default AddPosisiModal;
