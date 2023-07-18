import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useSnackbar } from "../../hooks/useSnackbar";
import useGenerateReport from "../../hooks/reports/useGenerateReport";
import FeatherIcon from "feather-icons-react";

const DATA_HEAD = [{ title: "data" }];

const BaseTableReport = ({ title, children, tableHead, noWrap }) => {
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();
  const { generate, loading } = useGenerateReport();

  const exportReport = async (event) => {
    event.preventDefault();
    await generate({
      ...(title === "Total Klien Summary" && {
        title: "Report Client Sumamry",
        path: "/export-dashboard",
      }),
      ...(title === "Total Klien di Kandidat Sent" && {
        title: "Report Kandidat Sent",
        path: "/export-submit-candidate",
      }),
      ...(title === "Total Klien per Bulan" && {
        title: "Report Klien per Bulan",
        path: "/export-client-month",
      }),
      onSuccess: () => openSnackBar("Berhasil export data"),
      onError: (msg) => openSnackBar(msg),
    });
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </>
  );
  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <Box sx={{ m: 3 }}>
        <Grid container spacing={3}>
          <Grid item sm={9} xs={12}>
            <Typography
              variant="h3"
              sx={{
                width: "100%",
              }}
            >
              {title ?? "data"}
            </Typography>
          </Grid>
          <Grid item sm={3} xs={12}>
            <Button
              fullWidth
              color="success"
              variant="contained"
              disabled={loading}
              onClick={exportReport}
            >
              <FeatherIcon icon="clipboard" />
              Export
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer
        // sx={{ maxHeight: "55vh" }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ whiteSpace: noWrap ? "normal" : "nowrap" }}
          >
            <TableHead>
              <TableRow>
                {(tableHead ?? DATA_HEAD).map((row, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    sx={{
                      backgroundColor: "#3D3D3D",
                      color: "white",
                    }}
                  >
                    <Typography variant="h5">{row.title}</Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

BaseTableReport.propTypes = {
  children: PropTypes.node,
  tableHead: PropTypes.array,
  pagination: PropTypes.object,
  data: PropTypes.object,
};

export default BaseTableReport;
