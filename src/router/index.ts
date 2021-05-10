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
      props: (route: any) => ( { id: route.query.id, globalState })
    }
    ]
  },
  {
    path: '/usr/pd/emailCert',
    component: JoinPdEmailCertPage,
    props: (route: any) => ( { email:route.query.email, emailCertKey:route.query.key })
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
      path: '/usr/pd/modifyPw',
      component: PdModifyPwPage,
      props: (route: any) => ( { email:route.query.email, emailKey:route.query.key })
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
    path: '/usr/pd/kakaoLogin',
    component: LoginPdKakaoPage,
    props: (route: any) => ({ code: route.query.code })
  },
  {
    path: '/usr/pd/modify',
    component: PdModifyPage,
    props: (route: any) => ( { id: route.query.id, globalState })
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
      },
      {
        path: 'admList',
        component: RecruitAdmListPage,
        props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
      }
    ]
  },
  {
    path: '/usr/recruit/admDetail',
    component: RecruitAdmDetailPage,
    props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/recruit/detail',
    component: RecruitDetailPage,
    props: (route: any) => ({ id: Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/recruit/write',
    component: RecruitWritePage,
    props: (route: any) => ({ globalState })
  },
  {
    path: '/usr/recruit/modify',
    component: RecruitModifyPage,
    props: (route: any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
  },
  {
    path: '/usr/application/',
    component: BottomBar,
    children:[
      {
        path:'list',
        component: ApplicationListPage,
        props: (route: any) => ({ id:Util.toIntOrUnd(route.query.id), globalState })
      }
    ]
  },
  {
    path: '/usr/application/detail',
    component: ApplicationDetailPage,
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

router.afterEach(() => {
  
})


export default router