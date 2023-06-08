/* eslint-disable @next/next/link-passhref */
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const MENU_ABSEN = [
  {
    icon: "activity.svg",
    link: "client/activity",
    title: "Absensi Staff",
  },
  {
    icon: "overtime.svg",
    link: "absent/overtime",
    title: "Lembur",
  },
  {
    icon: "leave.svg",
    link: "absent/leave",
    title: "Cuti",
  },
];

export const MenuAbsentClient = () => {
  const ExternaLink = React.forwardRef(({ onClick, href, children }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className="user__menu__item">
        {children}
      </a>
    );
  });
  return (
    <Box mt="35px">
      <Typography fontWeight={700} color="#4F4F4F">
        Menu
      </Typography>
      <Box mt={1}>
        <Box
          display="flex"
          //  flexDirection="column"
          justifyContent="space-around"
        >
          {MENU_ABSEN.map((menu, index) => (
            <Link href={"/apps/" + menu.link} key={index}>
              <ExternaLink>
                <Box
                  sx={{
                    background: "rgba(45, 114, 188, 0.05)",
                    width: "100px",
                    textAlign: "center",
                    p: "1rem",
                    m: "0 auto",
                    borderRadius: "15px",
                  }}
                >
                  <Image
                    src={"/static/images/icons/" + menu.icon}
                    alt={menu.icon}
                    width="50px"
                    height="50px"
                    layout="responsive"
                  />
                </Box>
                <Typography textAlign="center" fontWeight={700}>
                  {menu.title}
                </Typography>
              </ExternaLink>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
