import BaseApi from 'api/BaseApi';

const UserServices = {
  findAll: async (params = {}) => {
    return await BaseApi().get('/users', {
      headers: {
        Authorization:
          'Bearer ' +
          'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzgyNDgwMDYsImV4cCI6MTc2NDY0ODAwNiwiYXVkIjoieHBpcGUiLCJpc3MiOiJoYWRpciIsInN1YiI6ImQxMDFmYjJhLWY1ZmUtNGUxNi1hMjVhLWYzZjczYTE4MTBiZSIsImp0aSI6IjI4ZGQ5MmIwLTdjZjYtNDg0ZC04MTQ5LTk1ZWJhYzJjMTA2ZCJ9.NT_qhN6HzDhYpvIdd8xCAdpTvLPVCgKWLnigHxGWZD0',
      },
      params,
    });
  },
  findOne: async (id, params = {}) => {
    return await BaseApi().get(`/users/${id}`, {
      params,
    });
  },
  create: async (payload, params = {}) => {
    const res = await BaseApi().post('/users', payload, {
      params: {
        ...params,
      },
    });
    return res.data;
  },
};

export default UserServices;
