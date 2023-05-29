// Chakra Icons
// Chakra Imports
import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
// Assets

// Custom Icons
import { FiLogOut } from 'react-icons/fi';

// Custom Components
import LogoutModal from 'components/Modals/Auth/LogoutModal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function HeaderLinks(props) {
  const {
    variant,
    children,
    fixed,
    scrolled,
    secondary,
    onOpen,
    ...rest
  } = props;

  const [modal, setModal] = useState('');
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  // Chakra Color Mode
  let navbarIcon =
    fixed && scrolled
      ? useColorModeValue('gray.700', 'gray.200')
      : useColorModeValue('white', 'gray.200');
  let menuBg = useColorModeValue('white', 'navy.800');
  if (secondary) {
    navbarIcon = 'white';
  }
  return (
    <>
      <LogoutModal isOpen={isOpenModal} onClose={onCloseModal} />

      <Flex
        w={{ sm: '100%', md: 'auto' }}
        justifyContent="end"
        alignItems="center"
        flexDirection="row"
      >
        <Text as="b" color={'#ffff'} display={{ sm: 'none', md: 'flex' }}>
          {localStorage.getItem('name')}
        </Text>
        <Tooltip label="Logout">
          <Button
            variant="no-effects"
            color={'#ffff'}
            display="flex"
            justifyContent="space-between"
            onClick={() => {
              onOpenModal();
            }}
          >
            <FiLogOut />
          </Button>
        </Tooltip>
      </Flex>
    </>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
