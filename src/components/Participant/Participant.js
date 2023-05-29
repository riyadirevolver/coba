import { Avatar, Flex } from '@chakra-ui/react';
import React from 'react';
import './styles.scss';

const Participant = ({ dataParticipants }) => {
  return (
    <>
      <Flex className="participants-wrapper">
        {dataParticipants.map((person, idx) => (
          <Avatar
            key={idx}
            src={person.user.photo}
            name={person.user.fullname}
            className="thumb"
          />
        ))}
      </Flex>
    </>
  );
};

export default Participant;
