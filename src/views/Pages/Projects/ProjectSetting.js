/* eslint-disable no-undef */
// Chakra imports
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ColorProps } from 'theme/color';
import ProjectSettingAddModal from 'components/Projects/ProjectSettingAddModal';
import FieldsService from 'services/FieldsService';
import { useParams, useLocation } from 'react-router-dom';
import { SkeletonTable } from 'components/Skeletons/SkeletonTable';
import TableWithAction from 'components/Tables/TableWithAction';
import ProjectSettingEditModal from 'components/Projects/ProjectSettingEditModal';
import { columnProjectSetting } from 'variables/columnsData';
import ProjectSettingDeleteModal from 'components/Projects/ProjectSettingDeleteModal';

const handleDeleteField = async (id) => await FieldsService.delete(id);

export default function ProjectSetting() {
  const textColor = useColorModeValue('gray.700', 'white');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [totalPage, setTotalPage] = useState(0);
  const [onLoading, setOnloading] = useState(true);

  const [dataField, setDataField] = useState([]);

  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onOpen: onOpenEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
    onOpen: onOpenDelete,
  } = useDisclosure();
  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const { id } = useParams();

  const location = useLocation();

  const queryClient = useQueryClient();

  const fetchingFields = async () => {
    const { data } = await FieldsService.find({
      project_id: id,
      project_column_id: location.state?.project_column_id,
      '$sort[created_at]': -1,
    });
    if (data) {
      setDataField(data.data);
      setTotalPage(data.total);
      setOnloading(false);
    }

    return data;
  };
  const { refetch, isLoading, status, isFetched } = useQuery(
    ['fields', id],
    fetchingFields,
    {
      enabled: onLoading,
      staleTime: 'infinity',
    }
  );

  const { mutate } = useMutation(handleDeleteField, {
    onSuccess: (data) => {
      refetch();
      const message = 'success delete field';
      alert(message);
    },
    onError: (err) => {
      console.log(err);
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries('delete');
    },
  });
  const fetchUpdate = async (pageIndex, pageSize) => {
    const skip = pageIndex * pageSize;
    await FieldsService.find({
      project_id: id,
      $skip: skip,
      $limit: pageSize,
      project_column_id: location.state?.project_column_id,
      '$sort[created_at]': -1,
    }).then(({ data }) => {
      setDataField(data.data);
      setTotalPage(data.total);
    });
  };

  // const handleDelete = async (dataId) => {
  //   // mutate(dataId);
  //   onOpenDelete();
  // };
  const handleOpenDelete = (field) => {
    setDataDelete(field);
    onOpenDelete();
  };
  const handleOpenEdit = (field) => {
    setDataEdit(field);
    onOpenEdit();
  };

  const fetchPage = useCallback(async ({ pageIndex, pageSize }) => {
    fetchUpdate(pageIndex, pageSize);
  }, []);
  return (
    <Box p="75px 1rem" minH="100vh">
      <Card
        sx={{
          width: '100%',
          borderRadius: '20px',
          p: '1rem',
        }}
      >
        <CardHeader mb="24px">
          <Flex direction="row" alignItems="center">
            <Flex direction="column">
              <Text color={textColor} fontSize="lg" fontWeight="bold" mb="6px">
                Data Field Kanban
              </Text>
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                Kamu dapat menambah, mengedit dan menghapus data field
              </Text>
            </Flex>
            <Spacer />
            <Button
              bg={ColorProps['primary.1']}
              color="#fff"
              fontWeight={500}
              _hover={{
                opacity: '0.7',
                borderColor: ColorProps['secondary.1'],
              }}
              onClick={onOpen}
            >
              Tambah Field
            </Button>
          </Flex>
        </CardHeader>
        {isLoading && !isFetched ? (
          <SkeletonTable dataColumns={columnProjectSetting} />
        ) : (
          <TableWithAction
            tableData={dataField}
            columnsData={columnProjectSetting}
            onEditClick={handleOpenEdit}
            // onDeleteClick={(id) => handleDelete(id)}
            onDeleteClick={(id) => {
              handleOpenDelete(id);
            }}
            fetchPage={fetchPage}
            totalData={totalPage}
          />
        )}
      </Card>
      <ProjectSettingAddModal
        projectColumnId={location.state?.project_column_id}
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={refetch}
      />
      {isOpenEdit && (
        <ProjectSettingEditModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          data={dataEdit}
          onCloseComplete={refetch}
        />
      )}
      {isOpenDelete && (
        <ProjectSettingDeleteModal
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          data={dataDelete}
          onCloseComplete={refetch}
          handleDeleteID={(id) => {
            mutate(id);
          }}
        />
      )}
    </Box>
  );
}
