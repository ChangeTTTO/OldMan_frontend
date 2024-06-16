<template>
  <u-comment :config="config" upload @submit="submit" @like="like" @operate="operate" ref="commentRef" relative-time>
    <!-- <div>导航栏卡槽</div> -->
    <!-- <template #info>用户信息卡槽</template> -->
    <!-- <template #card>用户信息卡片卡槽</template> -->
    <template #operate="scope">
      <Operate :comment="scope" @remove="remove" />
    </template>
  </u-comment>
</template>

<script setup lang="ts">
// 下载表情包资源emoji.zip https://gitee.com/undraw/undraw-ui/releases/tag/v0.0.0
// static文件放在public下,引入emoji.ts文件可以移动assets下引入,也可以自定义到指定位置
import emoji from '../assets/emoji'
import { reactive, ref,onMounted } from 'vue'
import {
  CommentApi,
  ConfigApi,
  SubmitParamApi,
  UToast,
  createObjectURL,
  throttle,
  CommentInstance,
  UserApi
} from 'undraw-ui'
import axios from "../axios";

let uid = localStorage.getItem('uid');
const pageNum = 1;
const pageSize = 10;
const articleId = 1;
let loginUser =ref({})
//获取评论列表以及用户列表
onMounted(async () => {

  try {
    const response = await axios.get(`/comment/page/${pageNum}/${pageSize}`, {
      params: {articleId}  //如何取到parentId？
    })
    config.comments = response.data // 假设返回的数据结构为 { data: { data: [评论列表] } }
  } catch (error) {
    console.error('获取评论列表失败:', error)
  }
  //获取登录用户信息
  try {
     const res = await axios.get(`/user/${uid}`)
    loginUser.value=res.data
    console.log(loginUser.value.id)
    config.user.id=loginUser.value.id;
    config.user.username=loginUser.value.username
    config.user.avatar=loginUser.value.avatar;
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})
//将登陆人信息展示到评论区
const config = reactive<ConfigApi>(<ConfigApi>{
  user: {
    id: loginUser.value.id,
    username: loginUser.value.username,
    avatar: loginUser.value.avatar,
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds:[1,2,3],
  },
  emoji: emoji,
  comments: [],
})

const commentRef = ref<CommentInstance>()

// 删除评论
const remove = (comment: CommentApi) => {
  const resp = axios.delete(`/comment/remove/${comment.id}`);
  setTimeout(() => {
    commentRef.value?.remove(comment)
  }, 200)
}

const _throttle = throttle((type: string, comment: CommentApi, finish: Function) => {

  switch (type) {
    case '删除':
      alert(`删除成功: ${comment.id}`)
      finish()
      break
    case '举报':
      alert(`举报成功: ${comment.id}`)
      break
  }
})

const operate = (type: string, comment: CommentApi, finish: Function) => {
  _throttle(type, comment, finish)
}
const createTime = new Date().toISOString();  // 2024-06-12T20:22:17.040Z
const date = new Date(createTime);

// 格式化日期时间
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');  // 月份从0开始，因此需要加1
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');
// 拼接成所需格式
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

let temp_id = 100
// 提交评论事件
const  submit = async ({ content, parentId, files, finish }: SubmitParamApi) => {
  console.log('提交评论: ' + content, parentId, files)

    // 发送 JSON 格式的 POST 请求到后端
    const res = await axios.post(`/comment/save`, {
      uid:uid,
      articleId:1,
      content:content,
      parentId:parentId,
      files:null
    }
    );
  console.log("打印看一下"+res.data.user)
    /**
     * 上传文件后端返回图片访问地址，格式以'||'为分割; 如:  '/static/img/program.gif||/static/img/normal.webp'
     */
    let contentImg = files?.map(e => createObjectURL(e)).join('||')
    const comment: CommentApi = {
      content: content,
      createTime:res.data.createTime,
      id: res.data.id,
      parentId: res.data.parentId,
      uid: res.data.user.id,
      user: res.data.user,
      address:res.data.address
      //获取当前发评人的评论展示到网页上

      /*id: String(temp_id),
      parentId: parentId,
      uid: uid,
      content: content,
      likes: 0,
      createTime: formattedDate,
      contentImg: contentImg,
      user: {
        username: config.user.username,
        avatar: config.user.avatar,
        level: 6,
        homeLink: `/${temp_id}`
      },
      reply: null*/
    }
    setTimeout(() => {
      finish(comment)
      UToast({message: '评论成功!', type: 'info'})
    }, 200)
  }

// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const  like = async (id: string, finish: () => void) => {
  console.log('点赞: ' + id)
  // 构建请求体
  const requestBody = {
    commentId:id,
    uid: config.user.id,
  }; // 确保 commentId 为整数类型
  // 发送 POST 请求到后端
  const response = await axios.post('/comment/liked', requestBody);

  setTimeout(() => {
    finish()
  }, 200)
}


</script>