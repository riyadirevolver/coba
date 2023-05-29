// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import BasicImage from 'assets/img/BasicImage.png';
import React from 'react';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import AuthBasic from 'layouts/AuthBasic';

function LockBasic() {
  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');
  const bgForm = useColorModeValue('white', 'navy.800');
  return (
    <AuthBasic
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image={BasicImage}
    >
      <Flex
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        mb="60px"
        mt={{ base: '60px', md: '0px' }}
      >
        <Flex
          zIndex="2"
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: '20px', md: '100px' }}
          mb={{ base: '20px', md: 'auto' }}
          bg={bgForm}
          boxShadow={useColorModeValue(
            '0px 5px 14px rgba(0, 0, 0, 0.05)',
            'unset'
          )}
        >
          <Text
            fontWeight="bold"
            color={textColor}
            textAlign="center"
            mb="10px"
            fontSize={{ base: '3xl', md: '4xl' }}
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
              Password
            </FormLabel>
            <Input
              variant="auth"
              fontSize="sm"
              ms="4px"
              type="password"
              placeholder="Your password"
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
    </AuthBasic>
  );
}

export default LockBasic;
