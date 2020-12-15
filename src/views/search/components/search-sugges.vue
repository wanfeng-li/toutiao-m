<template>
  <div class="search-sugges">
    <van-cell icon="search" v-for="(text, index) in suggestion" :key="index">
      <div
        slot="title"
        v-html="replaceHandler(text)"
        @click="$emit('search', text)"
      ></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSugges } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSugges',
  data() {
    return {
      suggestion: [],
      htmlStr: ''
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
  watch: {
    searchText: {
      //   handler(val) {
      //     // 调用方法 获取联想建议
      //     this.getSugges(val)
      //   },
      handler: debounce(function(val) {
        this.getSugges(val)
      }, 300),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getSugges(q) {
      try {
        const { data } = await getSearchSugges(q)
        this.suggestion = data.data.options
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    // 替换文本
    replaceHandler(text) {
      const str = `<span style="color:#3296fa">${this.searchText}</span>`
      // 定义一个正则 因为需要全局替换
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, str)
    },
    // 点击也要进行搜索
    onSearch(text) {}
  }
}
</script>

<style scoped lang="less"></style>
