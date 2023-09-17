import { Endpoint } from "../../core/common/appRouter";
import request from "./makeRequest";
import * as apiLinks from "../../core/common/apiLinks";

const api = {
  login: (data, setLoading) => request.login(`${apiLinks.API}${Endpoint.Auth.Login}`, data, setLoading),

  getAllTour: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Tour}?${params}`, setLoading),

  getAllUser: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.User}?${params}`, setLoading),
  getUserById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.User}/${params.id}`, setLoading),
  createUser: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.User}`, data, callBack, setLoading)
  },
  updateUser: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.User}/${data.id}`, data, callBack, setLoading)
  },
  deleteUser: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.User}/${data.id}`, data, callBack, setLoading)
  },
};
export default api;
