import useHandleModal from "../../hooks/useHandleModal";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import DashboardCard from "../baseCard/DashboardCard";
import { getSchedule } from "../../../lib/services/schedule";
import AddScheduleModal from "../modal/jadwalModal/AddScheduleModal";
import DeleteScheduleModal from "../modal/jadwalModal/DeleteScheduleModal";
import EditScheduleModal from "../modal/jadwalModal/EditScheduleModal";
import DetailScheduleModal from "../modal/jadwalModal/DetailScheduleModal";
import ThreeDotsMenuSchedule from "../menu-items/ThreeDotsMenuSchedule";
import usePagination from "../../hooks/usePagination";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_SCHEDULE } from "../../../utils/table-heads/tableHeadManagement";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

const typeSchedule = [
  {
    id: 1,
    name: "Jadwal kerja tetap",
  },
  {
    id: 2,
    name: "Jadwal kerja shift",
  },
  {
    id: 3,
    name: "Jadwal kerja flexible",
  },
];

export async function getServerSideProps() {
  const jadwal = await getSchedule();
  return {
    props: {
      jadwal,
    },
  };
}

const DataScheduleList = ({ jadwal, shifting }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  // memanggil data jadwal dan shifting
  const [schedule, setSchedule] = React.useState(jadwal.data);
  const [waktu, setWaktu] = React.useState(shifting.data);
  // memanggil action click edit dan delete
  const [dataJadwalDetail, setDataJadwalDetail] = React.useState({});
  const [dataJadwalEdit, setDataJadwalEdit] = React.useState({});
  const [dataJadwalDelete, setDataJadwalDelete] = React.useState({});

  // Detail Jadwal
  const jadwalDetail = (jadwalData) => {
    if (jadwalData) {
      setDataJadwalDetail(jadwalData);
      handleOpenModal("detail");
    }
    return;
  };

  const jadwalEdit = (jadwalData) => {
    if (jadwalData) {
      setDataJadwalEdit(jadwalData);
      handleOpenModal("edit");
    }
    return;
  };

  const jadwalDelete = (jadwalData) => {
    if (jadwalData) {
      setDataJadwalDelete(jadwalData);
      handleOpenModal("delete");
    }
    return;
  };

  const resetFilterDebounce = useDebounce(isFilter, 1000);
  React.useEffect(() => {
    if (!resetFilterDebounce) {
      setIsfilter(true);
    }
  }, [resetFilterDebounce]);

  const handleResetFilter = () => {
    formRef.current.reset();
    setIsfilter(false);
    router.replace({
      shallow: true,
    });
  };

  const handleSearch = async (event, data) => {
    event.preventDefault();
    const { target } = event;
    const { search } = target;
    router.replace({
      query: {
        "name[$like]": `%${search.value}%`,
      },
    });
  };

  return (
    <>
      <AddScheduleModal
        open={openModal}
        type={modalType}
        shifting={shifting}
        closeModalHandler={handleCloseModal}
      />
      <DetailScheduleModal
        open={openModal}
        type={modalType}
        data={dataJadwalDetail}
        shifting={shifting}
        closeModalHandler={handleCloseModal}
      />
      <EditScheduleModal
        open={openModal}
        type={modalType}
        data={dataJadwalEdit}
        shifting={shifting}
        closeModalHandler={handleCloseModal}
      />
      <DeleteScheduleModal
        open={openModal}
        type={modalType}
        data={dataJadwalDelete}
        closeModalHandler={handleCloseModal}
      />

      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            mb: 2,
            mr: 3,
            ml: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <form ref={formRef} onSubmit={handleSearch} className="form-search">
            <Box
              component="div"
              className="filter-search"
              // sx={{ display: "flex" }}
            >
              <TextField
                type="search"
                id="search"
                name="search"
                className="input-search"
                size="small"
                placeholder="cari berdasarkan nama"
              />
              <Button
                className="btn-reset"
                variant="text"
                color="warning"
                onClick={handleResetFilter}
                size="small"
              >
                Reset
              </Button>
              <Button
                className="btn-search"
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                // endIcon={<SearchIcon fontSize="small" />}
              >
                Search
              </Button>
            </Box>
          </form>

          {/* <Box flexGrow={1} /> */}
          <Button
            className="button-add"
            color="primary"
            variant="contained"
            onClick={() => handleOpenModal("add")}
          >
            Tambahkan
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_SCHEDULE} data={jadwal}>
          {jadwal.data.map((day, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="h6" fontWeight="500">
                  {day?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="500">
                  {typeSchedule[day?.type - 1].name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                {day.effective_date ? (
                  <Typography variant="h6" fontWeight="500">
                    {moment(day.effective_date).format("DD MMM YYYY") ?? "-"}
                  </Typography>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <ThreeDotsMenuSchedule
                  data={day}
                  token={jadwal}
                  onClickDetail={() => jadwalDetail(day)}
                  onClickEdit={() => jadwalEdit(day)}
                  onClickDelete={() => jadwalDelete(day)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};
export default DataScheduleList;
