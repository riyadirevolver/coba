import {
  Button,
  Card,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_POSITION } from "../../../utils/table-heads/tableHeadManagement";
import { useDebounce } from "../../hooks/useDebounce";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddPosisiModal from "../modal/position/AddPosisiModal";
import DeletePosisiModal from "../modal/position/DeletePosisiModal";
import EditPosisiModal from "../modal/position/EditPosisiModal";
import BaseTable from "../table/BaseTable";
import AddDivisionModal from "../modal/division/AddDivisionModal";
import EditDivisionModal from "../modal/division/EditDivisionModal";
import DeleteDivisionModal from "../modal/division/DeleteDivisionModal";

const DivisionLists = ({ data }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [dataDivisionEdit, setDataDivisionEdit] = React.useState({});
  const [dataDivisionDelete, setDataDivisionDelete] = React.useState({});

  const PosisiEdit = (posisiData) => {
    if (posisiData) {
      setDataDivisionEdit(posisiData);
      handleOpenModal("edit");
    }
    return;
  };

  const PosisiDelete = (posisiData) => {
    if (posisiData) {
      setDataDivisionDelete(posisiData);
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
      <AddDivisionModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditDivisionModal
        open={openModal}
        type={modalType}
        data={dataDivisionEdit}
        closeModalHandler={handleCloseModal}
      />
      <DeleteDivisionModal
        open={openModal}
        type={modalType}
        data={dataDivisionDelete}
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_POSITION} data={data}>
          {data.data.map((positon) => (
            <TableRow key={positon.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {positon?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                {positon.created_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(positon.created_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(positon.created_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {positon.updated_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(positon.updated_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(positon.updated_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={positon}
                  token={data}
                  onClickEdit={() => PosisiEdit(positon)}
                  onClickDelete={() => PosisiDelete(positon)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default DivisionLists;
