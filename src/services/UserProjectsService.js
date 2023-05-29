import BaseApi from 'api/BaseApi';

const UserProjectService = {
  findAll: async (params = {}) => {
    return await BaseApi().get('/user-projects', {
      params,
    });
  },
  findOne: async (id, params = {}) => {
    return await BaseApi().get(`/user-projects/${id}`, {
      params,
    });
  },
  patch: async (id, payload) => {
    return await BaseApi().patch(`/user-projects/${id}`, payload);
  },
  create: async (payload, params = {}) => {
    const res = await BaseApi().post('/user-projects', payload, {
      params: {
        ...params,
      },
    });
    return res.data;
  },
  delete: async (id) => {
    return await BaseApi().delete(`/user-projects/${id}`);
  },
};

export default UserProjectService;
