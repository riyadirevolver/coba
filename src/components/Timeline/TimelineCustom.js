import { Box, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import React from 'react';
import TimelineCustomRow from './TimelineCustomRow';
import moment from 'moment';

const TimelineCustom = ({ data }) => {
  const textColor = useColorModeValue('gray.700', 'white');
  const bgCard = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)'
  );

  return (
    <Stack direction="column" spacing="24px" pt={3}>
      <Card>
        <CardHeader mb="30px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            Activities
          </Text>
        </CardHeader>
        <CardBody px="10px">
          <Stack direction="column" spacing="4px" width={'500px'}>
            {data.map((row, index) => {
              const activitiesDecode = JSON.parse(
                row.activities ? row.activities : '[]'
              );
              const activities = activitiesDecode.join(' > ');
              const getLastActivity =
                activitiesDecode[activitiesDecode?.length - 1];

              return (
                <TimelineCustomRow
                  title={activities}
                  date={moment(row.created_at).format('DD-MM-YYYY')}
                  // color={row.color}
                  description={
                    getLastActivity
                      ? `user move card to ${getLastActivity}`
                      : null
                  }
                  key={index}
                />
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default TimelineCustom;
