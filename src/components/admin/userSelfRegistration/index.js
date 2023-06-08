import React, { useState } from "react";
import Image from "next/image";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  Button,
  Tooltip,
  useTheme,
  Snackbar,
  IconButton,
  Paper,
} from "@mui/material";
import moment from "moment";
import DashboardCard from "../../baseCard/DashboardCard";
import useHandleModal from "../../../hooks/useHandleModal";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import usePagination from "../../../hooks/usePagination";
import DeleteSelfRegisterModal from "../../modal/SelfRegis/DeleteSelfRegisterModal";
import CustomCheckbox from "../../forms/custom-elements/CustomCheckbox";
import { TableHead, TableSelected } from "./elements";
import { TableHeadSelfRegister } from "../../../constants/tables/TableHeadSelfRegister";
import UpdateBatch from "../../modal/updateBatch/UpdateBatch";
import { ADD_BATCH } from "../../../constants/tables/@types";
import { useSnackbar } from "../../../hooks/useSnackbar";

const UserSelfRegistration = ({ data, session }) => {
  const theme = useTheme();
  const { rowsPerPage, page, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  // membuat treedots

  const [selected, setSelected] = useState([]);

  // membuat tAMPUNGAN page dan set page
  const { isActive, message, openSnackBar, closeSnackBar } = useSnackbar();

  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  // delete selfRegister
  const [dataSelfRegisterDelete, setDataSelfRegisterDelete] = React.useState(
    {}
  );
  const SelfRegisterDelete = (selfRegisterDelete) => {
    if (selfRegisterDelete) {
      setDataSelfRegisterDelete(selfRegisterDelete);
      handleOpenModal("delete");
    }
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };
  const onDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      openSnackBar("Berhasil menghapus user");
      closeModalHandler();
      await router.replace(router.pathname);
    } catch (error) {
      console.log(error);
      openSnackBar(`Gagal menghapus user`);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedAll = data.data;
      setSelected(newSelectedAll);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, user) => {
    const selectedIndex = selected.indexOf(user);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (item) => selected.indexOf(item) !== -1;

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeSnackBar}
      >
        <FeatherIcon icon="x" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Snackbar
        open={isActive}
        message={message}
        action={action}
        onClose={closeSnackBar}
        autoHideDuration={5000}
      />
      <DashboardCard
        title="Data User Registrasi Mobile"
        subtitle=""
        customdisplay="block"
        custommargin="10px"
      >
        <Box
          className="table_base"
          sx={{
            overflow: "auto",
            sm: "unset",
          }}
        >
          <TableSelected
            selectedCount={selected?.length}
            onClick={() => {
              handleOpenModal(ADD_BATCH);
            }}
          />
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            <TableHead
              sxTCell={{ color: "white" }}
              headCell={TableHeadSelfRegister}
              numSelected={selected.length}
              onSelectAll={handleSelectAll}
              rowCount={data.data.length}
            />

            <TableBody>
              {data.data.map((user, idx) => {
                const selectedItem = isSelected(user);
                const labelId = `table-checkbox-${idx}`;

                return (
                  <TableRow
                    key={user.id}
                    selected={selectedItem}
                    aria-checked={selectedItem}
                    onClick={(event) => handleClick(event, user)}
                    role="checkbox"
                  >
                    <TableCell>
                      <CustomCheckbox
                        checked={selectedItem}
                        inputprops={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="left"
                        fontWeight="600"
                      >
                        {user.fullname}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="left"
                        fontWeight="600"
                      >
                        {user.email}
                      </Typography>
                    </TableCell>
                    {/* posisi name */}
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="center"
                        fontWeight="600"
                      >
                        {user?.position_name ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="center"
                        fontWeight="600"
                      >
                        {user?.division_name ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="center"
                        fontWeight="600"
                      >
                        {user?.unit_name ?? "-"}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="left"
                        fontWeight="600"
                      >
                        {user.created_at
                          ? moment(user.created_at).format(
                              "DD MMM YYYY, HH:mm:ss"
                            )
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        align="left"
                        fontWeight="600"
                      >
                        {user.updated_at
                          ? moment(user.updated_at).format(
                              "DD MMM YYYY, HH:mm:ss"
                            )
                          : "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Tooltip title="view data">
                        <Button
                          onClick={() =>
                            router.push(`/management/user-v2/edit/${user.id}`)
                          }
                        >
                          <FeatherIcon icon="eye" />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete data">
                        <Button onClick={() => SelfRegisterDelete(user)}>
                          <FeatherIcon
                            icon="x-circle"
                            className="icon-color__red"
                          />
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* mengeksekusi pagination */}

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.total}
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
            showFirstButton
            showLastButton
          />
        </Box>

        <DeleteSelfRegisterModal
          open={openModal}
          type={modalType}
          data={dataSelfRegisterDelete}
          closeModalHandler={handleCloseModal}
        />
        {openModal && modalType === ADD_BATCH ? (
          <UpdateBatch
            session={session}
            open={openModal}
            type={modalType}
            data={selected}
            result={(msg) => {
              openSnackBar(msg);
              router.replace(router.asPath);
            }}
            closeModalHandler={handleCloseModal}
          />
        ) : null}
      </DashboardCard>
    </>
  );
};

export default UserSelfRegistration;
