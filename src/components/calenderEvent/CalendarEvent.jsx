import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

export const CalendarEvent = ({ title = "Calendar Events" }) => {
  const items = [
    {
      label: "event bagi bagi uang",
      color: "teal",
    },
    { label: "besok turu ges", color: "pink" },
    {
      label: "libur",
      color: "coral",
    },
  ];
  const calender = new Array(31);
  return (
    <Box display="block">
      <Box pb={5}>
        <Typography variant="h1">{title}</Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {[...Array(31)].map((v, i) => {
            i += 1;
            return (
              <Grid
                item
                key={i}
                md={2}
                sx={{
                  display: "flex",
                  borderRadius: "4px",
                  height: "300px",
                  //   maxHeight: "300px",
                }}
              >
                <Button
                  sx={{
                    width: "100%",
                    hegiht: "100%",
                    p: 0,
                    boxShadow: " 3px 2px 7px 0px rgba(0,0,0,0.15)",
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      height: "100% !important",
                      alignItems: "flex-start",
                      border: "1px solid rgba(0,0,0,0.15)",
                      padding: "10px 0 8px 16px",
                    }}
                  >
                    <Typography color="black" variant="h1">
                      {i}
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-end"
                      sx={{
                        padding: "10px 0 8px 16px",
                        width: "100%",
                      }}
                    >
                      {items.map((v, i) => {
                        return (
                          <Box
                            key={i}
                            my={1}
                            sx={{
                              backgroundColor: v.color,
                              //   width: "100%",
                              borderRadius: "50px 0 0 50px ",
                              textAlign: "left",
                              padding: "5px",
                            }}
                          >
                            <Typography
                              color="black"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                textAlign: "end",
                              }}
                            >
                              {v.label}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};
