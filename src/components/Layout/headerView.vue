<template>
    <div class="head">
        <section class="left">
            <el-icon @click="fold" v-show="!collapse">
                <Fold />
            </el-icon>
            <el-icon @click="fold" v-show='collapse'>
                <Expand />
            </el-icon>

            <BreadCrumb></BreadCrumb>
        </section>
        <section class="right">
            <div class="avatar"></div>
        </section>
    </div>

    <div class="tab">
        <el-tabs v-model="activeName" type="card" class="demo-tabs" closable @tab-remove="removeTab"
            @tab-change="changeTab">
            <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script lang="ts" setup>
import BreadCrumb from './BreadCrumb.vue'
import { useMain } from "../../store/home.ts";
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const store = useMain()

const activeName = ref('')
watch(route, (oldVal, newVal) => {
    console.log(oldVal);
    console.log(newVal);
})

const { collapse, tabList } = storeToRefs(store)
const fold = () => {
    store.change()
}

const removeTab = (targetName: string) => {
    store.removeTab(targetName)
}

const changeTab = (targetName: string) => {
    console.log(123);
    console.log(targetName);

    store.setBoth(targetName)
    router.push(targetName)
}

</script>


<style lang="scss" scoped>
.head {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: crimson;
        padding: 0 20px;
    }

    .left {
        display: flex;
        align-items: center;

        .el-icon {
            margin-right: 20px;
            font-size: 20px;
        }
    }

    .tab {
        width: 100%;
        height: 50px;
    }
}
</style>