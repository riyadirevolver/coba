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
import { useMutation, useQueryClient } from 'react-query';
import ProjectCardService from 'services/ProjectCards';

const DeleteCardModal = ({
  isOpen,
  onClose,
  cardId,
  title,
  onCloseComplete,
  closeView,
  removeCard,
}) => {
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue('gray.700', 'white');

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const queryClient = useQueryClient();
  const handleDeleteField = async (id) => await ProjectCardService.delete(id);
  const { mutate } = useMutation(handleDeleteField, {
    onSuccess: () => {
      removeCard()
      const message = 'success delete card';
      alert(message);
    },
    onError: (err) => {
      console.log(err);
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('delete');
    },
  });

  const handleDeleteID = async () => {
    showLoading();
    try {
      // await ProjectCardService.delete(cardId);
      mutate(cardId);
      hideLoading();
      onClose();
    } catch (error) {
      hideLoading();
      onClose();
      alert(error);
    }
  };

  const handleClose = () => {
    onCloseComplete();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={handleClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah anda ingin menghapus card <strong>{title ?? ''}</strong> ?
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="blue"
              mr={3}
              // type="submit"
              onClick={handleDeleteID}
            >
              Ya
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Tidak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteCardModal;
