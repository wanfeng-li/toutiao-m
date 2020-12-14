<template>
  <div class='article-list'>
    <van-pull-refresh v-model="isRefreshLoading" :success-text="refreshSuccessText" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
        <!-- <van-cell  :title="article.title" /> -->
        <article-item v-for="(article,index) in list" :key="index" :article="article"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>

</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  data() {
    return {
      list: [], // 存储数据的列表
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 上一页历史请求的时间戳
      error: false, // 默认不显示加载失败
      isRefreshLoading: false, // 下拉刷新 加载中的显示 false默认不显示
      refreshSuccessText: '刷新成功',
    }
  },
  components: {
    'article-item': ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 初始化或滚动到底部会触发这个函数
    async onLoad() {
      try {
        // 1. 异步更新数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 测试错误提示是否绑定成功
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfdgdf')
        // }

        // 2. 把请求结果数据放到 list 中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据 ，将 finished 设置为 true 不再 load 加载更多
          this.finished = true
        }
      } catch (err) {
        // 发生错误 显示加载失败
        this.error = true
        // 加载效果也要关闭
        this.loading = false
      }
    },

    // 下拉刷新触发的函数
    async onRefresh() {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新 获取最新的数据 传入当前的时间戳
          with_top: 1, // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })

        // 测试错误提示是否绑定成功
        // if (Math.random() > 0.5) {
        //   JSON.parse('sfdgdf')
        // }

        // 2. 把获得到的数据追加到 list 的最前面
        const { results } = data.data
        this.list.unshift(...results)
        // 3. 设置 加载中 为 刷新成功
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.isRefreshLoading = false // 关闭下拉刷新的 loading 状态
        this.refreshSuccessText = `刷新失败`
      }
    },
  },
}
</script>

<style scoped lang='less'>
.article-list {
  //vh 根据浏览器视图 改变大小 不受父元素影响
  height: 79vh;
  overflow-y: auto;
}
</style>