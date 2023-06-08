import {
  Avatar,
  Box,
  Button,
  Card,
  Link,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import moment from "moment-timezone";
import { useRouter } from "next/router";
import {
  HEAD_ROWS_USER_EARLY_LEAVE,
  HEAD_ROWS_USER_PERJALAN_DINAS,
} from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import {
  StatusAproved,
  StatusPending,
  StatusRejected,
} from "../activity/ActivityStatusMessages";
import { UserImage } from "../activity/UserImage";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import BaseTable from "../table/BaseTable";
const options = [
  {
    label: "Approval Izin Pulang Cepat",
    type: "approve",
  },
  {
    label: "Reject Izin Pulang Cepat",
    type: "reject",
  },
];
const EarlyLeaveLists = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const router = useRouter();
  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);

  const userApproval = (type, userData) => {
    if (type === "approve") {
      setDataUserApproval(userData);
      handleOpenModal(type);
    } else if (type === "reject") {
      setDataUserApproval(userData);
      handleOpenModal(type);
    }
  };
  const handleClickDot = (type, data) => {
    userApproval(type, data);
  };

  const handleClear = () => {
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
    setClearInputDate(true);
    router.replace("/laporan/izin-pulang-cepat");
  };

  const onHandleClickDateSearch = async () => {
    const firstDate = moment(date[0].startDate);
    const endDate = moment(date[0].endDate);

    router.replace({
      pathname: router.pathname,
      query: {
        start_date: moment(firstDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
        page: 1,
        per_page: 10,
      },
    });
  };

  return (
    <>
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* <Box display="flex" flexWrap={"wrap"} mb={2} sx={{ width: "100%" }}>
          <DateRangePicker
            editableDateInputs={true}
            onChange={(item) => {
              setDate([item.selection]);
              setClearInputDate(false);
            }}
            moveRangeOnFirstSelection={false}
            ranges={date}
            clearInputDate={clearInputDate}
          />
          <Box component={"div"} className="group-search">
            <Button
              className="button-clear"
              variant="outlined"
              onClick={handleClear}
            >
              clear
            </Button>
            <Button
              className="button-search"
              variant="contained"
              onClick={onHandleClickDateSearch}
            >
              Search
            </Button>
          </Box>
        </Box> */}
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_USER_EARLY_LEAVE} data={data}>
          {data &&
            data.data.map((activity, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                {/* photo */}
                <TableCell sx={{ width: "80px" }}>
                  {activity?.user?.photo ? (
                    <UserImage path={activity?.user?.photo} />
                  ) : (
                    <Avatar {...stringAvatar(activity?.user?.fullname, 50)} />
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.user?.fullname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.upliner_data?.fullname ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.user?.job_departement?.name ?? "-"}
                  </Typography>
                </TableCell>
                {/* menghubungkan time in */}
                <TableCell>
                  {activity?.early_time_out ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity?.early_time_out).format(
                          "DD MMM YYYY"
                        ) ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(activity?.early_time_out).format("HH:mm:ss") ??
                          "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity?.early_leave_reason ?? "-"}
                  </Typography>
                </TableCell>

                <TableCell size="small">
                  {activity?.is_approved_early_leave === null ? (
                    <StatusPending />
                  ) : activity?.is_approved_early_leave != null ? (
                    activity?.is_approved_early_leave ? (
                      <>
                        {/* <CheckBoxIcon color="success" /> */}
                        <StatusAproved
                          note={activity?.early_leave_reject_reason}
                        />
                      </>
                    ) : (
                      <>
                        {/* <CancelIcon color="danger" /> */}
                        <StatusRejected
                          note={activity?.early_leave_reject_reason}
                        />
                      </>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default EarlyLeaveLists;
