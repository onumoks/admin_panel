import AxiosService from './AxiosService';
import Config from '../config';
export { Api } from './Api';
export const Axios = {
    Server: new AxiosService(Config.ServerUrl),
    Api: new AxiosService(Config.ApiUrl)
}
