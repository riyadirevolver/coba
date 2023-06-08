import React from "react";

import { Card, CardContent, Box, Grid } from "@mui/material";

import ProductDesc from "../../../src/components/shop/ProductDesc";
import ProductCarousel from "../../../src/components/shop/ProductCarousel";
import ProductDetail from "../../../src/components/shop/ProductDetail";
import ProductRelated from "../../../src/components/shop/ProductRelated";

const ShopDetail = () => {
  return (
    <>
      <Card>
        <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} lg={6}>
              <Box sx={{ paddingRight: { xs: 0, lg: "50px" } }}>
                <ProductCarousel />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <ProductDetail />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ProductDesc />
      <ProductRelated />
    </>
  );
};

export default ShopDetail;
