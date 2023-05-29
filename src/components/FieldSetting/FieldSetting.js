import { InfoOutlineIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, IconButton, useColorMode } from '@chakra-ui/react';
import Typography from 'components/Typography/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import {}

const FieldSetting = ({ projectId }) => {
  const [isShow, setIsShow] = useState(true);
  const { colorMode } = useColorMode();
  return (
    <div>
      {isShow ? (
        <Box bgColor="blue.100" p="1rem">
          <Flex justifyContent="space-between" alignItems="flex-start">
            <InfoOutlineIcon fontSize="xl" mt="4px" color="blue.500" />
            <Box px={2}>
              <Typography
                fontWeight={700}
                fontSize="14px"
                sx={{
                  color: colorMode === 'dark' ? '#8d8d8d' : 'inherit',
                }}
              >
                Kamu dapat kostumisasi field yang terlihat ditampilan{' '}
                <Link
                  to={`/admin/applications/project/settings/${projectId}`}
                  style={{
                    color: 'blue',
                  }}
                >
                  Project Field Settings.
                </Link>
              </Typography>
            </Box>
            <IconButton
              variant="unstyled"
              p={0}
              onClick={() => setIsShow(false)}
              h="100%"
            >
              <CloseIcon fontSize="sm" />
            </IconButton>
          </Flex>
        </Box>
      ) : null}
    </div>
  );
};

export default FieldSetting;
