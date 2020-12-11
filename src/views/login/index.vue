<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->

        <van-form @submit="onSubmit">
            <van-cell-group>
                <van-field
                    name="手机号"
                    placeholder="请输入手机号"
                    v-model="user.mobile"
                    ><i slot="left-icon" class="toutiao toutiao-shouji"></i
                ></van-field>
                <van-field
                    name="验证码"
                    placeholder="请输入验证码"
                    v-model="user.code"
                >
                    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                    <template #button>
                        <van-button
                            class="send-sms-btn"
                            round
                            size="large"
                            type="default"
                            >发送验证码</van-button
                        >
                    </template>
                </van-field>
            </van-cell-group>
            <div class="login-btn-wrap">
                <van-button
                    class="login-btn"
                    block
                    type="info"
                    native-type="submit"
                >
                    登录
                </van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                mobile: "", // 手机号
                code: "", // 验证码
            },
        };
    },
    methods: {
        onSubmit(values) {
            console.log(values);
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
