import {
  Box,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import BaseModalDelete from 'components/BaseModal/BaseModalDelete';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import { SkeletonTable } from 'components/Skeletons/SkeletonTable';
import TableWithAction from 'components/Tables/TableWithAction';
import UserProjectAddModal from 'components/UserProject/UserProjectAddModal';
import UserProjectEditModal from 'components/UserProject/UserProjectEditModal';
import React, { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import UserProjectService from 'services/UserProjectsService';
import { ColorProps } from 'theme/color';
import { columnUserProjects } from 'variables/columnUserProjects';

const onDeleteUserProject = async (id) => {
  return await UserProjectService.delete(id);
};

const UserProject = () => {
  const { project_id } = useParams();
  const textColor = useColorModeValue('gray.700', 'white');
  const [totalPage, setTotalPage] = useState(0);
  const [onLoading, setOnloading] = useState(true);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dataField, setDataField] = useState([]);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);

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

  const normalizeData = (dataUser) => {
    if (Array.isArray(dataUser) && dataUser.length > 0) {
      const newArr = [];
      for (let idx = 0; idx < dataUser.length; idx++) {
        const obj = dataUser[idx];
        const a = {};
        const keys = Object.keys(dataUser[idx]);
        for (let j = 0; j < keys.length; j++) {
          a[keys[j]] = obj[keys[j]];
          a.name = obj['user']?.name;
          a.project_name = obj['project']?.name;
          // newArr.push(a);
        }
        newArr.push(a);
      }
      return newArr;
    }
    return [];
  };
  const { data, refetch, isFetched } = useQuery(
    ['user-projects', project_id],
    async () => {
      const res = await UserProjectService.findAll({
        project_id: project_id,
        '$sort[created_at]': -1,
      });

      const newData = normalizeData(res.data.data);
      setDataField(newData);
    }
  );

  const fetchUpdate = async (pageIndex, pageSize) => {
    const skip = pageIndex * pageSize;

    await UserProjectService.findAll({
      project_id: project_id,
      $skip: skip,
      $limit: pageSize,
      project_column_id: location.state?.project_column_id,
      '$sort[created_at]': -1,
    })
      .then(({ data }) => {
        const newData = normalizeData(data.data);
        setDataField(newData);
        setTotalPage(data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { mutate } = useMutation(onDeleteUserProject, {
    onSuccess: (data) => {
      setDataDelete(null);
      onOpenDelete();
      refetch();
      alert('Delete Sukses');
    },
    onError: (err) => {
      console.log(err);
      setDataDelete(null);
      onOpenDelete();
      alert('Something from with server');
    },
  });

  const fetchPage = useCallback(async ({ pageIndex, pageSize }) => {
    fetchUpdate(pageIndex, pageSize);
  }, []);

  const handleOpenEdit = (field) => {
    setDataEdit(field);
    onOpenEdit();
  };
  const handleClickDelete = (field) => {
    setDataDelete(field);
    onOpenDelete();
  };

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
                Data User Projects
              </Text>
              <Text color="gray.400" fontSize="sm" fontWeight="normal">
                Kamu dapat menambah, mengedit dan menghapus data user
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
              Tambah User
            </Button>
          </Flex>
        </CardHeader>
        {!isFetched ? (
          <SkeletonTable dataColumns={columnUserProjects} />
        ) : (
          <TableWithAction
            tableData={dataField}
            columnsData={columnUserProjects}
            onEditClick={handleOpenEdit}
            // onDeleteClick={(id) => handleDelete(id)}
            onDeleteClick={handleClickDelete}
            fetchPage={fetchPage}
            totalData={totalPage}
          />
        )}
      </Card>
      <UserProjectAddModal
        isOpen={isOpen}
        onClose={onClose}
        onCloseComplete={refetch}
      />
      {isOpenEdit && dataEdit ? (
        <UserProjectEditModal
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          onCloseComplete={refetch}
          data={dataEdit}
        />
      ) : null}
      {isOpenDelete && dataDelete && (
        <BaseModalDelete
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          dataId={dataDelete.id}
          dataName={dataDelete.name}
          clickConfirm={mutate}
        />
      )}
    </Box>
  );
};

export default UserProject;
