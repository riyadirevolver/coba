import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import InputField from 'components/Forms/InputField';
import Typography from 'components/Typography/Typography';
import React, { useState } from 'react';

const TitleForm = ({ name, value, onChange, handleSubmit }) => {
  const [onEdit, setOnEdit] = useState(false);
  return (
    <Box width="100%">
      {onEdit ? (
        <Stack mb={2} w="100%">
          <InputField
            name={name}
            // onBlur={() => setOnEdit(!onEdit)}
            value={value}
            onChange={onChange}
            sxFc={{
              margin: 0,
            }}
          />
          <Flex mt="10px">
            <Button
              variant="link"
              fontWeight={500}
              onClick={() => {
                setOnEdit(!onEdit);
                handleSubmit();
              }}
              justifyContent="flex-start"
              sx={{
                p: 0,
                mr: '10px',
              }}
            >
              save
            </Button>
            <Button
              variant="link"
              fontWeight={500}
              onClick={() => setOnEdit(!onEdit)}
              justifyContent="flex-start"
              sx={{
                p: 0,
              }}
            >
              cacel
            </Button>
          </Flex>
        </Stack>
      ) : (
        <Flex>
          <Typography fontWeight={700}>{value}</Typography>
          <Button
            variant="link"
            fontWeight={500}
            onClick={() => setOnEdit(!onEdit)}
          >
            Edit
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TitleForm;
