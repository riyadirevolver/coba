import {
  Box,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import "moment/locale/id";
import moment from "moment/moment";
import React from "react";
import DashboardCard from "../../../src/components/baseCard/DashboardCard";
moment.locale("id");

const baseURL = process.env.BASE_URL_EMPLOYEE;

export const getServerSideProps = async ({ query }) => {
  const response = await axios
    .get(baseURL, {
      params: {
        year: query?.year ?? moment().format("YYYY"),
      },
    })
    .then((response) => response.data);
  return {
    props: {
      holidays: response,
    },
  };
};

const DataEmpty = () => {
  return (
    <TableRow>
      <TableCell>
        <Typography
          variant="h6"
          fontWeight="600"
          color="textSecondary"
          sx={{ width: "100%", textAlign: "left" }}
        >
          -
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          color="textSecondary"
          variant="h6"
          align="left"
          fontWeight="600"
        >
          Tahun ini tidak ada libur
        </Typography>
      </TableCell>
    </TableRow>
  );
};
const DayOff = ({ holidays }) => {
  return (
    <>
      <DashboardCard
        title="Cuti Bersama"
        subtitle=""
        customdisplay="block"
        custommargin="10px"
        cardSx={{
          overflow: "visible",
        }}
      >
        <CardContent>
          <Box
            sx={{
              overflow: "auto",
              sm: "unset",
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography align="left" variant="h5">
                      Tanggal
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="left" variant="h5">
                      Deskripsi
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Cuti Bersama */}
                {holidays.mass_leave != null ? (
                  holidays.mass_leave.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell width={"300px"}>
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          color="textSecondary"
                          sx={{ width: "100%", textAlign: "left" }}
                        >
                          {data?.wc_date
                            ? moment(data?.wc_date).format("dddd, LL")
                            : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          align="left"
                          fontWeight="600"
                        >
                          {data?.wc_description ?? "-"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <DataEmpty />
                )}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </DashboardCard>
      <DashboardCard
        title="Liburan Nasional"
        subtitle=""
        customdisplay="block"
        custommargin="10px"
        cardSx={{
          overflow: "visible",
        }}
      >
        <CardContent>
          <Box
            sx={{
              overflow: "auto",
              sm: "unset",
            }}
          >
            <Table
              aria-label="simple table"
              sx={{
                whiteSpace: "nowrap",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography align="left" variant="h5">
                      Tanggal
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="left" variant="h5">
                      Deskripsi
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Libur Nasional */}
                {holidays.holiday != null ? (
                  holidays.holiday.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell width={"300px"}>
                        <Typography
                          variant="h6"
                          fontWeight="600"
                          color="textSecondary"
                          sx={{ width: "100%", textAlign: "left" }}
                        >
                          {data?.wc_date
                            ? moment(data?.wc_date).format("dddd, LL")
                            : "-"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          align="left"
                          fontWeight="600"
                        >
                          {data?.wc_description ?? "-"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <DataEmpty />
                )}
              </TableBody>
            </Table>
          </Box>
        </CardContent>
      </DashboardCard>
    </>
  );
};

export default DayOff;
