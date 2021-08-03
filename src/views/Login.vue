<template>
  <div id="Login">
    <van-row>
      <van-col span="24" class="titlelogos">
        <!-- 第一行，标题行 -->
        <van-row>
          <!-- logo列 -->
          <van-col span="24">
            <div class="logos">
              <img src="@/assets/logo.png" />
            </div>
          </van-col>
        </van-row>
        <!-- from登录行 -->
        <van-row>
          <van-col span="24">
            <van-form>
              <van-field
                v-model="login_form.username"
                label="昵称"
                left-icon="user-o"
                clearable
                placeholder="请输入用户名"
              />
              <van-field
                v-model="login_form.password"
                clearable
                label="密码"
                type="password"
                left-icon="goods-collect-o"
                placeholder="请输入密码"
              />
              <div class="loginbt">
                <van-button type="primary" round block @click="Login"
                  >登录</van-button
                >
                <van-button
                  type="default"
                  style="top:20px"
                  round
                  block
                  @click="moreOperation"
                  >更多</van-button
                >
              </div>
            </van-form>
          </van-col>
        </van-row>

        <!-- 这里是弹出层的内容 -->
        <van-popup
          v-model="show"
          closeable
          round
          position="bottom"
          :style="{ height: '30%' }"
        >
        </van-popup>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      show: false,
      login_form: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    moreOperation() {
      this.show = true;
    },

   async Login() {
      /*点击登录时，对表单进行预验证，通过result判断向后端发请求
      这里validate是一个异步，所以需要对他进行处理*/
      //这里设置了一个加载动画


      Toast.loading({
        message: "请稍等...",
        forbidClick: true,
      });

    
        //这里利用了es6特性，对服务器返回过来的结果进行结构和赋值
        const { data: result } = await this.$http.post(
          "login",
          this.login_form
        );
        //通过返回来的参数，判断登录是否成功或者失败
        if (result.meta.status !== 200) {
          //这里可以通过$message弹窗提示用户
          //登录失败
          Toast.fail(result.meta.msg);
        } else {
          //登录成功
          Toast.success(result.meta.msg);
          //登录动画结束

          console.log("服务器返回来的登录", result);
          //把token存入sessaion storage中
          window.sessionStorage.setItem("token", result.data.token);
          //进行路由跳转
          
        }

    },
  },
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: center;
  padding-top: 10%;
  padding-bottom: 10%;
}
.van-popup {
  padding-top: 80px;
}
img {
  zoom: 0.5;
}
.loginbt {
  padding: 20px;
}
</style>
