import {
  Avatar,
  Button,
  Card,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { HEAD_ROWS_MANAGEMENT_PERSON_JC } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import ThreeDots from "../atomicDesigns/molecules/ThreeDots";
import DeletePersonJCModal from "../modal/person-jc/DeletePersonJCModal";
import BaseTable from "../table/BaseTable";
import DetailPersonJCModal from "../modal/person-jc/DetailPersonJCModal";

const options = [
  {
    label: "Lihat Berkas",
    type: "file",
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

const PersonJCLists = ({ data }) => {
  const router = useRouter();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataUser, setDataUser] = React.useState({});

  const handleClickDot = (userData, type, id) => {
    if (userData && type === "edit") {
      setDataUser(userData);
      router.push(`/management/user-jc/edit/${id}`);
    } else if (userData && type === "detail") {
      setDataUser(userData);
      handleOpenModal("detail");
    } else if (userData && type === "delete") {
      setDataUser(userData);
      handleOpenModal("delete");
    } else if (userData && type === "file") {
      router.push(`/management/user-jc/attachment/${id}`);
    }
    return;
  };

  return (
    <>
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
        }}
      >
        <Box sx={{ mb: 2, mr: 3, display: "flex" }}>
          <Box flexGrow={1} />
          <Button
            className="button-add"
            color="primary"
            variant="contained"
            onClick={() => {
              router.replace("/management/user-jc/register");
            }}
          >
            Tambah
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
                <Typography variant="h6" fontWeight="600">
                  {user?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {moment(user?.date_of_birth).format("DD MMMM YYYY") ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.batch ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.mobile_phone_number ?? "-"}
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
                  onClick={(show) => handleClickDot(user, show, user?.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default PersonJCLists;
