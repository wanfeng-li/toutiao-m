<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- /导航栏 -->

    <!-- 登录表单 -->

    <van-form @submit="onSubmit" ref="loginFromRef">
      <van-cell-group>
        <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFromRules.mobile" type="number" maxlength="11"><i slot="left-icon" class="toutiao toutiao-shouji"></i></van-field>
        <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFromRules.code" type="number" maxlength="6">
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-count-down v-if="isCountDownShow" :time="1000 * 3 " format="ss s" @finish="isCountDownShow= false" />
            <van-button v-else native-type="button" class="send-sms-btn" round size="large" type="default" @click="onSendSms">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login } from "@/api/user.js";
export default {
  data() {
    return {
      user: {
        mobile: "13911111111", // 手机号
        code: "", // 验证码
      },
      // 验证规则
      userFromRules: {
        mobile: [
          { required: true, message: "手机号不能为空！" },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: "手机号格式错误！" },
        ],
        code: [
          { required: true, message: "验证码不能为空！" },
          { pattern: /^\d{6}$/, message: "验证码格式错误！" },
        ],
      },
      // 控制倒计时显示与否
      isCountDownShow: false,
    };
  },
  methods: {
    async onSubmit() {
      // 1. 获取表单数据
      const user = this.user;
      // 2. 验证表单数据

      // 表单验证成功后调用 在这里使用需要 this.$toast...
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 背景是否禁止用户点击
        duartion: 0, // 持续展示 toast
      });
      // 3. 提交表单数据 发起登录请求
      try {
        const res = await login(user);
        console.log("登录成功！", res);
        this.$toast.success("登录成功！");
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误！");
        } else {
          console.log("登陆失败！", err);
          this.$toast.fail("登陆失败，请稍后重试！");
        }
      }
      // 4. 根据请求的响应结果处理后续操作
    },

    async onSendSms() {
      // 1. 校验手机号
      try {
        await this.$refs.loginFromRef.validate("mobile");
      } catch (err) {
        return console.log("验证失败", err);
      }
      // 2. 倒计时效果
      this.isCountDownShow = true;
      // 3. 发送验证码
    },
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
