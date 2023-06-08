import React from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Container, TextField } from "@mui/material";
import CustomTextField from "../custom-elements/CustomTextField";
import { Controller } from "react-hook-form";
const ControlledDateTimePicker = ({
  value,
  onChange,
  name,
  defaultValue,
  error,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MuiDateTimePicker
            name={name}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e);
            }}
            value={value}
            ampm={false}
            inputFormat="DD MM YYYY, HH:mm:ss"
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                fullWidth
                sx={{
                  "& .MuiSvgIcon-root": {
                    width: "18px",
                    height: "18px",
                  },
                  "& .MuiFormHelperText-root": {
                    display: "none",
                  },
                }}
                helperText={error?.message}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default ControlledDateTimePicker;
