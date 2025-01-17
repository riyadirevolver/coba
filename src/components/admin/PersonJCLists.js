import { Avatar, Button, Card, TableCell, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import NextApi from "../../../lib/services/next-api";
import { BASE_IMAGE_URL } from "../../../utils/baseUrl";
import { HEAD_ROWS_MANAGEMENT_PERSON_JC } from "../../../utils/table-heads/tableHeadManagement";
import isValidUrl from "../../../utils/validations/isValidUrl";
import { UseDownloadExcelBlob } from "../../hooks/useDownloadExcel";
import useHandleModal from "../../hooks/useHandleModal";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import AddSubmitCandidateModal from "../modal/person-jc/AddSubmitCandidateModal";
import AddSubmitCandidateModalV2 from "../modal/person-jc/AddSubmitCandidateModalV2";
import DeletePersonJCModal from "../modal/person-jc/DeletePersonJCModal";
import DetailPersonJCModal from "../modal/person-jc/DetailPersonJCModal";
import BaseTable from "../table/BaseTable";
import { TypographyList } from "../typography/TypographyList";

const OPTIONS_ADMIN = [
  {
    label: "Lihat Berkas",
    type: "file",
  },
  // {
  //   label: "Submit Kandidat",
  //   type: "submit_candidate",
  // },
  {
    label: "Submit History",
    type: "history_candidate",
  },
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

const OPTIONS_CLIENT = [
  {
    label: "Lihat Berkas",
    type: "file",
  },
  // {
  //   label: "Submit Kandidat",
  //   type: "submit_candidate",
  // },
  {
    label: "Submit History",
    type: "history_candidate",
  },
  {
    label: "Detail",
    type: "detail",
  },
];

const GENDER_DATA = {
  L: "Laki - laki",
  P: "Perempuan",
};

const PersonJCLists = ({ data, token, session }) => {
  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } = useHandleModal(false);

  const [dataUser, setDataUser] = React.useState({});

  const exportUser = async () => {
    const { query } = router;
    const result = {};

    for (const key in query) {
      const match = key.match(/\$\w+\[(\d+)\]\[(\w+)\]\[\$like\]/);
      if (match) {
        const index = match[1];
        const prop = match[2];
        const propValue = query[key].replace(/%/g, "");

        if (!result[prop]) {
          result[prop] = {};
        }

        result[prop][index] = (result[prop][index] || "") + " " + propValue.trim();
      } else {
        result[key] = query[key];
      }
    }

    const params = {
      batch: query?.batch,
      job_status: query?.job_status,
      skills: result?.skills,
      interest_positions: result?.interest_positions,
    };
    const res = await NextApi().post("/api/person-jc/export", params, {
      responseType: "arraybuffer",
    });

    UseDownloadExcelBlob(res, "export-person-jc");
  };

  const handleClickDot = (userData, type, id) => {
    if (userData && type === "edit") {
      setDataUser(userData);
      router.push(`/management/user-jc/edit/${id}`);
    } else if (userData && type === "detail") {
      setDataUser(userData);
      handleOpenModal("detail");
    } else if (userData && type === "submit_candidate") {
      setDataUser(userData);
      handleOpenModal("submit_candidate");
    } else if (userData && type === "history_candidate") {
      setDataUser(userData);
      if (session?.role === "client") {
        return router.push({
          pathname: "/client/candidate-sent-history",
          query: {
            jc_person_id: id,
          },
        });
      }
      return router.push({
        pathname: "/management/candidate-sent-history",
        query: {
          jc_person_id: id,
        },
      });
    } else if (userData && type === "delete") {
      setDataUser(userData);
      handleOpenModal("delete");
    } else if (userData && type === "file") {
      if (session.role === "client") {
        return router.push(`/client/user-jc/attachment/${id}`);
      }
      router.push(`/management/user-jc/attachment/${id}`);
    }
    return;
  };

  return (
    <>
      {session?.client_id ? (
        <AddSubmitCandidateModal
          open={openModal}
          type={modalType}
          data={dataUser}
          token={token}
          session={session}
          closeModalHandler={handleCloseModal}
        />
      ) : (
        <AddSubmitCandidateModalV2
          open={openModal}
          type={modalType}
          dataUser={dataUser}
          token={token}
          session={session}
          closeModalHandler={handleCloseModal}
        />
      )}

      <DetailPersonJCModal
        open={openModal}
        type={modalType}
        data={dataUser}
        closeModalHandler={handleCloseModal}
      />
      <DeletePersonJCModal
        open={openModal}
        type={modalType}
        data={dataUser}
        closeModalHandler={handleCloseModal}
      />

      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}>
        <Box sx={{ mb: 2, mr: 3, display: "flex" }}>
          <Box flexGrow={1} />
          <Button
            className='button-add'
            color='primary'
            variant='contained'
            onClick={exportUser}>
            Export
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_PERSON_JC} data={data}>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar {...stringAvatar(user?.name, 50)} />
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {user?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant='h6'
                  fontWeight='600'
                  display={"flex"}
                  justifyContent={"center"}>
                  {user?.total_sent}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {GENDER_DATA[user?.gender] ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {moment(user?.date_of_birth).format("DD MMMM YYYY") ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {user?.current_domicile ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <TypographyList
                  data={user?.skills}
                  background='#CDFFCD'
                  color='#007F00'></TypographyList>
              </TableCell>
              <TableCell>
                <TypographyList
                  data={user?.interest_positions}
                  background='#CDFFCD'
                  color='#007F00'></TypographyList>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {user?.job_status === "bekerja_diluar_connector"
                    ? "Bekerja diluar Connector"
                    : user?.job_status}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {user?.mobile_phone_number ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6' fontWeight='600'>
                  {user?.willing_work_jakarta ? "Siap" : "Tidak Siap"}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  {user?.file_url ? (
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => {
                        isValidUrl(user?.file_url)
                          ? window.open(`${user?.file_url}`, "_blank")
                          : window.open(`${BASE_IMAGE_URL}/${user?.file_url}`, "_blank");
                      }}>
                      Lihat CV
                    </Button>
                  ) : (
                    "-"
                  )}
                </Box>
              </TableCell>
              <TableCell>
                {user?.created_at ? (
                  <>
                    <Typography variant='h6' fontWeight='600'>
                      {moment(user?.created_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography color='textSecondary' variant='h6' fontWeight='600'>
                      {moment(user?.created_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                {user?.updated_at ? (
                  <>
                    <Typography variant='h6' fontWeight='600'>
                      {moment(user?.updated_at).format("DD MMM YYYY") ?? "-"}
                    </Typography>
                    <Typography color='textSecondary' variant='h6' fontWeight='600'>
                      {moment(user?.updated_at).format("HH:mm:ss") ?? "-"}
                    </Typography>
                  </>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>
                <Box display='flex' justifyContent='space-between'>
                  {/* <Tooltip title="Submit Kandidat">
                    <IconButton
                      aria-haspopup="true"
                      size="large"
                      aria-label="action"
                      onClick={() => handleClickDot(user, "submit_candidate")}
                    >
                      <FeatherIcon icon="edit" />
                    </IconButton>
                  </Tooltip> */}
                  <Button
                    variant='contained'
                    color='success'
                    sx={{ mr: 3 }}
                    onClick={() => handleClickDot(user, "submit_candidate")}>
                    Submit Kandidat
                  </Button>
                  <ThreeDots
                    sx={{ textAlign: "right" }}
                    options={session?.role === "client" ? OPTIONS_CLIENT : OPTIONS_ADMIN}
                    onClick={(show) => handleClickDot(user, show, user?.id)}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default PersonJCLists;
