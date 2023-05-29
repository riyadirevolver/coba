import BaseApi from "api/BaseApi";

const ProjectsService = {
  findAll: async (params = {}) => {
    return await BaseApi().get("/projects", {
      params: params,
    });
  },
  create: async (data) => {
    return await BaseApi().post("/projects", data);
  },
  update: async (data, id) => {
    return await BaseApi().patch(`/projects/${id}`, data);
  },
};

export default ProjectsService;
