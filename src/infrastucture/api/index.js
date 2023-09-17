import { Endpoint } from "../../core/common/appRouter";
import request from "./makeRequest";
import * as apiLinks from "../../core/common/apiLinks";

const api = {
  login: (data, setLoading) => request.login(`${apiLinks.API}${Endpoint.Auth.Login}`, data, setLoading),
  /////
  getAllTour: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Tour}?${params}`, setLoading),
  getTourById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Tour}/${params.id}`, setLoading),
  createTour: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Tour}`, data, callBack, setLoading)
  },
  updateTour: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.Tour}/${data.id}`, data, callBack, setLoading)
  },
  deleteTour: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Tour}/${data.id}`, data, callBack, setLoading)
  },
  /////

  /////
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
  /////

  /////
  getAllCategory: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Category}?${params}`, setLoading),
  getCategoryById: (params, setLoading) =>
    request.get(`${apiLinks.API}${Endpoint.Module.Category}/${params.id}`, setLoading),
  createCategory: (data, callBack, setLoading) => {
    request.post(`${apiLinks.API}${Endpoint.Module.Category}`, data, callBack, setLoading)
  },
  updateCategory: (data, callBack, setLoading) => {
    request.put(`${apiLinks.API}${Endpoint.Module.Category}/${data.id}`, data, callBack, setLoading)
  },
  deleteCategory: (data, callBack, setLoading) => {
    request.delete(`${apiLinks.API}${Endpoint.Module.Category}/${data.id}`, data, callBack, setLoading)
  },
  /////

};
export default api;
