import {AxiosRequestConfig} from "axios";

/**
 * Post Request Model
 */
export interface IPostRequest {
    url: string
    data?: any
    config?: AxiosRequestConfig
}

/**
 * Authorization Response Model
 */
export interface IAuthResponse {
    data: {
        access_token: string
        refresh_token: string
        user_id: string
        device_id: string
    }
}

/**
 * Country Information Response
 */
export interface ICountryInfoResponse {
    confirmed: number,
    date: string,
    deaths: number,
    recovered: number
}