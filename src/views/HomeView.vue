<template>
    <div class="common-layout">
        <el-container>
            <el-aside :width="collapse ? '63px' : '200px'">
                <leftMenu></leftMenu>
            </el-aside>
            <el-container>
                <el-header>
                    <headerView></headerView>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

 
<script lang="ts" setup>
import leftMenu from "../components/Layout/leftMenu.vue"
import headerView from "../components/Layout/headerView.vue"
import { useMain } from "../store/home.ts";
import { storeToRefs } from "pinia";
const store = useMain()

const { collapse } = storeToRefs(store)



</script>


<style lang="scss" scoped>
.el-aside {
    background-color: #324056;
    font-size: 14px;
}
</style>