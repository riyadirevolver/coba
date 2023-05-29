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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import ProjectColumnsService from "services/ProjectColumns";

const DeleteColumnModal = ({
  isOpen,
  onClose,
  removeColumn,
  cardId,
  title,
  projectId,
  onCloseComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async () => {
      showLoading();
      try {
        await ProjectColumnsService.delete(cardId);

        removeColumn();
        hideLoading();
        onClose();
        alert("Sukses menghapus kolom");
      } catch (error) {
        hideLoading();
        onClose();
        alert(error);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
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
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Hapus Kolom</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Apakah anda ingin menghapus kolom <strong>{title}</strong> ?
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
    </>
  );
};

export default DeleteColumnModal;
