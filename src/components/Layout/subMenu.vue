<template>
    <template v-for="item in props.menuList" :key="item.path">
        <el-sub-menu :index="item.meta.title" v-if="item.children && item.children.length != 0">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <subMenu :menuList="item.children"></subMenu>
        </el-sub-menu>

        <el-menu-item :index="item.path" v-else>
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.meta.title }}
        </el-menu-item>
    </template>
</template>

<script lang="ts" setup>

const props = defineProps(['menuList'])


</script>