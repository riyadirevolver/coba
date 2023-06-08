import {
  Avatar,
  Box,
  Button,
  Card,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { HEAD_ROWS_USER_IZIN } from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import ApproveModal from "../modal/approval-izin/ApproveModal";
import RejectModal from "../modal/approval-izin/RejectModal";
import BaseTable from "../table/BaseTable";

const options = [
  {
    label: "Approve Izin",
    type: "approve",
  },
  {
    label: "Reject izin",
    type: "reject",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const IzinLists = ({ data }) => {
  // data acctivity
  const [dataActivity, setDataActivity] = React.useState(null);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [dataUserReject, setDataUserReject] = React.useState({});

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [clearInputDate, setClearInputDate] = React.useState(false);

  const router = useRouter();

  const userApproval = (type, userData) => {
    if (type === "approve") {
      setDataUserApproval(userData);
      handleOpenModal(type);
    } else if (type === "reject") {
      setDataUserReject(userData);
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
  };

  const fetchToday = async () => {
    const firsDate = moment(date[0].startDate).format("YYYY-MM-DD 05:00");
    const endDate = moment(date[0].endDate).format("YYYY-MM-DD 23:59");

    const res = await axios.get("/api/activity/izin", {
      params: {
        "created_at[$gte]": moment(firsDate).format("YYYY-MM-DD"),
        "created_at[$lte]": moment(endDate).format("YYYY-MM-DD"),
      },
    });
    setDataActivity(res.data);
  };
  useEffect(() => {
    if (router.isReady) {
      if (data) {
        setDataActivity(data);
      }
      if (!dataActivity) {
        fetchToday();
      }
    }
  }, [data, router]);

  const onHandleClickDateSearch = async () => {
    const firstDate = moment(date[0].startDate).format("YYYY-MM-DD 05:00");
    const endDate = moment(date[0].endDate).format("YYYY-MM-DD 23:59");

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
          <Box component={"div"} className="group-search" display="flex" px={2}>
            <Button
              className="button-clear"
              variant="outlined"
              onClick={handleClear}
              sx={{
                width: "100px",
                border: "2px solid #1BA0E2",
                color: "#1BA0E2",
              }}
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
        <BaseTable tableHead={HEAD_ROWS_USER_IZIN} data={data}>
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
                    {activity?.user?.job_departement?.name ?? "-"}
                  </Typography>
                </TableCell>
                {/* menghubungkan time in */}
                <TableCell>
                  {activity.izin_request_date ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity.izin_request_date).format(
                          "DD MMM YYYY"
                        ) ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity?.notes ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  {activity?.is_approved_izin != null ? (
                    activity?.is_approved_izin ? (
                      <>
                        {/* <CheckBoxIcon color="success" /> */}
                        <Box
                          sx={{
                            background: "#CDFFCD",
                            color: "#007F00",
                            display: "flex",
                            width: "100px",
                            p: "2px 2px 2px 8px",
                            borderRadius: "100px",
                          }}
                        >
                          <li></li>
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{ ml: -1 }}
                          >
                            APPROVED
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          Notes : {activity?.reject_reason_izin ?? "-"}
                        </Typography>
                      </>
                    ) : (
                      <>
                        {/* <CancelIcon color="danger" /> */}
                        <Box
                          sx={{
                            background: "#FFACAC",
                            color: "#7F0000",
                            display: "flex",
                            width: "80px",
                            p: "2px 2px 2px 8px",
                            borderRadius: "100px",
                          }}
                        >
                          <li></li>
                          <Typography
                            variant="h6"
                            fontWeight="600"
                            sx={{ ml: -1 }}
                          >
                            REJECT
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          Notes : {activity?.reject_reason_izin ?? "-"}
                        </Typography>
                      </>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <ThreeDots
                    sx={{ textAlign: "right" }}
                    options={options}
                    onClick={(show) => handleClickDot(show, activity)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </BaseTable>
        <ApproveModal
          open={openModal}
          type={modalType}
          data={dataUserApproval}
          closeModalHandler={handleCloseModal}
        />
        <RejectModal
          open={openModal}
          type={modalType}
          data={dataUserApproval}
          closeModalHandler={handleCloseModal}
        />
      </Card>
    </>
  );
};

export default IzinLists;
