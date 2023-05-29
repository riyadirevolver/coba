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
import ProjectsService from "services/Projects";

const EditProjectModal = ({ isOpen, onClose, onCloseComplete, data }) => {
  console.log(data, "data");
  const [loading, setLoading] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name,
      description: data.description,
    },
    onSubmit: async (values) => {
      showLoading();
      try {
        await ProjectsService.update(
          {
            name: values.name,
            description: values.description,
          },
          data.id
        );
        hideLoading();
        onClose();
        alert("Sukses edit project");
      } catch (error) {
        hideLoading();
        alert("Terjadi kesalahan pada sistem");
      }
    },
  });

  const handleCloseComplete = () => {
    formik.resetForm();
    onCloseComplete();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={handleCloseComplete}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Edit Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel color={textColor}>Nama Project</FormLabel>
                <Input
                  name="name"
                  mb="20px"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={textColor}>Deskripsi Project</FormLabel>
                <Input
                  name="description"
                  mb="20px"
                  onChange={formik.handleChange}
                  value={formik.values.description}
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

export default EditProjectModal;
