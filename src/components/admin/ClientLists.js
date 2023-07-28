import { Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MomentDateID } from "../../../utils/momentId";
import { HEAD_ROWS_MANAGEMENT_CLIENT } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddClientModal from "../modal/client/AddClientModal";
import DeleteClientModal from "../modal/client/DeleteClientModal";
import EditClientModal from "../modal/client/EditClientModal";
import BaseTable from "../table/BaseTable";

const options = [
  {
    label: "Project",
    type: "request",
  },
  {
    label: "Edit",
    type: "edit",
  },
  {
    label: "Delete",
    type: "delete",
  },
];

const ClientLists = ({ data, token }) => {
  const router = useRouter();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataClient, setDataClient] = React.useState({});

  const handleClickDot = (userData, type, id) => {
    if (userData && type === "edit") {
      setDataClient(userData);
      handleOpenModal("edit");
    } else if (userData && type === "delete") {
      setDataClient(userData);
      handleOpenModal("delete");
    } else if (userData && type === "request") {
      router.push(`/management/client/request/${id}`);
    }
    return;
  };

  return (
    <>
      {/* <DetailClientModal
        open={openModal}
        type={modalType}
        data={dataClient}
        closeModalHandler={handleCloseModal}
      /> */}
      <AddClientModal
        open={openModal}
        type={modalType}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <EditClientModal
        open={openModal}
        type={modalType}
        data={dataClient}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <DeleteClientModal
        open={openModal}
        type={modalType}
        data={dataClient}
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
            onClick={() => {
              handleOpenModal("add");
            }}
          >
            Tambah
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_CLIENT} data={data}>
          {data.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.email ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.pic_data?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.status_called ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row.last_called != null
                    ? MomentDateID(row?.last_called)
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{row?.contact ?? "-"}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.description ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.under_dika != null
                    ? row?.under_dika == true
                      ? "Ya"
                      : "tidak"
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.created_user_by?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.updated_user_by?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                {row?.created_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(row?.created_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(row?.created_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                <ThreeDots
                  sx={{ textAlign: "right" }}
                  options={options}
                  onClick={(show) => handleClickDot(row, show, row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default ClientLists;
