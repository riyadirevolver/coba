// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import SearchTable1 from "components/Tables/SearchTable1";
import { useCallback, useState } from "react";
import FieldsService from "services/FieldsService";
import { columnsData1 } from "variables/columnsData";

function DataTables() {
  const [fields, setFields] = useState([]);
  const [total, setTotal] = useState(0);
  const textColor = useColorModeValue("gray.700", "white");

  const fetcher = async (pageSize, pageIndex) => {
    const skip = pageSize * pageIndex;

    await FieldsService.find({
      $limit: pageSize,
      $skip: skip,
    })
      .then(({ data }) => {
        setFields(data.data);
        setTotal(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    fetcher(pageSize, pageIndex);
  }, []);

  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card px="0px">
        <CardHeader px="22px" mb="24px">
          <Flex direction="column">
            <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
              Field
            </Text>
            <Text color="gray.400" fontSize="sm" fontWeight="normal">
              A lightweight, extendable, dependency-free javascript HTML table
              plugin.
            </Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <SearchTable1
            tableData={fields}
            totalData={total}
            columnsData={columnsData1}
            fetchData={fetchData}
          />
        </CardBody>
      </Card>
    </Flex>
  );
}

export default DataTables;
