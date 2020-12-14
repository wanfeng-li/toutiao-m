//  用户相关请求模块

import request from '@/utils/request.js'
// import store from '@/store'

// 用户登录的请求
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 发送验证码的请求  一分钟一次
export const getSendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

/**
 * 获取用户自己的信息
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user',
        // 发送请求头数据
        // headers: {
        //     // 注意：该接口需要授权才能访问
        //     // token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


// 获取用户频道列表
export const getUserChannel = () => {
    return request({
        method: 'GET',
        url: `/app/v1_0/user/channels`,
    })
}

