import React from "react";
import DashboardCard from "../../baseCard/DashboardCard";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CardTotalEmployee = ({ data }) => {
  return (
    <DashboardCard
      title={"Total semua karyawan"}
      cardContentSx={{
        paddingTop: 0,
      }}
      cardSx={{ height: "450px", px: 0 }}
    >
      <Box borderBottom={"2px solid #F0F0F0"}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "52px",
            lineHeight: "63px",
            color: "#1BA0E2",
          }}
        >
          {data}
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default CardTotalEmployee;
