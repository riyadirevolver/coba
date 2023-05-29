import {
  Box,
  Switch,
  FormControl,
  FormLabel,
  Input,
  baseStyle,
  useColorMode,
  Flex,
  Button,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react';
import BaseModal from 'components/BaseModal/BaseModal';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import React from 'react';
import UserServices from 'services/UserService';
import debounce from 'lodash.debounce';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import UserProjectService from 'services/UserProjectsService';
import { useParams } from 'react-router-dom';
import { userProjectSchema } from '../../validations/UserProjectValidations';

const createUserProject = async ({ id, payload }) => {
  return await UserProjectService.patch(id, payload);
};

const UserProjectAddModal = ({ isOpen, onClose, onCloseComplete, data }) => {
  const { colorMode } = useColorMode();

  const { project_id: projectId } = useParams();

  const searchUser = async (q, callback) => {
    await UserServices.findAll({
      ...(q && {
        'name[$like]': `%${q}%`,
      }),
    }).then(({ data }) => {
      const result = data.data.map((user) => ({
        value: user.id,
        label: user.name,
      }));
      callback(result);
    });
  };

  const userProjectMutate = useMutation(createUserProject, {
    onSuccess: (data) => {
      const message = 'success update new user project';
      alert(message);
    },
    onError: (err) => {
      console.log(err);

      alert('there was an error');
    },
  });

  const formik = useFormik({
    initialValues: {
      user_id: data.user.id,
      project_id: data.project_id,
      is_owner: data.is_owner,
      can_add_column: data.can_add_column,
      can_add_card: data.can_add_card,
    },
    validationSchema: userProjectSchema,

    onSubmit: (values, { resetForm }) => {
      try {
        userProjectMutate.mutate({ id: data.id, payload: values });
        resetForm();
        onClose();
        onCloseComplete();
      } catch (error) {
        console.log('error', error);
        alert('Somthing wrong with server');
      }
    },
  });
  const handleButtonSubmit = () => {
    const keys = Object.keys(formik.errors);
    if (formik.values.user_id === '') {
      alert(JSON.stringify('User Harus di isi'));
    }
    if (keys?.length > 0) {
      if ('user_id'.includes(keys)) {
        alert(JSON.stringify('User Harus di isi'));
      } else {
        alert(JSON.stringify(formik.errors));
      }
    }
    formik.handleSubmit();
  };

  const loadOptions = debounce(searchUser, 500);
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      title="Edit User Project"
    >
      <form onSubmit={formik.handleSubmit}>
        <FormControl mb={3}>
          <FormLabel>Add User</FormLabel>
          <AsyncSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            required={true}
            defaultValue={{
              label: data.name,
              value: data.user.id,
            }}
            onChange={({ value }) => formik.setFieldValue('user_id', value)}
            styles={{
              control: (baseStyle, state) => ({
                ...baseStyle,
                backgroundColor: colorMode === 'dark' ? '#1f2733' : '#fff',
                color: colorMode === 'dark' ? '#fff' : '#1f2733',
              }),
              option: (baseStyle, state) => ({
                ...baseStyle,
                backgroundColor: colorMode === 'dark' ? '#1f2733' : '#fff',
                color: colorMode === 'dark' ? '#fff' : '#1f2733',
                '&:hover': {
                  backgroundColor: colorMode === 'dark' ? '#fff' : '#e1e1e1',
                  color: 'black',
                },
              }),
            }}
          />
          {formik.values.user_id === '' ? (
            <FormHelperText color="red.500">
              User must be fullfield
            </FormHelperText>
          ) : null}
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Is Owner</FormLabel>
          <Switch
            name="is_owner"
            isChecked={formik.values.is_owner}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Is Can Add Column</FormLabel>
          <Switch
            name="can_add_column"
            isChecked={formik.values.can_add_column}
            onChange={formik.handleChange}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>Can Add Card</FormLabel>
          <Switch
            name="can_add_card"
            isChecked={formik.values.can_add_card}
            onChange={formik.handleChange}
          />
        </FormControl>
        <Flex
          justifyContent="flex-end"
          borderTop="1px solid gray"
          mt={3}
          pt={2}
        >
          <Button
            variant="outlined"
            fontSize="1rem"
            mr={3}
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={handleButtonSubmit}
          >
            Submit
          </Button>
        </Flex>
      </form>
    </BaseModal>
  );
};

UserProjectAddModal.propTypes = {
  isOpen: PropTypes.bool,
  projectId: PropTypes.string,
  onClose: PropTypes.func,
  onCloseComplete: PropTypes.func,
};
export default UserProjectAddModal;
