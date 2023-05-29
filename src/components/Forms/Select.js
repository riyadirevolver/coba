import {
  Select as CSelect,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';

const Select = ({
  options,
  value,
  label,
  name,
  onChange,
  errors,
  sxTitle,
  sxFc,
  required,
  ...props
}) => {
  return (
    <FormControl
      sx={{
        marginBottom: '16px',
        ...sxFc,
      }}
    >
      <FormLabel htmlFor={name} sx={{ ...sxTitle }}>
        {label}
      </FormLabel>
      <Stack>
        <CSelect
          id={name}
          placeholder="Select"
          name={name}
          onChange={onChange}
          value={value}
          required={required}
          {...props}
        >
          {options.map((opt, idx) => (
            <option key={opt.id ? opt.id : idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </CSelect>
        <FormHelperText sx={{ color: 'red.500', fontSize: 11.5 }}>
          {errors && errors[name]}
        </FormHelperText>
      </Stack>
    </FormControl>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
};

export default Select;
