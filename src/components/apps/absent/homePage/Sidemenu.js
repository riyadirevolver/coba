/* eslint-disable @next/next/link-passhref */
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { useRouter } from "next/router";
import axios from "axios";

import React from "react";

const drawerWidth = 240;

const Sidemenu = ({ open, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/logout");
    router.push("/absen/login");
  };

  const ExternaLink = React.forwardRef(({ onClick, href }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className="user__menu__item">
        My Dashboard
      </a>
    );
  });
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        position: "relative",
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Box>
        <IconButton onClick={onClose}>
          <FeatherIcon icon="x" />
        </IconButton>
      </Box>

      {/* <List>
        <Typography
          fontWeight={700}
          sx={{
            pl: 1,
          }}
        >
          Menu
        </Typography>
        <ListItem>
          <Link href="/dashboards/dashboard">
            <ExternaLink />
          </Link>
        </ListItem>
      </List> */}
      <Box
        sx={{
          position: "absolute",
          bottom: 1,
          left: 0,
          width: "100%",
        }}
      >
        <Button onClick={handleLogout} variant="contained" fullWidth>
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidemenu;
