import React from "react";
import { Box, Grid, Card, Typography, CardContent } from "@mui/material";
import NextLink from "next/link";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import Shopitems from "../../../data/shop/data";

const ShopPage = () => (
  <Grid container spacing={0}>
    {Shopitems.map((product) => (
      <Grid
        item
        xs={12}
        lg={3}
        sm={4}
        display="flex"
        alignItems="stretch"
        key={product.id}
      >
        <Card sx={{ p: 0, width: "100%" }}>
          <Image src={product.photo} alt="img" />
          <CardContent sx={{ p: 3 }}>
            <Typography variant="caption">{product.category}</Typography>
            <NextLink href="/shop/detail">
              <Typography
                fontWeight="500"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.grey.A200
                        : "rgba(0, 0, 0, 0.87)"
                    }`,
                }}
              >
                {product.title}
              </Typography>
            </NextLink>

            <Box
              display="flex"
              alignItems="center"
              sx={{
                mt: "15px",
              }}
            >
              <Typography variant="h5" sx={{ mr: "auto" }}>
                {product.price}
              </Typography>
              {product.star.map((index) => (
                <FeatherIcon
                  icon="star"
                  key={index}
                  size="14"
                  style={{ fill: "#fdd43f", stroke: "#fdd43f" }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default ShopPage;
