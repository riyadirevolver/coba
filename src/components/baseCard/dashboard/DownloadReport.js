import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import React from "react";
import img1svg from "../../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg";
import img2svg from "../../../../assets/images/backgrounds/sidebar-buynow-bg.svg";
import useGenerateReport from "../../../hooks/reports/useGenerateReport";
import { useSnackbar } from "../../../hooks/useSnackbar";

const DownloadReport = ({ name, label, title, path, image, sx }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { generate, loading } = useGenerateReport();

  const exportReport = async (event) => {
    event.preventDefault();
    await generate({
      title: title,
      path: path,
      onSuccess: () => openSnackBar("Berhasil export data"),
      onError: (msg) => openSnackBar(msg),
    });
  };

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

  return (
    <Card elevation={0} sx={{ ...sx }}>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      {image === 1 && (
        <Box className="bg-img-1">
          <Image src={img1svg} alt="welcome-img" />
        </Box>
      )}
      {image === 2 && (
        <Box className="bg-img-2">
          <Image src={img2svg} alt="welcome-img" />
        </Box>
      )}

      <CardContent>
        <Typography
          sx={{
            marginTop: "8px",
            marginBottom: "0px",
            lineHeight: "35px",
            position: "relative",
            zIndex: 9,
          }}
          variant="h3"
          gutterBottom
        >
          Hey {name || "Admin"}, <br /> {label}
        </Typography>
        <Button
          sx={{
            marginTop: "15px",
          }}
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={exportReport}
        >
          Download
        </Button>
      </CardContent>
    </Card>
  );
};

export default DownloadReport;
