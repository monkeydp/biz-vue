import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ArgsIllegalResult, FailResult, Result, SuccessResult} from "./Result";
import BaseApi from "./BaseApi";
import ResultCode from "./ResultCode";

export default abstract class BaseAxiosApi extends BaseApi {

    protected axios: AxiosInstance =
        axios.create(this.axiosRequestConfig());

    constructor() {
        super();
        this.handleRequest()
        this.handleResponse()
    }

    protected axiosRequestConfig(): AxiosRequestConfig {
        return {
            baseURL: this.baseUrl()
        }
    }

    protected result(resp: AxiosResponse): Result {
        const code = resp.data.code
        switch (code) {
            case ResultCode.SUCCESS:
                return new SuccessResult(code, resp.data.data)
            case ResultCode.ARGUMENT_ILLEGAL:
                return new ArgsIllegalResult(code, resp.data.msg, resp.data.validErrors)
            default:
                return new FailResult(code, resp.data.msg)
        }
    }

    private handleRequest() {
        this.axios.interceptors.request.use(
            config => {
                config.url = this.path(config.url ?? "")
                return config
            })
    }

    private handleResponse() {
        this.axios.interceptors.response.use(
            resp => {
                if (resp.status !== 200) {
                    const failResult = new FailResult(
                        resp.status.toString(),
                        resp.statusText
                    )
                    return Promise.reject(failResult)
                }

                const res = this.result(resp)

                if (res instanceof SuccessResult) {
                    const successResult = res as SuccessResult
                    return Promise.resolve(successResult.data)
                }

                const failResult = res as FailResult
                return Promise.reject(failResult)
            })
    }
}
