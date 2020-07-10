import isEmpty from "lodash-ts/isEmpty";

export default abstract class BaseApi {

    protected urlPrefix = ""

    protected abstract baseUrl(): string

    protected path(method: string): string {
        return isEmpty(this.urlPrefix) ? method : this.urlPrefix + '/' + method
    }

    protected url(method: string): string {
        let url = this.baseUrl()
        if (!url.endsWith("/")) url += "/"
        url += this.path(method)
        return url
    }
}