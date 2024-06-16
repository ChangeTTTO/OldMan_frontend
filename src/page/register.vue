<script setup lang="js">
import request from "../axios.js";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {ref} from "vue";
const router = useRouter()
let user =ref({
  email:'',
  password:''
})
async function register() {

  try {
    const response = await request.post('/user/register', {
      email: user.value.email,
      password: user.value.password,
    });
    console.log(response)
    // 登陆成功后的逻辑
    if (response.code===1){
      await router.push('/login');
      ElMessage.success("注册成功")
    }else if(response.code===0){
      ElMessage.error("该账号已被使用")
    }
  } catch (error) {
    // 处理请求错误
    ElMessage.error('请核实邮箱或密码')

  }
}
</script>

<template>
  <div class="body">
    <div class="login">
      <el-form>
        <div style="text-align: center;margin-bottom: 50px;font-size: 30px">老男人游戏网</div>

        <el-form-item  prop="pass">
          <el-input
              type="text"
              v-model="user.email"
              placeholder="账号 可随便输入"
              class="login-item input"
          />
        </el-form-item>

        <el-form-item  prop="checkPass" >
          <el-input type="text" v-model="user.password" class="login-item input"  placeholder="密码"/>
        </el-form-item>

        <el-form-item >
          <el-button style="background-color: #0665D0;color: white" @click="register" class="login-item">注册</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<style scoped>
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