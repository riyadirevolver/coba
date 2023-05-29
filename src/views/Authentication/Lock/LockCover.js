// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import CoverImage from "assets/img/CoverImage.png";
import React from "react";
import AuthCover from "layouts/AuthCover";

function LockCover() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  return (
    <AuthCover image={CoverImage}>
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb="60px"
        mt={{ base: "60px", md: "30vh" }}
      >
        <Flex
          zIndex="2"
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "20px", md: "100px" }}
          mb={{ base: "20px", md: "auto" }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            "0px 5px 14px rgba(0, 0, 0, 0.05)",
            "unset"
          )}
        >
          <Text
            fontWeight="bold"
            color={textColor}
            textAlign="center"
            mb="10px"
            fontSize={{ base: "3xl", md: "4xl" }}
          >
            Mike Priesler
          </Text>
          <Text
            fontWeight="regular"
            textAlign="center"
            color="gray.400"
            mb="35px"
          >
            Enter your password to unlock your account.
          </Text>
          <FormControl>
            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
              Email
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="text"
              placeholder="Your email address"
              mb="24px"
              size="lg"
            />
            <Button
              fontSize="10px"
              variant="dark"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
            >
              UNLOCK
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </AuthCover>
  );
}

export default LockCover;
