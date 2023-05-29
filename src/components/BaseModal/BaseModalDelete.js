import React from 'react';

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Typography from 'components/Typography/Typography';

const BaseModalDelete = ({
  dataId,
  isOpen,
  onClose,
  onCloseComplete,
  title = 'Delete data',
  dataName,
  clickConfirm,
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
        <ModalBody>
          Are you sure deleted <b>{dataName}</b>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={() => clickConfirm(dataId)}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BaseModalDelete;
