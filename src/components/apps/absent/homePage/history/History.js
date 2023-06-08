import { Box, IconButton, Typography } from "@mui/material";
import FeathersIcon from "feather-icons-react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import NextLink from "next/link";
import { dayNames } from "../../../../../constants/nameDates";

const STATUS_ACTIVITY = {
  OVERTIME: "Lembur",
  CUTI: "Cuti",
  BUSINESS_TRIP: "Perjalanan Dinas",
  SAKIT: "Sakit",
  IN: "Masuk",
};

const History = ({ dataHistory }) => {
  return (
    <Box mt="40px" paddingBottom="70px">
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight={700} color="#4F4F4F">
          History Absensi
        </Typography>
        <NextLink href="/apps/absent/activity">
          <Box
            display="flex"
            alignItems="center"
            sx={{
              cursor: "pointer",
            }}
          >
            <Typography color="#4F4F4F" fontSize="13px">
              Selengkapnya
            </Typography>
            <FeathersIcon icon="chevron-right" />
          </Box>
        </NextLink>
      </Box>
      <Box mt={2}>
        {dataHistory &&
          dataHistory?.map((history, idx) => {
            const {
              check_in_photo,
              is_approved,
              is_approved_in,
              is_approved_izin,
              is_approved_leave,
              is_approved_overtime,
              is_early_leave,
              is_late,
              is_verified,
              is_wfh,
              izin_request_date,
              late_permit_id,
              latitude,
              leave_note,
              leave_period_from,
              leave_period_to,
              leave_type_id,
              location_point_id,
              longitude,
              notes,
              overtime_date_to,
              overtime_in,
              overtime_note,
              overtime_out,
              overtime_request_date,
              reject_reason_in,
              reject_reason_izin,
              reject_reason_leave,
              reject_reason_overtime,
              sick_request_date_from,
              sick_request_date_to,
              status,
              time_in,
              time_out,
            } = history;
            const statusData =
              time_in ??
              overtime_in ??
              sick_request_date_from ??
              leave_period_from;
            const date = new Date(statusData);
            const getDayName = dayNames[date.getDay()];

            return (
              <Box
                display="flex"
                key={idx}
                mb={2}
                sx={{
                  background: " #FFFFFF",
                  border: "1.03498px solid #F4F6F9",
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
              >
                <Box className="image-wrapper" position="relative">
                  {history.check_in_photo ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${check_in_photo}`}
                      alt="Photo Check In"
                      width="96px"
                      height="120px"
                      quality={50}
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src="/static/images/no_images.jpeg"
                      alt="Photo Check In"
                      width="96px"
                      height="120px"
                      className="user__photo"
                      quality={50}
                    />
                  )}
                </Box>
                <Box p={1} pl={3}>
                  <Typography fontWeight={700} color="#1BA0E2">
                    {history.user.fullname}
                  </Typography>
                  <Typography
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                      },
                    }}
                  >
                    {getDayName}, {moment(statusData).format("DD MMMM YYYY")}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                      },
                    }}
                  >
                    {status === "IN"
                      ? is_wfh
                        ? "Work From Home"
                        : "Work From Office"
                      : STATUS_ACTIVITY[status]}
                  </Typography>
                  {overtime_in && (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      {"Lembur pukul "}
                      {overtime_in
                        ? moment(overtime_in).format("HH:mm")
                        : "-"}{" "}
                      -{" "}
                      {overtime_out
                        ? moment(overtime_out).format("HH:mm, DD MMMM YYYY")
                        : "-"}
                    </Typography>
                  )}
                  {time_in && (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      {"Masuk pukul "}
                      {time_in ? moment(time_in).format("HH:mm") : "-"} -{" "}
                      {time_out
                        ? moment(time_out).format("HH:mm, DD MMMM YYYY")
                        : "-"}
                    </Typography>
                  )}
                  {sick_request_date_from && (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      {sick_request_date_from
                        ? moment(sick_request_date_from).format("HH:mm")
                        : "-"}{" "}
                      -{" "}
                      {sick_request_date_to
                        ? moment(sick_request_date_to).format(
                            "HH:mm, DD MMMM YYYY"
                          )
                        : "-"}
                    </Typography>
                  )}
                  {leave_period_from && (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "14px",
                        },
                      }}
                    >
                      {leave_period_from
                        ? moment(leave_period_from).format("HH:mm")
                        : "-"}{" "}
                      -{" "}
                      {leave_period_to
                        ? moment(leave_period_to).format("HH:mm, DD MMMM YYYY")
                        : "-"}
                    </Typography>
                  )}

                  {/* <Typography>{STATUS_ACTIVITY[status] ?? "-"}</Typography> */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                      },
                    }}
                  >
                    Notes : {notes ?? "-"}
                  </Typography>
                </Box>
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};

export default History;
