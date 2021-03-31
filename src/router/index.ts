import { useGlobalStateOnOutsideOfVue } from "@/stores";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";


import * as Util from '../utils/';

import RecruitWritePage from '../pages/recruit/RecruitWritePage.vue'
import RecruitDetailPage from '../pages/recruit/RecruitDetailPage.vue'
import RecruitModifyPage from '../pages/recruit/RecruitModifyPage.vue'

import JoinSelectPage from '../pages/pd/JoinSelectPage.vue'
import JoinTosPage from '../pages/pd/JoinTosPage.vue'

import JoinPdPage from '../pages/pd/JoinPdPage.vue' 
import JoinPdEmailCertPage from '../pages/pd/JoinPdEmailCertPage.vue' 
import LoginPdPage from '../pages/pd/LoginPdPage.vue'

import PdInfoPage from '../pages/pd/PdInfoPage.vue'
import PdModifyPage from '../pages/pd/PdModifyPage.vue'
import FindSelectPage from '../pages/pd/FindSelectPage.vue'
import PdFindLoginIdPage from '../pages/pd/FindLoginIdPdPage.vue'
import PdFindLoginPwPage from '../pages/pd/FindLoginPwPdPage.vue'

import MainPage from '../pages/MainPage.vue'
import OpenPage from '../pages/OpenPage.vue'



const globalState = useGlobalStateOnOutsideOfVue();

const routes: Array<RouteRecordRaw>= [
  {
  path: '/',
  component: () => globalState.isLogined ? import ('@/pages/MainPage.vue') : import('@/pages/OpenPage.vue') ,
  props: (route:any) => ({ globalState })
  },
  {
    path: '/main',
    component: () => globalState.isLogined ? import ('@/pages/MainPage.vue') : import('@/pages/OpenPage.vue'),
    props: (route:any) => ({ globalState })
  },
  {
  path: '/usr/member/joinTos',
  component: JoinTosPage,
  props: (route:any) => ({ globalState })
},
  {
    path: '/usr/pd/info',
    component: PdInfoPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/modify',
    component: PdModifyPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/join',
    component: JoinPdPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/emailCert',
    component: JoinPdEmailCertPage,
    props: (route:any) => ( { email:route.query.email, emailCertKey:route.query.key, globalState })
  },
  {
    path: '/usr/pd/login',
    component: LoginPdPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/findSelect',
    component: FindSelectPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/findLoginId',
    component: PdFindLoginIdPage,
    props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/pd/findLoginPw',
    component: PdFindLoginPwPage,
    props: (route:any) => ({ globalState })
  },
  {
  path: '/usr/recruit/write',
  component: RecruitWritePage,
  props: (route:any) => ({ globalState })
  },
  {
    path: '/usr/recruit/modify',
    component: RecruitModifyPage,
    props: (route:any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
    },
  {
  path: '/usr/recruit/detail',
  component: RecruitDetailPage,
  props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  globalState.fullPath = to.fullPath;
  next();
});

router.afterEach(() => {
  window.scrollTo({top:0, left:0});
})

export default router