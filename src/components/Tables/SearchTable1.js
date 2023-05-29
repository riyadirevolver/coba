import {
  Button,
  Flex,
  Icon,
  Input,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PaginationButton from "components/Pagination/PaginationButton";
import { useEffect, useState } from "react";
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

function SearchTable1(props) {
  const [queryPageSize, setQueryPageSize] = useState(10);
  const [queryPageIndex, setQueryPageIndex] = useState(0);

  const { columnsData, tableData, fetchData, totalData } = props;

  const columns = columnsData;
  const data = tableData;
  const controlledPageCount = Math.ceil(totalData / queryPageSize);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      },
      manualPagination: true,
      pageCount: controlledPageCount,
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

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    setQueryPageIndex(pageIndex);
    setQueryPageSize(pageSize);
  }, [pageSize, pageIndex]);

  useEffect(() => {
    fetchData &&
      fetchData({ pageIndex: queryPageIndex, pageSize: queryPageSize });
  }, [fetchData, queryPageIndex, queryPageSize]);

  return (
    <>
      <Flex
        direction="column"
        w="100%"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Flex justify="space-between" align="center" w="100%" px="22px">
          <Stack
            direction={{ sm: "column", md: "row" }}
            spacing={{ sm: "4px", md: "12px" }}
            align="center"
            me="12px"
            my="24px"
            minW={{ sm: "100px", md: "200px" }}
          >
            <Select
              variant="main"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              color="gray.500"
              size="sm"
              borderRadius="12px"
              maxW="75px"
              cursor="pointer"
            >
              {[5, 10, 50, 100, 200].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </Select>
            <Text fontSize="xs" color="gray.400" fontWeight="normal">
              entries per page
            </Text>
          </Stack>
          <Input
            variant="main"
            type="text"
            placeholder="Search..."
            minW="75px"
            maxW="175px"
            fontSize="sm"
            _focus={{ borderColor: "blue.500" }}
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
                    return (
                      <Td
                        {...cell.getCellProps()}
                        fontSize={{ sm: "14px" }}
                        key={index}
                      >
                        {cell.render("Cell")}
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
          mb={4}
        >
          <Text
            fontSize="sm"
            color="gray.500"
            fontWeight="normal"
            mb={{ sm: "24px", md: "0px" }}
          >
            Showing {pageSize * pageIndex + 1} to{" "}
            {pageSize * (pageIndex + 1) <= totalData
              ? pageSize * (pageIndex + 1)
              : totalData}{" "}
            of {totalData} entries
          </Text>
          <PaginationButton
            handleFirstPage={() => gotoPage(0)}
            handleNextPage={nextPage}
            canPrevPage={canPreviousPage}
            handlePrevPage={previousPage}
            handleLastPage={() => gotoPage(pageCount - 1)}
            canNextPage={canNextPage}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default SearchTable1;
