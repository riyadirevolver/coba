import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';

const PhoneForm = ({ data, onChange, value, sxFl }) => {
  const textColor = useColorModeValue('gray.700', 'white');

  const handleNumbersOnly = (event) => {
    const regex = /^[0-9]*$/; // Regex allow only numbers
    const inputValue = event.target.value;

    if (!regex.test(inputValue)) {
      event.preventDefault();
      return;
    }

    onChange(event);
  };

  return (
    <FormControl>
      {data.isEdit ? null : (
        <FormLabel color={textColor} sx={{ ...sxFl }}>
          {data.name}
        </FormLabel>
      )}
      <Input
        type="tel"
        name={data.name}
        mb="20px"
        onChange={handleNumbersOnly}
        value={value}
      />
    </FormControl>
  );
};

export default PhoneForm;
