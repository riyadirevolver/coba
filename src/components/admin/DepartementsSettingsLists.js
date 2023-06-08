import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import useHandleModal from "../../hooks/useHandleModal";
import usePagination from "../../hooks/usePagination";
import DashboardCard from "../baseCard/DashboardCard";
import AddDepartementsSettingsModal from "../modal/departements-settings/AddDepartementsSettingsModal";
import DeleteDepartementsSetting from "../modal/departements-settings/DeleteDepartementsSettingsModal";
import FeatherIcon from "feather-icons-react";
import BaseTable from "../table/BaseTable";
import { HEAD_ROWS_MANAGEMENT_DEPARTEMENT_SETTINGS } from "../../../utils/table-heads/tableHeadManagement";
import { CustomSwitch } from "../switch/customSwitch";

const DepartementsSettingsLists = ({ data, departement }) => {
  const { control } = useForm();
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagination();
  // membuat treedots
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  // delete
  const [dataDepartementSettingDelete, setDataDepartementSettingDelete] =
    React.useState({});
  const DepartementsSettingDelete = (departementsSettingData) => {
    if (departementsSettingData) {
      setDataDepartementSettingDelete(departementsSettingData);
      handleOpenModal("delete");
    }
  };

  // detail
  const [dataDepartementSettingDetail, setDataDepartementSettingDetail] =
    React.useState({});
  const DepartementsSettingDetail = (departementsSettingData) => {
    if (departementsSettingData) {
      setDataDepartementSettingDetail(departementsSettingData);
      handleOpenModal("detail");
    }
  };

  const handleChangeOut = async (event, data) => {
    event.preventDefault();
    try {
      const payload = {
        required_selfie: event.target.checked,
      };
      await axios.patch(
        `/api/departements-settings/${data.job_departement_id}`,
        payload
      );

      alert("Sukses");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AddDepartementsSettingsModal
        open={openModal}
        type={modalType}
        departement={departement}
        closeModalHandler={handleCloseModal}
      />
      <DeleteDepartementsSetting
        open={openModal}
        type={modalType}
        departement={departement}
        data={dataDepartementSettingDelete}
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
        <BaseTable
          tableHead={HEAD_ROWS_MANAGEMENT_DEPARTEMENT_SETTINGS}
          data={data}
        >
          {data.data.map((departSetting, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {departSetting?.job_departement?.name ?? "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <CustomSwitch
                  defaultChecked={departSetting?.required_selfie}
                  onChange={(e) => handleChangeOut(e, departSetting)}
                />
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {departSetting?.created_at
                    ? moment(departSetting?.created_at).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight="600">
                  {departSetting?.updated_at
                    ? moment(departSetting?.updated_at).format("DD MMM YYYY")
                    : "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <IconButton
                  sx={{ mr: -2 }}
                  onClick={() => DepartementsSettingDelete(departSetting)}
                >
                  <FeatherIcon
                    icon="trash"
                    width="18"
                    height="18"
                    sx={{
                      color: (theme) => theme.palette.grey.A200,
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default DepartementsSettingsLists;
