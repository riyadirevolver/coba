import { FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import AutocompleteComp from "@mui/material/Autocomplete";

const ControlledAutocomplate = ({
  name,
  label,
  control,
  options,
  placeholder = "Input somthings...",
  defaultValue = [],
  loading,
  onInputChange,
  onChange,
  size = "small",
  watch,
  setValue,
  value,
  sx,
  sxFC,
  getOptionLabel,
  renderOption,
  isOptionEqualToValue,
  ...props
}) => {
  return (
    <FormControl sx={{ width: "100%", ...sxFC }}>
      {label && <FormLabel>{label}</FormLabel>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <AutocompleteComp
              id={name}
              value={value}
              options={options ?? []}
              onChange={(event, item) => {
                onChange?.(event, item);
                field.onChange(item);
              }}
              getOptionLabel={(option) => getOptionLabel(option)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={placeholder}
                />
              )}
              isOptionEqualToValue={(props, option) =>
                isOptionEqualToValue(props, option)
              }
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
              onInputChange={(_, newInputValue) => {
                onInputChange?.(_, newInputValue);
              }}
              loading={loading}
              size={size}
              {...props}
              sx={{ ...sx }}
            />
          );
        }}
        onChange={([e, data]) => data}
        defaultValue={defaultValue[0]}
      />
    </FormControl>
  );
};

ControlledAutocomplate.propTypes = {
  options: PropTypes.array.isRequired,
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default ControlledAutocomplate;
