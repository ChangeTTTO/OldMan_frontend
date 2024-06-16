<template>
  <div class="container">
    <header class="header">
      <router-link to="/">
        <h1 class="title">老男人游戏网</h1>
      </router-link>
      <img src="../assets/header-bg.jpg" alt="Header Image" class="header-img"/>
    </header>
    <div class="nav">
      <el-dropdown >
        <el-button class="el-button">
          家机游戏
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/ps1">PS1</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/ps1">PS2</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/ps1">PS3</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="main">
      <div>
        <RouterView></RouterView>
      </div>
      <div>
        <fixed />
      </div>
    </div>
    <footer class="footer">
      <p>&copy; 2024 老男人游戏网. All rights reserved.</p>
    </footer>
  </div>
</template>


<script lang="js" setup>

import Fixed from "../components/fixed.vue";
import {Remove, UserFilled} from "@element-plus/icons-vue";
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header {
  width: 100%;
  position: relative;
  text-align: center;
  margin: 0;
  background-color: white;
}
.header-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin: 0;
}
.title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: dodgerblue;
  font-size: 3rem;
  font-family: 'Arial', sans-serif;
  margin: 0;
}
.nav {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 15px 0;
  margin: 0 0 50px 0;
  background-color: white;
}
.nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
}
.nav li {
  margin: 0 15px;
  position: relative;
}
.nav a {
  text-decoration: none;
  font-weight: bold;
  color: blue;
}

.main {
  display: flex;
  justify-content: space-around;
  margin-left: 12%;
  margin-bottom: 5%;
}

.footer {
  background-color: #f8f8f8;
  padding: 10px;
  text-align: center;
  border-top: 1px solid #ddd;
}
.dropdown{

}
.dropdown:hover {
  border: none; /* 清除边框 */
  color: blue; /* 鼠标悬停时文本颜色变为蓝色 */
  cursor: pointer; /* 鼠标指针样式变为手形图标 */
}
</style>