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
import { HEAD_ROWS_MANAGEMENT_USER } from "../../../utils/table-heads/tableHeadManagement";
import useHandleModal from "../../hooks/useHandleModal";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import AddUserModal from "../modal/userModal/AddUserModal";
import DeleteUserModal from "../modal/userModal/DeleteUserModal";
import EditUserModal from "../modal/userModal/EditUserModal";
import BaseTable from "../table/BaseTable";

const UserAllLists = ({ data, token }) => {
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
      <AddUserModal
        open={openModal}
        type={modalType}
        data={dataUser}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <EditUserModal
        open={openModal}
        type={modalType}
        data={dataUser}
        closeModalHandler={handleCloseModal}
      />
      <DeleteUserModal
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
              handleOpenModal("add");
            }}
          >
            Tambah
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_USER} data={data}>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar {...stringAvatar(user?.fullname, 50)} />
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.nik ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{user?.email ?? "-"}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.phone ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.role ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.is_active ? "aktif" : "tidak aktif"}
                </Typography>
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
                <ThreeDotsMenu
                  data={user}
                  token={data}
                  onClickEdit={() => handleUser(user, "edit")}
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

export default UserAllLists;
