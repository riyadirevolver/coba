import { Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_CANDIDATE_SENT } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddCandidateSentModal from "../modal/candidate-sent/AddCandidateSentModal";
import DeleteCandidateSentModal from "../modal/candidate-sent/DeleteCandidateSentModal";
import EditCandidateSentModal from "../modal/candidate-sent/EditCandidateSentModal";
import BaseTable from "../table/BaseTable";

const options = [
  {
    label: "Edit",
    type: "edit",
  },
  {
    label: "Delete",
    type: "delete",
  },
];

const CandidateSentLists = ({ data, token }) => {
  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);
  const [dataCandidateSent, setDataCandidateSent] = React.useState({});

  const handleClickDot = (userData, type, id) => {
    if (userData && type === "edit") {
      setDataCandidateSent(userData);
      handleOpenModal("edit");
    } else if (userData && type === "delete") {
      setDataCandidateSent(userData);
      handleOpenModal("delete");
    } else if (userData && type === "request") {
      router.push(`/management/client/request/${id}`);
    }
    return;
  };

  return (
    <>
      <AddCandidateSentModal
        open={openModal}
        type={modalType}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <EditCandidateSentModal
        open={openModal}
        type={modalType}
        data={dataCandidateSent}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <DeleteCandidateSentModal
        open={openModal}
        type={modalType}
        data={dataCandidateSent}
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
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_CANDIDATE_SENT} data={data}>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.client_request_data?.client_data?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.client_request_data?.position ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.jc_person_data?.name ?? "-"}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{user?.notes ?? "-"}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.created_user_by?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.updated_user_by?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                {user?.created_at ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {moment(user?.created_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {moment(user?.created_at).format("HH:mm:ss") ?? "-"}
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
                  onClick={(show) => handleClickDot(user, show, user.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default CandidateSentLists;
