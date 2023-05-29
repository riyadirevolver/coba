import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
  Stack,
  FormHelperText,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ShortTextForm = ({ data, onChange, value, errors, sxFl, sxFc }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <FormControl sx={{ ...sxFc }}>
      {data.isEdit ? null : (
        <FormLabel color={textColor} sx={{ ...sxFl }}>
          {data.name}
        </FormLabel>
      )}
      <Stack>
        <Input name={data.name} mb="20px" onChange={onChange} value={value} />
        <FormHelperText sx={{ color: 'red.500', fontSize: 11.5 }}>
          {errors && errors[data.name]}
        </FormHelperText>
      </Stack>
    </FormControl>
  );
};

ShortTextForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  errors: PropTypes.object,
};

export default ShortTextForm;
