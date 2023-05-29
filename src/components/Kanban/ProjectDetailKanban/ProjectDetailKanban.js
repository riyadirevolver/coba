import '@asseinfo/react-kanban/dist/styles.css';
import {
  Flex,
  Button,
  Skeleton,
  Box,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Stack,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import AdditionalForm from '../CardForm/AdditionalForm';
import { useFormik } from 'formik';
import ProjectCardService from 'services/ProjectCards';
import CardHeader from 'components/Card/CardHeader';
import { CiSquarePlus } from 'react-icons/ci';
import Typography from 'components/Typography/Typography';
import { useParams } from 'react-router-dom';
import ShortTextForm from 'components/Forms/ShortTextForm';
import LongTextForm from 'components/Forms/LongTextForm';
import Select from 'components/Forms/Select';
import { fieldTypes } from 'constants/typeFIelds';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FieldValidationSchema } from 'validations/FieldValidations';
import InputField from 'components/Forms/InputField';

const ProjectDetailKanban = ({ cardId, cardData, onRefetch, isFetched }) => {
  const dataExtras = useMemo(() => cardData, [cardData]);

  const [onFieldEdit, setOnFieldEdit] = useState('');
  const [addNewField, setNewField] = useState(false);

  const { id } = useParams();

  const keys = cardData ? Object.keys(cardData) : [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...dataExtras,
    },

    onSubmit: async (values, { resetForm }) => {
      const payload = {
        additional_extras: JSON.stringify(values),
      };

      try {
        await ProjectCardService.patch(cardId ? cardId : id, payload);
        onRefetch();
        resetForm;
        alert('Update Success');
      } catch (error) {
        console.log(error);
        alert('Terjadi Kesalahan Server');
      }
    },
  });

  const formikField = useFormik({
    initialValues: {
      name: '',
      type: '',
      value: '',
    },

    validationSchema: FieldValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      const newValues = {};
      newValues[values.name] = {
        f_type: values.type,
        f_value: values.value,
      };
      const additionalExtras = {
        ...dataExtras,
        ...newValues,
      };

      const payload = {
        additional_extras: JSON.stringify(additionalExtras),
      };

      try {
        await ProjectCardService.patch(cardId ? cardId : id, payload);
        onRefetch();
        resetForm();
        setNewField(false);
        alert('Update Success');
      } catch (error) {
        resetForm();
        console.log(error);
        alert('Terjadi Kesalahan Server');
      }
    },
  });

  function onResetForm() {
    setNewField(false);
    formikField.resetForm();
  }

  const handleCancelForm = (v, field) => {
    formik.handleChange({
      target: {
        name: `${field}.value`,
        value: cardData[field].value,
      },
    });
    setOnFieldEdit(v);
  };

  return (
    <Flex mt={3}>
      <Card>
        <CardHeader
          mb={2}
          fontWeight={700}
          color="blue.500"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Project Details</Typography>
          {addNewField ? null : (
            <Button
              variant="ghost"
              p={0}
              onClick={() => setNewField(!addNewField)}
            >
              <AiOutlinePlusCircle
                style={{
                  fontSize: '22px',
                }}
              />
            </Button>
          )}
        </CardHeader>
        {isFetched ? (
          <CardBody>
            {cardData !== null ? (
              <Box>
                {keys.map((field, idx) => {
                  return (
                    <AdditionalForm
                      key={idx}
                      name={field}
                      field={field}
                      type={formik.values[field]?.f_type}
                      value={formik.values[field]?.f_value}
                      isEdit={onFieldEdit === field}
                      onClick={(v) => handleCancelForm(v, field)}
                      onChange={(e) =>
                        formik.handleChange({
                          target: {
                            name: `${field}.f_value`,
                            value: e.target.value,
                          },
                        })
                      }
                      handleSubmit={() => formik.handleSubmit()}
                    />
                  );
                })}
              </Box>
            ) : null}
            <Box
              sx={{
                display: addNewField ? 'block' : 'none',
                borderTop: '5px solid #8c8b8b5c',
                pt: 3,
              }}
            >
              <FormControl
                sx={{
                  display: 'flex',
                }}
              >
                <FormLabel
                  fontSize="13px"
                  fontWeight={700}
                  sx={{
                    maxW: '85px',
                    w: '100%',
                    color: 'gray',
                  }}
                >
                  Field Name
                </FormLabel>
                <Stack>
                  <InputField
                    name="name"
                    value={formikField.values.name}
                    onChange={(v) => formikField.handleChange(v)}
                    errors={formikField.errors}
                    sxFc={{
                      mb: 0,
                    }}
                  />
                </Stack>
              </FormControl>
              <FormControl display="flex">
                <FormLabel
                  fontSize="13px"
                  fontWeight={700}
                  sx={{
                    maxW: '85px',
                    w: '100%',
                    color: 'gray',
                  }}
                >
                  Field Type
                </FormLabel>
                <Stack sx={{ mb: 2 }}>
                  <Select
                    name="type"
                    options={fieldTypes}
                    onChange={(e) =>
                      formikField.handleChange({
                        target: {
                          name: 'type',
                          value: e.target.value,
                        },
                      })
                    }
                    value={formikField.values.type}
                    required={true}
                    errors={formikField.errors}
                    sxFc={{
                      marginBottom: 0,
                    }}
                  />
                  {/* {!formikField.errors ? null : (
                    <FormHelperText sx={{ color: 'red.500', fontSize: 11.5 }}>
                     {formikField.errors && formikField.errors['type']}
                    </FormHelperText>
                  )} */}
                </Stack>
              </FormControl>
              <FormControl display="flex">
                <FormLabel
                  fontSize="13px"
                  fontWeight={700}
                  sx={{
                    maxW: '85px',
                    w: '100%',
                    color: 'gray',
                  }}
                >
                  Field Value
                </FormLabel>

                <InputField
                  name="value"
                  value={formikField.values.value}
                  onChange={formikField.handleChange}
                  errors={formikField.errors}
                  sxFc={{
                    mb: 0,
                  }}
                />
              </FormControl>
              <Flex justifyContent="flex-end" mt={3}>
                <Button mr={2} onClick={formikField.handleSubmit}>
                  Save
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    onResetForm();
                  }}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          </CardBody>
        ) : (
          <>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} w="100%" h="8px" mb={2} />
            ))}
          </>
        )}
      </Card>
    </Flex>
  );
};

export default ProjectDetailKanban;
