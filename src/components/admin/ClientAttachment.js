import {
  Button,
  Card,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import "moment/locale/id";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_CLIENT_ATTACHMENT } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";

import AddClientAttachmentModal from "../modal/client-attachment/AddClientAttachmentModal";
import DeleteClientAttachmentModal from "../modal/client-attachment/DeleteClientAttachmentModal";
import BaseTable from "../table/BaseTable";
moment.locale("id");

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

const ClientAttachmentLists = ({ data, client_request_id }) => {
  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [dataClientRequest, setDataClientRequest] = React.useState({});

  return (
    <>
      <AddClientAttachmentModal
        open={openModal}
        type={modalType}
        client_request_id={client_request_id}
        closeModalHandler={handleCloseModal}
      />
      <DeleteClientAttachmentModal
        open={openModal}
        type={modalType}
        data={dataClientRequest}
        client_request_id={client_request_id}
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
        <BaseTable
          tableHead={HEAD_ROWS_MANAGEMENT_CLIENT_ATTACHMENT}
          data={data}
        >
          {data.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Button
                  sx={{
                    color: "black",
                    textAlign: "left",
                  }}
                  onClick={() =>
                    window.open(`${BASE_URL}/${row?.url}`, "_blank")
                  }
                >
                  <Typography variant="h6" fontWeight="600">
                    {row?.url ?? "-"}
                  </Typography>
                </Button>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.created_user_by?.fullname ?? "-"}
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
                <Tooltip
                  onClick={() => {
                    setDataClientRequest(row);
                    handleOpenModal("delete");
                  }}
                  title="Hapus"
                >
                  <IconButton>
                    <FeatherIcon icon="trash-2" width="24" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default ClientAttachmentLists;
