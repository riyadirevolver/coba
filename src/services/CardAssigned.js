import BaseApi from 'api/BaseApi';

const CardAssigned = {
  findAll: async (params = {}) => {
    return await BaseApi().get('/card-assigneds', {
      params,
    });
  },
  findOne: async (id, params = {}) => {
    return await BaseApi().get('/card-assigneds', {
      params,
    });
  },
  create: async (payload, params = {}) => {
    const res = await BaseApi().post('/card-assigneds', payload, {
      params: {
        ...params,
      },
    });
    return res.data;
  },
};

export default CardAssigned;
