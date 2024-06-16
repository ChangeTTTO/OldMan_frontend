<script lang="js" setup>
import axios from "../axios.js";
import {onMounted,ref} from 'vue'
import request from "../axios.js";
import {ElMessage} from "element-plus";
import router from "../router/index.js";
import {useStore} from  '../stores/uid.js'
const UidStore = useStore();
let uid = ref();
let status = ref(0);
var item = localStorage.getItem('uid');
onMounted(()=>{
  if (item>0){
    uid.value=item
  }
})

async function logout() {
  try {
    // 发送 POST 请求
    const result = await axios.get(`user/logout/${uid.value}`);
    if (result.code===1){
      localStorage.removeItem('uid');
      ElMessage.success("退出登录")
      uid.value=0
      status.value=1;
      UidStore.LoginStatus=false
    }else {
      alert("发生了异常，请重试")
    }
    // 处理结果
  } catch (error) {
    // 处理错误
  }

}
async function login() {
      status.value=0
}
</script>

<template>
  <div class="card">
    <hr class="hr">
    <h2>本站说明</h2>
    <ul>
      <li>本站是一个非商业性网站，没有广告，没有渣渣辉，没有一刀99级,仅设置部分页面注册可见，以此平衡全站支出，其他页面无需注册即可下载。</li>
      <li>若您喜欢本站，可以注册个会员支持一下，也免得本站存活得如此艰苦。</li>
    </ul>
    <div class="links">
      <router-link to="/register">注册</router-link>|
      <span v-if="uid>0" @click="logout" style="cursor: pointer;color: #1e90ff">登出</span>
      <span v-else @click="login"><router-link to="/login">登录</router-link></span>
    </div>

    <hr class="hr">
    <div class="faq">
      <h3>FAQ</h3>
      <p>解压失败或密码错误？</p>
      <p>为什么选择这两个网盘？</p>
      <p>无法下载？</p>
      <p>下载速度慢？</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  left: 10%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 50%;
}
.card h2, .card h3 {
  margin-top: 0;
}
.card ul {
  padding-left: 20px;
}
.card ul li {
  margin-bottom: 10px;
}
.card .links {
  margin-top: 20px;
}
.card .links a {
  color: dodgerblue;
  text-decoration: none;
  margin-right: 10px;
}

.card hr {
  margin: 20px 0;
}
.card .faq p {
  margin: 5px 0;
}
</style>