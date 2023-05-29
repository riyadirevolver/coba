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
import { useFormik } from 'formik';
import { useState } from 'react';
import FieldsService from 'services/FieldsService';
import ProjectCardService from 'services/ProjectCards';

const ProjectSettingDeleteModal = ({
  isOpen,
  onClose,
  data,
  onCloseComplete,
  handleDeleteID
}) => {
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue('gray.700', 'white');

  const handleSubmit = () => {
    handleDeleteID(data.id)
  }

  const handleClose = () => {
    onCloseComplete();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={handleClose}
      isCentered
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader>Hapus Field</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah anda ingin menghapus field <strong>{data.name ?? ''}</strong> ?
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="blue"
              mr={3}
              type="submit"
            >
              Ya
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Tidak
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ProjectSettingDeleteModal;
