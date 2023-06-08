import { Typography, Box, Avatar, Paper, Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import APP_CONFIG from "../../../../app.config";
import DashboardCard from "../../baseCard/DashboardCard";

const baseImageUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const TotalAbsentList = ({ data }) => {
  const [dataAbsent, setDataAbsent] = useState(null);

  const updateData = () => {
    const newData = [];
    data.data.map((i) => {
      const fullname = i.fullname;
      i.data.map((v) => {
        const c = {
          fullname: fullname,
          image: i.photo,
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
      title="Total Absen Bulan Ini"
      cardSx={{ height: "100%", px: 0 }}
    >
      <Grid
        container
        spacing={2}
        style={{ overflowY: "scroll", height: "300px" }}
      >
        {dataAbsent?.map((item, idx) => (
          <Grid item xs={12} sm={6} md={5} lg={5} key={idx}>
            <Paper>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                p={1}
                py={2}
                sx={{ minHeight: "100px" }}
              >
                <Avatar
                  src={item.image ? `${baseImageUrl}/${item.image}` : ""}
                  alt={item.fullname}
                  sx={{ mr: 2, width: 50, height: 50 }}
                />
                <Box display="flex" flexDirection="column">
                  <Box
                    display="flex"
                    flexDirection="row"
                    sx={{
                      md: {
                        flexWrap: "wrap",
                      },
                    }}
                  >
                    <Typography color="gray">Nama:</Typography>
                    <Typography sx={{ pl: 1 }}>{item.fullname}</Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    sx={{
                      md: {
                        flexWrap: "wrap",
                      },
                    }}
                  >
                    <Typography color="gray">Total:</Typography>
                    <Typography sx={{ pl: 1, fontWeight: 600 }}>
                      {item.total}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};

export default TotalAbsentList;
