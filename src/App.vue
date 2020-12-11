<template>
    <div id="app">
        <!-- 路由的出口 占位符 -->
        <router-view />
    </div>
</template>
<script>
export default {
    name: "App",
};
</script>
<style lang="less">
.box {
    width: 100px;
    height: 100px;
    background-color: greenyellow;
}
</style>
