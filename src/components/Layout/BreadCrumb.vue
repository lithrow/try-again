<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="item, index in pathArr" :key="index"><a href="/">{{ item }}</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useMain } from "../../store/home";
const store = useMain()
const { path: pathArr } = storeToRefs(store)
console.log(pathArr, 123456);



</script>


