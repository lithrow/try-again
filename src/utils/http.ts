import axios from "axios";
import { ElMessage } from 'element-plus'

const http = axios.create({
    baseURL: 'http://119.45.133.128:8098',
    timeout: 6000
})


// 请求拦截
http.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    if (token) {
        config.headers.token = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


// 响应拦截
http.interceptors.response.use((res) => {
    return res
}, (error) => {
    error.data = {};
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.data.msg = '错误请求';
                ElMessage.error(error.data.msg)
                break
            case 401:
                error.data.msg = '未授权，请重新登录';
                ElMessage.error(error.data.msg)
                break
            case 403:
                error.data.msg = '拒绝访问';
                ElMessage.error(error.data.msg)
                break
            case 404:
                error.data.msg = '请求错误,未找到该资源';
                ElMessage.error(error.data.msg)
                break
            case 405:
                error.data.msg = '请求方法未允许';
                ElMessage.error(error.data.msg)
                break
            case 408:
                error.data.msg = '请求超时';
                ElMessage.error(error.data.msg)
                break
            case 500:
                error.data.msg = '服务器端出错';
                ElMessage.error(error.data.msg)
                break
            case 501:
                error.data.msg = '网络未实现';
                ElMessage.error(error.data.msg)
                break
            case 502:
                error.data.msg = '网络错误';
                ElMessage.error(error.data.msg)
                break
            case 503:
                error.data.msg = '服务不可用';
                ElMessage.error(error.data.msg)
                break
        }
    }

}





)

export default http