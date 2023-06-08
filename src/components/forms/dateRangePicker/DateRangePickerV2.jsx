import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";

import FeatherIcon from "feather-icons-react";

import { Box } from "@mui/system";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePickerV2 = ({
  editableDateInputs,
  onChange,
  moveRangeOnFirstSelection,
  ranges,
  clearInputDate,
  maxDate,
  closeDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleChangeDateValue = (item) => {
    setStartDate(moment(item.startDate).format("DD-MM-YYYY"));
    setEndDate(moment(item.endDate).format("DD-MM-YYYY"));
  };

  useEffect(() => {
    if (clearInputDate) {
      setStartDate("");
      setEndDate("");
    }
    if (closeDate == true) {
      setIsOpen(false);
    }

    // clearTimeout;
  }, [clearInputDate, closeDate]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputLabel sx={{ mr: 2, width: "100px" }}>Start Date</InputLabel>
          <OutlinedInput
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
            fullWidth
            sx={{
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
        </Grid>
        <Grid item xs={6}>
          <InputLabel sx={{ mr: 2, width: "100px" }}>End Date</InputLabel>
          <OutlinedInput
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
            size="small"
            fullWidth
            sx={{
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
        </Grid>
      </Grid>
      <Box
        display="flex"
        position="absolute"
        top={55}
        left={"50%"}
        zIndex={9}
        sx={{
          transform: "translate(-50%, 65%)",
        }}
      >
        <Paper elevation={2}>
          {isOpen && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <DateRange
                className="date__picker"
                editableDateInputs={editableDateInputs}
                onChange={(item) => {
                  const date = item.selection;
                  handleChangeDateValue(date);
                  onChange?.({ ...item, selected: true });
                }}
                maxDate={maxDate}
                moveRangeOnFirstSelection={moveRangeOnFirstSelection}
                ranges={ranges}
              />
              <Box display={"flex"} width={"100%"} justifyContent={"flex-end"}>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  variant="outlined"
                  color="error"
                  sx={{
                    marginRight: "10px",
                  }}
                >
                  cancel
                </Button>
                <Button variant="contained" onClick={() => setIsOpen(false)}>
                  save
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default DateRangePickerV2;
