import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Snackbar,
  } from "@mui/material";
  import { useRouter } from "next/dist/client/router";
  import React, { useState } from "react";
  import { useSnackbar } from "../../../hooks/useSnackbar";
  import BaseService from "../../../services/base";
  import PropTypes from "prop-types";
  
  
  import FeatherIcon from "feather-icons-react";
  import APP_CONFIG from "../../../../app.config";
  import Transition from "../../transition";
  import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
  import CustomTextField from "../../forms/custom-elements/CustomTextField";
  const upTransition = Transition("up");
  
  const EditJobLevelModal = ({ open = false, closeModalHandler, data, type }) => {
    const router = useRouter();
    const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const service = new BaseService("/api/joblevels");
  
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
  
    const onEditJobLevel = async (event) => {
      setLoading(true);
      event.preventDefault();
      try {
        const { target } = event;
        const { name, level } = target;
  
        const payload = {
          // company_id: APP_CONFIG.companyID,
          name: name.value,
          level: level.value,
        };
        await service.patch(data.id, payload);
        setLoading(false);
        openSnackBar("Berhasil Edit Jabatan");
        closeModalHandler();
        router.reload();
        return;
      } catch (error) {
        console.log(error);
        setLoading(false);
        openSnackBar("Gagal Edit Jabatan");
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
          <form onSubmit={onEditJobLevel}>
            <DialogTitle id="alert-dialog-title" variant="h4">
              Edit Jabatan
            </DialogTitle>
            <DialogContent>
              <DialogContentText required component="div">
                <CustomFormLabel htmlFor="name">Nama Jabatan</CustomFormLabel>
                <CustomTextField
                  required
                  defaultValue={data.name}
                  id="name"
                  name="name"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
                <CustomFormLabel htmlFor="level">Level Jabatan</CustomFormLabel>
                <CustomTextField
                  required
                  defaultValue={data.level}
                  id="level"
                  name="level"
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
  EditJobLevelModal.propTypes = {
    open: PropTypes.bool,
  };
  
  export default EditJobLevelModal;