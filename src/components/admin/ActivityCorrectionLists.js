import React, { useEffect } from "react";
import {
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Card,
  Avatar,
} from "@mui/material";

import DashboardCard from "../baseCard/DashboardCard";
import moment from "moment-timezone";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import useHandleModal from "../../hooks/useHandleModal";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import { useRouter } from "next/router";
import ModalExportExcel from "../modal/exportExcel/ModalExportExcel";
import usePagination from "../../hooks/usePagination";
import { STATUS_ACTIVITY } from "../../../utils/status-activity";
import ApproveModal from "../modal/approval-activity-correction/ApproveModal";
import RejectModal from "../modal/approval-activity-correction/RejectModal";
import BaseTable from "../table/BaseTable";
import { UserImage } from "../activity/UserImage";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import {
  StatusAproved,
  StatusPending,
  StatusRejected,
} from "../activity/ActivityStatusMessages";
import { HEAD_ROWS_USER_KOREKSI } from "../../../utils/table-heads/tableHeadRows";
import { statusMappingCorrection } from "../../../utils/statusMapping";

const options = [
  {
    label: "Approval Koreksi",
    type: "approve",
  },
  {
    label: "Reject Koreksi",
    type: "reject",
  },
];
const ActivityCorrectionLists = ({ data, id_user }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const router = useRouter();
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
    router.replace("/laporan/koreksi");
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
        id_user={id_user}
        closeModalHandler={handleCloseModal}
      />
      <RejectModal
        open={openModal}
        type={modalType}
        data={dataUserApproval}
        id_user={id_user}
        closeModalHandler={handleCloseModal}
      />
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_USER_KOREKSI} data={data}>
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
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity.upliner2_data?.fullname ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  <Typography variant="h6" fontWeight="600">
                    {activity.upliner3_data?.fullname ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  {activity.date_in ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity.date_in).format("DD MMM YYYY") ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(activity.date_in).format("HH:mm:ss") ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  {activity.date_out ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity.date_out).format("DD MMM YYYY") ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(activity.date_out).format("HH:mm:ss") ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell size="small">
                  {statusMappingCorrection(activity) === null ? (
                    <StatusPending />
                  ) : statusMappingCorrection(activity) != null ? (
                    statusMappingCorrection(activity) ? (
                      <>
                        {/* <CheckBoxIcon color="success" /> */}
                        <StatusAproved note={activity?.reject_reason} />
                      </>
                    ) : (
                      <>
                        {/* <CancelIcon color="danger" /> */}
                        <StatusRejected note={activity?.reject_reason} />
                      </>
                    )
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="h6"
                    fontWeight="600"
                    color="textSecondary"
                    sx={{ width: "100%" }}
                  >
                    {activity?.approve_by?.fullname ?? "-"}
                  </Typography>
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

export default ActivityCorrectionLists;
