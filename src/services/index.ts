import { getMainApi, MainApi } from "@/apis";
import { inject } from "@vue/runtime-core";


export class MainService {
  private mainApi: MainApi;
  
  constructor(){
    this.mainApi = getMainApi();
  }

  pd_doJoin(name: string, regNumber: string, gender: string, cellPhoneNo: string, email: string, address: string, jobPosition: string, loginPw: string) {
    return this.mainApi.pd_doJoin(name, regNumber, gender, cellPhoneNo ,email, address, jobPosition, loginPw );
  }

  pd_emailDupCheck(email: string) {
    return this.mainApi.pd_emailDupCheck(email);
  }

  pd_sendEmail(email: string) {
    return this.mainApi.pd_sendEmail(email);
  }
  
  pd_emailCert(email: string, key: string) {
    return this.mainApi.pd_emailCert(email, key);
  }

  pd_checkEmailCertificated(email: string) {
    return this.mainApi.pd_checkEmailCertificated(email);
  }

  pd_doLogin( email: string, loginPw: string) {
    return this.mainApi.pd_doLogin(email, loginPw);
  }
  pd_doLogout() {
    return this.mainApi.pd_doLogout();
  }
  pd_doKakaoLogin( code: string ) {
    return this.mainApi.pd_doKakaoLogin(code);
  }

  pd_doModify( loginedMemberId: string, name: string, loginPw: string, address: string, cellPhoneNo: string, jobPosition: string, corpName: string, artwork: string, isFileUploaded: boolean ) {
    return this.mainApi.pd_doModify(loginedMemberId, name, loginPw, address, cellPhoneNo, jobPosition, corpName, artwork, isFileUploaded );
  }
  pd_deleteProfileImg ( loginedMemberId: string ) {
    return this.mainApi.pd_deleteProfileImg(loginedMemberId);
  }
  pd_update(loginedMemberId: string) {
    return this.mainApi.pd_update(loginedMemberId);
  }
  pd_doFindLoginId( name: string, regNumber: string ) {
    return this.mainApi.pd_doFindLoginId(name, regNumber);
  }
  pd_doFindLoginPw( email: string, regNumber: string ) {
    return this.mainApi.pd_doFindLoginPw(email,regNumber);
  }
  pd_doModifyPw( email: string, regNumber: string, loginPw: string ) {
    return this.mainApi.pd_doModifyPw(email,regNumber,loginPw);
  }
  pd_doDelete( loginedMemberId: number , loginedMemberType:String) {
    return this.mainApi.pd_doDelete(loginedMemberId, loginedMemberType);
  }
  pd_showDetail( loginedMemberId: string ){
    return this.mainApi.pd_showDetail(loginedMemberId);
  }
  pd_getArtwork( loginedMemberId: string ){
    return this.mainApi.pd_getArtwork(loginedMemberId);
  }
  pd_deleteArtwork( artworkId: number ) {
    return this.mainApi.pd_deleteArtwork(artworkId);
  }
  recruit_write(memberTypeCode: string, memberId: number, boardId: number, rmTitle: string, rmBody: string, rmRoleType: string, rmPay: string, rmLocation: string, rmPeriod: string, rmDeadline: string, rmGender: string, rmAge: [], rmScript: string, rmVideoTime: string, rmEtc: string,
    awMedia: string, awName: string, awDirector: string, awCorp: string, awProducer: string, awManager: string, awGenre: string, awStory: string, awWriter: string, awEtc: string,
    arRealName: string, arName: string, arAge: string, arGender: string, arJob: string, arScript: string, arScenesCount: string, arShootingsCount: string, arCharacter: string, arEtc: string, 
    genFileIdsStr: string) {
    return this.mainApi.recruit_write(memberTypeCode, memberId, boardId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awName, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, genFileIdsStr);
  }
 
  recruit_modify(recruitmentId: number, memberId: number, rmTitle: string, rmBody: string, rmRoleType: string, rmPay: string, rmLocation: string, rmPeriod: string, rmDeadline: string, rmGender: string, rmAge: [], rmScript: string, rmVideoTime: string, rmEtc: string,
    awMedia: string, awTitle: string, awDirector: string, awCorp: string, awProducer: string, awManager: string, awGenre: string, awStory: string, awWriter: string, awEtc: string,
    arRealName: string, arName: string, arAge: string, arGender: string, arJob: string, arScript: string, arScenesCount: string, arShootingsCount: string, arCharacter: string, arEtc: string, 
     isFileUploaded: boolean) {
    return this.mainApi.recruit_modify(recruitmentId, memberId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awTitle, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, isFileUploaded );
  }
  
  recruit_list(limit: number|null,keyword: []|null) {
    return this.mainApi.recruit_list(limit,keyword);
  }
  recruit_listByMemberId(id: number){
    return this.mainApi.recruit_listByMemberId(id);
  }
  recruitByKeyword(keyword: string){
    return this.mainApi.recruitByKeyword(keyword);
  }
  recruit_detail(id: number) {
    return this.mainApi.recruit_detail(id);
  }
  application_list(id: number, loginedMemberId:number){
    return this.mainApi.application_list(id,loginedMemberId);
  }
  application_detail(id: number, loginedMemberId:number){
    return this.mainApi.application_detail(id,loginedMemberId);
  }
  application_select(applicationId: number){
    return this.mainApi.application_select(applicationId);
  }
  application_fail(applicationId: number){
    return this.mainApi.application_fail(applicationId);
  }
  application_like(applicationId: number, memberId: number){
    return this.mainApi.application_like(applicationId, memberId);
  }
  application_cancelLike(loginedMemberId: string, applicationId: number, memberId: number){
    return this.mainApi.application_cancelLike(loginedMemberId, applicationId, memberId);
  }
  ap_list(recruitId: number){
    return this.mainApi.ap_list(recruitId);
  }

  common_recruit_genFile_doUploadForAdd(file: File) {
    const formDate = new FormData();
    formDate.append("file__recruit__0__common__attachment__1", file);
    return this.mainApi.common_recruit_genFile_doUploadForAdd(file);
  }

  common_pdGenFile_doUpload(file: File,id: string) {
    const formDate = new FormData();
    formDate.append("file__pd__"+id+"__common__attachment__1", file);
    return this.mainApi.common_pdGenFile_doUpload(file,id);
  }

  common_recruit_genFile_doUploadForModify(file: any,id: string) {
    const formDate = new FormData();
    formDate.append("file__recruit__"+id+"__common__attachment__1", file);
    return this.mainApi.common_recruit_genFile_doUploadForModify(file,id);
  }

  searchMvList(searchKeyword: string) {
    return this.mainApi.searchMvList(searchKeyword);
  }

  naverMovieApi(keyword: string, startIndex: number){
    return this.mainApi.naverMovieApi(keyword, startIndex);
  }
  kakaoLocalApi(keyword: string){
    return this.mainApi.kakaoLocalApi(keyword);
  }
  sendSms(from: string, to: string, msg: string){
    return this.mainApi.sendSms(from, to, msg);
  }

}

export const mainServiceSymbol = Symbol('globalstate');

class Singleton {
  static mainService: MainService;
}

export const createMainService = () => {
  if ( Singleton.mainService == null ) {
    Singleton.mainService = new MainService();
  }
  return Singleton.mainService;
}

export const useMainService = (): MainService => inject(mainServiceSymbol) as MainService;