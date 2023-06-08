import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import labelDisplayedRows from "../../../utils/labelDisplayedRows";
import { mapActivityStatus } from "../../../utils/mapActivityStatus";
import usePagination from "../../hooks/usePagination";
import Breadcrumb from "../../layouts/breadcrumb/Breadcrumb";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import ApproveModal from "../modal/approval-all/ApproveModal";
import RejectModal from "../modal/approval-all/RejectModal";
import useHandleModal from "../../hooks/useHandleModal";
import { useRouter } from "next/router";
import DateRangePicker from "../forms/dateRangePicker/DateRangePicker";
import DashboardCard from "../baseCard/DashboardCard";
// import AllActivityActionMenu from "../../menu-items/AllActivityActionMenu";
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
const AllActivityList = ({ data }) => {
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);
  const router = useRouter();
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

  const onHandleClickDateSearch = async () => {
    const firstDate = moment(date[0].startDate);
    const endDate = moment(date[0].endDate);

    router.replace({
      pathname: router.pathname,
      query: {
        start_date: moment(firstDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      },
    });
  };

  const [dataUserApproval, setDataUserApproval] = React.useState({});
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

  return (
    <DashboardCard
      title="Semua Activity"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
      cardSx={{
        overflow: "visible",
      }}
    >
      {/* <Box display="flex" justifyContent="space-between" mb={6} ml={12}>
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
        <Box display="flex" px={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            sx={{ mr: 3 }}
          >
            clear
          </Button>
          <Button
            variant="contained"
            onClick={
              onHandleClickDateSearch
              // ()=>console.log('click')
            }
          >
            Search
          </Button>
        </Box>
      </Box> */}

      <Card>
        <Box
          sx={{
            overflow: "auto",
            mt: "-4",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography textAlign="center" fontWeight="600">
                    NIK
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography textAlign="center" fontWeight="600">
                    Nama
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography textAlign="center" fontWeight="600">
                    Status
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography textAlign="center" fontWeight="600">
                    Jam Masuk
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography textAlign="center" fontWeight="600">
                    Jam Keluar
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography align="center" variant="h5">
                    Approved
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography align="center" variant="h5">
                    Reason
                  </Typography>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      textAlign="center"
                      fontWeight="500"
                      variant="h6"
                    >
                      {activity.user.nik ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      textAlign="center"
                      fontWeight="500"
                      variant="h6"
                    >
                      {activity.user.fullname}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      color="textSecondary"
                      textAlign="center"
                      fontWeight="500"
                      variant="h6"
                    >
                      {mapActivityStatus(activity.status)}
                    </Typography>
                  </TableCell>

                  {/* menghubungkan time in */}
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      align="center"
                    >
                      {activity.time_in
                        ? moment(activity.time_in).format(
                            "DD MMM YYYY, HH:mm:ss"
                          )
                        : "-"}
                    </Typography>
                  </TableCell>

                  {/* menghubungkan time in */}
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      align="center"
                    >
                      {activity.time_out
                        ? moment(activity.time_out).format(
                            "DD MMM YYYY, HH:mm:ss"
                          )
                        : "-"}
                    </Typography>
                  </TableCell>

                  {/* menghubungkan api approved */}
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      align="center"
                    >
                      {activity?.is_approved_in != null ? (
                        activity.is_approved_in ? (
                          <CheckBoxIcon color="success" />
                        ) : (
                          <CancelIcon color="danger" />
                        )
                      ) : (
                        "-"
                      )}
                    </Typography>
                  </TableCell>
                  {/* reject season */}
                  <TableCell size="small">
                    <Typography variant="h6" fontWeight="600" align="center">
                      {activity?.reject_reason_in}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <ThreeDots
                      options={options}
                      onClick={(show) => handleClickDot(show, activity)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={labelDisplayedRows}
            labelRowsPerPage="Data per halaman"
            showLastButton
            showFirstButton
          />
        </Box>

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
    </DashboardCard>
  );
};

export default AllActivityList;
