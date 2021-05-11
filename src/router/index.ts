import { applicationList, useGlobalStateOnOutsideOfVue } from "@/stores";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";


import * as Util from '../utils/';

import RecruitWritePage from '../pages/recruit/RecruitWritePage.vue'
import RecruitDetailPage from '../pages/recruit/RecruitDetailPage.vue'
import RecruitModifyPage from '../pages/recruit/RecruitModifyPage.vue'
import RecruitListPage from '../pages/recruit/RecruitListPage.vue'
import RecruitAdmListPage from '../pages/recruit/RecruitAdmListPage.vue'
import RecruitAdmDetailPage from '../pages/recruit/RecruitAdmDetailPage.vue'

import JoinSelectPage from '../pages/pd/JoinSelectPage.vue'
import JoinTosPage from '../pages/pd/JoinTosPage.vue'

import JoinPdPage from '../pages/pd/JoinPdPage.vue' 
import JoinPdEmailCertPage from '../pages/pd/JoinPdEmailCertPage.vue' 
import LoginPdPage from '../pages/pd/LoginPdPage.vue'
import LoginPdKakaoPage from '../pages/pd/LoginPdKakaoPage.vue'

import PdInfoPage from '../pages/pd/PdInfoPage.vue'
import PdModifyPage from '../pages/pd/PdModifyPage.vue'
import FindSelectPage from '../pages/pd/FindSelectPage.vue'
import PdFindLoginIdPage from '../pages/pd/FindLoginIdPdPage.vue'
import PdFindLoginPwPage from '../pages/pd/FindLoginPwPdPage.vue'
import PdModifyPwPage from '../pages/pd/ModifyPwPage.vue'

import SearchPage from '../pages/search/SearchPage.vue'

import ApplicationListPage from '../pages/application/ApplicationListPage.vue'
import ApplicationDetailPage from '../pages/application/ApplicationDetailPage.vue'

import LandingPage from '../pages/main/LandingPage.vue'
import OpenPage from '../pages/main/OpenPage.vue'

import BottomBar from '@/components/BottomBar.vue'

import { getMainApi } from "@/apis";
import { watch } from "@vue/runtime-core";


const globalState = useGlobalStateOnOutsideOfVue();

const routes: Array<RouteRecordRaw>= [
  {
  path: '/',
  redirect: () => globalState.isLogined ?  '/main/home' :   '/land'
  },
  {
    path: '/land',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/main/OpenPage.vue'),
  },
  {
    path: '/main/',
    component: BottomBar,
    children: [
      {
        path: 'home',
        component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/main/OpenPage.vue'),
        props: (route: any) => ( { id: route.query.id })
      }
    ]
  },
  {
    path: '/usr/pd/',
    component: BottomBar,
    children: [
    {
      path: 'info',
      component: () => globalState.isLogined ? import('@/pages/pd/PdInfoPage.vue') : import('@/pages/main/OpenPage.vue'),
      props: (route: any) => ( { id: route.query.id, globalState })
    }
    ]
  },
  {
    path: '/usr/pd/emailCert',
    component: () => globalState.isLogined ? import('@/pages/main/OpenPage.vue') : import('@/pages/pd/JoinPdEmailCertPage.vue'),
    props: (route: any) => ( { email:route.query.email, emailCertKey:route.query.key })
  },
    {
      path: '/usr/pd/findSelect',
      component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/FindSelectPage.vue')
    },
    {
      path: '/usr/pd/findLoginId',
      component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/FindLoginIdPdPage.vue')
    },
    {
      path: '/usr/pd/findLoginPw',
      component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/FindLoginPwPdPage.vue')
    },
    {
      path: '/usr/pd/modifyPw',
      component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/ModifyPwPage.vue'),
      props: (route: any) => ( { email:route.query.email, emailKey:route.query.key })
    },
  {
    path: '/usr/pd/joinTos',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/JoinTosPage.vue'),
    },
  {
    path: '/usr/pd/join',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/JoinPdPage.vue'),
    props: (route: any) => ( { id:route.query.id })
  },
  {
    path: '/usr/pd/login',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/LoginPdPage.vue'),
  },
  {
    path: '/usr/pd/kakaoLoginForMobile',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/LoginPdKakaoPageForMobile.vue'),
    name: "kakaoLogin",
    props: true
  },
  {
    path: '/usr/pd/kakaoLogin',
    component: () => globalState.isLogined ? import('@/pages/main/LandingPage.vue') : import('@/pages/pd/LoginPdKakaoPage.vue'),
    props: (route: any) => ({ code: route.query.code })
  },
  {
    path: '/usr/pd/modify',
    component: () => globalState.isLogined ? import('@/pages/pd/PdModifyPage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ( { id: route.query.id, globalState })
  },
  {
    path: '/usr/recruit/',
    component: BottomBar,
    children: [
      {
        path: 'search',
        component: () => globalState.isLogined ? import('@/pages/search/SearchPage.vue') : import('@/pages/main/OpenPage.vue'),
      },
      {
        path: 'list',
        component: () => globalState.isLogined ? import('@/pages/recruit/RecruitListPage.vue') : import('@/pages/main/OpenPage.vue'),
      },
      {
        path: 'admList',
        component: () => globalState.isLogined ? import('@/pages/recruit/RecruitAdmListPage.vue') : import('@/pages/main/OpenPage.vue'),
        props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
      }
    ]
  },
  {
    path: '/usr/recruit/admDetail',
    component: () => globalState.isLogined ? import('@/pages/recruit/RecruitAdmDetailPage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/recruit/detail',
    component: () => globalState.isLogined ? import('@/pages/recruit/RecruitDetailPage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/recruit/write',
    component: () => globalState.isLogined ? import('@/pages/recruit/RecruitWritePage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ({ globalState })
  },
  {
    path: '/usr/recruit/modify',
    component: () => globalState.isLogined ? import('@/pages/recruit/RecruitModifyPage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/application/',
    component: BottomBar,
    children:[
      {
        path:'list',
        component: () => globalState.isLogined ? import('@/pages/application/ApplicationListPage.vue') : import('@/pages/main/OpenPage.vue'),
        props: (route: any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
      }
    ]
  },
  {
    path: '/usr/application/detail',
    component: () => globalState.isLogined ? import('@/pages/application/ApplicationDetailPage.vue') : import('@/pages/main/OpenPage.vue'),
    props: (route: any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
  }
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(process.env.BASE_URL),
  routes // short for `routes: routes`
})


router.beforeEach((to, from, next) => {
  globalState.fullPath = to.fullPath;
  
  if(to.path == '/usr/application/list'){
    if(globalState.isLogined == false){
      Util.showAlert("알림", "로그인 후 이용해주세요.", () => location.replace('/'));
      return;
    }
    const mainService = getMainApi();
    const id = Util.toIntOrNull(to.query.id);
    
    mainService.application_list(id)
    .then(axiosResponse => {
      applicationList.list = axiosResponse.data.body.applications;
    next();  
    })  
  } else {
    next();
   }
  
});

export default router