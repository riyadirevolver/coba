import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchUser } from "../../../validations/user/searchUser";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";
import FeatherIcon from "feather-icons-react";
import FilterModal from "../../modal/filterModal/FilterModal";
import useHandleModal from "../../../hooks/useHandleModal";
import { useState } from "react";
import DashboardCard from "../../baseCard/DashboardCard";
import { useRef } from "react";
import { useDebounce } from "../../../hooks/useDebounce";
import { useEffect } from "react";

const SearchUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchUser),
  });

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [querySearch, setQuerySearch] = useState("name");
  const [isFilter, setIsfilter] = useState(true);

  const resetFilterDebounce = useDebounce(isFilter, 1000);
  const router = useRouter();

  const formRef = useRef(null);

  useEffect(() => {
    if (!resetFilterDebounce) {
      setIsfilter(true);
    }
  }, [resetFilterDebounce]);
  const handleSearch = (data) => {
    if (querySearch === "name") {
      router.replace({
        query: {
          "fullname[$like]": `%${data.search}%`,
        },
      });
    } else {
      router.replace({
        query: {
          "nik[$like]": `%${data.search}%`,
        },
      });
    }
  };

  const handleResetFilter = () => {
    formRef.current.reset();
    setIsfilter(false);
    router.replace({
      shallow: true,
    });
  };

  return (
    <DashboardCard customdisplay="flex" customheaderpadding="0px">
      <Box sx={{ width: "100%", background: "white", mt: "0px" }}>
        <form ref={formRef} onSubmit={handleSubmit(handleSearch)}>
          <Grid item lg={12}>
            <InputLabel>Search</InputLabel>
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                md={6}
                lg={9}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Select
                  size="small"
                  style={{ width: "100px", marginRight: "10px" }}
                  defaultValue={"nik"}
                  value={querySearch}
                  onChange={(e) => {
                    setQuerySearch(e.target.value);
                  }}
                >
                  <MenuItem
                    value={"name"}
                    onClick={() => {
                      formRef.current.reset();
                      router.replace({
                        query: "".toString(),
                      });
                    }}
                  >
                    Nama
                  </MenuItem>
                  <MenuItem
                    value={"nik"}
                    onClick={() => {
                      formRef.current.reset();
                      router.replace({
                        query: "".toString(),
                      });
                    }}
                  >
                    Nik
                  </MenuItem>
                </Select>
                <TextField
                  style={{ width: "100%" }}
                  type="search"
                  id="search"
                  size="small"
                  {...register("search")}
                />
              </Grid>
              <Grid item xs={12} md={1} lg={1} display="flex">
                <Button
                  variant="text"
                  color="warning"
                  onClick={handleResetFilter}
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                    color: "#1ba0e2",
                    border: "2px solid #1ba0e2",
                  }}
                >
                  Reset
                </Button>
              </Grid>
              <Grid item xs={12} md={3} lg={1} display="flex">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  size="small"
                  endIcon={<SearchIcon fontSize="small" />}
                  sx={{
                    "& .MuiButton-endIcon ": {
                      marginLeft: "4px",
                    },
                    background: "#1ba0e2",
                  }}
                >
                  Search
                </Button>
              </Grid>
              <Grid item xs={12} md={2} lg={1} display="flex">
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
              </Grid>
            </Grid>
          </Grid>
        </form>

        {resetFilterDebounce ? (
          <FilterModal
            open={openModal}
            type={modalType}
            closeModalHandler={handleCloseModal}
          />
        ) : null}
      </Box>
    </DashboardCard>
  );
};

export default SearchUser;
