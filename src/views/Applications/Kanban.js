/* eslint-disable no-unused-vars */
// Chakra imports
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { AddIcon, AttachmentIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { ButtonGroup } from '@chakra-ui/react/dist/chakra-ui-react.cjs';
// Assets
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';
import avatar4 from 'assets/img/avatars/avatar4.png';
import AddCardModal from 'components/Kanban/AddCardModal';
import AddColumnModal from 'components/Kanban/AddColumnModal';
import CardsMenuButton from 'components/Kanban/CardsMenuButton';
import DeleteCardModal from 'components/Kanban/DeleteCardModal';
import DeleteColumnModal from 'components/Kanban/DeleteColumnModal';
import ViewCardModal from 'components/Kanban/ViewCardModal';
import {
  kanbanRenderTrack,
  kanbanRenderView,
} from 'components/Scrollbar/Scrollbar';
import TimelineCustom from 'components/Timeline/TimelineCustom';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useQuery } from 'react-query';
import { Link, useHistory, useParams } from 'react-router-dom';
import ProjectCardService from 'services/ProjectCards';
import ProjectColumnsService from 'services/ProjectColumns';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import Typography from 'components/Typography/Typography';
import LogActivitiesService from 'services/LogActivities';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import UserProjectService from 'services/UserProjectsService';

//how to connect mongodb in expressJs

function Kanban() {
  const [selectedColumn, setSelectedColumn] = useState('');
  const { id } = useParams();
  const projectId = id;

  // Chakra color mode
  const textBlack = useColorModeValue('black.100', 'white');
  const textGray = useColorModeValue('gray.400', 'white.200');
  const attachementsGray = useColorModeValue('gray.500', 'gray.200');
  const kanbanCardBg = useColorModeValue('white', 'navy.700');
  const addButton = useColorModeValue('white', 'blue.500');
  const addIcon = useColorModeValue('blue.500', 'white');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCard,
    onOpen: onOpenCard,
    onClose: onCloseCard,
  } = useDisclosure();

  const {
    isOpen: isOpenView,
    onOpen: onOpenView,
    onClose: onCloseView,
  } = useDisclosure();

  const {
    isOpen: isOpenFieldSetting,
    onOpen: onOpenFieldSetting,
    onClose: onCloseFieldSetting,
  } = useDisclosure();

  const [viewDataId, setViewDataId] = useState('');
  const [cardId, setCardId] = useState(null);
  const [cardTitle, setCardTitle] = useState(null);
  const [title, setTitle] = useState('');
  const [modal, setModal] = useState('');
  const [columnId, setColumnId] = useState(null);

  function onCardNew(newCard) {
    const newCardLocal = { id: Math.random() * 1000, ...newCard };
    // initialBoard.counter = initialBoard.counter + 1;
    // setBoard(boardData);
    return newCardLocal;
  }

  const { data, status, refetch } = useQuery(['kanban', id], async () => {
    const { data } = await ProjectColumnsService.findAll({
      project_id: id,
      $limit: -1,
    });
    return data;
  });

  const history = useHistory();

  const handleOnMoveCard = async (cardId, columnId) => {
    console.log(cardId, columnId);
    await LogActivitiesService.create({ card_id: cardId, column_id: columnId });
  };

  const [projectPermission, setProjectPermission] = useState();
  useEffect(() => {
    UserProjectService.findAll({
      user_id: localStorage.getItem('user_id'),
      project_id: projectId,
    })
      .then(({ data }) => {
        // console.log('dddddddd', data);
        setProjectPermission(data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log('ammi', projectPermission?.can_add_column);

  if (status === 'loading') return <></>;

  return (
    <>
      <AdminNavbar />
      <Flex
        direction="column"
        minH="100vh"
        align="center"
        pt={{ sm: '125px', lg: '75px' }}
        overflow="hidden"
      >
        {projectPermission?.can_add_column && (
          <Button
            color={useColorModeValue('gray.700', 'white')}
            bg={useColorModeValue('white', 'blue.500')}
            mb="5"
            mt="5"
            w="100%"
            onClick={onOpen}
          >
            Tambah Kolom
          </Button>
        )}

        <Flex maxWidth="100%">
          <Scrollbars
            autoHide
            renderTrackHorizontal={kanbanRenderTrack}
            renderView={kanbanRenderView}
          >
            <Board
              initialBoard={{
                columns: data,
              }}
              allowAddCard
              allowAddColumn
              allowRemoveLane
              allowRenameColumn
              allowRemoveCard
              onColumnNew={console.log}
              onCardRemove={console.log}
              renderColumnAdder={({ addColumn }) => (
                <AddColumnModal
                  isOpen={isOpen}
                  onClose={onClose}
                  addColumn={addColumn}
                  projectId={id}
                  onCloseComplete={refetch}
                />
              )}
              onCardDragEnd={async (board, card, source, destination) => {
                // console.log(
                //   { board, card, source, destination },
                //   'onCardDragEnd'
                // );
                await ProjectCardService.reordering({
                  card_id: card.id,
                  column_id: card.project_column_id,
                  from_position: source.fromPosition,
                  from_column: source.fromColumnId,
                  to_position: destination.toPosition,
                  to_column: destination.toColumnId,
                });
                handleOnMoveCard(card.id, destination.toColumnId);
                await refetch();
              }}
              onColumnDragEnd={async (board, card, source, destination) => {
                console.log(
                  { board, card, source, destination },
                  'onColumnDragEnd'
                );
                try {
                  await ProjectColumnsService.reordering({
                    card_id: card.id,
                    from_position: source.fromPosition,
                    to_position: destination.toPosition,
                  });
                  await refetch();
                } catch (error) {
                  console.log(error);
                }
              }}
              onNewCardConfirm={onCardNew}
              onCardNew={console.log}
              onColumnRemove={console.log}
              onColumnRename={console.log}
              renderColumnHeader={function (
                { title, id },
                { removeColumn, renameColumn, addCard }
              ) {
                return (
                  <Flex key={id}>
                    {cardId ? (
                      <>
                        {modal === 'add' && columnId === id && (
                          <AddCardModal
                            projectColumnId={columnId}
                            isOpen={isOpenCard && id == cardId}
                            onClose={onCloseCard}
                            addCard={addCard}
                            cardId={cardId}
                            onCloseComplete={refetch}
                          />
                        )}
                        {modal === 'delete' && (
                          <DeleteColumnModal
                            isOpen={isOpenCard && id == cardId}
                            onClose={onCloseCard}
                            removeColumn={removeColumn}
                            cardId={cardId}
                            title={title}
                            onCloseComplete={refetch}
                          />
                        )}
                      </>
                    ) : null}
                    <Flex
                      flexDirection="column"
                      mb="24px"
                      fontWeight="bold"
                      w="100%"
                      key={id}
                    >
                      <Flex justify="space-between" align="center" mb="24px">
                        <Text fontSize="lg" mt="5px">
                          {title}
                        </Text>
                        <ButtonGroup gap={2}>
                          {projectPermission?.can_add_card && (
                            <IconButton
                              w="92px"
                              h="35px"
                              aria-label="Search database"
                              variant="no-hover"
                              bg={addButton}
                              icon={
                                <AddIcon w="12px" h="12px" color={addIcon} />
                              }
                              onClick={() => {
                                setCardId(id);
                                setColumnId(id);
                                onOpenCard();
                                setModal('add');
                              }}
                            />
                          )}
                          {projectPermission?.can_add_card &&
                            projectPermission?.is_owner && (
                              <IconButton
                                w="92px"
                                h="35px"
                                aria-label="Search database"
                                variant="no-hover"
                                bg={addButton}
                                icon={
                                  <DeleteIcon
                                    w="12px"
                                    h="12px"
                                    color={addIcon}
                                  />
                                }
                                onClick={() => {
                                  setCardId(id);
                                  setTitle(title);
                                  onOpenCard();
                                  setModal('delete');
                                }}
                              />
                            )}

                          <Menu
                            isOpen={isOpenFieldSetting}
                            onClose={onCloseFieldSetting}
                            placement="right-end"
                          >
                            <MenuButton
                              as={Button}
                              onClick={() => {
                                onOpenFieldSetting();
                                setSelectedColumn(id);
                              }}
                              _active={{
                                backgroundColor:
                                  selectedColumn === id ? '#e1e1e1' : 'none',
                              }}
                              alignSelf="flex-start"
                              sx={{
                                backgroundColor: 'white',
                                height: '35px',
                              }}
                            >
                              <IoEllipsisVerticalSharp
                                style={{
                                  fontSize: '12px',
                                  color: '#3182ce',
                                }}
                              />
                            </MenuButton>
                            {selectedColumn === id ? (
                              <MenuList>
                                <MenuItem
                                  onClick={() =>
                                    history.push({
                                      pathname: `/admin/applications/project/settings/${projectId}`,
                                      state: {
                                        project_column_id: id,
                                      },
                                    })
                                  }
                                >
                                  <Typography fontWeight={700} fontSize="14px">
                                    Add More Spesific Field This Column
                                  </Typography>
                                </MenuItem>
                              </MenuList>
                            ) : null}
                          </Menu>
                        </ButtonGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                );
              }}
              renderCard={(
                { id, image, title, subtitle, attachements, status, members },
                { removeCard, dragging }
              ) => (
                <Flex key={id}>
                  {cardId && modal === 'deleteCard' && (
                    <DeleteCardModal
                      isOpen={isOpenCard && id === cardId}
                      onClose={onCloseCard}
                      removeCard={removeCard}
                      cardId={cardId}
                      title={cardTitle}
                      onCloseComplete={refetch}
                    />
                  )}
                  <Flex
                    mt="10px"
                    flexDirection="column"
                    bg={kanbanCardBg}
                    p="25px"
                    borderRadius="15px"
                    w="470px"
                    key={id}
                  >
                    {image ? (
                      <Image
                        borderRadius="15px"
                        w="420px"
                        h="284px"
                        src={image}
                        mb="20px"
                      />
                    ) : null}
                    {status ? (
                      <Badge
                        fontSize="10px"
                        fontWeight="bold"
                        variant="solid"
                        mb="16px"
                        h="28px"
                        w="94px"
                        display="flex"
                        borderRadius="8px"
                        alignItems="center"
                        justifyContent="center"
                        bg={
                          status === 'ERRORS'
                            ? 'red.500'
                            : status === 'PENDING'
                            ? 'orange.300'
                            : status === 'DONE'
                            ? 'green.500'
                            : status === 'UPDATES'
                            ? 'blue.400'
                            : 'teal'
                        }
                        colorScheme={
                          status === 'ERRORS'
                            ? 'red'
                            : status === 'PENDING'
                            ? 'orange'
                            : status === 'DONE'
                            ? 'green'
                            : status === 'UPDATES'
                            ? 'blue'
                            : 'teal'
                        }
                      >
                        {status}
                      </Badge>
                    ) : null}
                    <Flex justify="space-between" w="100%">
                      <Flex
                        justifyContent="space-around"
                        flexDirection="column"
                        width="100%"
                        onClick={() => {
                          // onOpenView();
                          setModal('viewCard');
                          setViewDataId(id);
                          setTitle(title);
                        }}
                      >
                        <Link
                          to={`/admin/applications/project/card-details/${id}`}
                        >
                          <Text fontSize="md" color={textBlack}>
                            {title}
                          </Text>

                          <Text fontSize="sm" color={textGray}>
                            {subtitle}
                          </Text>
                        </Link>
                      </Flex>

                      <CardsMenuButton
                        // projectId={project.id}
                        removeCard={removeCard}
                        onEditClick={() => {
                          // console.log(project, 'wowo');
                          // setProject(project);
                          // onOpen2();
                        }}
                        onDeleteClick={() => {
                          onOpenCard();
                          setCardId(id);
                          setCardTitle(title);
                          setModal('deleteCard');
                        }}
                      />
                    </Flex>
                    {image ? (
                      members ? (
                        <Flex justify="space-between" align="center" mt="20px">
                          <Flex justify="center" align="center">
                            <AttachmentIcon me="2px" color={attachementsGray} />
                            <Text fontSize="sm" color={attachementsGray}>
                              {attachements}
                            </Text>
                          </Flex>

                          <AvatarGroup size="sm">
                            <Avatar src={avatar2} />
                            <Avatar src={avatar3} />
                            <Avatar src={avatar4} />
                          </AvatarGroup>
                        </Flex>
                      ) : null
                    ) : null}
                  </Flex>
                </Flex>
              )}
            />
          </Scrollbars>
        </Flex>
        {viewDataId && isOpenView && (
          <ViewCardModal
            isOpen={isOpenView}
            onOpenCard={onOpenCard}
            onClose={onCloseView}
            title={title}
            data={viewDataId}
            onComplate={() => refetch()}
          />
        )}
      </Flex>
    </>
  );
}

export default Kanban;
