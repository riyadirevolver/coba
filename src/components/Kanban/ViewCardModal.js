/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Textarea,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import BaseModal from 'components/BaseModal/BaseModal';
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  Banner,
  BannerWrapper,
  ContentWrapper,
  FieldContent,
} from './elements';
import bannerImage from '../../assets/img/example-card.jpg';
import {
  MdShortText,
  MdOutlinePersonOutline,
  MdOutlinePersonAddAlt,
  MdAttachFile,
  MdArrowForward,
  MdShare,
  MdAdd,
  MdDelete,
} from 'react-icons/md';
import { AiFillCreditCard } from 'react-icons/ai';
import Typography from 'components/Typography/Typography';
import { ColorProps } from 'theme/color';
import BubbleChat from 'components/ChatComponents/BubbleChat';
import './styles.scss';
import ChatInput from 'components/ChatComponents/ChatInput';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import ProjectCardService from 'services/ProjectCards';
import PhoneForm from 'components/Forms/PhoneForm';
import UploadForm from 'components/Forms/UploadForm';
import LongTextForm from 'components/Forms/LongTextForm';
import ShortTextForm from 'components/Forms/ShortTextForm';
import { useFormik, useFormikContext } from 'formik';
import ChatContainer from 'components/ChatComponents/ChatContainer';
import TitleForm from './CardForm/TitleForm';
import AdditionalForm from './CardForm/AdditionalForm';

const desctiontions = `Lorem ipsum dolor sit amet consectetur adipisicing elit. At
tempora, aperiam quaerat nam assumenda earum voluptates quidem
maiores voluptas consequatur asperiores officia nulla molestiae
corrupti doloremque? Quasi unde commodi dolorumLorem ipsum dolor sit amet consectetur adipisicing elit. At
tempora, aperiam quaerat nam assumenda earum voluptates quidem
maiores voluptas consequatur asperiores officia nulla molestiae
corrupti doloremque? Quasi unde commodi dolorum.`;

const ViewCardModal = ({ isOpen, onClose, data: id, onComplate }) => {
  const [desc, setDesc] = useState(desctiontions);
  const [isEdit, setIsEdit] = useState(false);
  const [onFieldEdit, setOnFieldEdit] = useState('');

  const {
    isOpen: isOpenCard,
    onOpen: onOpenCard,
    onClose: onCloseCard,
  } = useDisclosure();

  const [txtH, setTxtH] = useState(0);

  const textAreaRef = useRef(null);

  const filteredObj = (obj) => {
    let result = {};

    const entries = Object.keys(obj);
    const filteredKey = entries.filter((item) => {
      for (var field in obj) {
        if (item === 'title') {
          return false;
        }
        if (item === 'subtitle') {
          return false;
        }
      }
      return true;
    });

    filteredKey.map((key) => {
      result[key] = obj[key];
    });

    return result;
  };

  const { data: cardData, isLoading, refetch } = useQuery({
    queryKey: ['card', id],
    queryFn: async () => {
      const res = await ProjectCardService.findOne(id);
      const newData = {
        ...res.data,
        additional_extras: JSON.parse(res.data.additional_extras),
      };

      return newData;
    },
  });

  useLayoutEffect(() => {
    if (txtH === 0) {
      setTxtH(textAreaRef.current?.scrollHeight);
    } else {
      setTxtH(textAreaRef.current?.scrollHeight);
    }
  }, [isEdit]);

  const additionalExtra =
    isLoading && !cardData ? null : JSON.parse(cardData.additional_extras);

  const keys = additionalExtra ? Object.keys(additionalExtra) : [];

  const formik = useFormik({
    initialValues: {
      ...(!isLoading &&
        cardData &&
        additionalExtra && {
          title: cardData.title,
          subtitle: cardData?.subtitle,
          ...additionalExtra,
        }),
    },
    onSubmit: async (values) => {
      // console.log('values', values);

      const filteredAddExtras = filteredObj(values);
      const addPayload = {
        ...additionalExtra,
        ...filteredAddExtras,
      };
      const payload = {
        project_column_id: cardData.project_column_id,
        title: values.title,
        subtitle: values.subtitle,
        additional_extras: JSON.stringify(addPayload),
      };

      try {
        const res = await ProjectCardService.patch(cardData.id, payload);

        refetch();
        onComplate();

        alert('Update Sucess');
      } catch (error) {
        console.log(error);
        alert('Terjadi kesalahan server');
      }
    },
  });

  const handleClose = (done) => {
    if (done === true) {
      onClose();
    }
  };


  return (
    <>
      <BaseModal
        title=" "
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
        sx={{
          '& .chakra-modal__content': {
            borderRadius: '1rem',
          },
        }}
      >
        {isLoading ? (
          <Flex
            h="100%"
            minHeight={400}
            maxHeight={700}
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Flex>
        ) : (
          <Box
            width="100%"
            className="scroll"
            sx={{
              overflowY: 'auto',
            }}
          >
            <Box>
              <BannerWrapper>
                {cardData.banner ? (
                  <Banner>
                    <img
                      src={bannerImage}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Banner>
                ) : null}

                <Box display="flex" mt="2" justifyContent="flex-end">
                  <Button fontWeight={500} leftIcon={<MdAdd />}>
                    Add Banner
                  </Button>
                </Box>
              </BannerWrapper>
            </Box>
            <ContentWrapper>
              <Flex alignItems="flex-start" mb="1rem">
                <Box mt="5px">
                  <AiFillCreditCard />
                </Box>
                <Flex direction="column" ml="1rem" width="100%">
                  <TitleForm
                    name="title"
                    value={formik.values.title ?? cardData.title}
                    onChange={formik.handleChange}
                    handleSubmit={() => formik.handleSubmit()}
                  />

                  <Typography fontWeight={400} fontSize="14px">
                    In card : Todo
                  </Typography>
                </Flex>
              </Flex>
              <Grid
                templateRows="repeat(2, auto)"
                templateColumns="repeat(4,1fr)"
                height="100%"
                gap={4}
              >
                <GridItem
                  colSpan={{
                    sm: 4,
                    md: 3,
                  }}
                >
                  <form action="">
                    <Flex alignItems="center" mb={2}>
                      <MdShortText size="24px" />
                      <Typography fontWeight={700} sx={{ marginLeft: '8px' }}>
                        Descriptions
                      </Typography>
                      <Button
                        variant="link"
                        ml="1rem"
                        fontWeight={500}
                        onClick={() => {
                          textAreaRef.current.focus();
                          setIsEdit(true);
                        }}
                      >
                        {isEdit ? null : 'Edit'}
                      </Button>
                    </Flex>
                    <FieldContent>
                      {/* descriptions content  */}

                      <Textarea
                        ref={textAreaRef}
                        className="scroll"
                        value={formik.values?.subtitle ?? cardData.subtitle}
                        id="description"
                        name="subtitle"
                        onChange={formik.handleChange}
                        spellCheck={false}
                        // onBlur={() => setIsEdit(false)}
                        display="block"
                        rows={2}
                        onFocus={() => setIsEdit(true)}
                        onInput={(e) => {
                          let elm = e.target;
                          elm.style.height = elm.scrollHeight + 'px';
                        }}
                        sx={{
                          height: `${txtH}px`,
                          p: isEdit ? '10px 1rem' : 0,
                          border: 'none',
                        }}
                      />
                      {isEdit ? (
                        <Button
                          variant="link"
                          fontWeight={500}
                          mb="1rem"
                          onClick={() => {
                            setIsEdit(false);
                            formik.handleSubmit();
                          }}
                        >
                          save
                        </Button>
                      ) : null}

                      {!isLoading && additionalExtra
                        ? keys.map((field, idx) => (
                            <div key={idx}>
                              <AdditionalForm
                                name={field}
                                field={field}
                                value={
                                  formik.values[field] ?? additionalExtra[field]
                                }
                                isEdit={onFieldEdit === field}
                                onClick={(v) => setOnFieldEdit(v)}
                                onChange={formik.handleChange}
                                handleSubmit={() => formik.handleSubmit()}
                              />
                            </div>
                          ))
                        : null}
                    </FieldContent>
                    <Box mt="1rem">
                      <ChatContainer />
                    </Box>
                  </form>
                </GridItem>
                <GridItem
                  colSpan={{
                    sm: 4,
                    md: 1,
                  }}
                >
                  <Box>
                    <Stack>
                      <Typography fontWeight={700}>Add to card</Typography>
                      <Button
                        leftIcon={<MdOutlinePersonOutline />}
                        sx={{
                          justifyContent: 'flex-start',
                          fontWeight: 500,
                        }}
                      >
                        Join
                      </Button>
                      <Button
                        leftIcon={<MdOutlinePersonAddAlt />}
                        sx={{
                          justifyContent: 'flex-start',
                          fontWeight: 500,
                        }}
                      >
                        Add Members
                      </Button>
                      <Button
                        leftIcon={<MdAttachFile />}
                        sx={{
                          justifyContent: 'flex-start',
                          fontWeight: 500,
                        }}
                      >
                        Attachements
                      </Button>
                    </Stack>
                    <Stack mt="1rem">
                      <Typography fontWeight={700}>Actions</Typography>
                      <Button
                        leftIcon={<MdArrowForward />}
                        sx={{
                          justifyContent: 'flex-start',
                          fontWeight: 500,
                        }}
                      >
                        Move
                      </Button>
                      <Button
                        leftIcon={<MdShare />}
                        sx={{
                          justifyContent: 'flex-start',
                          fontWeight: 500,
                        }}
                      >
                        Move
                      </Button>
                    </Stack>
                  </Box>
                </GridItem>
              </Grid>
            </ContentWrapper>
          </Box>
        )}
      </BaseModal>
    </>
  );
};

ViewCardModal.proptypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewCardModal;
