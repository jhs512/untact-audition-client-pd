import { GlobalState } from '@/types';
import { computed, inject, reactive } from 'vue'
import * as Util from '../utils'

export const globalShareSymbol = Symbol('globalShareSymbol');

// 전역상태 만들기
const authKey = localStorage.getItem("authKey")
const loginedMemberId = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const loginedMemberEmail = Util.toStringOrNull(localStorage.getItem("loginedMemberEmail"))
const loginedMemberName = Util.toStringOrNull(localStorage.getItem("loginedMemberName"))
const loginedMemberAddress = Util.toStringOrNull(localStorage.getItem("loginedMemberAddress"))
const loginedMemberCellPhoneNo = Util.toStringOrNull(localStorage.getItem("loginedMemberCellPhoneNo"))
const loginedMemberJobPosition = Util.toStringOrNull(localStorage.getItem("loginedMemberJobPosition"))
const loginedMemberCorpName = Util.toStringOrNull(localStorage.getItem("loginedMemberCorpName"))
const loginedMemberCorpType = Util.toStringOrNull(localStorage.getItem("loginedMemberCorpType"))
const loginedMemberProfileImgUrl = Util.toStringOrNull(localStorage.getItem("loginedMemberProfileImgUrl"))


export const globalShare = () => {
  if( Singleton.globalState == null ) {
  const globalState: any = reactive({
    fullPath: '',
    loginedMember:{
      authKey:'',
      authLevel:0,
      id:loginedMemberId,
      regDate:'',
      updateDate:'',
      loginId:'',
      name:loginedMemberName,
      email:loginedMemberEmail,
      address:loginedMemberAddress,
      cellPhoneNo:loginedMemberCellPhoneNo,
      jobPosition:loginedMemberJobPosition,
      corpName:loginedMemberCorpName,
      corpType:loginedMemberCorpType,
      extra__thumbImg:loginedMemberProfileImgUrl
    },
    isMainLayoutVisible: computed(() => (globalState.isLogined == false && globalState.fullPath == "/main") || (globalState.isLogined == false && globalState.fullPath == "") ),
    isLogined: computed(() => globalState.loginedMember.id !== null ),
    logout: () => {
      localStorage.removeItem("authKey");
      localStorage.removeItem("loginedMemberId");
      localStorage.removeItem("regDate");
      localStorage.removeItem("updateDate");
      localStorage.removeItem("loginedMemberLoginId");
      localStorage.removeItem("loginedMemberEmail");
      localStorage.removeItem("loginedMemberName");
      localStorage.removeItem("loginedMemberNickname");
      localStorage.removeItem("loginedMemberCellPhoneNo");
      localStorage.removeItem("loginedMemberCorpName");
      localStorage.removeItem("loginedMemberCorpType");
      localStorage.removeItem("loginedMemberJobPosition");
      localStorage.removeItem("loginedMemberAddress");
      localStorage.removeItem("loginedMemberProfileImgUrl");
      location.replace('/usr/pd/login');
    }
  })
  Singleton.globalState = globalState;
  }
  return Singleton.globalState;
}

class Singleton {
  static globalState: any;
}

export const useGlobalShare = ():any => inject(globalShareSymbol);
export const useGlobalStateOnOutsideOfVue = globalShare;

