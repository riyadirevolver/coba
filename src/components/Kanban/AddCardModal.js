import { AddIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  ModalFooter,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
import BaseModal from 'components/BaseModal/BaseModal';
import FieldSetting from 'components/FieldSetting/FieldSetting';
import LongTextForm from 'components/Forms/LongTextForm';
import PhoneForm from 'components/Forms/PhoneForm';
import ShortTextForm from 'components/Forms/ShortTextForm';
import Typography from 'components/Typography/Typography';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import FieldsService from 'services/FieldsService';
import ProjectCardService from 'services/ProjectCards';
import { ColorProps } from 'theme/color';
import AddUser from './AddUser';
import { AddCardValidation } from 'validations/CardValidation';
import LogActivitiesService from 'services/LogActivities';

const AddCardModal = ({
  projectColumnId,
  isOpen,
  onClose,
  addCard,
  cardId,
  onCloseComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue('gray.700', 'white');

  const { id: projectId } = useParams();

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  // console.log('project column id: ' + projectColumnId)
  const filteredObj = (obj) => {
    let result = {};

    const entries = Object.keys(obj);
    const filteredKey = entries.filter((item) => {
      for (var field in obj) {
        if (item === 'title') {
          return false;
        }
        if (item === 'subtitle') {
          return false;
        }
      }
      return true;
    });

    filteredKey.map((key) => {
      result[key] = obj[key];
    });

    return result;
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      subtitle: '',
    },
    // validationSchema: { AddCardValidation },
    onSubmit: async (values) => {
      showLoading();

      hideLoading();
      const additional_extras = filteredObj(values);

      try {
        const { data } = await ProjectCardService.create({
          project_column_id: projectColumnId,
          title: values.title,
          subtitle: values.subtitle,
          additional_extras: JSON.stringify(additional_extras),
        });

        await LogActivitiesService.create({
          card_id: data.id,
          column_id: projectColumnId,
        });
        addCard(
          {
            id: data.id,
            title: values.title,
            subtitle: values.subtitle,
          },
          {
            on: 'top',
          }
        );
        hideLoading();
        onClose();
        alert('Sukses menambahkan card');
      } catch (error) {
        hideLoading();
        alert('Terjadi kesalahan pada sistem');
      }
    },
  });
  const { data, status, refetch } = useQuery('fields', async () => {
    const { data } = await FieldsService.find({
      project_id: projectId,
      project_column_id: null,
    });
    return data;
  });

  const { data: fieldByColumnId } = useQuery(`fields-project-id`, async () => {
    if (projectColumnId) {
      const { data } = await FieldsService.find({
        project_id: projectId,
        project_column_id: projectColumnId,
      });
      return data;
    }
  });

  const handleClose = () => {
    formik.resetForm();
    onCloseComplete();
  };

  if (status === 'loading') return <></>;

  return (
    <BaseModal
      title="Tambah Card"
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={handleClose}
      isCentered={false}
      size="4xl"
      sxContent={{
        p: 0,
      }}
    >
      <Box
        w="100%"
        className="scroll"
        sx={{
          overflowY: 'scroll',
          minHeight: '600px',
          height: '700px',
        }}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={3} height="100%">
          <GridItem
            colSpan={2}
            sx={{
              borderRight: '1px solid #dddddd',
            }}
          >
            <FieldSetting projectId={projectId} />
            <form onSubmit={formik.handleSubmit}>
              <Box
                display="flex"
                justifyContent="space-between"
                pt={3}
                p="20px"
              >
                <Box w="100%" mr={3}>
                  <Typography fontWeight={700} mb={3}>
                    General Field
                  </Typography>
                  <FormControl>
                    <FormLabel
                      color={textColor}
                      sx={{
                        fontWeight: 400,
                        marginBottom: '2px',
                        fontSize: '16px',
                      }}
                    >
                      Judul
                    </FormLabel>
                    <Input
                      name="title"
                      mb="20px"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      color={textColor}
                      sx={{
                        fontWeight: 400,
                        marginBottom: '2px',
                        fontSize: '16px',
                      }}
                    >
                      Deskripsi
                    </FormLabel>
                    <Input
                      name="subtitle"
                      mb="20px"
                      onChange={formik.handleChange}
                      value={formik.values.subtitle}
                    />
                  </FormControl>

                  {data.data.map((field, idx) => {
                    switch (field.type) {
                      case 'short_text':
                        return (
                          <ShortTextForm
                            key={idx}
                            data={field}
                            onChange={(e) =>
                              formik.setFieldValue(field.name, {
                                f_type: field.type,
                                f_value: e.target.value,
                              })
                            }
                            value={formik.values[field.name]}
                            sxFl={{
                              fontWeight: 400,
                              marginBottom: '2px',
                              fontSize: '16px',
                            }}
                          />
                        );

                      case 'long_text':
                        return (
                          <LongTextForm
                            key={idx}
                            data={field}
                            onChange={(e) =>
                              formik.setFieldValue(field.name, {
                                f_type: field.type,
                                f_value: e.target.value,
                              })
                            }
                            value={formik.values?.field?.name[field.value]}
                            sxFl={{
                              fontWeight: 400,
                              marginBottom: '2px',
                              fontSize: '16px',
                            }}
                          />
                        );

                      case 'phone':
                        return (
                          <PhoneForm
                            data={field}
                            onChange={(e) => {
                              formik.setFieldValue(field.name, {
                                f_type: field.type,
                                f_value: e.target.value,
                              });
                            }}
                            value={formik.values?.field?.name[field.value]}
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
                  })}
                </Box>
                {!fieldByColumnId?.data?.length ? null : (
                  <Box w="100%" borderLeft="1px solid #e1e1e1" pl={3}>
                    <Typography fontWeight={700} mb={3}>
                      Spesific Field
                    </Typography>

                    {fieldByColumnId?.data?.map((field, idx) => {
                      switch (field.type) {
                        case 'short_text':
                          return (
                            <ShortTextForm
                              key={idx}
                              data={field}
                              onChange={formik.handleChange}
                              value={formik.values[field.name]}
                              sxFl={{
                                fontWeight: 400,
                                marginBottom: '2px',
                                fontSize: '16px',
                              }}
                            />
                          );

                        case 'long_text':
                          return (
                            <LongTextForm
                              key={idx}
                              data={field}
                              onChange={formik.handleChange}
                              value={formik.values[field.name]}
                              sxFl={{
                                fontWeight: 400,
                                marginBottom: '2px',
                                fontSize: '16px',
                              }}
                            />
                          );

                        case 'phone':
                          return (
                            <PhoneForm
                              data={field}
                              onChange={formik.handleChange}
                              value={formik.values[field.name]}
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
                    })}
                  </Box>
                )}
              </Box>
            </form>
          </GridItem>
          <GridItem colSpan={1} px="1rem">
            <Box mb={3}>
              <Typography mb={1}>Assign to</Typography>
              <Stack direction="row" alignItems="flex-start" w="100%">
                <Flex flexWrap="wrap">
                  <Avatar
                    src="test"
                    name="avatar"
                    h="35px"
                    w="35px"
                    mr={1}
                    mb={1}
                  />
                  <Avatar src="test" name="x" h="35px" w="35px" mr={1} mb={1} />
                  <Avatar src="test" name="c" h="35px" w="35px" mr={1} mb={1} />
                </Flex>
                <AddUser />
              </Stack>
            </Box>
            <Box>
              <Typography>Notes</Typography>
              <Textarea
                name="notes"
                row={3}
                onChange={formik.handleChange}
                value={formik.values.notes}
              />
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <ModalFooter
        sx={{
          borderTop: '2px solid rgb(192, 192, 192)',
          //   paddingY: 0,
          mt: '3px',
        }}
      >
        <Button
          variant="solid"
          //   colorScheme={ColorProps['primary.1']}
          mr={3}
          onClick={onClose}
        >
          Close
        </Button>
        <Button
          variant="solid"
          colorScheme="blue"
          onClick={() => formik.handleSubmit()}
        >
          Save
        </Button>
      </ModalFooter>
    </BaseModal>
  );
};

export default AddCardModal;
