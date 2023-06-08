import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

const Dropdown = (props) => {
  const {
    name,
    label,
    options,
    sxForm,
    sxLabel,
    sxSelect,
    errors,
    onChange,
    control,
  } = props;
  const [selected, setSelected] = useState("");
  return (
    <>
      <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>
      <FormControl>
        <Controller
          control={control}
          render={({ field }) => (
            <>
              <InputLabel>{label}</InputLabel>
              <Select
                {...field}
                label={label}
                sx={{ ...sxSelect }}
                onChange={(e) => {
                  const { value } = e.target;
                  if (e.target.value) {
                    setSelected(value);
                    field.onChange(value);
                  }
                  setSelected(value);
                  onChange?.(value);
                }}
              >
                <MenuItem disabled value="">
                  {label}
                </MenuItem>
                {options &&
                  options.map((option, idx) => (
                    <MenuItem key={option.id ?? idx} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </Select>
            </>
          )}
          defaultValue=""
          name={name}
        />
      </FormControl>
    </>
  );
};

export default Dropdown;
