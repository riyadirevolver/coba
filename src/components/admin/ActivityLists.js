import {
  Avatar,
  Box,
  Button,
  Card,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import moment from "moment-timezone";
import "moment/locale/id";
import Image from "next/image";
import { useRouter } from "next/router";
import { STATUS_ACTIVITY } from "../../../utils/status-activity";
import { HEAD_ROWS_USER } from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import BaseTable from "../table/BaseTable";
moment.locale("id");
const options = [
  {
    label: "Approve Absen",
    type: "approve",
  },
  {
    label: "Reject Absen",
    type: "reject",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const ActivityLists = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const router = useRouter();

  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [departementName, setDepartementName] = React.useState("");

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);

  const handleDepartement = (field) => {
    departemen.data.forEach((item) => {
      if (item.id === field) {
        setDepartementName(item.name);
      }
    });
  };

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
    router.replace("/laporan/all");
  };

  const clickExport = async () => {
    handleOpenModal("report");
    return;
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
        <Box component={"div"} className="group-search" display="flex">
          <Button
            className="button-clear"
            variant="outlined"
            onClick={handleClear}
          >
            clear
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "100px",
              border: "2px solid #1BA0E2",
              // color: "#1BA0E2",
              background: "#1BA0E2",
            }}
            onClick={onHandleClickDateSearch}
          >
            Search
          </Button>
        </Box>
      </Box> */}
      {/* tabel */}
      <BaseTable tableHead={HEAD_ROWS_USER} data={data}>
        {data &&
          data.data.map((activity, index) => (
            <TableRow key={index} hover role="checkbox" tabIndex={-1}>
              {/* photo */}
              <TableCell sx={{ width: "80px" }}>
                {activity?.check_in_photo ? (
                  <Image
                    onLoad={() => <>loading</>}
                    src={`${BASE_URL}/${activity?.check_in_photo}`}
                    alt="banner"
                    // layout="responsive"
                    objectFit="cover"
                    width={"80px"}
                    height={"80px"}
                    className="roundedCircle"
                  />
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
                  {activity?.user?.job_departement?.name}
                </Typography>
              </TableCell>
              {/* menghubungkan time in */}
              <TableCell>
                {activity.time_in ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(activity.time_in).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(activity.time_in).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              {/* menghubungkan api time out */}
              <TableCell>
                {activity.time_out ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(activity.time_out).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(activity.time_out).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell size="small">
                <Typography variant="h6" fontWeight="600">
                  {activity?.status === "IN"
                    ? activity?.is_wfh
                      ? "Work From Home"
                      : "Work From Office"
                    : STATUS_ACTIVITY[activity?.status] ?? "-"}
                </Typography>
              </TableCell>
              <TableCell size="small">
                <Typography variant="h6" fontWeight="600">
                  {activity?.notes ?? "-"}
                </Typography>
              </TableCell>
              {/* <TableCell >
                    <ThreeDots
                      options={options}
                      onClick={(show) => handleClickDot(show, activity)}
                    />
                  </TableCell> */}
            </TableRow>
          ))}
      </BaseTable>
    </Card>
  );
};

export default ActivityLists;
