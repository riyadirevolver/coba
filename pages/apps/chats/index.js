import React, { useState } from "react";
import { Card, Divider, Box } from "@mui/material";
import Breadcrumb from "../../../src/layouts/breadcrumb/Breadcrumb";
import ChatSidebar from "../../../src/components/apps/chats/ChatSidebar";
import ChatContent from "../../../src/components/apps/chats/ChatContent";
import ChatMsgSent from "../../../src/components/apps/chats/ChatMsgSent";

const Chats = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);

  return (
    <div>
      <Breadcrumb title="Chat app" subtitle="Messenger" />
      <Card sx={{ display: "flex", p: 0 }}>
        <ChatSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        />
        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </Card>
    </div>
  );
};

export default Chats;
