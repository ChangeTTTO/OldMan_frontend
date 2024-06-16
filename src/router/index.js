import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "../page/HomePage.vue";
import HomeActive from "../components/homeActive.vue";
import ps1Detail from "../components/ps1Detail.vue";
import ps1 from "../components/ps1.vue";
import login from "../page/login.vue";
import register from "../page/register.vue";
const routes = [
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '',
        component: HomeActive
      },
      {
        path: 'ps1',
        component: ps1,
      },
      {
        path: 'ps1/detail',
        component: ps1Detail
      }
    ],

  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/register',
    component: register
  },
]
const router = createRouter({
  history: createWebHistory('/'),
  routes
})
export default router
