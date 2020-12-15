<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请稍后重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false, // 控制错误提示的显示或隐藏
      page: 1, // 页码值
      perPage: 20 // 每页请求的数据
    }
  },
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页码值
          per_page: this.perPage, // 请求的数据条数
          q: this.searchText //搜索guanjianci
        })
        // 2. 将数据添加到 list 中
        const results = data.data.results
        this.list.push(...results)
        // 3. 设置加载状态结束
        this.loading = false
        // 4. 判断数据是否加载完毕
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // 失败后显示失败文字
        this.error = true
        // 也要停止 loading 状态
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
