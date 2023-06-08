import {
  Avatar,
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment/moment";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import DashboardCard from "../baseCard/DashboardCard";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import DeleteUserModal from "../modal/userModal/DeleteUserModal";
import axios from "axios";
import { UseDownloadExcelBlob } from "../../hooks/useDowloadExcel";
import { UPLINER_TYPE } from "../../../utils/constant";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_CLIENT_UPLINER } from "../../../utils/table-heads/tableHeadManagement";
import { UserImage } from "../activity/UserImage";
import { stringAvatar } from "../../layouts/header/stringAvatar";

const ClientUplinerLists = ({ data }) => {
  const router = useRouter();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataUserDelete, setDataUserDelete] = React.useState({});

  const userDelete = (userData) => {
    if (userData) {
      setDataUserDelete(userData);
      handleOpenModal("delete");
    }
    return;
  };

  return (
    <>
      <DeleteUserModal
        open={openModal}
        type={modalType}
        data={dataUserDelete}
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
            onClick={() =>
              router.replace("/management/client-upliner/register")
            }
          >
            Tambahkan
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_MANAGEMENT_CLIENT_UPLINER} data={data}>
          {data.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell sx={{ width: "80px" }}>
                {user?.photo ? (
                  <UserImage path={user?.photo} />
                ) : (
                  <Avatar {...stringAvatar(user?.fullname, 50)} />
                )}
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user.fullname ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">{user.email}</Typography>
              </TableCell>

              {/* job level */}
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {user?.job_departement?.name ?? "-"}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {UPLINER_TYPE[user?.role_id]}
                </Typography>
              </TableCell>

              {/* created at */}
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
                  onClickEdit={() =>
                    router.push(`/management/client-upliner/edit/${user.id}`)
                  }
                  onClickDelete={() => userDelete(user)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default ClientUplinerLists;
