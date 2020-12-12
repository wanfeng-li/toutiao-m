//  用户相关请求模块

import request from '@/utils/request.js'

// 用户登录的请求
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

// 发送验证码的请求
export const getSendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`,
    })
}

