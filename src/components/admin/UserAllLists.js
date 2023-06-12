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
import Image from "next/image";
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
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_USER } from "../../../utils/table-heads/tableHeadManagement";
import { stringAvatar } from "../../layouts/header/stringAvatar";
import AddUserModal from "../modal/userModal/AddUserModal";
import EditUserModal from "../modal/userModal/EditUserModal";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_IMAGE_URL;

const UserAllLists = ({ data }) => {
  const router = useRouter();

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  // membuat treedots
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

  const exportUser = async () => {
    const { query } = router;
    const nik = query["nik[$like]"]
      ? query["nik[$like]"].replace(/%\s?/g, "")
      : null;
    const fullname = query["fullname[$like]"]
      ? query["fullname[$like]"].replace(/%\s?/g, "")
      : null;

    const params = {
      nik: nik,
      fullname: fullname,
      departement: query?.job_departement_id,
      level: query?.job_level_id,
      employee: query?.employee_type_id,
      position: query?.job_position_id,
      location: query?.location_point_id,
    };
    const res = await axios.get("/api/users/export-users", {
      responseType: "arraybuffer",
      params: {
        ...params,
      },
    });

    UseDownloadExcelBlob(res, "export-users");
  };

  return (
    <>
      <AddUserModal
        open={openModal}
        type={modalType}
        data={dataUser}
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
