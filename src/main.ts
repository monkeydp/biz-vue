import Vue from 'vue';
import MyButton from "./components/my-button/MyButton.vue";
import BaseApi from "./api/BaseApi";
import BaseAxiosApi from "./api/BaseAxiosApi";
import {FailResult, Result, SuccessResult} from "./api/Result";

const components = [
    MyButton
]

const install = (vue: typeof Vue) => {
    components.forEach(item => {
        vue.component(item.name, item)
    })
}

export default install
export {
    MyButton
}
export {
    BaseApi, BaseAxiosApi,
    Result, SuccessResult, FailResult
}