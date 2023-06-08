import {
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";

import FeatherIcon from "feather-icons-react";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Box } from "@mui/system";

const DateRangePicker = ({
  editableDateInputs,
  onChange,
  moveRangeOnFirstSelection,
  ranges,
  clearInputDate,
  maxDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeDateValue = (item) => {
    setStartDate(moment(item.startDate).format("DD-MM-YYYY"));

    setEndDate(moment(item.endDate).format("DD-MM-YYYY"));
    // setIsOpen(false);
  };

  useEffect(() => {
    if (clearInputDate) {
      setStartDate("");
      setEndDate("");
    }
    // clearTimeout;
  }, [clearInputDate]);

  return (
    <>
      <Box
        component={"div"}
        className="search-date"
        display="flex"
        position="relative"
        flexDirection="column"
      >
        <Box
          component={"div"}
          className="search-date-group"
          display="flex" // flexDirection="column"
          // ml={3}
          // mr={3}
        >
          {isOpen && (
            <Box
              display="block"
              sx={{
                position: "fixed",
                top: 1,
                height: "100vh",
                width: "100%",
              }}
              onClick={() => setIsOpen(false)}
            ></Box>
          )}
          <Box
            component={"div"}
            className="start-date"
            display="flex"
            alignItems="center"
            width={"300px"}
          >
            <InputLabel sx={{ mr: 2, width: "100px" }}>Start Date</InputLabel>
            <OutlinedInput
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              sx={{
                width: "250px",
                background: "#F6F6F6",
                borderRadius: "8px",
                "& fieldset": { border: "none" },
              }}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                    edge="end"
                  >
                    {isOpen ? (
                      <FeatherIcon icon="x" />
                    ) : (
                      <FeatherIcon icon="calendar" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box
            component={"div"}
            className="start-date"
            display="flex"
            alignItems="center"
            width={"300px"}
          >
            <InputLabel sx={{ mr: 2, width: "100px" }}>End Date</InputLabel>
            <OutlinedInput
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              size="small"
              sx={{
                width: "250px",
                background: "#F6F6F6",
                borderRadius: "8px",
                "& fieldset": { border: "none" },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsOpen(!isOpen)}
                    edge="end"
                  >
                    {isOpen ? (
                      <FeatherIcon icon="x" />
                    ) : (
                      <FeatherIcon icon="calendar" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <Box
            display="flex"
            position="absolute"
            top={50}
            left={"50%"}
            zIndex={9}
            sx={{
              transform: "translate(-50%)",
            }}
          >
            <Paper elevation={2}>
              {isOpen && (
                <DateRange
                  className="date__picker"
                  editableDateInputs={editableDateInputs}
                  onChange={(item) => {
                    const date = item.selection;
                    handleChangeDateValue(date);
                    onChange?.(item);
                  }}
                  maxDate={maxDate}
                  moveRangeOnFirstSelection={moveRangeOnFirstSelection}
                  ranges={ranges}
                />
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DateRangePicker;
