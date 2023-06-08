import React from "react";
import DashboardCard from "../baseCard/DashboardCard";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  TablePagination,
} from "@mui/material";
import useHandleModal from "../../hooks/useHandleModal";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import EditCompanySetting from "../modal/companySettings/EditCompanySetting";
import DeleteCompanySetting from "../modal/companySettings/DeleteCompanySetting";
import AddCompany from "../modal/companyModal/AddCompany";
import EditCompany from "../modal/companyModal/EditCompany";
import usePagination from "../../hooks/usePagination";
import DeleteCompanyModal from "../modal/companyModal/DeleteCompanyModal";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_ADD_COMPANY } from "../../../utils/table-heads/tableHeadCompany";
// import { useSession } from "next-auth/react"

const CompanyList = ({ data }) => {
  // const { data: session, status } = useSession();

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();

  const [editDataCompany, setEditDataCompany] = React.useState({});
  const onHandleClickEdit = (item) => {
    setEditDataCompany(item);
    handleOpenModal("edit");
  };

  const [deleteDataCompany, setDeleteDataCompany] = React.useState({});
  const onHandleClickDelete = (item) => {
    setDeleteDataCompany(item);
    handleOpenModal("delete");
  };

  return (
    <>
      <AddCompany
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      {editDataCompany && (
        <EditCompany
          dataCompany={editDataCompany}
          open={openModal}
          type={modalType}
          closeModalHandler={handleCloseModal}
        />
      )}

      <DeleteCompanyModal
        dataCompany={deleteDataCompany}
        open={openModal}
        type={modalType}
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
            onClick={() => handleOpenModal("add")}
          >
            Tambahkan
          </Button>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_ADD_COMPANY} data={data}>
          {data.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.industry ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.company_code ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  onClickEdit={() => onHandleClickEdit(item)}
                  onClickDelete={() => onHandleClickDelete(item)}
                />
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default CompanyList;
