import {
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  InfoOutlineIcon,
  SettingsIcon,
  EditIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import Typography from 'components/Typography/Typography';

const CardsMenuButton = ({ onViewClick, onDeleteClick }) => {
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  return (
    <Menu isOpen={isOpen1} onClose={onClose1}>
      <MenuButton onClick={onOpen1} alignSelf="flex-start">
        <Icon as={IoEllipsisVerticalSharp} color="gray.400" w="20px" h="20px" />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Typography startIcon={<InfoOutlineIcon />}>Detail Card</Typography>
        </MenuItem>
        <MenuItem onClick={onDeleteClick}>
          <Typography startIcon={<DeleteIcon />}>Hapus Card</Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CardsMenuButton;
