import { observable, action, makeObservable, runInAction } from 'mobx';
import {IWebService} from "../service/IWebService";
import {getRequestService} from "../utils/Utils";
import {IAuthResponse, ICountryInfoResponse, IPostRequest} from "../models/Models";
import {COVID_API_CONTEXT} from "../utils/Consts";

/**
 * Root MobX Store
 */
export class RootStore {

    /**
     * Access Token to use with API
     */
    accessToken: string
    /**
     * Flag that data is being loaded from API
     */
    isLoading: boolean
    /**
     * List of countries for Countries Table
     */
    countries: string[]
    /**
     * Selected Country to show the Graph
     */
    currentCountry: string
    /**
     * List of data for selected Country
     */
    currentCountryGraphData: ICountryInfoResponse[]
    /**
     * Current Error message
     */
    errorText: string
    /**
     * Service to use for API requests
     */
    requestService: IWebService

    constructor() {
        makeObservable(this, {
            accessToken: observable,
            isLoading: observable,
            currentCountry: observable,
            currentCountryGraphData: observable,
            errorText: observable,

            filterCountries: action,
            authorize: action,
            setCurrentCountry: action,
            getCountries: action,
            backToCountries: action
        })

        this.accessToken = ''
        this.countries = []
        this.isLoading = false
        this.currentCountry = ''
        this.currentCountryGraphData = []
        this.errorText = ''

        this.requestService = getRequestService()
    }

    /**
     * Action to return to Countries List
     */
    backToCountries = () => {
        runInAction(() => {
            this.currentCountry = ''
            this.currentCountryGraphData = []
        })
    }

    /**
     * Action for Searching Country in Table
     */
    filterCountries = (filter: string) => {
        runInAction(() => {
            if (filter) {
                this.countries = this.countries.filter(f => f.toLowerCase().includes(filter.toLowerCase()))
            } else {
                this.getCountries()
            }
        })
    }

    /**
     * Set Current Country from Table
     */
    setCurrentCountry = (country: string) => {
        runInAction(() => this.currentCountry = country)
    }

    /**
     * Get Access Token for API and login into Application
     */
    authorize = async (): Promise<string> => {
        runInAction(() => {
            this.errorText = ''
        })
        return await getRequestService().post(
            {url: `${COVID_API_CONTEXT}/auth/providers/anon-user/login`},
            (response: IAuthResponse) => {
                runInAction(() => this.accessToken = response.data.access_token)
            },
            e => {
                runInAction(() => {
                    this.errorText = 'Unfortunately there was an error during login. Please try later.'
                    this.accessToken = ''
                })
                console.error(e)
            }
        )
    }

    /**
     * Get Graph Data for selected Country
     */
    getCountryInfo = async (country: string) => {
        runInAction(() => {
            this.isLoading = true
            this.errorText = ''
        })
        const data: IPostRequest = {
            url: `${COVID_API_CONTEXT}/graphql`,
            data: {
                query: `query { countries_summarys(query: {country: "${country}", date_gte: "2021-08-01T00:00:00Z"}, sortBy: DATE_ASC) { confirmed date deaths recovered } }`
            },
            config: {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        }
        return await getRequestService().post(
            data,
            (response) => {
                runInAction(() => {
                    this.currentCountryGraphData = response.data.data.countries_summarys
                    this.isLoading = false
                })
            },
            (e) => {
                runInAction(() => {
                    this.errorText = 'Unfortunately there was an error while getting country info. Please try later.'
                    this.currentCountryGraphData = []
                    this.isLoading = false
                })
                console.error(e)
            }

        )
    }

    /**
     * Get list of countries for Table
     */
    getCountries = async () => {
        runInAction(() => {
            this.isLoading = true
            this.errorText = ''
        })
        const data: IPostRequest = {
            url: `${COVID_API_CONTEXT}/graphql`,
            data: {
                    query: "query { metadatum { _id countries } }"
            },
            config: {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        }
        return await getRequestService().post(
            data,
            (response) => {
                runInAction(() => {
                    this.countries = response.data.data.metadatum.countries
                    this.isLoading = false
                })
            },
            (e) => {
                runInAction(() => {
                    this.errorText = 'Unfortunately there was an error while getting countries list. Please try later.'
                    this.countries = []
                    this.isLoading = false
                })
                console.error(e)
            }

        )
    }

}