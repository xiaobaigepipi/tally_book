<template></template>
<script lang="ts" setup>
import initRouter from "./router";
import { onShow } from '@dcloudio/uni-app';
onShow(() => {
	initRouter();
})
</script>
<style>
/* #ifdef APP-PLUS-NVUE */
@import "./tmui/scss/nvue.css";
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import "./tmui/scss/noNvue.css";
/* #endif */
</style>
