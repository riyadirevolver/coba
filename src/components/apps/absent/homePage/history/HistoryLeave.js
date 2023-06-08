import { Box, Typography } from "@mui/material";
import moment from "moment";
import NextLink from "next/link";
import React from "react";
import { COLOR_APPROVED, IS_APPROVED } from "../../../../../../utils/approved";

const HistoryLeave = ({
  id,
  fullname,
  is_approved,
  idx,
  leave_date_from,
  leave_date_to,
  leave_type,
  dayName,
  reject_notes,
}) => {
  return (
    <NextLink href={"/apps/absent/leave/" + id}>
      <Box
        display="flex"
        mb={2}
        sx={{
          background: " #FFFFFF",
          border: "1.03498px solid #F4F6F9",
          borderRadius: "20px",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        <Box
          className="image-wrapper"
          position="relative"
          width="75px"
          padding="60px 0"
          textAlign="center"
          sx={{
            background: "#1BA0E2",
            color: "#ffff",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          {fullname
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </Box>
        <Box p={1} pl={3}>
          <Typography fontWeight={700} color="#1BA0E2">
            {fullname}
          </Typography>
          <Typography fontWeight={700}>
            {dayName}, {moment(leave_date_from).format("DD MMMM YYYY")}
          </Typography>
          <Typography>
            Dari {moment(leave_date_from).format("HH:mm")} -{" "}
            {leave_date_to
              ? moment(leave_date_to).format("HH:mm, DD MMMM YYYY")
              : "-"}
          </Typography>
          <Typography>{leave_type ? leave_type : "-"}</Typography>
          <Typography color={COLOR_APPROVED[is_approved]}>
            {IS_APPROVED[is_approved]}
          </Typography>
          {is_approved === false && (
            <Typography>Notes : {reject_notes ?? "-"}</Typography>
          )}
        </Box>
      </Box>
    </NextLink>
  );
};

export default HistoryLeave;
