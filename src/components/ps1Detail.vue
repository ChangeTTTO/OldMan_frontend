<script setup>
import {ref,onUpdated} from "vue";
import {useStore} from  '../stores/uid.js'
const UidStore = useStore();
console.log("打印一下全局登录态"+UidStore.LoginStatus)
</script>

<template>
  <div class="left">
    <h2>PS1中文游戏全集</h2>
    <div class="detailText" >
      放浪冒险谭汉化1.0版是基于官方的汉化，而1.1、1.22版在修复汉化的基础上对游戏有作微小调整，因此这三个版本均收录在合集中。<br>
      异度装甲汉化1.21版适用于模拟器，1.22版适用于实机，这两个版本也均收录在合集中。<br>
      多CD游戏按每CD一个文件压缩，只需下载CD1即可开始游戏。也因此，本合集数量指的是文件数量而非游戏数量。<br><br>
      <a href="https://pan.baidu.com/share/init?surl=Bm2sD7tZcFDdZiOE9JSOzw">下载地址(百度网盘)</a>
      <span style="color: rgb(128,128,128)">访问码：x8kr</span>

    </div>
  </div>

  <span v-if="UidStore.LoginStatus"><comment/></span>  <span v-else style="position: relative;top: 10%;color: red">评论区登录可见</span>
</template>

<style scoped>

</style>