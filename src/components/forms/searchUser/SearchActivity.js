import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "../../../hooks/useDebounce";
import useHandleModal from "../../../hooks/useHandleModal";
import { searchUser } from "../../../validations/user/searchUser";
import DashboardCard from "../../baseCard/DashboardCard";
import FilterActivityModal from "../../modal/filterModal/FilterActivityModal";
import moment from "moment-timezone";
import "moment/locale/id";
moment.locale("id");
import DateRangePickerV2 from "../dateRangePicker/DateRangePickerV2";

const SearchActivity = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(searchUser),
  });

  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const [closeDate, setCloseDate] = React.useState(false);
  const [querySearch, setQuerySearch] = useState("name");
  const [isFilter, setIsfilter] = useState(true);

  const resetFilterDebounce = useDebounce(isFilter, 1000);
  const router = useRouter();

  const formRef = useRef(null);

  const [date, setDate] = React.useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [clearInputDate, setClearInputDate] = React.useState(false);

  useEffect(() => {
    if (!resetFilterDebounce) {
      setIsfilter(true);
    }
  }, [resetFilterDebounce]);
  const handleSearch = (data) => {
    setCloseDate(true);
    const firstDate = moment(date[0].startDate);
    const endDate = moment(date[0].endDate);
    router.replace({
      query: {
        ...router.query,
        ...(date[0].selected && {
          start_date: moment(firstDate).format("YYYY-MM-DD"),
          end_date: moment(endDate).format("YYYY-MM-DD"),
        }),
        ...(data.search != "" && {
          fullname: data.search,
        }),
      },
    });
  };

  const handleResetFilter = () => {
    setCloseDate(true);
    setDate([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
        selected: false,
      },
    ]);
    setClearInputDate(true);
    formRef.current.reset();
    setIsfilter(false);
    router.replace({
      shallow: true,
    });
  };

  return (
    <DashboardCard
      customdisplay="flex"
      customheaderpadding="0px"
      cardSx={{ overflow: "visible" }}
    >
      <form ref={formRef} onSubmit={handleSubmit(handleSearch)}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={7} xs={12}>
            <InputLabel>Search</InputLabel>
            <TextField
              style={{ width: "100%", marginBottom: "20px" }}
              type="search"
              id="search"
              size="small"
              placeholder="Cari berdasarkan nama"
              {...register("search")}
            />

            <DateRangePickerV2
              closeDate={closeDate}
              editableDateInputs={true}
              onChange={(item) => {
                setDate([{ ...item.selection, selected: true }]);
                setClearInputDate(false);
                setCloseDate(false);
              }}
              moveRangeOnFirstSelection={false}
              ranges={date}
              clearInputDate={clearInputDate}
            />
          </Grid>
          <Grid item lg={4} md={5} xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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
                onClick={handleResetFilter}
                size="small"
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
                Search
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* {openModal ? ( */}
      <FilterActivityModal
        open={openModal}
        type={modalType}
        closeModalHandler={handleCloseModal}
      />
      {/* ) : null} */}
    </DashboardCard>
  );
};

export default SearchActivity;
