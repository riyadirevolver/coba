import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import BubbleChat from './BubbleChat';
import ChatInput from './ChatInput';

const ChatContainer = () => {
  const [reply, setReply] = useState(false);
  return (
    <Box>
      <Flex direction="column">
        <BubbleChat
          name="Sender"
          thumb="link image profile"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          time="11/02/2023, 08:00"
          isSender={true}
          clickReply={() => setReply(!reply)}
        />
        <BubbleChat
          name="Receiver"
          thumb="link image profile"
          message="Lorem ipsum dolor sit amet consectetur adipisicing elit"
          time="11/02/2023, 08:00"
          isSender={false}
          clickReply={() => setReply(!reply)}
        />
        {reply ? (
          <Box mt="10px">
            <ChatInput />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default ChatContainer;
