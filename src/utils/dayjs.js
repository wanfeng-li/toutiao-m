import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

// 默认是英文， 这里全局配置为中文
dayjs.locale('zh-cn') // 全局使用
// console.log(dayjs().format('YYYY-MM-DD hh-mm-ss'));

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 定义一个全局过滤器 这样每个组件都能使用了  （仅供模板使用） 处理相对时间
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})