import { GlobalState } from '@/types';
import { computed, inject, reactive } from 'vue'
import * as Util from '../utils'

export const globalShareSymbol = Symbol('globalShareSymbol');

// 전역상태 만들기
const authKey = Util.toStringOrNull(localStorage.getItem("authKey"))
const id = Util.toIntOrNull(localStorage.getItem("loginedMemberId"))
const email = Util.toStringOrNull(localStorage.getItem("loginedMemberEmail"))
const name = Util.toStringOrNull(localStorage.getItem("loginedMemberName"))
const address = Util.toStringOrNull(localStorage.getItem("loginedMemberAddress"))
const cellPhoneNo = Util.toStringOrNull(localStorage.getItem("loginedMemberCellPhoneNo"))
const jobPosition = Util.toStringOrNull(localStorage.getItem("loginedMemberJobPosition"))
const corpName = Util.toStringOrNull(localStorage.getItem("loginedMemberCorpName"))
const corpType = Util.toStringOrNull(localStorage.getItem("loginedMemberCorpType"))
const extra__thumbImg = Util.toStringOrNull(localStorage.getItem("loginedMemberProfileImgUrl"))
const authLevel = Util.toIntOrNull(localStorage.getItem("loginedMemberAuthLevel"))
const regDate = Util.toIntOrNull(localStorage.getItem("loginedMemberRegDate"))
const updateDate = Util.toIntOrNull(localStorage.getItem("loginedMemberUpdateDate"))

class Singleton {
  static globalState: GlobalState;
}

export const globalShare = () => {
  if( Singleton.globalState == null ) {
  const globalState: GlobalState = reactive({
    fullPath: '',
    loginedMember:{
      id,
      regDate,
      updateDate,
      authKey,
      authLevel,
      loginId:email,
      name,
      email,
      address,
      cellPhoneNo,
      jobPosition,
      corpName,
      corpType,
      extra__thumbImg
    },
    isMainLayoutVisible: computed(() => (globalState.isLogined == false && globalState.fullPath == "/main") || (globalState.isLogined == false && globalState.fullPath == "") ),
    isLogined: computed(() => globalState.loginedMember.id != null ),
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
  });
  Singleton.globalState = globalState;
  }
  
  return Singleton.globalState;
};



export const useGlobalShare = ():GlobalState => inject(globalShareSymbol) as GlobalState;

export const useGlobalStateOnOutsideOfVue = globalShare;


