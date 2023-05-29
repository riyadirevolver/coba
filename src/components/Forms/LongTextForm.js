import {
  FormControl,
  FormLabel,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

const LongTextForm = ({ data, onChange, value, sxFl, ...props }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  return (
    <FormControl>
      {data.isEdit ? null : (
        <FormLabel color={textColor} sx={{ ...sxFl }}>
          {data.name}
        </FormLabel>
      )}
      <Textarea
        type="textarea"
        name={data.name}
        mb="20px"
        onChange={onChange}
        value={value}
        {...props}
      />
    </FormControl>
  );
};

export default LongTextForm;
