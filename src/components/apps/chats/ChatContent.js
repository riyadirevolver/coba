import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Box,
  ListItemAvatar,
} from "@mui/material";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";
import SimpleBar from "simplebar-react";

const ChatContent = ({ toggleChatSidebar }) => {
  const chatDetails = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1]
  );
  return (
    <Box>
      {chatDetails ? (
        <div>
          <Box
            display="flex"
            alignItems="center"
            p={2}
            sx={{
              pt: "8px",
              pb: "7px",
            }}
          >
            <Box
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
                mr: "10px",
              }}
            >
              <FeatherIcon icon="menu" width="18" onClick={toggleChatSidebar} />
            </Box>
            <ListItem key={chatDetails.id} dense disableGutters>
              <ListItemAvatar>
                <Image
                  src={chatDetails.thumb}
                  alt={chatDetails.thumb}
                  width="45px"
                  height="45px"
                  className="roundedCircle"
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4">{chatDetails.name}</Typography>
                }
                secondary={chatDetails.status}
              />
            </ListItem>
          </Box>
          <Divider />
          <SimpleBar style={{ height: "calc(100vh - 445px)" }}>
            <Box p={2}>
              {Object.keys(chatDetails.chatHistory).map((chat) =>
                Object.keys(chatDetails.chatHistory[chat]).map((key) =>
                  Object.keys(chatDetails.chatHistory[chat][key]).map((k) =>
                    k === "from" ? (
                      <Box
                        display="flex"
                        alignItems="start   "
                        flexDirection="row"
                        key={k}
                        gap={1}
                      >
                        <Image
                          src={chatDetails.thumb}
                          alt={chatDetails.thumb}
                          width="45px"
                          height="45px"
                          className="roundedCircle"
                        />
                        <div className="pl-3">
                          {chatDetails.chatHistory[chat][key][k].map((v) => (
                            <Box
                              mb={1}
                              key={v}
                              sx={{
                                p: 2,
                                backgroundColor: "primary.light",
                                borderRadius: "6px",
                                color: (theme) =>
                                  `${
                                    theme.palette.mode === "dark"
                                      ? "rgba(0, 0, 0, 0.87)"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }`,
                              }}
                            >
                              {v}
                            </Box>
                          ))}
                        </div>
                      </Box>
                    ) : (
                      <Box key={k}>
                        {chatDetails.chatHistory[chat][key][k].map((v) => (
                          <Box
                            mb={1}
                            display="flex"
                            alignItems="flex-end"
                            flexDirection="row-reverse"
                            className="chat-content"
                            key={v}
                          >
                            <Box
                              sx={{
                                p: 2,
                                backgroundColor: "primary.light",
                                ml: "auto",
                                borderRadius: "6px",
                                color: (theme) =>
                                  `${
                                    theme.palette.mode === "dark"
                                      ? "rgba(0, 0, 0, 0.87)"
                                      : "rgba(0, 0, 0, 0.87)"
                                  }`,
                              }}
                            >
                              {v}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )
                  )
                )
              )}
            </Box>
          </SimpleBar>
        </div>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          <Box
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: "10px",
            }}
          >
            <FeatherIcon icon="menu" width="18" onClick={toggleChatSidebar} />
          </Box>
          <Typography varient="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

ChatContent.propTypes = {
  toggleChatSidebar: PropTypes.func,
};

export default ChatContent;
