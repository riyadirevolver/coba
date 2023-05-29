/* eslint-disable react/no-children-prop */
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  FormHelperText,
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  name,
  type = 'text',
  onChange,
  value,
  label,
  errors,
  placeholder,
  size,
  startIcon,
  endIcon,
  sx,
  sxLabel,
  isRequired = false,
  sxFc,
  ...props
}) => {
  return (
    <FormControl
      sx={{
        mb: '16px',
        ...sxFc,
      }}
    >
      {label ? (
        <FormLabel htmlFor={name} sx={{ fontWeight: 500, ...sxLabel }}>
          {label}
        </FormLabel>
      ) : null}
      <Stack>
        <InputGroup>
          {startIcon ? (
            <InputLeftElement pointerEvents="none" children={startIcon} />
          ) : null}

          <Input
            id={name}
            type={type}
            name={name}
            onChange={(e) => onChange?.(e)}
            value={value}
            size={size}
            sx={{ ...sx }}
            placeholder={placeholder}
            isRequired={isRequired}
            {...props}
          />

          {endIcon && (
            <InputRightElement pointerEvents="none" children={endIcon} />
          )}
        </InputGroup>
        <FormHelperText sx={{ color: 'red.500', fontSize: 11.5 }}>
          {errors && errors[name]}
        </FormHelperText>
      </Stack>
    </FormControl>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number']),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // errors: PropTypes.object,
};

export default InputField;
