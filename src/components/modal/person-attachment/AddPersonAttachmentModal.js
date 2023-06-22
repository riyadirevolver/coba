import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import PropTypes from "prop-types";
import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import NextApi from "../../../../lib/services/next-api";
import { uploadFile } from "../../../../lib/services/upload";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useUploadPhoto from "../../../hooks/useUploadPhoto";
import CustomFormLabel from "../../forms/custom-elements/CustomFormLabel";
import CustomTextField from "../../forms/custom-elements/CustomTextField";
import Transition from "../../transition";
import { BASE_IMAGE_URL } from "../../../../utils/baseUrl";

const upTransition = Transition("up");

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const AddPersonAttachmentModal = ({
  open = false,
  closeModalHandler,
  type,
  person_id,
}) => {
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
      for (let index = 0; index < gambar.length; index++) {
        const item = gambar[index];
        const upload = await uploadFile(item);
        const payloadAttachment = {
          person_id: person_id,
          url: `${BASE_IMAGE_URL}/${upload.id}`,
          file_name: item.name,
        };
        await NextApi().post("/api/person-attachment", payloadAttachment);
      }
      router.replace({
        pathname: router.asPath,
      });
      openSnackBar("Berhasil menambahkan Person Attachment");
      setLoading(false);
      closeModalHandler();
    } catch (error) {
      console.log(error);
      setLoading(false);
      openSnackBar("Gagal menambahkan Person Attachment");
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
            Tambah Person Attachment
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

AddPersonAttachmentModal.defaultProps = {
  open: false,
};

AddPersonAttachmentModal.propTypes = {
  open: PropTypes.bool,
};

export default AddPersonAttachmentModal;
