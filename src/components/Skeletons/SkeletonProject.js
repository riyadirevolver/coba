import { Flex, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import { HSeparator } from 'components/Separator/Separator';
import React from 'react';

const SkeletonProject = () => {
  return (
    <>
      {[...Array(12)].map((_, idx) => (
        <Card key={idx} minH="100%" alignSelf="flex-start">
          <CardHeader mb="18px">
            <Flex justify="space-between" w="100%">
              <Flex w="100%" alignItems="center">
                <SkeletonCircle height="60px" w="60px" sx={{ mr: '1rem' }} />
                <Skeleton height="20px" w="200px" />
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column">
              <SkeletonText w="100%" />
              <HSeparator my="22px" />

              <Skeleton height="10px" width="100%" />

              <Flex mt="1rem" justifyContent="flex-end">
                <Skeleton height="10px" width="50px" />
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default SkeletonProject;
