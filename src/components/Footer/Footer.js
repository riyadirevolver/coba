/*eslint-disable*/
import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Text as="span">{"Made with ❤️ by "}</Text>
        <Link color="blue.400" href="https://www.ptdika.com" target="_blank">
          {"PT. DIKA Engineer"}
        </Link>
      </Text>
    </Flex>
  );
}

