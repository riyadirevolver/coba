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
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddUserModal from "../modal/userModal/AddUserModal";
import DeleteUserModal from "../modal/userModal/DeleteUserModal";
import EditUserModal from "../modal/userModal/EditUserModal";
import BaseTable from "../table/BaseTable";
import DeletePersonJCModal from "../modal/person-jc/DeletePersonJCModal";

const PersonJCLists = ({ data }) => {
  const router = useRouter();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataUser, setDataUser] = React.useState({});

  const handleUser = (userData, type) => {
    if (userData && type === "edit") {
      setDataUser(userData);
      handleOpenModal("edit");
    } else if (userData && type === "delete") {
      setDataUser(userData);
      handleOpenModal("delete");
    }
    return;
  };

  return (
    <>
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
                <Typography variant="h6">{user?.number_id ?? "-"}</Typography>
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
                <Typography variant="h6" fontWeight="600">
                  {user?.education}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.school_name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.school_name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.ipk_value ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.majoring ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.job_experience ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.company_name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.last_position ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.join_date ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.nipp_code ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.facebook ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.instagram ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.linkedin ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.nilai_accurate ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.nilai_cognitive ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.nilai_proactive ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.class_id ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.channel_payment ?? "-"}
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
                <ThreeDotsMenu
                  data={user}
                  token={data}
                  onClickEdit={() => {
                    // handleUser(user, "edit");
                    router.replace(`/management/user-jc/edit/${user.id}`);
                  }}
                  onClickDelete={() => handleUser(user, "delete")}
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
