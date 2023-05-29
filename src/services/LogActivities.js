import BaseApi from 'api/BaseApi';

const LogActivitiesService = {
  findAll: async (params = {}) => {
    return await BaseApi().get('/log-activities', {
      params,
    });
  },

  create: async (payload, params = {}) => {
    const res = await BaseApi().post('/log-activities', payload, {
      params: {
        ...params,
      },
    });
    return res.data;
  },
};

export default LogActivitiesService;
