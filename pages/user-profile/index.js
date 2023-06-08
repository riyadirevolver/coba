import React from 'react';
import { Grid } from '@mui/material';

import CoverCard from '../../src/components/profile/CoverCard';
import IntroCard from '../../src/components/profile/IntroCard';
import PhotosCard from '../../src/components/profile/PhotosCard';
import NewPost from '../../src/components/profile/NewPost';
import ImgPost from '../../src/components/profile/ImgPost';
import TypographyPost from '../../src/components/profile/TypographyPost';

const UserProfile = () => {
  return (
    <>
      <CoverCard />
      <Grid container spacing={0}>
        <Grid item sm={12} lg={4} xs={12}>
          <IntroCard />
          <PhotosCard />
        </Grid>
        <Grid item sm={12} lg={8} xs={12}>
          <NewPost />
          <ImgPost />
          <TypographyPost />
        </Grid>
      </Grid>
    </>
  );
};

export default UserProfile;
