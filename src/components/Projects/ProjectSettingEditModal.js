/* eslint-disable no-unused-vars */
import BaseModal from 'components/BaseModal/BaseModal';
import InputField from 'components/Forms/InputField';
import React, { useState } from 'react';
import Select from 'components/Forms/Select';
import { projectSettingOptions } from 'variables/projectSetting';
import { useFormik } from 'formik';
import { Button, FormControl, Input, ModalFooter } from '@chakra-ui/react';
import { convertToBoolean } from 'utils/convertBoolean';
import FieldsService from 'services/FieldsService';
import { useParams } from 'react-router-dom';
import { fieldTypes } from 'constants/typeFIelds';

const ProjectSettingEditModal = ({
  isOpen,
  onClose,
  onCloseComplete,
  data,
}) => {
  const formik = useFormik({
    initialValues: {
      name: data.name,
      type: data.type,
      is_add: convertToBoolean(data.is_add),
      is_detail: convertToBoolean(data.is_detail),
      is_required: convertToBoolean(data.is_required),
    },
    onSubmit: async (values) => {
      const payload = { ...values };
      try {
        await FieldsService.patch(data.id, payload);
        // alert(data);
        onClose();
        onCloseComplete();
      } catch (error) {
        console.log(error);
      } finally {
        onClose();
        alert('Success edit Field ');
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onCloseComplete();
  };
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      onCloseComplete={handleClose}
      title="Add New Field"
    >
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <InputField
            name="name"
            label="Field Name"
            placeholder="Add label project"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </FormControl>
        <Select
          name="type"
          label="Type Field"
          options={fieldTypes}
          onChange={formik.handleChange}
          value={formik.values.type}
        />

        <Select
          name="is_add"
          label="Is Add"
          options={projectSettingOptions}
          onChange={formik.handleChange}
          value={formik.values.is_add}
        />
        <Select
          name="is_detail"
          label="Is Detail"
          options={projectSettingOptions}
          onChange={formik.handleChange}
          value={formik.values.is_detail}
        />
        <Select
          name="is_required"
          label="Is Required"
          options={projectSettingOptions}
          onChange={formik.handleChange}
          value={formik.values.is_required}
        />
        <ModalFooter>
          <Button
            isLoading={formik.isSubmitting}
            loadingText="Submitting"
            colorScheme="blue"
            mr={3}
            type="submit"
          >
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Tutup
          </Button>
        </ModalFooter>
      </form>
    </BaseModal>
  );
};

export default ProjectSettingEditModal;
