import {
  Avatar,
  Box,
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import moment from "moment";
import "moment/locale/id";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_USER_CUTI } from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import {
  StatusAproved,
  StatusPending,
  StatusRejected,
} from "../activity/ActivityStatusMessages";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import ApproveModal from "../modal/approval-cuti/ApproveModal";
import RejectModal from "../modal/approval-cuti/RejectModal";
import BaseTable from "../table/BaseTable";
import { statusMapping } from "../../../utils/statusMapping";
moment.locale("id");

const options = [
  {
    label: "Approve Cuti",
    type: "approve",
  },
  {
    label: "Reject Cuti",
    type: "reject",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const CutiList = ({ data }) => {
  const [dataActivity, setDataActivity] = React.useState(data);

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

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

  const router = useRouter();

  const [clearInputDate, setClearInputDate] = React.useState(false);

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
    router.replace("/laporan/cuti");
  };

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
      <ApproveModal
        open={openModal}
        type={modalType}
        data={dataUserApproval}
        closeModalHandler={handleCloseModal}
      />
      <RejectModal
        open={openModal}
        type={modalType}
        data={dataUserReject}
        closeModalHandler={handleCloseModal}
      />
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_USER_CUTI} data={data}>
          {data.data.map((activity, index) => (
            <TableRow key={index} hover role="checkbox" tabIndex={-1}>
              {/* photo */}
              <TableCell sx={{ width: "80px" }}>
                {activity.user?.photo ? (
                  <Image
                    onLoad={() => <>loading</>}
                    src={`${BASE_URL}/${activity?.user?.photo}`}
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
              {/* menghubungkan time in */}
              <TableCell>
                {activity.leave_date_from && activity.leave_date_from ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(activity.leave_date_from).format("DD MMM YYYY") +
                        " - " +
                        moment(activity.leave_date_to).format("DD MMM YYYY") ??
                        "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell size="small">
                <Typography variant="h6" fontWeight="600">
                  {moment(activity.created_at).format("DD MMM YYYY")}
                </Typography>
              </TableCell>
              <TableCell size="small">
                <Typography variant="h6" fontWeight="600">
                  {activity.upliner_data?.fullname ?? "-"}
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
                <Typography variant="h6" fontWeight="600">
                  {activity?.leave_type?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell size="small">
                <Typography variant="h6" fontWeight="600">
                  {activity?.notes ?? "-"}
                </Typography>
              </TableCell>
              <TableCell size="small">
                {statusMapping(activity) === null ? (
                  <StatusPending />
                ) : statusMapping(activity) != null ? (
                  statusMapping(activity) ? (
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

export default CutiList;
