import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import Typography from 'components/Typography/Typography';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import ProjectCardService from 'services/ProjectCards';
import { CiEdit } from 'react-icons/ci';
import { ColorProps } from 'theme/color';
import InputField from 'components/Forms/InputField';
import Participant from 'components/Participant/Participant';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from 'components/Dropdown/Dropdown';
import Header from 'components/ProjectCardDetailComponents/Header';
import CardAssigned from 'services/CardAssigned';
import ProjectColumnsService from 'services/ProjectColumns';
import ProjectDetailKanban from 'components/Kanban/ProjectDetailKanban/ProjectDetailKanban';
import { AttachmentIcon } from '@chakra-ui/icons';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdOutlineNotes } from 'react-icons/md';
import PreviewFile from 'components/PreviewFile/PreviewFile';
import { getFileExtension } from 'utils/getFileExtension';
import TimelineCustom from 'components/Timeline/TimelineCustom';
import LogActivitiesService from 'services/LogActivities';

const handleUpdateTitle = async ({ id, title }) => {
  await ProjectCardService.patch(id, { title });
};

const ProjectCardDetail = () => {
  const { id } = useParams();
  const [fetchingEnabled, setFechingEnabled] = useState(true);
  const [cardPosition, setCardPosition] = useState('');
  const [additionalExtras, setAdditionalExtras] = useState({});

  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUploaded, setPreviewUploaded] = useState('');
  const [fileExtension, setFileExtension] = useState('');

  const inputFile = useRef(null);

  const queryClient = useQueryClient();

  const { data: dataCard, refetch, isFetched } = useQuery(
    ['card-detail', id],
    async () => {
      const res = await ProjectCardService.findOne(id).then(async (r) => {
        const columnId = r.data.project_column_id;
        const getColumn = await ProjectColumnsService.findOne(columnId);
        setCardPosition(getColumn.data.title);
        // setAdditionalExtras
        const d = JSON.parse(r.data.additional_extras);
        const newParse = JSON.parse(d);
        setAdditionalExtras(newParse);

        return r;
      });
      // console.log(res);
      setFechingEnabled(false);
      return res.data;
    },
    { enabled: fetchingEnabled }
  );

  const { data: logActivities, isFetched: logFetched } = useQuery(
    ['log-activities', id],
    async () => {
      const res = await LogActivitiesService.findAll({
        card_id: id,
      });
      return res.data;
    }
  );

  const saveTitle = useMutation(handleUpdateTitle, {
    onSuccess: (data) => {
      refetch();
      const message = 'success update field';
      alert(message);
    },
    onError: (err) => {
      console.log(err);

      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['project-cards', id]);
    },
  });

  const handleUploadedFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setUploadedFile(undefined);
    }
    const file = e.target.files[0];
    const fileExtensions = getFileExtension(file.type);
    setFileExtension(fileExtensions);
    const createUrl = URL.createObjectURL(file);
    setPreviewUploaded(createUrl);
    setUploadedFile(file);
  };

  return (
    <Box pt="75px">
      <Card>
        {isFetched ? (
          <Header
            cardId={id}
            title={dataCard.title}
            subtitle={dataCard.subtitle}
            cardPosition={cardPosition}
            onRefetch={refetch}
          />
        ) : // 'hmm'
        null}
      </Card>

      {/* implements detail Projectrs */}

      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        gap={2}
        height="100%"
      >
        <GridItem rowSpan={2} colSpan={3}>
          {additionalExtras ? (
            <ProjectDetailKanban
              cardId={id}
              cardData={additionalExtras}
              onRefetch={refetch}
              isFetched={isFetched}
            />
          ) : null}
        </GridItem>
        <GridItem rowSpan={1} colSpan={9}>
          <Card mt={3}>
            <Tabs>
              <TabList>
                <Tab _focus={{ boxShadow: 'none' }}>
                  <AttachmentIcon mr="10px" />
                  File
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Flex
                    bg="#cecece38"
                    height="200px"
                    position="relative"
                    borderRadius={10}
                  >
                    {previewUploaded.length >= 1 ? (
                      <PreviewFile
                        file={previewUploaded}
                        type={fileExtension}
                      />
                    ) : null}
                    {uploadedFile ? null : (
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                      >
                        <Input
                          ref={inputFile}
                          type="file"
                          hidden
                          onChange={handleUploadedFile}
                        />
                        <Button
                          color="blue.500"
                          onClick={() => {
                            inputFile.current.click();
                          }}
                        >
                          <AiFillFileAdd />
                          Upload File
                        </Button>
                      </Box>
                    )}
                  </Flex>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Card>
          {logFetched ? <TimelineCustom data={logActivities.data} /> : null}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProjectCardDetail;
