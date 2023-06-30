import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";
import Menuitems from "./MenuItems";
// import Buynow from "./Buynow";
import Image from "next/image";
import { useRouter } from "next/router";
import SimpleBar from "simplebar-react";
import Logo from "../../../assets/images/logos/JC_LOGO.svg";
import Icon from "../../components/icons";

import LogoIcon from "../logo/LogoIcon";

const filteredMenu = (data) => {
  return Menuitems.filter((item) => {
    if (data?.data.role === "superadmin") {
      return item.isSuperAdmin;
    } else if (data?.data.role === "admin") {
      return item.isAdmin;
    } else if (data?.data.role === "client" || data?.data.role === "client3") {
      return item.isCLient;
    } else if (data?.data.isLeader) {
      return item.isLeader;
    }
    return !item.isAdmin, !item.isSPV, !item.isStaff;
  });
};

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
      style={{ height: "100%", background: "#00C298", color: "white" }}
    >
      <Box height="100%">
        <LogoIcon />
        <Box className="sidebar" mt={0} sx={{ padding: "6px 15px 20px 0" }}>
          <div className="icon__overlay"></div>
          <Box sx={{ p: 0 }}>
            {filteredMenu(data).map((item, index) => {
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
                  <Box
                    key={item.title}
                    display={"flex"}
                    justifyContent={"center"}
                    sx={{
                      p: 0,
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <Box
                        className="sidebar__wrapper"
                        // component="li"
                        onClick={() => {
                          handleClick(index);
                          handleTitle(item.title);
                        }}
                        selected={pathWithoutLastPart === item.href}
                        sx={{
                          width: "100%",
                          borderRadius: "10px",
                        }}
                      >
                        <Box
                          className="sidebar__icn_item"
                          sx={{
                            ...(pathWithoutLastPart === item.href && {
                              color: "#00C298",
                              height: "48px",
                              width: "75px",
                              p: 0,
                              m: 0,
                              justifyContent: "center",
                            }),
                            backgroundColor: "rgba(61, 61, 61, 1)",
                          }}
                        >
                          <Box>
                            <Icon
                              variant={item.icon}
                              color={
                                index === open ||
                                pathWithoutLastPart === item.href
                                  ? "rgb(0, 194, 152)"
                                  : "white"
                              }
                            />
                          </Box>
                        </Box>
                        <Box
                          className="sidebar__item"
                          sx={{
                            ...(pathWithoutLastPart === item.href && {
                              color: "white",
                              // backgroundColor: (theme) =>
                              //   `${theme.palette.primary.main}!important`,
                              backgroundColor: "white!important",
                            }),
                          }}
                        >
                          <Typography
                            sx={{
                              ...(pathWithoutLastPart === item.href && {
                                color: "#00C298",
                              }),
                            }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                        {index === open || pathWithoutLastPart === item.href ? (
                          <FeatherIcon
                            icon="chevron-down"
                            size="16"
                            fill="#00C298"
                          />
                        ) : (
                          <FeatherIcon
                            icon="chevron-right"
                            size="16"
                            fill="#00C298"
                          />
                        )}
                      </Box>
                      <Collapse
                        in={index === open || pathWithoutLastPart === item.href}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box
                          sx={{
                            marginBottom: "20px",
                          }}
                        >
                          {item.children
                            .filter((x) => {
                              // admin
                              if (data?.data.role === "admin") {
                                return x.isAdmin;
                              }
                              // supervisor atau SPV
                              else if (data?.data.role === "supervisor") {
                                return x.isSPV;
                              }
                              // staff
                              else if (data?.data.role === "staff") {
                                return x.isStaff;
                              }
                              // client
                              else if (data?.data.role === "client") {
                                return x.isCLient;
                              }
                              return !x.isAdmin, !x.isSPV, !x.isStaff;
                            })
                            .map((child) => {
                              return (
                                // list item sidebar content menu
                                <NextLink
                                  key={child.title}
                                  href={child.href}
                                  onClick={onSidebarClose}
                                >
                                  <Box
                                    // button
                                    // selected={pathDirect === child.href}
                                    onClick={
                                      child.children
                                        ? null
                                        : () => {
                                            handleClick(index);
                                            handleTitle(child.title);
                                          }
                                    }
                                    sx={{
                                      // mb: 1,
                                      ...(pathDirect === child.href && {
                                        color: "primary.main",
                                        backgroundColor:
                                          "transparent!important",
                                      }),
                                      p: 0,
                                      display: "flex",
                                      cursor: "pointer",
                                      "& :hover": {
                                        color: "#e6e6e6",
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        color: "white",
                                        ...(pathDirect === child.href && {
                                          borderRight: "4px solid white",
                                        }),
                                        backgroundColor: "rgba(61, 61, 61, 1)",
                                        minHeight: "45px",
                                        padding: "10px 0px",
                                        width: "75px",
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <Icon variant={child.icon} />
                                    </Box>
                                    <Box
                                      paddingLeft={"54px"}
                                      display={"flex"}
                                      justifyContent={"center"}
                                      alignItems={"center"}
                                    >
                                      <div className="item__dot"></div>
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          padding: "10px 0px",
                                          color: "white",
                                        }}
                                      >
                                        {child.title}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </NextLink>
                              );
                            })}
                        </Box>
                      </Collapse>
                    </Box>
                  </Box>
                );
                // {/********If Sub No Menu**********/}
              } else {
                return (
                  <NextLink href={item.href} key={item.title}>
                    <Box
                      className="sidebar__wrapper"
                      onClick={() => handleClick(index)}
                      sx={{
                        borderRadius: "10px",
                        display: "flex",
                      }}
                    >
                      <Box
                        className="sidebar__icn_item"
                        sx={{
                          ...(pathDirect === item.href && {
                            color: "white",
                          }),
                          backgroundColor: "rgba(61, 61, 61, 1)",
                        }}
                      >
                        <div>
                          <Icon variant={item.icon} />
                        </div>
                      </Box>

                      <Box
                        className={`sidebar__item ${
                          pathDirect === item.href ? "active" : ""
                        }`}
                        onClick={() => {
                          onSidebarClose();
                          handleTitle(item.title);
                        }}
                      >
                        <Typography
                          color={pathDirect === item.href ? "#00C298" : "white"}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                  </NextLink>
                );
              }
            })}
          </Box>
        </Box>

        {/* <Buynow /> */}
      </Box>
    </SimpleBar>
  );
  if (lgUp) {
    return (
      <Box display={"flex"} sx={{}}>
        {/* {!isSidebarOpen ? ( */}
        <Box
          className="custom__scroll"
          sx={{
            width: !isSidebarOpen ? "75px" : "0px",
            backgroundColor: "rgba(61, 61, 61, 1) !important",
            marginTop: "0px !important",
            position: "fixed",
            top: "0px",
            left: "0px",
            height: "100%",
            // transition: ".2s all",
            overflow: "auto",
            zIndex: 9999,
            // overflow: "scroll",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            width={"100%"}
            pt="10px"
            sx={{}}
          >
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 0,
                width: "100%",
              }}
            >
              <Box
                mb="2px"
                sx={{
                  cursor: "pointer",
                }}
              >
                <NextLink href="/dashboards/dashboard">
                  <Box
                    onClick={() => handleTitle("")}
                    sx={{
                      width: "60%",
                      display: "block",
                      margin: "0 auto",
                    }}
                  >
                    {/* <Icon variant="hadir" /> */}
                    <Image src={Logo} alt={"Logo Juara Coding"} />
                  </Box>
                </NextLink>
              </Box>

              {Menuitems.filter((item) => {
                if (data?.data.role === "superadmin") {
                  return item.isSuperAdmin;
                } else if (data?.data.role === "admin") {
                  return item.isAdmin;
                } else if (data?.data.role === "staff") {
                  return item.isStaff;
                }
                return !item.isAdmin, !item.isSPV, !item.isStaff;
              }).map((item, index) => {
                if (item.children) {
                  return (
                    <ListItem
                      key={item.title}
                      sx={{
                        flexDirection: "column",
                        mt: "30px",
                        px: 0,
                        width: "100%",
                      }}
                      selected={pathDirect === item.href}
                    >
                      <div
                        onClick={() => handleClick(index)}
                        style={{
                          cursor: "pointer",

                          "& :hover": {
                            backgroundColor: "pink !important",
                          },
                        }}
                      >
                        <Icon
                          variant={item.icon}
                          color={
                            index === open || pathWithoutLastPart === item.href
                              ? "#00C298"
                              : "white"
                          }
                        />
                      </div>
                      <Collapse
                        in={index === open || pathWithoutLastPart === item.href}
                        unmountOnExit
                        sx={{
                          width: "100%",
                        }}
                      >
                        <List
                          sx={{
                            mt: "20px",
                            padding: "0px",
                            width: "100%",
                          }}
                        >
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
                            .map((child, idx) => (
                              <NextLink
                                key={child.title}
                                href={child.href}
                                onClick={onSidebarClose}
                              >
                                <ListItem
                                  className="mini__sidebar"
                                  key={idx}
                                  onClick={() => handleTitle(child.title)}
                                  sx={{
                                    display: "flex",
                                    px: 0,
                                    // paddingLeft: "20px",
                                    mb: "9px",
                                    height: "40px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    position: "relative",
                                    cursor: "pointer",
                                  }}
                                >
                                  <ListItemIcon
                                    sx={{
                                      p: 0,
                                      minWidth: "0px",
                                    }}
                                  >
                                    <Icon
                                      variant={child.icon}
                                      color={"white"}
                                    />
                                    <Box
                                      className="mini__icn"
                                      sx={{
                                        ...(pathDirect === child.href && {
                                          borderRight: "4px solid #00C298",
                                        }),
                                      }}
                                    ></Box>
                                  </ListItemIcon>
                                </ListItem>
                              </NextLink>
                            ))}
                        </List>
                      </Collapse>
                    </ListItem>
                  );
                } else {
                  return (
                    <NextLink href={item.href} key={item.title}>
                      <Box
                        key={item.title}
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleClick(index);
                          handleTitle(item.title);
                        }}
                        selected={pathDirect === item.href}
                      >
                        <Icon
                          variant={item.icon}
                          color={pathDirect === item.href ? "#00C298" : "white"}
                        />
                      </Box>
                    </NextLink>
                  );
                }
              })}
            </List>
          </Box>
        </Box>
        {/* ) : null} */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="persistent"
          PaperProps={{
            sx: {
              width: "322px",
              border: "0 !important",
              boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
            },
          }}
        >
          {SidebarContent}
        </Drawer>
      </Box>
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
