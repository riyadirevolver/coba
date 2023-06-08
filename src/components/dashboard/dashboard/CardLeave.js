import React from "react";
import DashboardCard from "../../baseCard/DashboardCard";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CardLeave = ({ data }) => {
  return (
    <DashboardCard
      title={"Karyawan yang sedang cuti hari ini"}
      cardContentSx={{
        paddingTop: 0,
      }}
      cardSx={{ maxHeight: "450px", px: 0 }}
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
          {data.total}
        </Typography>
      </Box>
      <Box overflow={"auto"} height={"300px"} className="custom__scroll">
        {data.dataUser.map((user, idx) => {
          return (
            <Box
              key={idx}
              width="100%"
              
              py={1}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              pr={1}
            >
              <Box display={"flex"} flexDirection={"column"} ml={1}>
                <Typography fontWeight={500} className="color__user_dashboard">
                  {user.fullname}
                </Typography>
                <Typography
                  fontSize={9}
                  className="color__user__secondary_dashboard"
                >
                  {user.jobDepartement}
                </Typography>
              </Box>

              <Box>
                <Typography
                  fontSize={12}
                  className="color__user__secondary_dashboard"
                >
                  {user.nik}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </DashboardCard>
  );
};

export default CardLeave;
