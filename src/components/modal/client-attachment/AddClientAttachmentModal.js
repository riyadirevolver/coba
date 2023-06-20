import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import "react-phone-input-2/lib/material.css";
import { useSnackbar } from "../../../hooks/useSnackbar";

import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import NextApi from "../../../../lib/services/next-api";
import { uploadFile } from "../../../../lib/services/upload";
import useUploadPhoto from "../../../hooks/useUploadPhoto";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";

const upTransition = Transition("up");

const AddClientAttachmentModal = ({
  open = false,
  closeModalHandler,
  type,
  client_request_id,
}) => {
  console.log("ssssssss", client_request_id);
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

  const { handleDeletePoster, onSelectFile, errorFiles, gambar, pesan } =
    useUploadPhoto(undefined);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // gambar.map(async (item) => {
      //   const upload = await uploadFile(item);
      //   const payloadAttachment = {
      //     client_request_id: client_request_id,
      //     url: upload.id,
      //   };

      // });
      for (let index = 0; index < gambar.length; index++) {
        const item = gambar[index];
        const upload = await uploadFile(item);
        const payloadAttachment = {
          client_request_id: client_request_id,
          url: upload.id,
        };
        await NextApi().post("/api/client-attachment", payloadAttachment);
      }
      // router.reload();
      router.replace({
        pathname: router.asPath,
      });
      openSnackBar("Berhasil menambahkan Client Attachment");
      setLoading(false);
      closeModalHandler();
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal menambahkan Client Attachment");
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
        <form onSubmit={handleSubmit}>
          <DialogTitle id="alert-dialog-slide-title" variant="h4">
            Tambah Client Attachment
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              component="div"
            >
              <CustomFormLabel htmlFor="upload">Upload</CustomFormLabel>
              <CustomTextField
                required
                type="file"
                name="image"
                accept="image/*"
                onChange={onSelectFile}
                multiple
                fullWidth
                size="small"
                variant="outlined"
                inputProps={{ multiple: true }}
                error={errorFiles}
                helperText={pesan}
                sx={{
                  borderRadius: "6px",
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              variant="contained"
              disabled={loading || errorFiles === true}
              type="submit"
            >
              {loading ? "Submitting..." : "Tambah"}
            </Button>
            <Button
              onClick={() => {
                closeModalHandler();
                handleDeletePoster();
              }}
              color="secondary"
            >
              Batal
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

AddClientAttachmentModal.defaultProps = {
  open: false,
};
AddClientAttachmentModal.propTypes = {
  open: PropTypes.bool,
};
export default AddClientAttachmentModal;
