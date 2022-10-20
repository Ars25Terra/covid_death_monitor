import {IWebService} from "../service/IWebService";
import AxiosWebService from "../service/AxiosWebService";

/**
 * Function to get current implementation of Web Request Service
 */
export function getRequestService(): IWebService {
    return AxiosWebService()
}