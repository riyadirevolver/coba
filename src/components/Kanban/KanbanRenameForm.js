import { Flex, FormControl, Input, useColorModeValue } from "@chakra-ui/react";
import { Button } from "react-scroll";

const KanbanRenameForm = ({ formRef, inputRef, handleAdd, handleClose }) => {
  const textGray = useColorModeValue("gray.400", "white");
  const attachementsGray = useColorModeValue("gray.500", "gray.200");
  const kanbanCardBg = useColorModeValue("white", "navy.700");
  const addButton = useColorModeValue("white", "blue.500");
  const addIcon = useColorModeValue("blue.500", "white");

  return (
    <Flex flexDirection="column" ref={formRef} display="none">
      <FormControl>
        <Input
          variant="main"
          borderRadius="15px"
          mb="20px"
          bg={kanbanCardBg}
          border="none"
          ref={inputRef}
        />
        <Flex>
          <Button colorScheme="blue" me="14px" onClick={handleAdd}>
            Rename Column
          </Button>
          <Button
            variant="no-hover"
            color={useColorModeValue("gray.700", "white")}
            bg={useColorModeValue("white", "gray.700")}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default KanbanRenameForm;
