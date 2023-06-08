import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import DashboardCard from "../baseCard/DashboardCard";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import ApproveModal from "../modal/approval-business-trips/ApproveModal";
import RejectModal from "../modal/approval-business-trips/RejectModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_USER_PERJALAN_DINAS } from "../../../utils/table-heads/tableHeadRows";
import { UserImage } from "../activity/UserImage";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import {
  StatusAproved,
  StatusPending,
  StatusRejected,
} from "../activity/ActivityStatusMessages";
const options = [
  {
    label: "Approval Perjalanan Dinas",
    type: "approve",
  },
  {
    label: "Reject Perjalanan Dinas",
    type: "reject",
  },
];
const BusinessTripsLists = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const router = useRouter();
  const baseImageUrl = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
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
    router.replace("/laporan/perjalanan-dinas");
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
    <>
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
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_USER_PERJALAN_DINAS} data={data}>
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
                    {activity?.upliner_data?.fullname}
                  </Typography>
                </TableCell>
                {/* menghubungkan time in */}
                <TableCell>
                  {activity.trip_date ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity.trip_date).format("DD MMM YYYY") ??
                          "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(activity.trip_date).format("HH:mm:ss") ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity?.document ? (
                      <Tooltip
                        key={`perjalanan-dinas-${activity?.id}`}
                        title={`Klik untuk lihat dokumen ${activity?.user?.fullname}`}
                      >
                        <a
                          rel="noopener noreferrer"
                          target="_blank"
                          href={`${baseImageUrl}/${activity?.document}`}
                        >
                          <Link component="button" underline="none">
                            <Typography
                              color={(theme) => theme.palette.info.main}
                              sx={{
                                fontSize: "h6.fontSize",
                              }}
                            >
                              View
                            </Typography>
                          </Link>
                        </a>
                      </Tooltip>
                    ) : (
                      "Belum Upload"
                    )}
                  </Typography>
                </TableCell>

                <TableCell size="small">
                  {activity?.is_approved === null ? (
                    <StatusPending />
                  ) : activity?.is_approved != null ? (
                    activity?.is_approved ? (
                      <>
                        {/* <CheckBoxIcon color="success" /> */}
                        <StatusAproved note={activity?.reject_notes} />
                      </>
                    ) : (
                      <>
                        {/* <CancelIcon color="danger" /> */}
                        <StatusRejected note={activity?.reject_notes} />
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
      </Card>
    </>
  );
};

export default BusinessTripsLists;
