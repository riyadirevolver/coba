import BaseApi from 'api/BaseApi';

const ProjectCardService = {
  findOne: async (id) => {
    return await BaseApi().get(`/project-cards/${id}`);
  },
  create: async (data) => {
    return await BaseApi().post('/project-cards', data);
  },
  reordering: async (data) => {
    return await BaseApi().post('/reordering-cards', data);
  },
  patch: async (id, data) => {
    return await BaseApi().patch(`/project-cards/${id}`, data);
  },
  delete: async (id) => {
    return await BaseApi().delete(`/project-cards/${id}`)
  },
};

export default ProjectCardService;
