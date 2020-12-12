<template>
  <div class="my-container">
    <!-- 未登录的页面 -->
    <div class="header">
      <div class="no-login">
        <div class="login-user" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span>登录 / 注册</span>

        </div>
      </div>
    </div>

    <!-- 已登录的页面 -->
    <div class="header ">
      <div class="user-info">
        <div class="base-info">
          <div class="left">
            <van-image class="avatar" round src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover" />
            <span>我是小菜鸡</span>
          </div>
          <div class="right">
            <van-button size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">10</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">11</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">12</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">13</span>
            <span class="text">获赞</span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  data() {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
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
}
</style>