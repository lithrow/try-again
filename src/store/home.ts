import { defineStore } from 'pinia'
import { child, tabType, hisType } from "../type/type";
// useMain  可以是 useUser、useCart 之类的名字 
// defineStore('main',{..}) 在devtools 就使用 main 这个名
export const useMain = defineStore('main', {
    // 相当于data
    state: () => {
        return {
            menuList: <child[]>[],
            num: 9999,
            collapse: false,
            path: [],
            url: '',
            tabList: [{
                name: '/welcome',
                title: '首页'
            }],
            historyList: <hisType[]>[],
            pathObj: <{ path: string } | null>null
        }
    },
    getters: {

    },
    actions: {
        setList(arr: any) {
            if (this.menuList.length === 0) {
                this.menuList = arr
            }
        },
        change() {
            this.collapse = !this.collapse
        },
        setPath(arr: any) {
            if (arr.length > 1) {
                this.path = arr
            } else {
                this.path = []
            }
        },
        setUrl(str: string) {
            this.url = str
        },
        setTabs(obj: tabType) {
            if (!this.tabList.some(item => item.name == obj.name)) {
                this.tabList.push(obj)
            }
        },
        removeTab(name: string) {
            let index = this.tabList.findIndex(item => item.name === name)
            this.tabList.splice(index, 1)
        },
        setHistory(obj: hisType) {
            if (!this.historyList.some(item => item.url === obj.url)) {
                this.historyList.push(obj)
            }
        },
        setBoth(name: string) {
            let index = this.historyList.findIndex(item => item.url === name)
            if (index != -1) {
                this.setUrl(this.historyList[index].url)
                this.setPath(this.historyList[index].path)

            }
        },
        setPathObj(obj: { path: string }) {
            this.pathObj = obj
        }
    },
    persist: true
})


