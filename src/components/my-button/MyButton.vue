<template>
    <div>
        <button style="color:blue">我的按钮</button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component({})
    export default class MyButton extends Vue {
    }
</script>

<style scoped>

</style>