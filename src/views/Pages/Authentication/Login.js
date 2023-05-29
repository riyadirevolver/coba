// Chakra imports
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import CoverImage from 'assets/img/CoverImage.png';
import { useFormik } from 'formik';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Redirect, useHistory } from 'react-router-dom';
import Auth from 'services/Auth';
import { Pages } from 'utils/constants';
import loginValidation from 'validations/LoginValidation';

function Login() {
  // Chakra color mode
  const history = useHistory();
  const bgForm = useColorModeValue('white', 'navy.800');
  const titleColor = useColorModeValue('gray.700', 'blue.500');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('error');
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const navigateTo = (path) => {
    history.push(path);
  };

  const formik = useFormik({
    initialValues: {
      nik: '',
      password: '',
    },
    onSubmit: (values) => {
      setLoading(true);

      Auth.create({
        ...values,
        strategy: 'local',
      })
        .then(({ data }) => {
          setMessage(data.message);
          setLoading(false);
          setColor('success');
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('user_id', data.user.id);
          navigateTo(Pages.PROJECTS);
        })
        .catch((error) => {
          setLoading(false);
          setColor('error');
          const errorMsg =
            error.response.data?.message ??
            'Maaf terjadi kesalahan pada server';
          setMessage(errorMsg);
        });
    },
    validationSchema: loginValidation,
  });

  return (
    <>
      {localStorage.getItem('token') ? (
        <Redirect to={Pages.PROJECTS} />
      ) : (
        <Flex
          h="100vh"
          w="100vw"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Flex
            zIndex="2"
            direction="column"
            w="400px"
            background="transparent"
            borderRadius="15px"
            p="30px"
            m="30px"
            bg={bgForm}
            boxShadow={useColorModeValue(
              '0px 5px 14px rgba(0, 0, 0, 0.05)',
              'unset'
            )}
          >
            <Text
              fontSize="xl"
              color={titleColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              XPIPE
            </Text>
            {message && (
              <Alert status={color} mb="5">
                <AlertIcon />
                {message}
              </Alert>
            )}
            <form onSubmit={formik.handleSubmit}>
              <FormControl isInvalid={formik.errors.nik} mb={5}>
                <FormLabel fontSize="sm" fontWeight="normal">
                  NIK
                </FormLabel>
                <Input
                  id="nik"
                  name="nik"
                  fontSize="sm"
                  type="text"
                  placeholder="Masukkan NIK"
                  size="lg"
                  onChange={formik.handleChange}
                />
                <FormErrorMessage>{formik.errors.nik}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={formik.errors.password} mb={5}>
                <FormLabel fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <InputGroup size="lg">
                  <Input
                    id="password"
                    name="password"
                    fontSize="sm"
                    placeholder="Masukkan Password"
                    pr="4.7rem"
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      fontSize="25px"
                      variant="no-effects"
                      onClick={handleClick}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Button
                isLoading={loading}
                loadingText="Loading ..."
                fontSize="10px"
                variant="dark"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                type="submit"
              >
                SIGN IN
              </Button>
            </form>
          </Flex>
          <Box
            overflowX="hidden"
            h={{ base: '100%', lg: '100%' }}
            w="100%"
            left="0px"
            position="absolute"
            bgImage={CoverImage}
          >
            <Box
              w="100%"
              h="100%"
              bgSize="cover"
              bg="blue.500"
              opacity="0.8"
            ></Box>
          </Box>
        </Flex>
      )}
    </>
  );
}

export default Login;
