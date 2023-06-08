import React from "react";
import DashboardCard from "../baseCard/DashboardCard";
import AddCompanySetting from "../modal/companySettings/AddCompanySetting";
import { withSessionRoute } from "../../../lib/session/withSession";
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
  Switch,
} from "@mui/material";
import useHandleModal from "../../hooks/useHandleModal";
import axios from "axios";
import { useEffect } from "react";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import EditCompanySetting from "../modal/companySettings/EditCompanySetting";
import DeleteCompanySetting from "../modal/companySettings/DeleteCompanySetting";
import ServiceAdapter from "../../../lib/services";
import { updateCompanySetting } from "../../../lib/services/companySetting";
import { boolean } from "yup";
import session from "../../../pages/api/session";
import usePagination from "../../hooks/usePagination";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_COMPANY_SETTING } from "../../../utils/table-heads/tableHeadCompany";
import { CustomSwitch } from "../switch/customSwitch";

const CompanySetting = ({ data }) => {
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [dataCompany, setDataCompany] = React.useState([]);

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  const [editDataCompany, setEditDataCompany] = React.useState({});

  const [companySettingId, setCompanySettingId] = React.useState("");

  const handleChange = async (event, data) => {
    event.preventDefault();
    try {
      const payload = {
        is_selfie_in: event.target.checked,
      };
      await axios.patch(`/api/company-setting/${data.company_id}`, payload);
      alert("Sukses");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeOut = async (event, data) => {
    event.preventDefault();

    try {
      const payload = {
        is_selfie_out: event.target.checked,
      };
      await axios.patch(`/api/company-setting/${data.company_id}`, payload);

      alert("Sukses");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompany = async () => {
    try {
      const res = await axios.get("/api/company");
      const { data } = await res.data;
      setDataCompany(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const onHandleClick = (item) => {
    setEditDataCompany(item);
    handleOpenModal("edit");
  };
  const onHandleClickDelete = (item) => {
    setCompanySettingId(item.company_id);
    handleOpenModal("delete");
  };

  return (
    <>
      <AddCompanySetting
        dataCompany={dataCompany}
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      {editDataCompany && (
        <EditCompanySetting
          dataCompany={editDataCompany}
          open={openModal}
          type={modalType}
          closeModalHandler={handleCloseModal}
        />
      )}
      <DeleteCompanySetting
        data={companySettingId}
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
        <BaseTable tableHead={HEAD_ROWS_COMPANY_SETTING} data={data}>
          {data.data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.company?.name ?? "-"}
                </Typography>
              </TableCell>
              {/* <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.company?.industry ?? "-"}
                </Typography>
              </TableCell> */}
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {item?.max_radius ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <CustomSwitch
                  defaultChecked={item.is_selfie_in}
                  onChange={(e) => handleChange(e, item)}
                />
              </TableCell>
              <TableCell>
                <Switch
                  defaultChecked={item?.is_selfie_out}
                  onChange={(e) => handleChangeOut(e, item)}
                />
              </TableCell>
              <TableCell>
                <ThreeDotsMenu
                  onClickEdit={() => onHandleClick(item)}
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

export default CompanySetting;
