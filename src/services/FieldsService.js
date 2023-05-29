import BaseApi from 'api/BaseApi';

const FieldsService = {
  find: async (params = {}) => {
    return await BaseApi().get('/fields', {
      params,
    });
  },
  create: async (payload, params = {}) => {
    const res = await BaseApi().post('/fields', payload, {
      params: {
        ...params,
      },
    });
    return res.data;
  },
  delete: async (id, params = {}) => {
    const res = await BaseApi().delete(`/fields/${id}`, {
      params: {
        ...params,
      },
    });
    return res;
  },
  patch: async (id, data, params = {}) => {
    const res = await BaseApi().patch(`/fields/${id}`, data, {
      params: {
        ...params,
      },
    });
    return res;
  },
};

export default FieldsService;
