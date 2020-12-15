<template>
  <div class="search-container">
    <!-- 搜索头部导航 -->
    <!-- 
          Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
       -->
    <form class="search-from" action="/">
      <van-search
        background="#3296fa"
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- /搜索头部导航 -->
    <!-- 搜索结果 -->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    ></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-sugges
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    >
    </search-sugges>
    <!-- /联想建议 -->

    <!-- 搜索历史 -->
    <search-history v-else></search-history>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import SearchHistory from '@/views/search/components/search-history'
import SearchSugges from '@/views/search/components/search-sugges'
import SearchResult from '@/views/search/components/search-result'
export default {
  name: 'SearchIndex',
  data() {
    return {
      searchText: '',
      isResultShow: false // 控制结果的显示与隐藏
    }
  },
  components: {
    SearchHistory,
    SearchSugges,
    SearchResult
  },
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 搜索触发的事件
    onSearch(val) {
      this.searchText = val
      this.isResultShow = true
    },
    // 点击取消触发的事件
    onCancel() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 110px;
  .van-search__action {
    color: #fff;
  }
  .search-from {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
  }
}
</style>
