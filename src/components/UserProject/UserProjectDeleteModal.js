import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const UserProjectDeleteModal = ({
  isOpen,
  onClose,
  onCloseComplete,
  title,
  children,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      {...props}
      onCloseComplete={onCloseComplete}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>test modal</ModalBody>

        {/* {withAction ? (
          <ModalFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              mr={3}
              onClick={clickCancel}
            >
              {btnCancelTitle}
            </Button>
            <Button variant="outline" onClick={clickConfirm}>
              {btnConfirmTitle}
            </Button>
          </ModalFooter>
        ) : null} */}
      </ModalContent>
    </Modal>
  );
};

export default UserProjectDeleteModal;
