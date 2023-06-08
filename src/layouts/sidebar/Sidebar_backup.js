import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Menuitems from "./MenuItems";
// import Buynow from "./Buynow";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import LogoIcon from "../logo/LogoIcon";
import checkJobLevel from "../../../utils/checkJobLevel";
import Image from "next/image";
import LogoHadir from "../../../assets/images/backgrounds/hadir-text.svg";
import LogoMenu from "../../../assets/images/icons/menu.svg";

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  handleTitle,
  isUrl,
  data,
}) => {
  const role = {
    super: "superadmin",
    admin: "admin",
    spv: "supervisor",
    staff: "staff",
  };

  const [open, setOpen] = React.useState(true);
  const [dataSidebar, setDataSidebar] = React.useState([]);

  const router = useRouter();
  const pathDirect = router.pathname;
  const location = router.pathname;
  const pathWithoutLastPart = router.pathname.slice(
    0,
    router.pathname.lastIndexOf("/")
  );

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <SimpleBar
      style={{ height: "100%", background: "#1BA0E2", color: "white" }}
    >
      <Box height="100%">
        <LogoIcon />
        <Box mt={-2} sx={{ padding: "6px 15px 20px 0" }}>
          <List sx={{ p: 0, mt: 12 }}>
            {Menuitems.filter((item) => {
              // admin
              if (data?.data.role === "superadmin") {
                return item.isSuperAdmin;
              } else if (data?.data.role === "admin") {
                return item.isAdmin;
              } else if (checkJobLevel(data?.data.jobLevel?.level ?? null)) {
                return item.isSPV;
              } else if (data?.data.role === "staff") {
                return item.isStaff;
              }
              return !item.isAdmin, !item.isSPV, !item.isStaff;
            }).map((item, index) => {
              // {/********SubHeader**********/}
              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="500"
                      sx={{
                        my: 2,
                        mt: 4,
                        opacity: "0.4",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      {item.subheader}
                    </Typography>
                  </li>
                );
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else if (item.children) {
                return (
                  <Box key={item.title} display={"flex"}>
                    <Box component={"div"} sx={{ width: "100%" }}>
                      <ListItemButton
                        component="li"
                        onClick={() => handleClick(index)}
                        selected={pathWithoutLastPart === item.href}
                        sx={{
                          mb: 1,
                          pt: 2,
                          pb: 2,
                          width: "100%",
                          borderRadius: "10px",
                          ...(pathWithoutLastPart === item.href && {
                            color: "white",
                            // backgroundColor: (theme) =>
                            //   `${theme.palette.primary.main}!important`,
                            backgroundColor: "white!important",
                          }),
                        }}
                      >
                        {/* <ListItemIcon
                          sx={{
                            ...(pathWithoutLastPart === item.href && {
                              color: "#1BA0E2",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon> */}
                        <ListItemText>
                          <Typography
                            sx={{
                              ...(pathWithoutLastPart === item.href && {
                                color: "#1BA0E2",
                              }),
                            }}
                          >
                            {item.title}
                          </Typography>
                        </ListItemText>
                        {index === open || pathWithoutLastPart === item.href ? (
                          <FeatherIcon
                            icon="chevron-down"
                            size="16"
                            fill="#1BA0E2"
                          />
                        ) : (
                          <FeatherIcon
                            icon="chevron-right"
                            size="16"
                            fill="#1BA0E2"
                          />
                        )}
                      </ListItemButton>
                      <Collapse
                        in={index === open || pathWithoutLastPart === item.href}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="li" disablePadding>
                          {item.children
                            .filter((x) => {
                              // admin
                              if (role.admin === "admin") {
                                return x.isAdmin;
                              }
                              // supervisor atau SPV
                              else if (role.spv === "supervisor") {
                                return x.isSPV;
                              }
                              // staff
                              else if (role.staff === "staff") {
                                return x.isStaff;
                              }
                              return !x.isAdmin, !x.isSPV, !x.isStaff;
                            })
                            .map((child) => {
                              return (
                                <NextLink
                                  key={child.title}
                                  href={child.href}
                                  onClick={onSidebarClose}
                                >
                                  <ListItem
                                    button
                                    selected={pathDirect === child.href}
                                    onClick={
                                      child.children
                                        ? null
                                        : () => handleClick(index)
                                    }
                                    sx={{
                                      // mb: 1,
                                      ...(pathDirect === child.href && {
                                        color: "primary.main",
                                        backgroundColor:
                                          "transparent!important",
                                      }),
                                    }}
                                  >
                                    <ListItemIcon
                                      sx={{
                                        svg: {
                                          width: "14px",
                                          marginLeft: "3px",
                                        },
                                        color: "white",
                                        // ...(pathDirect === child.href && {
                                        //   color: "primary.main",
                                        // }),
                                      }}
                                    >
                                      <FeatherIcon
                                        // icon={child.icon}
                                        icon={"circle"}
                                        width="20"
                                        height="20"
                                        fill="white"
                                        className={"list-circle"}
                                      />
                                    </ListItemIcon>
                                    <ListItemText>
                                      {pathDirect === child.href &&
                                        handleTitle?.(child.title)}
                                      <Typography
                                        variant="body1"
                                        // sx={{
                                        //   color: (theme) =>
                                        //     theme.palette.text.primary,
                                        // }}
                                      >
                                        {child.title}
                                      </Typography>
                                    </ListItemText>
                                  </ListItem>
                                </NextLink>
                              );
                            })}
                        </List>
                      </Collapse>
                    </Box>
                  </Box>
                );
                // {/********If Sub No Menu**********/}
              } else {
                return (
                  <List component="li" disablePadding key={item.title}>
                    <NextLink href={item.href}>
                      <ListItem
                        onClick={() => handleClick(index)}
                        button
                        selected={pathDirect === item.href}
                        sx={{
                          mb: 1,
                          pt: 2,
                          pb: 2,
                          borderRadius: "10px",
                          ...(pathDirect === item.href && {
                            color: "#1BA0E2",
                            backgroundColor: "white!important",
                          }),
                        }}
                      >
                        {/* <ListItemIcon
                          sx={{
                            ...(pathDirect === item.href && {
                              color: "white",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                            fill="white"
                          />
                        </ListItemIcon> */}
                        <ListItemText onClick={onSidebarClose}>
                          {pathDirect === item.href &&
                            handleTitle?.(item.title)}
                          <Typography
                          // sx={{
                          //   color: (theme) => theme.palette.text.primary,
                          // }}
                          >
                            {item.title}
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </NextLink>
                  </List>
                );
              }
            })}
          </List>
        </Box>

        {/* <Buynow /> */}
      </Box>
    </SimpleBar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
