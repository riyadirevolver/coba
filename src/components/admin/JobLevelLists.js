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
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { getJobLevel } from "../../../lib/services/joblevel";
import DashboardCard from "../baseCard/DashboardCard";
import AddJobLevelModal from "../modal/job-level/AddJobLevelModal";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import useHandleModal from "../../hooks/useHandleModal";
import EditJobLevelModal from "../modal/job-level/EditJobLevelModal";
import DeleteJobLevelModal from "../modal/job-level/DeleteJobLevelModal";
import usePagination from "../../hooks/usePagination";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_JOB_LEVEL } from "../../../utils/table-heads/tableHeadManagement";
import { useRouter } from "next/router";
import { useDebounce } from "../../hooks/useDebounce";

export async function getServerSideProps({ query }) {
  const users = await getJobLevel();
  return {
    props: {
      users,
    },
  };
}

const JobLevelLists = ({ data }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);
  //  membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [dataJobLevelEdit, setDataJobLevelEdit] = React.useState({});
  const [dataJobLevelDelete, setDataJobLevelDelete] = React.useState({});

  const jobLevelEdit = (levelData) => {
    if (levelData) {
      setDataJobLevelEdit(levelData);
      handleOpenModal("edit");
    }
    return;
  };

  const jobLevelDelete = (levelData) => {
    if (levelData) {
      setDataJobLevelDelete(levelData);
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
        "level[$like]": `%${search.value}%`,
      },
    });
  };

  return (
    <>
      <AddJobLevelModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditJobLevelModal
        open={openModal}
        type={modalType}
        data={dataJobLevelEdit}
        closeModalHandler={handleCloseModal}
      />

      <DeleteJobLevelModal
        open={openModal}
        type={modalType}
        data={dataJobLevelDelete}
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
                placeholder="cari berdasarkan level"
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_JOB_LEVEL} data={data}>
          {data.data.map((joblevel) => (
            <TableRow key={joblevel.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {joblevel?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{joblevel?.level ?? "-"}</Typography>
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={joblevel}
                  token={data}
                  onClickEdit={() => jobLevelEdit(joblevel)}
                  onClickDelete={() => jobLevelDelete(joblevel)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default JobLevelLists;
