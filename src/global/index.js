import axios from "axios";
import { urls } from "./utils";

axios.defaults.withCredentials = true;

export const GLOBALS = {
    urls: urls,
    api_login : urls.apiHost + '/api/v1/login',
    api_logout : urls.apiHost + '/api/v1/logout',
 }