import { Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MomentDateID, MomentTimeID } from "../../../utils/momentId";
import { HEAD_ROWS_MANAGEMENT_CANDIDATE_SENT } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddCandidateSentModal from "../modal/candidate-sent/AddCandidateSentModal";
import DeleteCandidateSentModal from "../modal/candidate-sent/DeleteCandidateSentModal";
import EditCandidateSentModal from "../modal/candidate-sent/EditCandidateSentModal";
import BaseTable from "../table/BaseTable";
import { TypographyStatus } from "../typography/TypographyStatus";
import { BASE_IMAGE_URL } from "../../../utils/baseUrl";
import isValidUrl from "../../../utils/validations/isValidUrl";

const options = [
  {
    label: "Update",
    type: "edit",
  },
  {
    label: "Delete",
    type: "delete",
  },
];

const STATUS_RESPONSE_CANDIDATE = {
  not_responding: "Tidak Merespon",
  refuse: "Menolak",
};

const CandidateSentLists = ({ data, token, session }) => {
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
        session={session}
        closeModalHandler={handleCloseModal}
      />
      <EditCandidateSentModal
        open={openModal}
        type={modalType}
        data={dataCandidateSent}
        token={token}
        session={session}
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
          {data.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.client_request_data?.client_data?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.client_request_data?.position ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {row?.jc_person_data?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <TypographyStatus title={row?.status} />
              </TableCell>
              <TableCell>
                {row?.test_date ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {MomentDateID(row?.test_date)}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {MomentTimeID(row?.test_date)}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {row?.interview_date ? (
                  <>
                    <Typography variant="h6" fontWeight="600">
                      {MomentDateID(row?.interview_date)}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="600"
                    >
                      {MomentTimeID(row?.interview_date)}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Typography variant="h6">
                  {STATUS_RESPONSE_CANDIDATE[row?.candidate_response] ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{row?.notes ?? "-"}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  {row.jc_person_data?.file_url ? (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        isValidUrl(row.jc_person_data?.file_url)
                          ? window.open(
                              `${row.jc_person_data?.file_url}`,
                              "_blank"
                            )
                          : window.open(
                              `${BASE_IMAGE_URL}/${row.jc_person_data?.file_url}`,
                              "_blank"
                            );
                      }}
                    >
                      Lihat CV
                    </Button>
                  ) : (
                    "-"
                  )}
                </Box>
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

export default CandidateSentLists;
