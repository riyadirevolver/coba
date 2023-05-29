/* eslint-disable no-unused-vars */
// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Grid,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
// Assets
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar5 from 'assets/img/avatars/avatar5.png';
import avatar4 from 'assets/img/avatars/avatar4.png';
import avatar7 from 'assets/img/avatars/avatar7.png';
// Custom components
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import IconBox from 'components/Icons/IconBox';
import {
  AdobexdLogo,
  AtlassianLogo,
  JiraLogo,
  SlackLogo,
  SpotifyLogo,
} from 'components/Icons/Icons';
import { HSeparator } from 'components/Separator/Separator';
import React, { useReducer, useState } from 'react';
import { BsPlus } from 'react-icons/bs';
import { FaCube, FaPenFancy } from 'react-icons/fa';
import { IoDocumentsSharp, IoEllipsisVerticalSharp } from 'react-icons/io5';
import { useQuery } from 'react-query';
import ProjectsService from 'services/Projects';
import ProjectsMenuButton from 'components/Projects/ProjectsMenuButton';
import AddProjectModal from 'components/Projects/AddProjectModal';
import EditProjectModal from 'components/Projects/EditProjectModal';
import SkeletonProject from 'components/Skeletons/SkeletonProject';

const reducer = (state, action) => {
  if (action.type === 'SWITCH_ACTIVE') {
    if (action.payload === 'overview') {
      const newState = {
        overview: true,
        teams: false,
        projects: false,
      };
      return newState;
    } else if (action.payload === 'teams') {
      const newState = {
        overview: false,
        teams: true,
        projects: false,
      };
      return newState;
    } else if (action.payload === 'projects') {
      const newState = {
        overview: false,
        teams: false,
        projects: true,
      };
      return newState;
    }
  }
  return state;
};

function Projects() {
  const [state, dispatch] = useReducer(reducer, {
    overview: false,
    teams: false,
    projects: true,
  });

  const { colorMode } = useColorMode();

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const {
    isOpen: isOpen4,
    onOpen: onOpen4,
    onClose: onClose4,
  } = useDisclosure();

  const {
    isOpen: isOpen5,
    onOpen: onOpen5,
    onClose: onClose5,
  } = useDisclosure();

  const [project, setProject] = useState();

  // Chakra color mode
  const textColor = useColorModeValue('gray.700', 'white');
  const bgProfile = useColorModeValue('hsla(0,0%,100%,.8)', 'navy.800');
  const borderProfileColor = useColorModeValue('white', 'transparent');
  const bgIconBox = useColorModeValue(
    'linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)',
    'navy.700'
  );
  const secondaryColor = useColorModeValue('gray.500', 'white');

  const { data, status, refetch, isLoading: loadingFetch } = useQuery(
    'projects',
    async () => {
      const { data } = await ProjectsService.findAll({
        // '$sort[created_at]': 1,
      });
      return data;
    }
  );

  if (status == 'loading') return <></>;

  return (
    <Flex direction="column" mt={{ sm: '150px', md: '100px' }}>
      <Grid
        templateColumns={{
          sm: '1fr',
          md: 'repeat(2, auto)',
          lg: 'repeat(3, auto)',
        }}
        templateRows={{ md: 'repeat(3, auto)', lg: 'repeat(2, auto)' }}
        gap="30px"
      >
        {loadingFetch ? (
          <SkeletonProject />
        ) : (
          <>
            <Card minH="100%">
              <CardBody h="100%">
                <Flex w="100%" h="100%">
                  <Button
                    variant="no-effects"
                    w="100%"
                    h="100%"
                    onClick={onOpen1}
                  >
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      color={secondaryColor}
                    >
                      <Icon
                        as={BsPlus}
                        w="30px"
                        h="30px"
                        mb="12px"
                        fontWeight="bold"
                      />
                      <Text fontSize="lg" fontWeight="bold">
                        Buat Project Baru
                      </Text>
                    </Flex>
                  </Button>
                </Flex>
              </CardBody>
            </Card>

            {data &&
              data.data.map((project) => (
                <Card key={project.id} minH="100%" alignSelf="flex-start">
                  <CardHeader mb="18px">
                    <Flex justify="space-between" w="100%">
                      <Flex>
                        <IconBox bg={bgIconBox} w="70px" h="70px" me="22px">
                          <SlackLogo
                            w="40px"
                            h="40px"
                            alignSelf="center"
                            justifySelf="center"
                            transform="translate(5%)"
                          />
                        </IconBox>
                        <Flex direction="column">
                          <Text
                            fontSize="md"
                            color={textColor}
                            fontWeight="bold"
                            mb="8px"
                          >
                            {project?.name}
                          </Text>
                          {/* <AvatarGroup size="xs">
                      <Avatar src={avatar1} />
                      <Avatar src={avatar2} />
                      <Avatar src={avatar3} />
                      <Avatar src={avatar4} />
                      <Avatar src={avatar7} />
                    </AvatarGroup> */}
                        </Flex>
                      </Flex>
                      <ProjectsMenuButton
                        projectId={project.id}
                        onEditClick={() => {
                          console.log(project, 'wowo');
                          setProject(project);
                          onOpen2();
                        }}
                        // auth={UserProject(project.id)}
                      />
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Flex direction="column">
                      <Text color="gray.400" fontSize="sm" fontWeight="normal">
                        {project.description}
                      </Text>
                      <HSeparator my="22px" />
                      <Flex justify="space-between" w="100%">
                        <Text
                          fontSize="sm"
                          color="gray.400"
                          fontWeight="normal"
                          mb="6px"
                        >
                          {'dibuat oleh : ' + project?.created_user_id?.name}
                        </Text>
                        {/* <Flex direction="column">
                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="bold"
                          mb="6px"
                        >
                          5
                        </Text>
                        <Text
                          color="gray.400"
                          fontSize="sm"
                          fontWeight="normal"
                        >
                          Participants
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <Text
                          fontSize="md"
                          color={textColor}
                          fontWeight="bold"
                          mb="6px"
                        >
                          02.03.22
                        </Text>
                        <Text
                          color="gray.400"
                          fontSize="sm"
                          fontWeight="normal"
                        >
                          Due Date
                        </Text>
                      </Flex> */}
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>
              ))}
          </>
        )}
      </Grid>

      <AddProjectModal
        isOpen={isOpen1}
        onClose={onClose1}
        onCloseComplete={refetch}
      />

      {project ? (
        <EditProjectModal
          isOpen={isOpen2}
          onClose={onClose2}
          onCloseComplete={refetch}
          data={project}
        />
      ) : null}
    </Flex>
  );
}

export default Projects;
