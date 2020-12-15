<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button size="small" slot="title" type="info" round class="search-nav" icon="search" to="/search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <!-- 
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
      通过 swipeable 属性可以开启滑动切换标签页。
      通过 animated 属性可以开启切换标签内容时的转场动画
     -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable swipe-threshold="4">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <my-article :channel="channel"></my-article>
        <!-- /文章列表 -->
      </van-tab>
      <div slot="nav-right" class="plashodel"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道弹出层 -->
    <van-popup round closeable v-model="isChannelEditShow" position="bottom" close-icon-position="top-left" :style="{ height: '95%' }">
      <channel-edit :myChannels="channels" :active="active" @updata-active="onEditActive"></channel-edit>
    </van-popup>
    <!-- /频道弹出层 -->
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: '',
  data() {
    return {
      active: 0, // 当前选中文章的索引
      channels: [], // 文章数据列表
      isChannelEditShow: false, // 编辑频道弹框的显示与否
    }
  },
  components: {
    'my-article': ArticleList,
    ChannelEdit,
  },
  props: {},
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    this.loadUserChannel()
  },
  mounted() {},
  methods: {
    // 获取用户自己的频道
    async loadUserChannel() {
      try {
        // 优化 默认的频道和用户自己的频道都是同一个接口
        const localChannel = getItem('TOUTIAO_CHANNEL')
        // 已登录 或者 本地没有数组
        if (this.user || !localChannel) {
          // 1. 已登录 获取用户自己的频道
          const { data } = await getUserChannel()
          this.channels = data.data.channels
        } else {
          this.channels = localChannel
        }
        // 2. 未登录 从本地存储里面取数据
        // 3. 如果本地有数据 就取出来
        // 4. 本地没有数据 就获取默认的数据
      } catch (err) {
        // console.log(err)
      }
    },
    onEditActive(index, isChannelEditShow) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    },
  },
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 94px;
  padding-bottom: 100px;
  .search-nav {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
  }
  .van-icon {
    font-size: 32px;
    color: #ffffff;
  }
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  /deep/.channel-tabs {
    .van-tabs_wrap {
      position: fixed;
      top: 100px;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tabs__nav {
      padding: 0;
      position: fixed !important;
      z-index: 1 !important;
      height: 86px;
      left: 0;
      right: 0;
    }
    .van-tab {
      font-size: 30px;
      min-width: 200px !important;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .plashodel {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        position: absolute;
        left: 0;
        content: '';
        height: 100%;
        width: 1px;
        background: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }

    .van-tabs__line {
      width: 31px !important;
      bottom: 8px;
      height: 6px;
      background-color: #3296fa;
      transform: translateX(-50%) translateX(-50%);
      transition-duration: 0.3s;
    }
    .van-tab--active {
      color: #333;
    }
  }
}
</style>
