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

const AddColumnModal = ({
  isOpen,
  onClose,
  addColumn,
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
    onSubmit: async (values) => {
      showLoading();
      const { data } = await ProjectColumnsService.create({
        title: values.title,
        project_id: projectId,
      });
      addColumn({
        id: data.id,
        title: values.title,
        project_id: projectId,
        cards: [],
      });
      hideLoading();
      onClose();
      alert("Sukses menambahkan kolom");
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
            <ModalHeader>Tambah Kolom</ModalHeader>
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

export default AddColumnModal;
