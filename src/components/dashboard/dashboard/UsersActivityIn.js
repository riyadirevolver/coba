import { Avatar, Box } from "@mui/material";
import React from "react";
import DashboardCard from "../../baseCard/DashboardCard";

const baseImageUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const UsersActivityIn = ({ data }) => {
  return (
    <DashboardCard title="Masuk Hari Ini" cardSx={{ height: "450px" }}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={"flex-start"}
        sx={{ width: "100%", flexWrap: "wrap" }}
      >
        {data.map((item) => (
          <Box key={item.user.id} pr={1} pb={1}>
            <Avatar
              src={`${baseImageUrl}/${item.check_in_photo}`}
              alt={item.fullname}
              sx={{
                width: "50px",
                height: "50px",
              }}
            />
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
};

export default UsersActivityIn;
