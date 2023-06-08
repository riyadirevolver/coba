import { Box, FormControl, Switch, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const ControlledSwitch = ({ name, control, defaultValue, sx, sxFC }) => {
  return (
    <FormControl sx={{ ...sxFC }}>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => (
          <Box display="flex">
            <Switch
              {...field}
              onChange={(event) => {
                onChange?.(event.target.checked);
                field.onChange(event.target.checked);
              }}
              sx={{ ...sx }}
            />
            {label && (
              <Typography variant="body1" sx={{ fontWeight: 400, ...sx }}>
                {label}
              </Typography>
            )}
          </Box>
        )}
      />
    </FormControl>
  );
};

ControlledSwitch.PropType = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.bool,
  control: PropTypes.any.isRequired,
};

export default ControlledSwitch;