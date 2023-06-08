import React from "react";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";

// images
import background2x from "../../../../assets/images/backgrounds/blog-bg2-2x.jpg";
import img1 from "../../../../assets/images/users/1.jpg";
import img2 from "../../../../assets/images/users/2.jpg";
import img3 from "../../../../assets/images/users/3.jpg";

const BlogCard = () => (
  <Card
    sx={{
      p: 0,
    }}
  >
    <Image src={background2x} alt="img" />
    <CardContent
      sx={{
        paddingLeft: "30px",
        paddingRight: "30px",
      }}
    >
      <Box display="flex" alignItems="center">
        <Typography color="textSecondary" display="flex" alignItems="center">
          <FeatherIcon icon="clock" width="20" height="20" />
        </Typography>

        <Typography
          color="textSecondary"
          variant="subtitle2"
          sx={{
            ml: 1,
          }}
        >
          22 March, 2021
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{
          mt: 3,
          pt: 1,
        }}
      >
        Super awesome, React 18 is coming soon!
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          mt: 2,
          pb: 3,
        }}
      >
        <Chip
          label="Medium"
          size="small"
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: "#fff",
            pl: "3px",
            pr: "3px",
            borderRadius: "6px",
          }}
        />
        <Chip
          label="Low"
          size="small"
          sx={{
            backgroundColor: (theme) => theme.palette.error.main,
            color: "#fff",
            pl: "3px",
            pr: "3px",
            borderRadius: "6px",
            ml: 2,
          }}
        />
      </Box>
      <Divider />
      <Box
        display="flex"
        alignItems="center"
        gap={1}
        sx={{
          mt: 3,
        }}
      >
        <Image
          src={img1}
          alt="blog"
          width="40"
          height="40"
          className="roundedCircle"
        />

        <Image
          src={img2}
          alt="blog"
          width="40"
          height="40"
          className="roundedCircle"
        />

        <Image
          src={img3}
          alt="blog"
          width="40"
          height="40"
          className="roundedCircle"
        />

        <Box
          sx={{
            ml: "auto",
          }}
        >
          <IconButton>
            <FeatherIcon icon="message-circle" />
          </IconButton>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default BlogCard;
