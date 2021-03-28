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

export const globalShare:any = reactive({
  fullPath: '',
  loginedMember:{
    authKey,
    id:loginedMemberId,
    name:loginedMemberName,
    email:loginedMemberEmail,
    address:loginedMemberAddress,
    cellPhoneNo:loginedMemberCellPhoneNo,
    jobPosition:loginedMemberJobPosition,
    corpName:loginedMemberCorpName,
    corpType:loginedMemberCorpType,
    profileImgUrl:loginedMemberProfileImgUrl
  },
  isMainLayoutVisible: computed(() => (globalShare.isLogined == false && globalShare.fullPath == "/main") || (globalShare.isLogined == false && globalShare.fullPath == "") ),
  isLogined: computed(() => globalShare.loginedMember.id !== null ),
  logout: () => {
    localStorage.removeItem("authKey");
    localStorage.removeItem("loginedMemberId");
    localStorage.removeItem("regDate");
    localStorage.removeItem("updateDate");
    localStorage.removeItem("loginedMemberLoginId");
    localStorage.removeItem("loginedMemberName");
    localStorage.removeItem("loginedMemberNickname");
    localStorage.removeItem("loginedMemberCellphoneNo");
    localStorage.removeItem("loginedMemberEmail");

    location.replace('/usr/pd/login');
  }
});

export const useGlobalShare = ():any => inject(globalShareSymbol);

