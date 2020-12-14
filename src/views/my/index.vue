<template>
  <div class="my-container">
    <!-- 已登录的页面 -->
    <div v-if="user" class="header ">
      <div class="user-info">
        <div class="base-info">
          <div class="left">
            <van-image class="avatar" round :src="userInfo.photo" fit="cover" />
            <span>{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 未登录的页面 -->
    <div v-else class="header">
      <div class="no-login">
        <div class="login-user" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span>登录 / 注册</span>
        </div>
      </div>
    </div>

    <!-- 宫格导航栏 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link class="mb-9" />
    <van-cell v-if="user" title="退出登录" class="logout-cell" clickable @click="onLoginOut" />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'HomeIndex',
  data() {
    return {
      userInfo: {},
    }
  },
  components: {},
  props: {},
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created() {
    // 如果用户登录了 就获取数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    onLoginOut() {
      // 退出提示  确认退出后 清除登录状态 清除user
      this.$dialog
        .confirm({
          title: '确认退出吗？',
        })
        .then(() => {
          // 清除 user
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // console.log('shibai ')
        })
    },
    // 获取用户自己的信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        // 数据更新到data中
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试！')
      }
    },
  },
}
</script>

<style scoped lang='less'>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
    .no-login {
      .login-user {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        span {
          color: #ffffff;
          font-size: 28px;
        }
        .mobile-img {
          width: 132px;
          height: 132px;
          margin: 60px 0 15px 0;
        }
      }
    }

    .user-info {
      .base-info {
        padding: 76px 32px 23px;
        box-sizing: border-box;
        height: 231px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            margin-right: 23px;
            border: 4px solid #fff;
          }
          span {
            font-size: 30px;
            color: #fff;
          }
        }
        .grid-nav {
          .toutiao-shoucang {
            color: #eb5258;
          }
        }
      }
      .data-stats {
        display: flex;
        .data-item {
          height: 130px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count {
            font-size: 36px;
          }
          span {
            font-size: 23px;
          }
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      height: 141px;
    }
    i.toutiao {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-9 {
    margin-bottom: 9px;
  }
}
</style>