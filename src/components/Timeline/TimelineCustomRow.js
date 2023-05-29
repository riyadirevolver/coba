import {
  Box,
  Flex,
  Icon,
  Stack,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import React from 'react';

function TimelineCustomRow(props) {
  const { title, titleColor, date, color, description, isDark } = props;
  const textColor = useColorModeValue('gray.700', 'white.300');
  const { colorMode } = useColorMode();

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb="-4px">
      <Icon
        color={isDark && colorMode === 'dark' ? 'white' : color ?? 'red'}
        background={isDark && colorMode === 'dark' ? 'white' : color ?? 'red'}
        borderRadius="50%"
        border="5px solid #3182CE"
        h="30px"
        w="30px"
        pe="6px"
        mr="-17px"
        zIndex="1"
        position="relative"
      />
      {/* <Flex direction="column" h="100%">
        
      </Flex> */}
      <Flex justifyContent="space-between" h="100%" width={'100%'}>
        <Box w="5px" mr="20px" bg="#3182CE" mb="-5px"></Box>
        <Box w={'100%'} m="20px 0">
          <Card>
            <Text
              fontSize="sm"
              color={titleColor !== undefined ? titleColor : textColor}
              fontWeight="bold"
            >
              {title}
            </Text>
            <Text
              fontSize="sm"
              color={isDark && colorMode === 'dark' ? 'white' : 'gray.400'}
              fontWeight="normal"
              mb="14px"
              mr="20px"
            >
              {date}
            </Text>
            {description !== undefined ? (
              <Text
                fontSize="sm"
                color={isDark && colorMode === 'dark' ? 'white' : 'gray.400'}
                fontWeight="normal"
                mb="6px"
              >
                {description}
              </Text>
            ) : null}
          </Card>
        </Box>
      </Flex>
    </Flex>
  );
}

export default TimelineCustomRow;
