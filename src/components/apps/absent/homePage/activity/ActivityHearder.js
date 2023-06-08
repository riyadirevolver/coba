import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Box, Button, TextField, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";
import { useForm } from "react-hook-form";

const ActivityHearder = () => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [anchorY, setAnchorY] = React.useState(false);
  const [openMonth, setOpenMonth] = React.useState(false);
  const [openYear, setOpenYear] = React.useState(false);
  const pickerRefM = React.useRef(null);
  const pickerRefY = React.useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMonth(!openMonth);
  };
  const handleClose = () => {
    setAnchorEl(false);
    setOpenMonth(!openMonth);
  };
  const handleClickY = (event) => {
    setAnchorY(event.currentTarget);
    setOpenYear(true);
  };
  const handleCloseY = () => {
    setAnchorY(false);
    setOpenYear(false);
  };

  const {
    handleSubmit,
    formState: { error },
  } = useForm({});

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "19px",
            color: "#4F4F4F",
          }}
        >
          Kehadiranmu
        </Typography>
        <Box display="flex">
          <Button
            id="month"
            onClick={handleClick}
            variant="contained"
            sx={{
              borderRadius: "50px",
              mr: "10px",
            }}
            endIcon={<FeatherIcon icon="chevron-down" />}
          >
            Janiari
          </Button>
          <Box position="relative">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                open={openMonth}
                onClose={handleClose}
                ref={pickerRefM}
                views={["month"]}
                PopperProps={{
                  placement: "bottom-end",
                  anchorEl: anchorEl,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={null}
                    sx={{
                      display: "none",
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Button
            id="year"
            variant="outlined"
            onClick={handleClickY}
            sx={{
              borderRadius: "50px",
            }}
            endIcon={<FeatherIcon icon="chevron-down" />}
          >
            2023
          </Button>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              open={openYear}
              onClose={handleCloseY}
              ref={pickerRefY}
              views={["year"]}
              PopperProps={{
                placement: "bottom-end",
                anchorEl: anchorY,
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={null}
                  sx={{
                    display: "none",
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityHearder;
