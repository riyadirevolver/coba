import {
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
import { Box } from "@mui/system";
import moment from "moment";
import React from "react";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import DashboardCard from "../baseCard/DashboardCard";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddDepartementsModal from "../modal/departements/AddDepartementsModal";
import DeleteDepartementsModal from "../modal/departements/DeleteDepartementsModal";
import EditDepartementsModal from "../modal/departements/EditDepartementsModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_DEPARTEMENT } from "../../../utils/table-heads/tableHeadManagement";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

const DepartementsLists = ({ departements }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);
  const [dataDepart] = React.useState(departements.data);

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const [dataDepartementsEdit, setDataDepartementsEdit] = React.useState({});
  const [dataDepartementsDelete, setDataDepartementsDelete] = React.useState(
    {}
  );

  const DepartementsEdit = (departementsData) => {
    if (departementsData) {
      setDataDepartementsEdit(departementsData);
      handleOpenModal("edit");
    }
    return;
  };

  const DepartementsDelete = (departementsData) => {
    if (departementsData) {
      setDataDepartementsDelete(departementsData);
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
      <AddDepartementsModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditDepartementsModal
        open={openModal}
        type={modalType}
        data={dataDepartementsEdit}
        closeModalHandler={handleCloseModal}
      />

      <DeleteDepartementsModal
        open={openModal}
        type={modalType}
        data={dataDepartementsDelete}
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
        <BaseTable
          tableHead={HEAD_ROWS_MANAGEMENT_DEPARTEMENT}
          data={departements}
        >
          {departements.data.map((depart) => (
            <TableRow key={depart.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {depart?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {depart?.created_at
                    ? moment(depart?.created_at).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {depart?.updated_at
                    ? moment(depart?.updated_at).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={depart}
                  token={departements}
                  onClickEdit={() => DepartementsEdit(depart)}
                  onClickDelete={() => DepartementsDelete(depart)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default DepartementsLists;
