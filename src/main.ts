import Vue from 'vue';
import MyButton from "./components/my-button/MyButton.vue";

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