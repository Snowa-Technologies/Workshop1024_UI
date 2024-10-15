import axios from "axios";
import { urls } from "./utils";

axios.defaults.withCredentials = true;

export const GLOBALS = {
    urls: urls,
    api_login : urls.apiHost + '/api/v1/login',
    api_logout : urls.apiHost + '/api/v1/logout',
    api_addcampaign : urls.apiHost + '/api/v1/campaigns/add',
    api_getcampaigns : urls.apiHost + '/api/v1/campaigns',
    api_statistics : urls.apiHost + '/api/v1/statistics'
 }