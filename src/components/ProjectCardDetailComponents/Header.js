import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import InputField from 'components/Forms/InputField';
import Participant from 'components/Participant/Participant';
import SkeletonParticipant from 'components/Skeletons/SkeletonParticipant';
import Typography from 'components/Typography/Typography';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import CardAssigned from 'services/CardAssigned';
import ProjectCardService from 'services/ProjectCards';

const dataParticipants = [
  {
    fullname: 'Person A',
    photo: '',
  },
  {
    fullname: 'Minato',
    photo: '',
  },
  {
    fullname: 'Jaku',
    photo: '',
  },
];

const handleUpdateTitle = async ({ id, title }) => {
  await ProjectCardService.patch(id, { title });
};

const Header = ({
  cardId,
  title: projectCardTitle,
  subtitle,
  cardPosition,
  onRefetch,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(projectCardTitle);
  const [fetchingEnabled, setFechingEnabled] = useState(true);

  const { id } = useParams();

  const queryClient = useQueryClient();

  const { data: dataAssigned, refetch, isFetched } = useQuery(
    ['card-assigneds', id],
    async () => {
      const { data: res } = await CardAssigned.findAll({
        card_id: id,
      });
      setFechingEnabled(false);
      return res.data;
    }
  );

  const saveTitle = useMutation(handleUpdateTitle, {
    onSuccess: (data) => {
      setEditTitle(false);
      const message = 'success update field';
      alert(message);
      onRefetch();
    },
    onError: (err) => {
      console.log(err);
      setEditTitle(false);
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['project-cards', id]);
    },
  });

  return (
    <CardBody>
      <Flex justifyContent="space-between">
        <Box>
          <Box position="relative">
            <Flex alignItems="center">
              <Typography fontWeight={700} fontSize="20px">
                {projectCardTitle}
              </Typography>
              <Button variant="ghost" onClick={() => setEditTitle(!editTitle)}>
                <CiEdit fontSize="22px" color="#3182ce" />
              </Button>
            </Flex>
            {editTitle ? (
              <Card
                zIndex={1}
                position="absolute"
                top={45}
                left={-5}
                w="300px"
                p={0}
                sx={{
                  boxShadow: '0px 5px 14px rgb(0 0 0 / 30%)',
                }}
              >
                <Box p={3}>
                  <InputField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Flex>
                    <Button
                      onClick={() => {
                        saveTitle.mutate({ id, title });
                        onRefetch();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="solid"
                      colorScheme="blue"
                      ml={2}
                      onClick={() => {
                        setEditTitle(false);
                        setTitle(title);
                      }}
                    >
                      Cancel
                    </Button>
                  </Flex>
                </Box>
              </Card>
            ) : null}
          </Box>
          <Typography fontSize="12px" mt="-6px" color="blue.500">
            In Card : <span>{cardPosition}</span>
          </Typography>
          <Typography>{subtitle}</Typography>
        </Box>
        <Flex>
          {isFetched ? (
            <Participant dataParticipants={dataAssigned} />
          ) : (
            <SkeletonParticipant />
          )}
          {/* <Dropdown /> */}
          <Box ml={1}>
            <Menu>
              <MenuButton as={Button}>
                <BsThreeDotsVertical />
              </MenuButton>
              <MenuList>
                <MenuItem
                  bg="red.500"
                  _focus={{
                    background: 'red.500',
                  }}
                >
                  <CiTrash color="white" fontSize="20px" />
                  <Typography ml={1} color="white">
                    Delete Card
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>
    </CardBody>
  );
};

export default Header;
