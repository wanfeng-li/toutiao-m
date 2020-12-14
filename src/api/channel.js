// 封装频道请求模块
import request from '@/utils/request'


// 获取所有的频道列表
export const getAllChannel = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}