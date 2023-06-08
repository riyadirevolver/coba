/* eslint-disable @next/next/no-img-element */
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Sidemenu from "./Sidemenu";
import { useUserSession } from "../../../../hooks/useUserSession";

const Topbar = () => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const open = () => {
    setOpenMenu(true);
    const b = window;
  };
  const close = () => setOpenMenu(false);

  const { data } = useUserSession("simple");
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Box
          width="56px"
          height="56px"
          borderRadius="50%"
          overflow="hidden"
          sx={{
            boxShadow: "1px 1px 4px 0px #00000061",
            position: "relative",
          }}
        >
          {data && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${data.photo}`}
              alt="photo user"
              layout="fill"
              className="user__photo"
            />
          )}
        </Box>
        <Box ml={2}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "20px",
              color: " #4F4F4F",
              lineHeight: "24px",
              mb: "8px",
            }}
          >
            Hai, {data.fullname}
          </Typography>
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "10px",
              color: "#828282",
              lineHeight: "0",
            }}
          >
            Have a nice day !
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Button disableRipple onClick={open}>
          <Image
            priority
            src="/static/images/icons/burger-menu.svg"
            alt="menu"
            width={34}
            height={12}
          />
        </Button>
      </Box>
      <Sidemenu open={openMenu} onClose={close} />
    </Box>
  );
};

export default Topbar;
