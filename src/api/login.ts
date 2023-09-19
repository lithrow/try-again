import http from "../utils/http";
import { loginConfig } from "../type/type";

// post请求接收三个参数
// 1.请求地址
// 2.请求参数  没有参数 又要设置请求/响应头就写成 null
// 3.设置请求/响应头  
// 设置请求头时第三个参数格式：{headers:{key:value}}
// 设置响应头时第三个参数格式：{key:value}


// 获取验证码接口
export let getCode = () => http.post('/api/sysUser/image', null, {
    // 设置响应头响应格式
    'responseType': 'arraybuffer'
})



// 登录接口
export let login = (params: loginConfig) => http.post('/api/user/login', params, {
    headers: {
        // 设置请求头
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})