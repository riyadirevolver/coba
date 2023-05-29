/* eslint-disable no-undef */
import { SkeletonCircle } from '@chakra-ui/react';
import React from 'react';

const SkeletonParticipant = () => {
  return (
    <>
      {[...Array(3)].map((_, idx) => (
        <SkeletonCircle key={idx} w="40px" h="40px" />
      ))}
    </>
  );
};

export default SkeletonParticipant;
