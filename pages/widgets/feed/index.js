import React from "react";
import Image from 'next/image';
import {
  Grid,
  Box,
  Avatar,
  Typography,
  Link,
  Button,
  Divider,
} from "@mui/material";
import BaseFeed from "../../../src/components/baseCard/BaseFeed";
import CustomTextField from "../../../src/components/forms/custom-elements/CustomTextField";

import img1 from "../../../assets/images/users/1.jpg";
import img2 from "../../../assets/images/users/2.jpg";
import img3 from "../../../assets/images/users/3.jpg";
import img4 from "../../../assets/images/users/4.jpg";

import postimg1 from "../../../assets/images/big/img5.jpg";
import postimg2 from "../../../assets/images/big/img6.jpg";
import postimg3 from "../../../assets/images/big/img7.jpg";
import postimg4 from "../../../assets/images/big/img8.jpg";

const MStyles = {
  marginLeft: "3px",
};

const WidgetFeed = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={4} md={12} xs={12}>
        <BaseFeed
          img={img1}
          username="Shraddha Chhatraliya"
          time="Yestarday at 5:06 PM"
        >
          <Image src={postimg1} alt="post-img" />
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 1,
            }}
          >
            Your beauty is one of the things I like about you.
            <span role="img" aria-label="emoji">
              😍 🥰
            </span>
            <Link underline="none" href="#" sx={MStyles}>
              #beauty
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #goa
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #india
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #happylife
            </Link>
          </Typography>
        </BaseFeed>
        {/* 2 card */}
        <BaseFeed
          img={img2}
          username="Maria Hernandez"
          time="Angular, Reactjs, Vuejs"
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 1,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </Typography>
          <Divider
            sx={{
              mt: 3,
              mb: 2,
            }}
          />
          <Box
            display="flex" alignItems="flex-start"
            sx={{
              width: "100%",
            }}
          >
            <Image
              src={img3}
              alt="img"
              width="50"
              height="50" className="roundedCircle"
            />
            <Box
              sx={{
                ml: 2,
                width: "100%",
              }}
            >
              <Typography fontWeight="500" variant="h5">
                John Deo
              </Typography>
              <CustomTextField
                id="add-cmt"
                placeholder="Write a comment"
                inputProps={{ "aria-label": "Write a comment..." }}
                fullWidth
                variant="outlined"
                sx={{
                  mt: 1,
                }}
              />
              <Box
                sx={{
                  textAlign: "right",
                  mt: 1,
                }}
              >
                <Button variant="contained" color="secondary">
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </BaseFeed>
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item lg={4} md={12} xs={12}>
        <BaseFeed img={img2} username="John Smith" time="Yestarday at 5:06 PM">
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 1,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est
          </Typography>
        </BaseFeed>
        {/* 2 */}
        <BaseFeed img={img1} username="Ritesh Deshmukh" time="Today at 6:30 AM">
          <Image
            src={postimg2}
            alt="post-img"
          />
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 1,
            }}
          >
            Your beauty is one of the things I like about you.{" "}
            <span role="img" aria-label="emoji">
              😋 🤪
            </span>
            <Link underline="none" href="#" sx={MStyles}>
              #cookie
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #testy
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #best
            </Link>
            <Link underline="none" href="#" sx={MStyles}>
              #foodie
            </Link>
          </Typography>
        </BaseFeed>
        {/* 3 */}
        <BaseFeed img={img3} username="Nirav Joshi" time="Today at 4:30 AM">
          <Typography
            color="textSecondary"
            variant="h5"
            sx={{
              mt: 2,
            }}
          >
            New Wireless headphone with 50% off...!
          </Typography>
          <Image
            src={postimg3}
            alt="post-img"
          />
          <Typography
            variant="h4"
            fontWeight="500"
            sx={{
              mt: 1,
            }}
          >
            Sony Headphone
          </Typography>
          <Typography color="textSecondary" variant="h5" fontWeight="400">
            Noise One Wireless Bluetooth Headset
            <Link
              href="#"
              sx={{
                ml: "3px",
                display: "inline-block",
              }}
            >
              https://www.flipkart.com/search?q=headphone&otracker=search
            </Link>
          </Typography>
        </BaseFeed>
      </Grid>
      {/* --------------------------- row 3 ------------------------ */}
      <Grid item lg={4} md={12} xs={12}>
        <BaseFeed
          img={img3}
          username="Maria Hernandez"
          time="Angular, Reactjs, Vuejs"
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 1,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </Typography>
          <CustomTextField
            id="add-reply"
            placeholder="Reply"
            inputProps={{ "aria-label": "Reply" }}
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
            }}
          />
          <Box
            sx={{
              textAlign: "right",
              mt: 1,
            }}
          >
            <Button variant="contained" color="secondary">
              Post
            </Button>
          </Box>
        </BaseFeed>
        {/* 2 */}
        <BaseFeed img={img4} username="Sunil Joshi" time="Today at 2:30 PM">
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{
              mt: 2,
            }}
          >
            Shows off his favourite features of the new Polestar 2. Excited!
          </Typography>
          <Image
            src={postimg4}
            alt="post-img"
          />
          <Typography
            variant="h4"
            fontWeight="500"
            sx={{
              mt: 1,
            }}
          >
            Polestar 2
          </Typography>
          <Typography color="textSecondary" variant="h5" fontWeight="400">
            5-door all-electric fastback
            <Link
              href="#"
              sx={{
                ml: "3px",
                display: "inline-block",
              }}
            >
              https://www.polestar.com/us/pole-star-2/
            </Link>
          </Typography>
        </BaseFeed>
      </Grid>
    </Grid>
  );
};

export default WidgetFeed;
