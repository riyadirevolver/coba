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
} from "@mui/material";

import DashboardCard from "../baseCard/DashboardCard";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import usePagination from "../../hooks/usePagination";
import moment from "moment";
import DeleteHolidaysModal from "../modal/holidays/DeleteHolidaysModal";
import EditHolidaysModal from "../modal/holidays/EditHolidaysModal";
import AddHolidaysModal from "../modal/holidays/AddHolidaysModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_HOLIDAY } from "../../../utils/table-heads/tableHeadManagement";

const HolidaysLists = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination

  const [editHolidays, setEditHolidays] = React.useState({});
  const [deleteHolidays, setDeleteHolidays] = React.useState({});

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const holidaysEdit = (EventData) => {
    if (EventData) {
      setEditHolidays(EventData);
      handleOpenModal("edit");
    }
    return;
  };
  const holidaysDelete = (EventData) => {
    if (EventData) {
      setDeleteHolidays(EventData);
      handleOpenModal("delete");
    }
    return;
  };
  return (
    <>
      <AddHolidaysModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />

      <EditHolidaysModal
        open={openModal}
        type={modalType}
        data={editHolidays}
        closeModalHandler={handleCloseModal}
      />
      <DeleteHolidaysModal
        open={openModal}
        type={modalType}
        data={deleteHolidays}
        closeModalHandler={handleCloseModal}
      />

      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        <Box sx={{ mb: 2, mr: 3, display: "flex" }}>
          <Box flexGrow={1} />
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_HOLIDAY} data={data}>
          {data.data.map((holiday) => (
            <TableRow key={holiday.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {holiday.hdate
                    ? moment(holiday.hdate).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {holiday?.type ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {holiday?.remark ?? "-"}
                </Typography>
              </TableCell>

              <TableCell>
                <ThreeDotsMenu
                  data={holiday}
                  token={data}
                  onClickEdit={() => holidaysEdit(holiday)}
                  onClickDelete={() => holidaysDelete(holiday)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default HolidaysLists;
