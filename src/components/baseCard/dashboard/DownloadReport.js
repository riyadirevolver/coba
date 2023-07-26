import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import imgsvg from "../../../../assets/images/backgrounds/welcome-bg2-2x-svg.svg";
import { useSnackbar } from "../../../hooks/useSnackbar";
import useGenerateReport from "../../../hooks/reports/useGenerateReport";

const DownloadReport = ({ name, sx }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { generate, loading } = useGenerateReport();

  const exportReport = async (event) => {
    event.preventDefault();
    await generate({
      title: "Progress per Orang",
      path: "/export-progress-person",
      onSuccess: () => openSnackBar("Berhasil export data"),
      onError: (msg) => openSnackBar(msg),
    });
  };

  return (
    <Card elevation={0} sx={{ ...sx }}>
      <Box className="bg-img-1">
        <Image src={imgsvg} alt="welcome-img" />
      </Box>

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
          Hey {name || "Admin"}, <br /> Download Summary Kandidat Report
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
