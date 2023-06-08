import React from "react";
import Image from "next/image";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import moment from "moment";
import DashboardCard from "../baseCard/DashboardCard";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import DeleteUserModal from "../modal/userModal/DeleteUserModal";
import { useRouter } from "next/dist/client/router";
import SearchUser from "../forms/searchUser/SearchUser";

const UserList = ({ data, employeeType }) => {
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const router = useRouter();
  // membuat tAMPUNGAN page dan set page
  const [page, setPage] = React.useState(0);
  const [dataEmployee] = React.useState(employeeType.data);
  // membuat  tampungan baris per page
  // dan mengambil dealuf limt 5
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [dataUserEdit, setDataUserEdit] = React.useState({});
  const [dataUserDelete, setDataUserDelete] = React.useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const userEdit = (userData) => {
  //   if (userData) {
  //     setDataUserEdit(userData);
  //     handleOpenModal("edit");
  //   }
  //   return;
  // };
  const userDelete = (userData) => {
    if (userData) {
      setDataUserDelete(userData);
      handleOpenModal("delete");
    }
    return;
  };

  return (
    <DashboardCard
      title="Data User"
      subtitle=""
      customdisplay="block"
      custommargin="10px"
    >
      <Box
        sx={{
          overflow: "auto",
          sm: "unset",
        }}
      >
        <Table
          aria-label="simple table"
          // sx={{
          //   whiteSpace: "nowrap",
          // }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5" align="center">
                  NIK
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Nama
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Jabatan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Type Karyawan
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Tanggal Buat
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5" align="center">
                  Tanggal Update
                </Typography>
              </TableCell>

              <TableCell>
                <Typography align="center" variant="h5">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? data.data.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : data
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="600"
                    align="center"
                  >
                    {user.nik}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="600"
                    align="center"
                  >
                    {user.fullname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6" align="center">
                    {user.email}
                  </Typography>
                </TableCell>

                {/* job level */}
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="600"
                    align="center"
                  >
                    {user?.job_level?.name}
                  </Typography>
                </TableCell>

                {/* type karyawan */}
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="600"
                    align="center"
                  >
                    {user?.employee_type?.name}
                  </Typography>
                </TableCell>

                {/* created at */}
                <TableCell>
                  <Typography color="textSecondary" variant="h6" align="center">
                    {moment(user.created_at).format("DD MMM YYYY, HH:mm:ss")}
                  </Typography>
                </TableCell>

                {/* update at */}
                <TableCell>
                  <Typography color="textSecondary" variant="h6" align="center">
                    {moment(user.updated_at).format("DD MMM YYYY, HH:mm:ss")}
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <ThreeDotsMenu
                    data={user}
                    token={data}
                    onClickEdit={() =>
                      router.push(`/management/editRegistration/${user.id}`)
                    }
                    onClickDelete={() => userDelete(user)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* mengeksekusi pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Menampilkan ${from}-${to} dari ${
              count !== -1 ? count : `more than ${to}`
            } data`;
          }}
          labelRowsPerPage="Data per halaman"
        />
      </Box>

      <DeleteUserModal
        open={openModal}
        type={modalType}
        data={dataUserDelete}
        closeModalHandler={handleCloseModal}
      />
    </DashboardCard>
  );
};

export default UserList;
