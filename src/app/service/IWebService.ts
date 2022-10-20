/**
 * Web Service Client Interface
 */
import {IPostRequest} from "../models/Models";

export interface IWebService {

    post: (data: IPostRequest, onSuccess: (response: any) => void, onFail: (error: any) => void) => Promise<any>
    get:  (data: any, onSuccess: (response: any) => void, onFail: (error: any) => void) => Promise<any>

}