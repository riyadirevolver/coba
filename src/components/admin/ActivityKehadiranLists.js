import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  FormHelperText,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import moment from "moment-timezone";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { STATUS_ACTIVITY } from "../../../utils/status-activity";
import { HEAD_ROWS_USER } from "../../../utils/table-heads/tableHeadRows";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import { useSnackbar } from "../../hooks/useSnackbar";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import { editTimeOuteValidation } from "../../validations/activityValidations";
import ControlledDateTimePicker from "../forms/DateTimePicker/ControlledDateTimePicker";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import ApproveModal from "../modal/approval-all/ApproveModal";
import RejectModal from "../modal/approval-all/RejectModal";
import ModalExportExcel from "../modal/exportExcel/ModalExportExcel";
import MapUserModal from "../modal/userModal/MapUserModal";
import BaseTable from "../table/BaseTable";

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

const ActivityKehadiranLists = ({ data, companyId }) => {
  const router = useRouter();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const [dataUserApproval, setDataUserApproval] = React.useState({});
  const [isEditUser, setIsEditUser] = React.useState(null);
  const [dataTimeOut, setDataTimeOut] = React.useState("");
  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm({
    resolver: yupResolver(editTimeOuteValidation),
  });

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
    router.replace(router.pathname);
    setClearInputDate(true);
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

  const [userLocation, setUserLocation] = React.useState({});
  const userMap = (value) => {
    if (value) {
      setUserLocation(value);
      handleOpenModal("map");
    }
    return;
  };

  const handleSubmitEdit = async (values) => {
    const toUTC = new moment(values.time_out).utc();
    const timeOUt = toUTC.format();

    const payload = { time_out: timeOUt };

    await axios.patch(`/api/activity/edit-activity/${values.id}`, payload);
    openSnackBar("Berhasil edit jam keluar");
    handleCancelEdit();
    router.replace(router.pathname);
  };

  const handleCancelEdit = () => {
    setDataTimeOut("");
    reset((formValues) => ({
      ...formValues,
      time_out: "",
      user_id: "",
    }));
    setIsEditUser(null);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </>
  );

  return (
    <Card
      sx={{
        padding: "20px 0 0",
        overflow: "visible",
      }}
    >
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <ModalExportExcel
        open={openModal}
        type={modalType}
        companyId={companyId}
        closeModalHandler={handleCloseModal}
      />
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
          <Box flexGrow={1} />
          <Button
            variant="contained"
            className="button-search"
            sx={{
              ml: "10px",
            }}
            onClick={clickExport}
          >
            Export
          </Button>
        </Box>
      </Box> */}
      {/* Table */}
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box flexGrow={1} />
        <Button
          variant="contained"
          color="primary"
          sx={{
            ml: "10px",
            margin: "0 20px 20px",
            width: "120px",
            background: "#1ba0e2",
            border: "2px solid #1ba0e2",
          }}
          onClick={clickExport}
        >
          Export
        </Button>
      </Box>
      <BaseTable tableHead={HEAD_ROWS_USER} data={data}>
        {data.data.map((activity, index) => (
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
              <Button
                sx={{
                  color: "black",
                  width: "100%",
                  textAlign: "left",
                }}
                data={activity}
                onClick={() => userMap(activity)}
              >
                <Typography
                  variant="h6"
                  fontWeight="600"
                  color="textSecondary"
                  sx={{ width: "100%" }}
                >
                  {activity?.user?.fullname ?? "-"}
                </Typography>
              </Button>
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
              {isEditUser === activity.id ? (
                <Box display="flex" flexDirection="column" maxWidth="273px">
                  <ControlledDateTimePicker
                    name="time_out"
                    onChange={(e) => setValue("time_out", e._d)}
                    value={
                      watch("time_out")
                        ? watch("time_out")
                        : moment(activity.time_out)
                    }
                    defaultValue={moment(activity.time_out)}
                    control={control}
                    error={errors}
                  />
                  {errors && errors.time_out ? (
                    <FormHelperText error={errors && errors.time_out}>
                      Tanggal dan jam harus diisi!.
                    </FormHelperText>
                  ) : null}
                  <Box
                    mt={1}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="contained"
                      sx={{ mr: 1 }}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit(handleSubmitEdit)}
                      variant="outlined"
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    setValue("id", activity.id);
                    setIsEditUser(activity.id);
                  }}
                  sx={{
                    cursor: "pointer",
                    "& :hover": {
                      backgroundColor: "rgba(0,0,0,.1)",
                    },
                  }}
                >
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
                </Box>
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
      <MapUserModal
        data={userLocation}
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />

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
  );
};

export default ActivityKehadiranLists;
