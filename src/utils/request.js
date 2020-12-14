// 封装 axios 请求模块

import axios from "axios"
import store from '@/store'
import router from "../router";

const request = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 请求发送会经过这 config：本次请求配置对象
    const { user } = store.state
    // 根据用户登录信息判断是否要添加请求头
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${store.state.user.token}`

    }
    // 这里务必要返回 config 不然请求停留在这，并没有发出去
    // console.log(config);
    return config;
}, function (error) {
    // Do something with request error
    // 如果请求出错 （还未发出去） 进入这里
    return Promise.reject(error);
});

// 响应拦截器
request.interceptors.response.use(
    // 响应成功进入第一个
    // 该函数的参数是响应对象
    function (response) {
        return response
    },
    async function (error) {
        // 如果响应码是 401 ，则请求获取新的 token
        // 响应拦截器中的 error 就是那个响应的错误对象
        console.log(error.response);
        if (error.response && error.response.status === 401) {
            // 校验是否有token
            const user = store.state.user
            if (!user || !user.refresh_token) {
                router.push('/login')
                // 代码不往后执行
                return
            }
            // 如果有 则请求获取新的 token
            try {
                console.log('进入重新获取token');
                const { data } = await axios({
                    method: 'PUT',
                    url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
                    headers: {
                        Authorization: `Bearer ${user.refresh_token}`
                    }
                })
                console.log(data);
                // 如果获取成功 就替换token
                store.commit('setUser', {
                    token: data.data.token, // 最新的token值
                    refresh_token: user.refresh_token // 原来的refresh_token
                })
                // 把之前失败的用户请求继续发出去
                // config 是一个对象， 其中包含本次失败请求相关的那些配置 例如 url method 都有
                // ruturn 把 request 的请求结果继续返回给发请求的具体位置
                return request(error.config)
            } catch (err) {
                // 如果获取失败 就跳转登录页面
                // console.log(err);
                router.push('/login')
            }

        }
        // 使用 try 和 catch 捕获错误
        return Promise.reject(error);
        // 使用res
    }
)

export default request
