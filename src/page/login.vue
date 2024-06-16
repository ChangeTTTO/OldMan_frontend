<template>

  <div class="body">
    <div class="login">
      <el-form>
        <div style="text-align: center;margin-bottom: 50px;font-size: 30px">老男人游戏网</div>

        <el-form-item  prop="pass">
          <el-input  type="text" v-model="user.email" placeholder="账号" class="login-item input"/>
        </el-form-item>

        <el-form-item  prop="checkPass" >
          <el-input type="password" v-model="user.password" class="login-item input"  placeholder="密码"/>
        </el-form-item>

        <el-form-item >
          <el-button style="background-color: #0665D0;color: white" @click="login" class="login-item">登录</el-button>
        </el-form-item>
        <router-link to="/register"><el-button style="background-color: #0665D0;color: white" class="login-item">注册</el-button></router-link>
      </el-form>

    </div>
  </div>


</template>

<script lang="js" setup>
import {nextTick, ref} from "vue";
import request from "../axios.js";
 import {useRouter} from "vue-router";
 import {ElMessage} from "element-plus";
import {useStore} from  '../stores/uid.js'
const UidStore = useStore();
 const router = useRouter()
 let user=ref({
    email:'',
    password:''
 })
 async function login() {
   try {
     const response = await request.post('/user/login', {
       email: user.value.email,
       password: user.value.password,
     });
    console.log(response.data.id)
     // 登陆成功后的逻辑
      if (response.data.id){
        localStorage.setItem('uid',response.data.id)
        await router.push('/');
        ElMessage.success("登录成功")
        UidStore.LoginStatus=true
      }

   } catch (error) {
     // 处理请求错误
     ElMessage.error('请核实邮箱或密码')

   }
 }

</script>
<style>
.body{
  background-color: #E8EAF2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login{
  background-color: white;
  width: 450px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-item{
  width: 400px;
  height: 40px;
}
input::placeholder {
  text-indent: 10px; /* 根据需要调整缩进的距离 */
}
/* 使用 text-indent 来调整光标位置 */
input {
  padding: 0;
  text-indent: 10px; /* 根据需要调整缩进的距离 */
}
</style>