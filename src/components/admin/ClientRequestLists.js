import {
  Button,
  Card,
  Grid,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import "moment/locale/id";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_CLIENT_REQUEST } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddClientRequestModal from "../modal/client-request/AddClientRequestModal";
import DeleteClientRequestModal from "../modal/client-request/DeleteClientRequestModal";

import { formatRupiah } from "../../../utils/formatRupiah";
import EditClientRequestModal from "../modal/client-request/EditClientRequestModal";
import BaseTable from "../table/BaseTable";
import { TypographyStatus } from "../typography/TypographyStatus";
moment.locale("id");

const options = [
  {
    label: "Lihat Berkas",
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

const ClientRequestLists = ({ data, client_id, session }) => {
  const router = useRouter();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataClient, setDataClient] = React.useState({});

  const handleClickDot = (userData, type, id, role) => {
    if (userData && type === "edit") {
      setDataClient(userData);
      handleOpenModal("edit");
    } else if (userData && type === "delete") {
      setDataClient(userData);
      handleOpenModal("delete");
    } else if (userData && type === "detail") {
      if (role === "client") {
        return router.push(`/client/client/attachment/${id}`);
      }
      router.push(`/management/client/attachment/${id}`);
    }
    return;
  };

  return (
    <>
      <AddClientRequestModal
        open={openModal}
        type={modalType}
        client_id={client_id}
        session={session}
        closeModalHandler={handleCloseModal}
      />
      <EditClientRequestModal
        open={openModal}
        type={modalType}
        data={dataClient}
        client_id={client_id}
        session={session}
        closeModalHandler={handleCloseModal}
      />
      <DeleteClientRequestModal
        open={openModal}
        type={modalType}
        data={dataClient}
        client_id={client_id}
        session={session}
        closeModalHandler={handleCloseModal}
      />

      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12}>
            <Typography fontWeight="700" fontSize={24} ml={3}>
              Project
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} display="flex" justifyContent="end">
            <Button
              className="button-add"
              color="primary"
              variant="contained"
              onClick={() => {
                handleOpenModal("add");
              }}
              sx={{ ml: 3, mr: 3, mb: 3 }}
            >
              Tambah
            </Button>
          </Grid>
        </Grid>
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
                <Typography variant="h6">
                  {moment(row?.request_date).format("DD MMM YYYY") ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.salary !== 0 ? formatRupiah(String(row?.salary)) : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.total_requirement ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <TypographyStatus title={row?.status} />
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.job_description}
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
                  onClick={(show) =>
                    handleClickDot(row, show, row.id, session?.role)
                  }
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
