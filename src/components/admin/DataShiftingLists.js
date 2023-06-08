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
import React from "react";
import { getShifting } from "../../../lib/services/shifting";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import DashboardCard from "../baseCard/DashboardCard";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddShiftingModal from "../modal/shiftingModal/AddShiftingModal";
import DeleteShiftingModal from "../modal/shiftingModal/DeleteShiftingModal";
import EditShiftingModal from "../modal/shiftingModal/EditShiftingModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_SHIFTING } from "../../../utils/table-heads/tableHeadManagement";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

export async function getServerSideProps({ query }) {
  const shifting = await getShifting();

  return {
    props: {
      shifting,
    },
  };
}

const DataShiftingLists = ({ data }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataShiftingEdit, setDataShiftingEdit] = React.useState({});
  const [dataShiftingDelete, setDataShiftingDelete] = React.useState({});

  const shiftingEdit = (shiftingData) => {
    if (shiftingData) {
      setDataShiftingEdit(shiftingData);
      handleOpenModal("edit");
    }
    return;
  };

  const shiftingDelete = (shiftingData) => {
    if (shiftingData) {
      setDataShiftingDelete(shiftingData);
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
      <AddShiftingModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditShiftingModal
        open={openModal}
        type={modalType}
        data={dataShiftingEdit}
        closeModalHandler={handleCloseModal}
      />
      <DeleteShiftingModal
        open={openModal}
        type={modalType}
        data={dataShiftingDelete}
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_SHIFTING} data={data}>
          {data.data.map((shifting) => (
            <TableRow key={shifting.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {shifting?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {shifting?.from ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {shifting?.to ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                {shifting.created_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(shifting.created_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(shifting.created_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {shifting.updated_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(shifting.updated_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(shifting.updated_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={shifting}
                  token={data}
                  onClickEdit={() => shiftingEdit(shifting)}
                  onClickDelete={() => shiftingDelete(shifting)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default DataShiftingLists;
