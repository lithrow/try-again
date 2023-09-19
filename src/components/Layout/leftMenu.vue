<template>
    <header></header>
    <el-menu router active-text-color="#ffd04b" background-color="#324056" class="el-menu-vertical-demo"
        :default-active="$route.path" text-color="#fff" :collapse="collapse" :collapse-transition="false" @select="getPath">

        <el-menu-item index="/welcome">
            <el-icon>
                <House />
            </el-icon>
            <span>首页</span>
        </el-menu-item>
        <subMenu :menuList="menuList"></subMenu>
    </el-menu>
</template>


<script lang="ts" setup>
import { onMounted } from "vue";
import { getMenu } from "../../api/home.ts";
import { useMain } from "../../store/home.ts";
import { child, menuType, tabType } from "../../type/type";
import subMenu from './subMenu.vue'
import { storeToRefs } from "pinia";
const menuList = ref(<menuType[]>[])
const store = useMain()

const { collapse, menuList: leafList } = storeToRefs(store)
const getMenuFn = async () => {
    let { data: res } = await getMenu()
    // 使用方法创建pinia实例 store
    const store = useMain()
    getLeaf(res.data)
    // 调用store中的方法 setlist  将获取到的数据存储到pinia里/
    store.setList(newarr)
    menuList.value = res.data
}
const getPath = (index: string, indexPath: string[]) => {
    console.log(index, indexPath);
    let str = ''
    leafList.value.forEach(item => {
        if (item.path == indexPath[indexPath.length - 1]) {
            str = item.meta.title
            console.log(item.meta.title);
        }
    });
    store.setUrl(indexPath[indexPath.length - 1])
    if (str != '') {
        indexPath.splice(indexPath.length - 1, 1, str)
    }
    console.log(indexPath, 9999);

    store.setPath(indexPath)
    let obj = <tabType>{
        name: index,
        title: str
    }
    store.setTabs(obj)
    console.log(store.tabList);

    store.setHistory({
        url: index,
        path: indexPath
    })

    store.setPathObj({ path: index })



}

onMounted(() => {

    getMenuFn()
})

let newarr = <child[]>[]
function getLeaf(arr: menuType[]) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
            getLeaf(arr[i].children as child[])
        } else {
            newarr.push(arr[i])
        }
    }
}
</script>


<style lang="scss" scoped>
header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #000
}

.el-icon {
    color: #fff;
    vertical-align: middle;
}
</style>
