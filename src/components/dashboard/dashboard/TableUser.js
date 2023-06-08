import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
} from "@mui/material";

import DashboardCard from "../../baseCard/DashboardCard";
import APP_CONFIG from "../../../../app.config";

const baseImageUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const TableUser = ({ data }) => {
  const [dataAbsent, setDataAbsent] = useState(null);

  const updateData = () => {
    const newData = [];
    data.data.map((i) => {
      const fullname = i.fullname;
      i.data.map((v) => {
        const c = {
          fullname: fullname,
          image: i.photo,
          in: v.in,
          overtime: v.overtime,
          leave: v.leave,
          permit: v.permit,
          sick: v.sick,
          total: v.total,
        };
        newData.push(c);
      });
    });
    // setDataAbsent(newData);
    return newData;
  };

  useEffect(() => {
    if (dataAbsent <= 1) {
      const getData = updateData();
      setDataAbsent(getData);
    }
  }, []);

  return (
    <DashboardCard
      title="Detail Total Absen Bulan Ini"
      subtitle="Ample Admin Vs Pixel Admin"
      customdisplay="block"
      custommargin="20px"
      // action={<ThemeSelect />}
      cardSx={{ px: 0 }}
    >
      <Box
        sx={{
          overflowY: "scroll",
          height: "480px",
          mt: -3,
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
              <TableCell align="center">
                <Typography variant="h5">Nama Lengkap</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Jumlah Masuk</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Jumlah Lembur</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Jumlah Izin</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Jumlah Sakit</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h5">Jumlah Cuti</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataAbsent?.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell sx={{ maxWidth: "200px" }}>
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={item.image ? `${baseImageUrl}/${item.image}` : ""}
                        alt={item.fullname}
                        sx={{ mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body1">{item.fullname}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{item.in}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{item.overtime}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{item.permit}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{item.sick}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{item.leave}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default TableUser;
