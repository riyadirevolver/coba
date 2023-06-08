import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Box, Button, TextField } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import React from "react";
const ControlledButtonDatePicker = ({
  label,
  defaultValue,
  value,
  type,
  onChange,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(false);

  const [openMonth, setOpenMonth] = React.useState(false);
  const pickerRefM = React.useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMonth(!openMonth);
  };
  const handleClose = () => {
    setAnchorEl(false);
    setOpenMonth(!openMonth);
  };

  return (
    <div>
      <Button
        id={type}
        onClick={handleClick}
        variant={type === "month" ? "contained" : "outlined"}
        sx={{
          borderRadius: "50px",
        }}
        endIcon={<FeatherIcon icon="chevron-down" />}
      >
        {label}
      </Button>
      <Box position="relative">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            open={openMonth}
            onClose={handleClose}
            ref={pickerRefM}
            views={[type]}
            value={value}
            defaultCalendarMonth={defaultValue}
            onChange={onChange}
            PopperProps={{
              placement: "bottom-end",
              anchorEl: anchorEl,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  display: "none",
                }}
              />
            )}
          />
        </LocalizationProvider>
      </Box>
    </div>
  );
};

export default ControlledButtonDatePicker;
