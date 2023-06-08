/* eslint-disable @next/next/link-passhref */
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export const MenuAbsent = () => {
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
      <Box mt={1} width="100%">
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3}>
            <Box display="block" width="100%">
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Link href="/apps/absent/activity">
                  <ExternaLink>
                    <Box
                      sx={{
                        background: "rgba(45, 114, 188, 0.05)",
                        p: "1rem",
                        borderRadius: "15px",
                      }}
                    >
                      <Image
                        src="/static/images/icons/activity.svg"
                        alt="Activity"
                        width="32px"
                        height="36px"
                        layout="responsive"
                      />
                    </Box>
                    <Typography textAlign="center" fontWeight={700}>
                      Absensi
                    </Typography>
                  </ExternaLink>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
