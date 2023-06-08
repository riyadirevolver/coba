import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography, ImageList, ImageListItem } from '@mui/material';

import img1 from '../../../assets/images/users/1.jpg';
import img2 from '../../../assets/images/users/2.jpg';
import img3 from '../../../assets/images/users/3.jpg';
import img4 from '../../../assets/images/users/4.jpg';
import img5 from '../../../assets/images/users/5.jpg';
import img6 from '../../../assets/images/users/6.jpg';
import img7 from '../../../assets/images/users/7.jpg';
import img8 from '../../../assets/images/users/8.jpg';

const photos = [
  {
    img: img1,
    id: 1,
  },
  {
    img: img2,
    id: 2,
  },
  {
    img: img3,
    id: 3,
  },
  {
    img: img4,
    id: 4,
  },
  {
    img: img5,
    id: 5,
  },
  {
    img: img6,
    id: 6,
  },
  {
    img: img7,
    id: 7,
  },
  {
    img: img8,
    id: 8,
  },
  {
    img: img1,
    id: 9,
  },
];

const PhotosCard = () => (
  <Card>
    <CardContent>
      <Box display="flex" alignItems="center">
        <Typography variant="h3" fontWeight="500">
          Photos
        </Typography>
      </Box>
      <ImageList cols={3} gap={20}>
        {photos.map((photo) => (
          <ImageListItem key={photo.id}>
            <Image
              src={photo.img}
              alt={photo.img}
              loading="lazy" className='borderRadius'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </CardContent>
  </Card>
);

export default PhotosCard;
