import BaseApi from 'api/BaseApi';

const ProjectColumnsService = {
  findAll: async (params = {}) => {
    return await BaseApi().get('/project-columns', {
      params: params,
    });
  },
  findOne: async (id, params = {}) => {
    return await BaseApi().get(`/project-columns/${id}`, {
      params: params,
    });
  },
  update: async (id, data) => {
    return await BaseApi().patch(`/project-columns/${id}`, data);
  },
  delete: async (id) => {
    return await BaseApi().delete(`/project-columns/${id}`);
  },
  reordering: async (data) => {
    return await BaseApi().post('/reordering', data);
  },
  create: async (data) => {
    return await BaseApi().post('/project-columns', data);
  },
};

export default ProjectColumnsService;
