import {Injectable} from "@vue-ioc/core";
import axios, {AxiosInstance, AxiosResponse} from "axios";
import {FailResult, Result, SuccessResult} from "./Result";
import {BaseApi} from "./BaseApi";

@Injectable()
export abstract class BaseAxiosApi extends BaseApi {

    protected axios: AxiosInstance =
        axios.create({
            baseURL: this.baseUrl()
        });

    constructor() {
        super();
        this.handleRequest()
        this.handleResponse()
    }

    protected result(resp: AxiosResponse): Result {
        const code = resp.data.code
        return code == "200" ?
            new SuccessResult(code, resp.data.data)
            : new FailResult(code, resp.data.msg)
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