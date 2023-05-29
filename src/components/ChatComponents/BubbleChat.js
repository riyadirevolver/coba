/* eslint-disable no-unused-vars */
import { Avatar, Box, Button, Divider, Flex } from '@chakra-ui/react';
import Typography from 'components/Typography/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const BubbleChat = ({
  thumb,
  name,
  message,
  time,
  isSender,
  images,
  files,
  clickReply,
}) => {
  const [isReply, setIsReply] = useState(false);
  return (
    <Flex direction="column" pt={1}>
      <Box display="flex" pt={1}>
        <Avatar src={thumb} name={name} h={8} w={8} />
        <Box ml={2}>
          <Flex direction="column">
            <Typography fontWeight={700}>{name}</Typography>
            <Typography fontSize="10px" fontWeight={400}>
              {time}
            </Typography>
          </Flex>
          <Flex mt={1} fontSize="14px">
            <Typography>{message}</Typography>
            {images ? <img src="" alt="Images" /> : null}
            {files ? <Button variant="unstyled">Download File</Button> : null}
          </Flex>
          {isSender ? (
            <Button
              onClick={() => {
                clickReply?.();
                setIsReply(!isReply);
              }}
              variant="unstyled"
              sx={{
                fontWeight: 300,
                textDecoration: 'underline',
              }}
            >
              {isReply ? 'cancel' : 'reply'}
            </Button>
          ) : null}
        </Box>
      </Box>
      <Divider />
    </Flex>
  );
};

BubbleChat.propTypes = {
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  images: PropTypes.string,
  files: PropTypes.string,
  clickReply: PropTypes.func,
};
export default BubbleChat;
