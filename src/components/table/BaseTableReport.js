import {
  Paper,
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

const DATA_HEAD = [{ title: "data" }];

const BaseTableReport = ({ title, children, tableHead, noWrap }) => {
  return (
    <>
      <Typography fontSize={24} color="black" fontWeight={700} ml={2} mb={2}>
        {title ?? "data"}
      </Typography>
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
