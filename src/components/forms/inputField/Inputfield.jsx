import { FormControl, FormLabel } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { StyledInputField } from "./elemets";

const InputField = ({
  control,
  errors,
  label,
  name,
  type = "text",
  defaultValue,
  sxFC,
  sxFL,
  sx,
  onChange,
  placeholder,
  value,
  size = "small",
}) => {
  return (
    <FormControl sx={{ display: "flex", width: "100%", ...sxFC }}>
      <FormLabel htmlFor={name} sx={{ ...sxFL }}>
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <StyledInputField
            {...field}
            value={value}
            type={type}
            size={size}
            inputProps={{ placeholder }}
            error={!!errors[name]}
            helperText={errors[name] && errors[name].message}
            onChange={(e) => {
              if (onChange) {
                onChange?.(e.target.value);
              }
              field.onChange(e.target.value);
            }}
            sx={{ ...sx }}
          />
        )}
      />
    </FormControl>
  );
};

export default InputField;
