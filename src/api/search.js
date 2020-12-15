import request from '@/utils/request'

// 获取联想建议请求
export const getSearchSugges = q => {
    return request({
        method: 'GET',
        url: "/app/v1_0/suggestion",
        params: {
            q
        }

    })
}

// 获取搜索结果请求
export const getSearchResult = params => {
    return request({
        method: 'GET',
        url: "/app/v1_0/search",
        params
    })
}