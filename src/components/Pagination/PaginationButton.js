import { Button, Stack } from "@chakra-ui/react";

const PaginationButton = ({
  handleFirstPage,
  handlePrevPage,
  canPrevPage,
  handleLastPage,
  handleNextPage,
  canNextPage,
}) => {
  return (
    <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
      <Button
        variant="no-effects"
        onClick={handleFirstPage}
        transition="all .5s ease"
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        disabled={!canPrevPage}
        _hover={{
          bg: "gray.200",
          opacity: "0.7",
          borderColor: "gray.500",
        }}
      >
        {"<<"}
      </Button>
      <Button
        variant="no-effects"
        onClick={handlePrevPage}
        transition="all .5s ease"
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        disabled={!canPrevPage}
        _hover={{
          bg: "gray.200",
          opacity: "0.7",
          borderColor: "gray.500",
        }}
      >
        {"<"}
      </Button>
      <Button
        variant="no-effects"
        onClick={handleNextPage}
        transition="all .5s ease"
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        disabled={!canNextPage}
        _hover={{
          bg: "gray.200",
          opacity: "0.7",
          borderColor: "gray.500",
        }}
      >
        {">"}
      </Button>
      <Button
        variant="no-effects"
        onClick={handleLastPage}
        transition="all .5s ease"
        w="40px"
        h="40px"
        borderRadius="8px"
        bg="#fff"
        border="1px solid lightgray"
        disabled={!canNextPage}
        _hover={{
          bg: "gray.200",
          opacity: "0.7",
          borderColor: "gray.500",
        }}
      >
        {">>"}
      </Button>
    </Stack>
  );
};

export default PaginationButton;
