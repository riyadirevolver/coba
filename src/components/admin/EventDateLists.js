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
import AddEventDateModal from "../modal/event-date/AddEventDateModal";
import EditEventDateModal from "../modal/event-date/EditEventDateModal";
import DeleteEventDateModal from "../modal/event-date/DeleteEventDateModal";
import usePagination from "../../hooks/usePagination";
import moment from "moment";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_EVENT_DATE } from "../../../utils/table-heads/tableHeadManagement";

const EventDateLists = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  // membuat tampungan pagination

  const [EditEvenDate, setEditEventDate] = React.useState({});
  const [DeleteEventDate, setDeleteEventDate] = React.useState({});

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const EventDateEdit = (EventData) => {
    if (EventData) {
      setEditEventDate(EventData);
      handleOpenModal("edit");
    }
    return;
  };
  const EventDateDelete = (EventData) => {
    if (EventData) {
      setDeleteEventDate(EventData);
      handleOpenModal("delete");
    }
    return;
  };

  return (
    <>
      <AddEventDateModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      <EditEventDateModal
        open={openModal}
        type={modalType}
        data={EditEvenDate}
        closeModalHandler={handleCloseModal}
      />
      <DeleteEventDateModal
        open={openModal}
        type={modalType}
        data={DeleteEventDate}
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_EVENT_DATE} data={data}>
          {data.data.map((eventDate) => (
            <TableRow key={eventDate.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {eventDate?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {eventDate?.date ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {eventDate.start_date
                    ? moment(eventDate.start_date).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {eventDate.start_end
                    ? moment(eventDate.start_end).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  data={eventDate}
                  token={data}
                  onClickEdit={() => EventDateEdit(eventDate)}
                  onClickDelete={() => EventDateDelete(eventDate)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default EventDateLists;
