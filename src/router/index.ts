import { useGlobalStateOnOutsideOfVue } from "@/stores";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";


import * as Util from '../utils/';

import RecruitWritePage from '../pages/recruit/RecruitWritePage.vue'
import RecruitDetailPage from '../pages/recruit/RecruitDetailPage.vue'
import RecruitModifyPage from '../pages/recruit/RecruitModifyPage.vue'
import RecruitListPage from '../pages/recruit/RecruitListPage.vue'

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

import SearchPage from '../pages/search/SearchPage.vue'

import ApplicationListPage from '../pages/application/ApplicationListPage.vue'

import LandingPage from '../pages/main/LandingPage.vue'
import OpenPage from '../pages/main/OpenPage.vue'

import BottomBar from '@/components/BottomBar.vue'

const globalState = useGlobalStateOnOutsideOfVue();

const routes: Array<RouteRecordRaw>= [
  {
  path: '/',
  redirect: () => globalState.isLogined ?  '/main/home' :   '/land'
  },
  {
    path: '/land',
    component: OpenPage
  },
  {
    path: '/main/',
    component: BottomBar,
    children: [
      {
        path: 'home',
        component: LandingPage
      }
    ]
  },
  {
    path: '/usr/pd/',
    component: BottomBar,
    children: [
    {
      path: 'info',
      component: PdInfoPage,
      props: (route:any) => ( { id: route.query.id, globalState })
    }
    ]
  },
  {
    path: '/usr/pd/emailCert',
    component: JoinPdEmailCertPage,
    props: (route:any) => ( { email:route.query.email, emailCertKey:route.query.key })
  },
    {
      path: '/usr/pd/findSelect',
      component: FindSelectPage
    },
    {
      path: '/usr/pd/findLoginId',
      component: PdFindLoginIdPage
    },
    {
      path: '/usr/pd/findLoginPw',
      component: PdFindLoginPwPage
    },
  {
    path: '/usr/pd/joinTos',
    component: JoinTosPage
    },
  {
    path: '/usr/pd/join',
    component: JoinPdPage
  },
  {
    path: '/usr/pd/login',
    component: LoginPdPage
  },
  {
    path: '/usr/pd/modify',
    component: PdModifyPage
  },
  {
    path: '/usr/recruit/',
    component: BottomBar,
    children: [
      {
        path: 'search',
        component: SearchPage
      },
      {
        path: 'list',
        component: RecruitListPage
      }
    ]
  },
  {
    path: '/usr/recruit/detail',
    component: RecruitDetailPage,
    props: (route:any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
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
    path: '/usr/application/',
    component: BottomBar,
    children:[
      {
        path:'list',
        component: ApplicationListPage,
        props: (route:any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
      }
    ]
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