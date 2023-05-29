import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import Typography from 'components/Typography/Typography';
import React from 'react';
import { ColorProps } from 'theme/color';

const AddUser = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);
  const initialFocusRef = React.useRef();
  return (
    <Box>
      <Box position="relative">
        <Popover
          initialFocusRef={initialFocusRef}
          placement="bottom"
          closeOnBlur={false}
          isOpen={isOpen}
          onOpen={open}
          onClose={close}
        >
          <PopoverTrigger>
            <Button
              bg={ColorProps['primary.1']}
              color="white"
              fontSize="13px"
              onClick={close}
            >
              <AddIcon /> Tambah User
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader pt={4} fontWeight="bold" border="0">
              Tambahkan User
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Box>
                <Typography>Cari User</Typography>
                <Box display="flex" mb={3}>
                  <Input type="search" mr={2} />
                  <Button colorScheme='green'>
                    <AddIcon />
                  </Button>
                </Box>

                {/* </Card> */}
              </Box>
            </PopoverBody>
            <PopoverFooter
              border="0"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={4}
            >
              <ButtonGroup size="sm">
                <Button onClick={close} ref={initialFocusRef}>
                  cancel
                </Button>
                <Button colorScheme="blue" ref={initialFocusRef}>
                  Save
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
};

export default AddUser;
