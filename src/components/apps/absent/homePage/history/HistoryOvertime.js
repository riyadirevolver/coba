import { Box, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import React from "react";
import NextLink from "next/link";
import { IS_APPROVED, COLOR_APPROVED } from "../../../../../../utils/approved";

const HistoryOvertime = ({
  id,
  fullname,
  photo,
  idx,
  overtime_in,
  overtime_out,
  is_approved,
  notes,
  reject_notes,
  dayName,
}) => {
  return (
    <NextLink href={"/apps/absent/overtime/" + id}>
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
            {dayName}, {moment(overtime_in).format("DD MMMM YYYY")}
          </Typography>
          <Typography>{notes ? notes : "-"}</Typography>
          <Typography>
            {moment(overtime_in).format("HH:mm")} -{" "}
            {overtime_out
              ? moment(overtime_out).format("HH:mm, DD MMMM YYYY")
              : "-"}
          </Typography>
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

export default HistoryOvertime;
