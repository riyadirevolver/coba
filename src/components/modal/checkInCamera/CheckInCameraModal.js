import { Box, Dialog, IconButton } from "@mui/material";
import React from "react";
import Webcam from "react-webcam";
import { base64ToJpg } from "../../../hooks/base64ToJpg";
import { uploadFile } from "../../../../lib/services/upload";
import FeatherIcon from "feather-icons-react";

const videoConstraints = {
  facingMode: "user",
  aspectRatio: 0.6666666667,
};
const CheckInCameraModal = ({ open, modalType, onClose, onLoadImage }) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    base64ToJpg(imageSrc, "hello.jpeg", "image/jpeg").then(
      async (filePhoto) => {
        const file = await uploadFile(filePhoto);
        onLoadImage(file);
        onClose();
      }
    );
  }, [webcamRef, onLoadImage, onClose]);

  const wrapperRef = React.useRef();

  return (
    <Dialog
      open={open && modalType === "check-in"}
      onClose={onClose}
      fullScreen
      maxWidth="sm"
    >
      <Box
        className="sdasda"
        ref={wrapperRef}
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          backgroundColor: "#fff",
          height: "100vh",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 9,
            backgroundColor: "rgba(255,255,255,.3)",
          }}
        >
          <FeatherIcon icon="x" />
        </IconButton>
        {open ? (
          <Webcam
            className="camera__capture"
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.5}
            mirrored={true}
            // style={{
            //   width: "100%",
            //   height: "100%",
            //   objectFit: "cover",
            //   objectPosition: "center",
            // }}
            // videoConstraints={{
            //   ...videoConstraints,
            //   width: 1000,
            //   height: 1000,
            // }}
          />
        ) : null}

        <Box position="fixed" bottom={5}>
          <IconButton
            onClick={capture}
            sx={{
              backgroundColor: "rgba(255,255,255,.3)",
            }}
          >
            <FeatherIcon icon="camera" size="40px" />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CheckInCameraModal;
