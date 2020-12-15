// 封装频道请求模块
import request from '@/utils/request'


// 获取所有的频道列表
export const getAllChannel = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/channels'
    })
}


// 添加频道列表请求
export const addUserChannel = (Channel) => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels: [Channel]
        }
    })
}

// 删除用户指定频道列表请求
export const deleteUserChannel = (ChannelID) => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/channels/${ChannelID}`,
    })
}



// 重置频道的请求
export const resteUserChannel = (channels) => {
    return request({
        method: 'PUT',
        url: `/app/v1_0/user/channels`,
        params: { channels: [...channels] }

    })
}