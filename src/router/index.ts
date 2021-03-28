import { globalShare } from "@/stores";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";


import * as Util from '../utils/';

import WriteRecruitPage from '../pages/recruit/WriteRecruitPage.vue'
import RecruitDetailPage from '../pages/recruit/RecruitDetailPage.vue'

import JoinSelectPage from '../pages/pd/JoinSelectPage.vue'
import JoinTosPage from '../pages/pd/JoinTosPage.vue'

import JoinPdPage from '../pages/pd/JoinPdPage.vue' 
import LoginPdPage from '../pages/pd/LoginPdPage.vue'

import PdInfoPage from '../pages/pd/PdInfoPage.vue'
import PdModifyPage from '../pages/pd/PdModifyPage.vue'
import FindSelectPage from '../pages/pd/FindSelectPage.vue'
import PdFindLoginIdPage from '../pages/pd/FindLoginIdPdPage.vue'
import PdFindLoginPwPage from '../pages/pd/FindLoginPwPdPage.vue'

import MainPage from '../pages/MainPage.vue'
import OpenPage from '../pages/OpenPage.vue'

import Tabs from '../views/Tabs.vue'



const routes: Array<RouteRecordRaw>= [
  {
  path: '/',
  component: OpenPage,
  props: (route:any) => ({ globalShare })
  },
  {
    path: '/main',
    component: MainPage,
    props: (route:any) => ({ globalShare })
  },
  {
  path: '/usr/member/joinTos',
  component: JoinTosPage,
  props: (route:any) => ({ globalShare })
  },
    {
      path: '/usr/pd/info',
      component: PdInfoPage,
      props: (route:any) => ({ globalShare })
    },
    {
      path: '/usr/pd/modify',
      component: PdModifyPage,
      props: (route:any) => ({ globalShare })
  },
  {
    path: '/usr/pd/join',
    component: JoinPdPage,
    props: (route:any) => ({ globalShare })
    },
    {
      path: '/usr/pd/login',
      component: LoginPdPage,
      props: (route:any) => ({ globalShare })
    },
  {
    path: '/usr/pd/findSelect',
    component: FindSelectPage,
    props: (route:any) => ({ globalShare })
  },
  {
    path: '/usr/pd/findLoginId',
    component: PdFindLoginIdPage,
    props: (route:any) => ({ globalShare })
  },
  {
    path: '/usr/pd/findLoginPw',
    component: PdFindLoginPwPage,
    props: (route:any) => ({ globalShare })
  },
  {
  path: '/usr/recruit/write',
  component: WriteRecruitPage,
  props: (route:any) => ({ globalShare })
  },
  {
  path: '/usr/recruit/detail',
  component: RecruitDetailPage,
  props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalShare })
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  globalShare.fullPath = to.fullPath;
  next();
});

router.afterEach(() => {
  window.scrollTo({top:0, left:0});
})

export default router