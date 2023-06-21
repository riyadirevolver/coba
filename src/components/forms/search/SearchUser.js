import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, MenuItem, Select } from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useFormik } from "formik";
import moment from "moment-timezone";
import "moment/locale/id";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { SEARCH_USER } from "../../../../utils/constant/searchConstant";
import useHandleModal from "../../../hooks/useHandleModal";
import searchValidation from "../../../validations/searchValidation";
import DashboardCard from "../../baseCard/DashboardCard";
import FilterUserModal from "../../modal/userModal/FilterUserModal";
import CustomTextField from "../custom-elements/CustomTextField";
import { handlePlaceHolder } from "../../../../utils/placeHolder";
moment.locale("id");

const SearchUser = ({ token }) => {
  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const formik = useFormik({
    initialValues: {
      search: "",
      select: "name_user",
    },
    validationSchema: searchValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { search, select } = values;
        router.replace({
          query: {
            ...router.query,
            ...(select === "name_user" && {
              "fullname[$like]": `%${search}%`,
            }),
            ...(select === "nik_user" && {
              "nik[$like]": `%${search}%`,
            }),
          },
        });
      } catch (error) {
        console.log(error);
      }
      setSubmitting(false);
    },
  });

  const handleReset = () => {
    formik.resetForm();
    router.replace(router.pathname);
  };

  return (
    <>
      <FilterUserModal
        open={openModal}
        type={modalType}
        token={token}
        closeModalHandler={handleCloseModal}
      />
      <DashboardCard
        customdisplay="flex"
        customheaderpadding="0px"
        cardSx={{ overflow: "visible" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid
              item
              lg={8}
              sm={6}
              xs={12}
              display="flex"
              justifyContent="space-between"
            >
              <Select
                name="select"
                size="small"
                sx={{ width: "140px" }}
                value={formik.values.select || ""}
                onChange={(event) => {
                  const { value } = event.target;
                  formik.setFieldValue("select", value);
                }}
              >
                {SEARCH_USER.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              <CustomTextField
                required
                id="search"
                name="search"
                size="small"
                sx={{ width: "calc(100% - 150px)" }}
                variant="outlined"
                placeholder={handlePlaceHolder(formik.values.select)}
                {...formik.getFieldProps("search")}
                error={formik.touched.search && !!formik.errors.search}
                helperText={formik.touched.search && formik.errors.search}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    handleOpenModal("filter");
                  }}
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                  }}
                >
                  <FeatherIcon icon="filter" />
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={handleReset}
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                    margin: "0 20px",
                    width: "150px",
                    color: "#1ba0e2",
                    border: "2px solid #1ba0e2",
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                  endIcon={<SearchIcon fontSize="small" />}
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                    width: "150px",
                    background: "#1ba0e2",
                  }}
                >
                  Cari
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </DashboardCard>
    </>
  );
};

export default SearchUser;
