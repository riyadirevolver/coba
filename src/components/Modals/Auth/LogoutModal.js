import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LogoutModal = ({ isOpen, onClose, onCloseComplete }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const navigateTo = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    onClose();
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('user_id');
    navigateTo('/authentication/login');
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
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Apakah anda ingin logout ?</ModalBody>
          <ModalFooter>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="blue"
              mr={3}
              onClick={handleLogout}
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

export default LogoutModal;
