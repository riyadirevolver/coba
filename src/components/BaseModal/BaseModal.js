import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { ColorProps } from 'theme/color';
import PropTypes from 'prop-types';

const BaseModal = ({
  isOpen,
  onClose,
  title = 'Modal Title',
  children,
  onCloseComplete,
  clickConfirm,
  withAction,
  sxContent,
  sxTitle,
  btnCancelTitle = 'Cancel',
  btnConfirmTitle = 'Confirm',
  clickCancel,
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
        <ModalHeader sx={{ ...sxTitle }}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={{ ...sxContent }}>{children}</ModalBody>

        {withAction ? (
          <ModalFooter>
            <Button variant="solid" colorScheme="blue" mr={3} onClick={clickCancel}>
              {btnCancelTitle}
            </Button>
            <Button variant="outline" onClick={clickConfirm}>
              {btnConfirmTitle}
            </Button>
          </ModalFooter>
        ) : null}
      </ModalContent>
    </Modal>
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string,
  // children: PropTypes.node.isRequired,
  withAction: PropTypes.bool,
  clickConfirm: PropTypes.func,
  sx: PropTypes.object,
  sxContent: PropTypes.object,
  sxTitle: PropTypes.object,
  btnConfirmTitle: PropTypes.string,
  btnCancelTitle: PropTypes.string,
};

export default BaseModal;
