import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import { MdReplay, MdCheck } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaCheckCircle, FaTimesCircle, FaUndoAlt } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiArrowUnsorted,
} from "react-icons/ti";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

function SearchTable2(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, []);
  const data = useMemo(() => tableData, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    gotoPage,
    pageCount,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setPageSize,
    setGlobalFilter,
    state,
  } = tableInstance;

  const createPages = (count) => {
    let arrPageCount = [];

    for (let i = 1; i <= count; i++) {
      arrPageCount.push(i);
    }

    return arrPageCount;
  };

  const { pageIndex, pageSize, globalFilter } = state;

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex
          align={{ sm: "flex-start", lg: "flex-end" }}
          justify={{ sm: "flex-start", lg: "flex-end" }}
          w="100%"
          px="22px"
          mb="36px"
        >
          <SearchBar
            border="1px solid "
            borderColor={useColorModeValue("gray.200", "gray.600")}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </Flex>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="0px"
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                      <Icon
                        w={{ sm: "10px", md: "14px" }}
                        h={{ sm: "10px", md: "14px" }}
                        color={columns.isSorted ? "gray.500" : "gray.400"}
                        float="right"
                        as={
                          column.isSorted
                            ? column.isSortedDesc
                              ? TiArrowSortedDown
                              : TiArrowSortedUp
                            : TiArrowUnsorted
                        }
                      />
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "STATUS") {
                      data = (
                        <Flex align="center">
                          <Flex
                            justify="center"
                            align="center"
                            border="1px solid"
                            borderColor={
                              cell.value === "Paid"
                                ? "green.400"
                                : cell.value === "Refunded"
                                ? "gray.400"
                                : "red.400"
                            }
                            borderRadius="50%"
                            width="24px"
                            height="24px"
                            me="6px"
                          >
                            <Icon
                              as={
                                cell.value === "Paid"
                                  ? MdCheck
                                  : cell.value === "Refunded"
                                  ? MdReplay
                                  : IoMdClose
                              }
                              color={
                                cell.value === "Paid"
                                  ? "green.400"
                                  : cell.value === "Refunded"
                                  ? "gray.400"
                                  : "red.400"
                              }
                              w="20px"
                              h="20px"
                            />
                          </Flex>
                          <Text>{cell.value}</Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "ID") {
                      data = (
                        <Flex align="center">
                          <Checkbox size="lg" colorScheme="blue" me="8px" />
                          <Text>{cell.value}</Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "DATE") {
                      data = <Text>{cell.value}</Text>;
                    } else if (cell.column.Header === "CUSTOMER") {
                      data = (
                        <Flex align="center">
                          <Avatar
                            name={cell.value.split(" ").join()[0]}
                            w="30px"
                            h="30px"
                            me="6px"
                          />
                          <Text>{cell.value}</Text>
                        </Flex>
                      );
                    } else if (cell.column.Header === "PRODUCT") {
                      data = <Text>{cell.value}</Text>;
                    } else if (cell.column.Header === "REVENUE") {
                      data = <Text>{cell.value}</Text>;
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex
          direction={{ sm: "column", md: "row" }}
          justify="space-between"
          align="center"
          w="100%"
          px={{ md: "22px" }}
        >
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="normal"
            mb={{ sm: "24px", md: "0px" }}
          >
            Showing {pageSize * pageIndex + 1} to{" "}
            {pageSize * (pageIndex + 1) <= tableData.length
              ? pageSize * (pageIndex + 1)
              : tableData.length}{" "}
            of {tableData.length} entries
          </Text>
          <Stack direction="row" alignSelf="flex-end" spacing="4px" ms="auto">
            <Button
              variant="no-effects"
              onClick={() => previousPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              display={
                pageSize === 5 ? "none" : canPreviousPage ? "flex" : "none"
              }
              _hover={{
                opacity: "0.7",
                borderColor: "gray.500",
              }}
            >
              <Icon as={GrFormPrevious} w="16px" h="16px" color="gray.400" />
            </Button>
            {pageSize === 5 ? (
              <NumberInput
                max={pageCount - 1}
                min={1}
                w="75px"
                mx="6px"
                defaultValue="1"
                onChange={(e) => gotoPage(e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={() => nextPage()} />
                  <NumberDecrementStepper onClick={() => previousPage()} />
                </NumberInputStepper>
              </NumberInput>
            ) : (
              createPages(pageCount).map((pageNumber, index) => {
                return (
                  <Button
                    variant="no-effects"
                    transition="all .5s ease"
                    onClick={() => gotoPage(pageNumber - 1)}
                    w="40px"
                    h="40px"
                    borderRadius="8px"
                    bg={pageNumber === pageIndex + 1 ? "blue.500" : "#fff"}
                    border={
                      pageNumber === pageIndex + 1
                        ? "none"
                        : "1px solid lightgray"
                    }
                    _hover={{
                      opacity: "0.7",
                      borderColor: "gray.500",
                    }}
                    key={index}
                  >
                    <Text
                      fontSize="sm"
                      color={pageNumber === pageIndex + 1 ? "#fff" : "gray.600"}
                    >
                      {pageNumber}
                    </Text>
                  </Button>
                );
              })
            )}
            <Button
              variant="no-effects"
              onClick={() => nextPage()}
              transition="all .5s ease"
              w="40px"
              h="40px"
              borderRadius="8px"
              bg="#fff"
              border="1px solid lightgray"
              display={pageSize === 5 ? "none" : canNextPage ? "flex" : "none"}
              _hover={{
                bg: "gray.200",
                opacity: "0.7",
                borderColor: "gray.500",
              }}
            >
              <Icon as={GrFormNext} w="16px" h="16px" color="gray.400" />
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export default SearchTable2;
