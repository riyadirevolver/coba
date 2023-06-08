/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  Link,
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
import moment from "moment";
import "moment/locale/id";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { HEAD_ROWS_USER_SAKIT } from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import DashboardCard from "../baseCard/DashboardCard";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import ApproveModal from "../modal/approval-activity/ApproveModal";
import RejectModal from "../modal/approval-activity/RejectModal";

import { UserImage } from "../activity/UserImage";
import BaseTable from "../table/BaseTable";
moment.locale("id");

const IMAGE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const options = [
  {
    label: "Approve ",
    type: "approve",
  },
  {
    label: "Reject",
    type: "reject",
  },
];

const SickList = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [dataUserReject, setDataUserReject] = React.useState({});
  const [typeAprove, setTypeAprove] = React.useState({});
  const [dataImagePreview, setDataImagePreview] = React.useState("");

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const router = useRouter();

  const [clearInputDate, setClearInputDate] = React.useState(false);

  const handleClickDot = (type, data) => {
    userApproval(type, data);
  };

  const userApproval = (type, userData) => {
    if (type === "approve") {
      setDataUserApproval(userData);
      setTypeAprove("SAKIT");
      handleOpenModal(type);
    } else if (type === "reject") {
      setDataUserReject(userData);
      setTypeAprove("SAKIT");
      handleOpenModal(type);
    }
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
    router.replace("/laporan/sakit");
  };

  const onHandleClickDateSearch = async () => {
    const firstDate = moment(date[0].startDate).format("YYYY-MM-DD 05:00");
    const endDate = moment(date[0].endDate).format("YYYY-MM-DD 23:59");

    router.replace({
      pathname: router.pathname,
      query: {
        start_date: moment(firstDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      },
    });
  };

  const convertToDay = (dateTo, dateFrom) => {
    const date = moment(dateFrom);
    const diff = date.diff(dateTo, "days") + 1;
    return diff;
  };

  const handleImagePreview = (imgURL) => {
    // setIsPreviewImage(true);
    setDataImagePreview(imgURL);
  };

  return (
    <>
      <ApproveModal
        open={openModal}
        type={modalType}
        data={dataUserApproval}
        closeModalHandler={handleCloseModal}
        typeAprove={typeAprove}
      />
      <RejectModal
        open={openModal}
        type={modalType}
        data={dataUserReject}
        closeModalHandler={handleCloseModal}
        typeAprove={typeAprove}
      />
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <img
            src={`${IMAGE_URL}/${dataImagePreview}`}
            alt="Photo sakit"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </DialogContent>
      </Dialog>
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_USER_SAKIT} data={data}>
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
                {/* menghubungkan time in */}
                <TableCell>
                  {activity.sick_request_date_from &&
                  activity.sick_request_date_from ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(activity.sick_request_date_from).format(
                          "DD MMM YYYY"
                        ) +
                          " - " +
                          moment(activity.sick_request_date_to).format(
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
                  <Typography variant="h6" fontWeight="600">
                    {activity.user_sick_document?.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          onLoad={() => <>loading</>}
                          src={`${IMAGE_URL}/${item.document}` ?? photo}
                          alt="photo sakit"
                          // layout="responsive"
                          objectFit="cover"
                          width={"50px"}
                          height={"40px"}
                        />
                        <Box display="flex" justifyContent="center">
                          <Link
                            ml={2}
                            mr={1}
                            onClick={() => {
                              handleOpenModal(true);
                              setDataImagePreview(item.document);
                            }}
                            sx={{ cursor: "pointer" }}
                            underline="hover"
                          >
                            {"View"}
                          </Link>
                          |
                          <Link
                            ml={1}
                            href={`${IMAGE_URL}/${item.document}`}
                            target="_blank"
                            rel="noreferrer"
                            underline="hover"
                          >
                            {"Download"}
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </Typography>
                </TableCell>

                {/* <TableCell>
                        <ThreeDots
                          sx={{ textAlign: "right" }}
                          options={options}
                          onClick={(show) => handleClickDot(show, activity)}
                        />
                      </TableCell> */}
              </TableRow>
            ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default SickList;
