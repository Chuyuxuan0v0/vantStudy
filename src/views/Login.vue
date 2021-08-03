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
            <van-form @submit="onSubmit">
              <van-field
                v-model="username"
                label="昵称"
                left-icon="user-o"
                clearable
                placeholder="请输入用户名"
              />
              <van-field
                v-model="password"
                clearable
                label="密码"
                type="password"
                left-icon="goods-collect-o"
                placeholder="请输入密码"
              />
              <div class="loginbt">
                <van-button type="primary" round block>登录</van-button>
                 <van-button type="default" style="top:20px" round block @click="moreOperation">更多</van-button>
                
              </div>
            </van-form>
          </van-col>
        </van-row>

        <!-- 这里是弹出层的内容 -->
         <van-popup v-model="show"  closeable round position="bottom" :style="{ height: '30%' }" >

<van-switch v-model="checked" />



         </van-popup>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
        show:false,
    };
    
  },methods:{
      moreOperation(){
          this.show = true;
      }
  }
};
</script>

<style scoped>
.logos {
  display: flex;
  justify-content: center;
  padding-top: 10%;
  padding-bottom: 10%;
}
.van-popup{
  padding-top: 80px;
}
img {
  zoom: 0.5;
}
.loginbt {
    padding: 20px;
 
}

</style>
