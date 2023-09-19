import http from "../utils/http";

export let getMenu = () => http.get('/api/sysUser/getMenuList')