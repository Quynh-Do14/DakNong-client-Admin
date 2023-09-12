import { Endpoint } from "../../core/common/appRouter";
import request from "./makeRequest";
import * as apiLinks from "../../core/common/apiLinks";

const api = {
  login: (data) => request.login(`${apiLinks.API}${Endpoint.Auth.Login}`, data),
};
export default api;
