import React from "react";
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
  TextField,
} from "@mui/material";
import DashboardCard from "../baseCard/DashboardCard";
import Image from "next/image";
import moment from "moment";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import ApproveModal from "../modal/approval-overtime/ApproveModal";
import RejectModal from "../modal/approval-overtime/RejectModal";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/router";
import usePagination from "../../hooks/usePagination";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_USER_OVERTIME } from "../../../utils/table-heads/tableHeadRows";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import {
  StatusAproved,
  StatusPending,
  StatusRejected,
} from "../activity/ActivityStatusMessages";
import { statusMapping } from "../../../utils/statusMapping";

const options = [
  {
    label: "Approve Lembur",
    type: "approve",
  },
  {
    label: "Reject Lembur",
    type: "reject",
  },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const OvertimeRequestList = ({ data }) => {
  // data acctivity
  const [dataActivity, setDataActivity] = React.useState(data ?? []);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [dataUserReject, setDataUserReject] = React.useState({});
  const [input, setInput] = React.useState("");

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
    router.replace("/laporan/overtime");
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
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* tabel */}
        <BaseTable
          tableHead={HEAD_ROWS_USER_OVERTIME}
          data={data}
          noWrap={true}
        >
          {data.data.map((activity, index) => (
            <TableRow key={index} hover role="checkbox" tabIndex={-1}>
              {/* photo */}
              <TableCell sx={{ width: "80px" }}>
                {activity?.user?.photo ? (
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
              <TableCell width="250px">
                {activity?.overtime_in || activity?.overtime_out ? (
                  <>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {moment(activity?.overtime_in).format(
                            "DD MMM YYYY"
                          ) ?? "-"}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          fontWeight="600"
                        >
                          {moment(activity?.overtime_in).format("HH:mm:ss") ??
                            "-"}
                        </Typography>
                      </Box>
                      {" - "}
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {moment(activity?.overtime_out).format(
                            "DD MMM YYYY"
                          ) ?? "-"}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="h6"
                          fontWeight="600"
                        >
                          {moment(activity?.overtime_out).format("HH:mm:ss") ??
                            "-"}
                        </Typography>
                      </Box>
                    </Box>
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
                  {activity?.notes ?? "-"}
                </Typography>
              </TableCell>
              <TableCell size="small">
                {statusMapping(activity) === null ? (
                  <StatusPending />
                ) : statusMapping(activity) != null ? (
                  statusMapping(activity) ? (
                    <StatusAproved note={activity?.reject_notes} />
                  ) : (
                    <StatusRejected note={activity?.reject_notes} />
                  )
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <ThreeDots
                  sx={{ textAlign: "right", mr: -2 }}
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
          data={dataUserReject}
          closeModalHandler={handleCloseModal}
        />
      </Card>
    </>
  );
};

export default OvertimeRequestList;
