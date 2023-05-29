/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import LongTextForm from 'components/Forms/LongTextForm';
import PhoneForm from 'components/Forms/PhoneForm';
import ShortTextForm from 'components/Forms/ShortTextForm';
import UploadForm from 'components/Forms/UploadForm';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import FieldsService from 'services/FieldsService';
import ProjectCardService from 'services/ProjectCards';

const AddCardModal = ({
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
    onSubmit: async (values) => {
      showLoading();

      hideLoading();
      const additional_extras = filteredObj(values);

      try {
        const { data } = await ProjectCardService.create({
          project_column_id: cardId,
          title: values.title,
          subtitle: values.subtitle,
          additional_extras: JSON.stringify(additional_extras),
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

  const handleClose = () => {
    formik.resetForm();
    onCloseComplete();
  };

  const { data, status, refetch } = useQuery(['fields'], async () => {
    const { data } = await FieldsService.find({
      project_id: projectId,
    });

    return data;
  });

  if (status === 'loading') return <></>;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={handleClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Tambah Card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel color={textColor}>Judul</FormLabel>
                <Input
                  name="title"
                  mb="20px"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={textColor}>Deskripsi</FormLabel>
                <Input
                  name="subtitle"
                  mb="20px"
                  onChange={formik.handleChange}
                  value={formik.values.subtitle}
                />
              </FormControl>

              {data.data.map((x, idx) => {
                switch (x.type) {
                  case 'short_text':
                    return (
                      <ShortTextForm
                        key={idx}
                        data={x}
                        onChange={formik.handleChange}
                        value={formik.values[x.name]}
                      />
                    );

                  case 'long_text':
                    return (
                      <LongTextForm
                        key={idx}
                        data={x}
                        onChange={formik.handleChange}
                        value={formik.values[x.name]}
                      />
                    );

                  case 'upload':
                    return (
                      <UploadForm
                        data={x}
                        onChange={(e) =>
                          formik.setFieldValue(x.name, e.currentTarget.files[0])
                        }
                        value={formik.values[x.name]}
                      />
                    );

                  case 'phone':
                    return (
                      <PhoneForm
                        data={x}
                        onChange={formik.handleChange}
                        value={formik.values[x.name]}
                      />
                    );

                  default:
                    return null;
                }
              })}
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                loadingText="Submitting"
                colorScheme="blue"
                mr={3}
                type="submit"
              >
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default AddCardModal;
