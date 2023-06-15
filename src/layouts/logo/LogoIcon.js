import React from "react";
import { Box, Link } from "@mui/material";
import Image from "next/image";
import banner from "../../../assets/images/logos/juara_coding_logo.png";

import Icon from "../../components/icons";

const LogoIcon = () => {
  /* 
  const customizer = useSelector((state) => state.CustomizerReducer);

  consumer custome will use soon if need it
  */
  return (
    // <Link href="/">
    //   <Image src={banner} alt={"Logo Hadir"} />
    // </Link>
    <Link href="/dashboards/dashboard">
      <Box
        width={"265px"}
        display={"flex"}
        justifyContent={"flex-start"}
        sx={{
          alignItems: "center",

          background: "#00C298",
          zIndex: 9,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "75px",
            backgroundColor: "rgba(61, 61, 61, 1)",
            display: "flex",
            justifyContent: "center",
            height: "100%",
            minHeight: "72px",
            pt: "10px",
          }}
        >
          {/* <Icon variant="hadir" /> */}
        </Box>
        <Box
          sx={{
            width: "100%",
            marginLeft: "35px",
          }}
        >
          <Image src={banner} alt={"Logo Juara Coding"} />
        </Box>
      </Box>
    </Link>
  );
};

export default LogoIcon;
