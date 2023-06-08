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
import React, { useState } from "react";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import DashboardCard from "../baseCard/DashboardCard";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddLocationModal from "../modal/locationModal/AddLocationModal";
import DeleteLocationModal from "../modal/locationModal/DeleteLocationModal";
import EditLocationModal from "../modal/locationModal/EditLocationModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_LOCATION_POINT } from "../../../utils/table-heads/tableHeadManagement";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

const LocationPointLists = ({ data }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = useState(true);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataLocationEdit, setDataLocationEdit] = React.useState({});
  const [dataLocaltionDelete, setDataLocationDelete] = React.useState({});

  const locationEdit = (dataLocation) => {
    if (dataLocation) {
      setDataLocationEdit(dataLocation);
      handleOpenModal("edit");
    }
    return;
  };
  const locationDelete = (dataLocation) => {
    if (dataLocation) {
      setDataLocationDelete(dataLocation);
      handleOpenModal("delete");
    }
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
      <AddLocationModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditLocationModal
        open={openModal}
        type={modalType}
        data={dataLocationEdit}
        closeModalHandler={handleCloseModal}
      />
      <DeleteLocationModal
        open={openModal}
        type={modalType}
        data={dataLocaltionDelete}
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
          tableHead={HEAD_ROWS_MANAGEMENT_LOCATION_POINT}
          data={data}
          noWrap={true}
        >
          {data.data.map((location) => (
            <TableRow key={location.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {location?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {location?.latitude ?? "-"}
                </Typography>
              </TableCell>

              {/* job level */}
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {location?.longitude ?? "-"}
                </Typography>
              </TableCell>

              <TableCell width={"500px"}>
                <Typography variant="h6" fontWeight="600">
                  {location?.description ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={location}
                  token={data}
                  onClickEdit={() => locationEdit(location)}
                  onClickDelete={() => locationDelete(location)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default LocationPointLists;
