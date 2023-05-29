import { Box, Flex, IconButton, Textarea } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import React from 'react';

const ChatInput = ({isReply}) => {
  return (
    <Flex
      alignItems="flex-end"
      onInput={({ target }) => {
        const height = target.scrollHeight;

        target.style.height = height >= 200 ? '200px' : height + 'px';
      }}
    >
      <Box pr={2} width="100%">
        <Textarea className="scroll" rows={1} />
      </Box>
      <IconButton colorScheme="blue" size="md" icon={<MdSend />} onClick={()=>alert(`sent to ${isReply}` )} />
    </Flex>
  );
};

export default ChatInput;
