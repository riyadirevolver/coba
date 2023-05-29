import {
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";

const UploadForm = ({ data, onChange, value ,sxFl}) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <FormControl>
      <FormLabel color={textColor}  sx={{ ...sxFl }}>{data.name}</FormLabel>
      <Input
        type="file"
        name={data.name}
        mb="20px"
        onChange={onChange}
        value={value}
      />
    </FormControl>
  );
};

export default UploadForm;
