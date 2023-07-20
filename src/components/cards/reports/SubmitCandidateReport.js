import { Card, TableCell, TableRow, Typography } from "@mui/material";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MomentDateID, MomentTimeID } from "../../../../utils/momentId";
import { HEAD_ROWS_MANAGEMENT_CANDIDATE_SENT } from "../../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../../hooks/useHandleModal";
import ThreeDots from "../../atomicDesigns/molecules/ThreeDots";
import DeleteCandidateSentModal from "../../modal/candidate-sent/DeleteCandidateSentModal";
import EditCandidateSentModal from "../../modal/candidate-sent/EditCandidateSentModal";
import BaseTableReport from "../../table/BaseTableReport";
import { TypographyStatus } from "../../typography/TypographyStatus";

const options = [
  {
    label: "Update",
    type: "edit",
  },
  //   {
  //     label: "Delete",
  //     type: "delete",
  //   },
];

const SubmitCandidateReport = ({ title, data, token, session }) => {
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
        {/* tabel */}
        <BaseTableReport
          title={title}
          tableHead={HEAD_ROWS_MANAGEMENT_CANDIDATE_SENT}
        >
          {data.map((row, index) => (
            <TableRow key={index}>
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
                <Typography variant="h6">{row?.notes ?? "-"}</Typography>
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

              {/* <TableCell>
                <ThreeDots
                  sx={{ textAlign: "right" }}
                  options={options}
                  onClick={(show) => handleClickDot(row, show, row.id)}
                />
              </TableCell> */}
            </TableRow>
          ))}
        </BaseTableReport>
      </Card>
    </>
  );
};

export default SubmitCandidateReport;
