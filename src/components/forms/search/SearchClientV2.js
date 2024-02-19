import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import moment from "moment-timezone";
import "moment/locale/id";
import { useRouter } from "next/dist/client/router";
import React from "react";
import useHandleModal from "../../../hooks/useHandleModal";
import searchValidation from "../../../validations/searchValidation";
import DashboardCard from "../../baseCard/DashboardCard";
import CustomTextField from "../custom-elements/CustomTextField";
moment.locale("id");

const SearchClientV2 = ({ token }) => {
  const router = useRouter();
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: searchValidation,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { search } = values;
        router.replace({
          query: {
            "position[$like]": `%${search}%`,
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
              <CustomTextField
                required
                id="search"
                name="search"
                size="small"
                sx={{ width: "100%" }}
                variant="outlined"
                placeholder={"Cari berdasarkan posisi"}
                {...formik.getFieldProps("search")}
                error={formik.touched.search && !!formik.errors.search}
                helperText={formik.touched.search && formik.errors.search}
              />
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="text"
                  color="warning"
                  size="small"
                  onClick={handleReset}
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                    margin: "0 20px 0 0",
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

export default SearchClientV2;
