/* eslint-disable no-useless-escape */
import { EditIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';
import InputField from 'components/Forms/InputField';
import LongTextForm from 'components/Forms/LongTextForm';
import PhoneForm from 'components/Forms/PhoneForm';
import ShortTextForm from 'components/Forms/ShortTextForm';
import Typography from 'components/Typography/Typography';
import { fieldType } from 'constants/typeFIelds';
import React, { useState } from 'react';

const AdditionalForm = ({
  field,
  value,
  onChange,
  isEdit,
  handleSubmit,
  type,
  onClick,
}) => {
  // console.log('value',value)

  // const [onEdit, setOnEdit] = useState(isEdit);

  const renderForm = (type, field, value) => {
    switch (type) {
      case fieldType.SHORT_TEXT:
        return (
          <ShortTextForm
            data={{ name: field }}
            onChange={onChange}
            value={value}
          />
        );

      case fieldType.LONG_TEXT:
        return (
          <LongTextForm
            data={{ name: field, isEdit: isEdit }}
            value={value}
            onChange={onChange}
            onInput={(e) => {
              let elm = e.target;
              elm.style.height = elm.scrollHeight + 'px';
            }}
          />
        );

      case fieldType.PHONE:
        return (
          <PhoneForm
            data={{ name: field, isEdit: isEdit }}
            value={value}
            onChange={onChange}
            sxFl={{
              fontWeight: 400,
              marginBottom: '2px',
              fontSize: '16px',
            }}
          />
        );

      default:
        return null;
    }
  };
  return (
    <Box width="100%" mb="10px">
      <Flex
        direction="row"
        justifyContent="space-between"
        w="100%"
        _hover={{
          backgroundColor: isEdit ? '#fff' : '#efefef',
          '& button': {
            display: 'block',
          },
        }}
      >
        <Box display="flex" alignItems="flex-start" w="100%">
          <Typography fontWeight={700} fontSize="13px" color="gray" mr={3}>
            {field}
          </Typography>
          {isEdit ? (
            <Stack mb={2} w="100%">
              <Flex direction="row" alignItems="flex-start" w="100%">
                <Flex direction="column" w="100%">
                  {isEdit && renderForm(type, field, value)}

                  <Flex flexDirection="row" mt="10px" justifyContent="flex-end">
                    <Button
                      variant="link"
                      fontWeight={500}
                      onClick={() => {
                        onClick('');
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
                      onClick={() => onClick('')}
                      justifyContent="flex-start"
                      sx={{
                        p: 0,
                      }}
                    >
                      cancel
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </Stack>
          ) : (
            <Typography fontWeight={500}>{value}</Typography>
          )}
        </Box>

        {isEdit ? null : (
          <Button
            variant="link"
            fontWeight={500}
            onClick={() => onClick(field)}
            sx={{
              display: 'none',
            }}
          >
            <EditIcon />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default AdditionalForm;
