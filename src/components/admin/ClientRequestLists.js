import { Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "moment/locale/id";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_CLIENT_REQUEST } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddClientRequestModal from "../modal/client-request/AddClientRequestModal";
import DeleteClientRequestModal from "../modal/client-request/DeleteClientRequestModal";
import DetailClientModal from "../modal/client/DetailClientModal";
import EditClientModal from "../modal/client/EditClientModal";
import BaseTable from "../table/BaseTable";
import EditClientRequestModal from "../modal/client-request/EditClientRequestModal";
moment.locale("id");

const options = [
  {
    label: "Detail",
    type: "detail",
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

const ClientRequestLists = ({ data, client_id }) => {
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
    } else if (userData && type === "detail") {
      router.push(`/management/client/detail/${id}`);
    }
    return;
  };

  return (
    <>
      <DetailClientModal
        open={openModal}
        type={modalType}
        data={dataClient}
        closeModalHandler={handleCloseModal}
      />
      <AddClientRequestModal
        open={openModal}
        type={modalType}
        client_id={client_id}
        closeModalHandler={handleCloseModal}
      />
      <EditClientRequestModal
        open={openModal}
        type={modalType}
        data={dataClient}
        // data={{
        //   position: dataClient?.position,
        //   last_called: dataClient?.last_called,
        //   request_date: dataClient?.request_date,
        //   salary: dataClient?.salary,
        //   total_requirement: dataClient?.total_requirement,
        //   status: dataClient?.status,
        // }}
        client_id={client_id}
        closeModalHandler={handleCloseModal}
      />
      <DeleteClientRequestModal
        open={openModal}
        type={modalType}
        data={dataClient}
        client_id={client_id}
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_CLIENT_REQUEST} data={data}>
          {data.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.client_data?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.position ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {moment(row?.last_called).format("DD MMM YYYY") ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {moment(row?.request_date).format("DD MMM YYYY") ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.salary ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.total_requirement ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.status}
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

export default ClientRequestLists;
