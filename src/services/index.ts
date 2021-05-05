import { getMainApi, MainApi } from "@/apis";
import { inject } from "@vue/runtime-core";


export class MainService {
  private mainApi: MainApi;
  
  constructor(){
    this.mainApi = getMainApi();
  }

  pd_doJoin(name:String, regNumber:String, gender:String, cellPhoneNo:String, email:String, address:String, jobPosition:String, loginPw:String) {
    return this.mainApi.pd_doJoin(name, regNumber, gender, cellPhoneNo ,email, address, jobPosition, loginPw );
  }

  pd_emailDupCheck(email:string) {
    return this.mainApi.pd_emailDupCheck(email);
  }

  pd_sendEmail(email:string) {
    return this.mainApi.pd_sendEmail(email);
  }
  
  pd_emailCert(email:string, key:string) {
    return this.mainApi.pd_emailCert(email, key);
  }

  pd_checkEmailCertificated(email:string) {
    return this.mainApi.pd_checkEmailCertificated(email);
  }

  pd_doLogin( email:String, loginPw:String) {
    return this.mainApi.pd_doLogin(email, loginPw);
  }

  pd_doKakaoLogin( code:String ) {
    return this.mainApi.pd_doKakaoLogin(code);
  }

  pd_doModify( loginedMemberId:string, name:String, loginPw:String, address:String, cellPhoneNo:String, jobPosition:String, corpName:String, artwork:string, isFileUploaded:boolean ) {
    return this.mainApi.pd_doModify(loginedMemberId, name, loginPw, address, cellPhoneNo, jobPosition, corpName, artwork, isFileUploaded );
  }
  pd_deleteProfileImg ( loginedMemberId:string ) {
    return this.mainApi.pd_deleteProfileImg(loginedMemberId);
  }
  pd_update(loginedMemberId:string) {
    return this.mainApi.pd_update(loginedMemberId);
  }
  pd_doFindLoginId( name:String, regNumber:String ) {
    return this.mainApi.pd_doFindLoginId(name, regNumber);
  }
  pd_doFindLoginPw( email:String, regNumber:String ) {
    return this.mainApi.pd_doFindLoginPw(email,regNumber);
  }
  pd_doModifyPw( email:String, regNumber:String, loginPw:String ) {
    return this.mainApi.pd_doModifyPw(email,regNumber,loginPw);
  }
  pd_doDelete( loginedMemberId:number ) {
    return this.mainApi.pd_doDelete(loginedMemberId);
  }
  pd_showDetail( loginedMemberId:string ){
    return this.mainApi.pd_showDetail(loginedMemberId);
  }
  pd_getArtwork( loginedMemberId:string ){
    return this.mainApi.pd_getArtwork(loginedMemberId);
  }
  recruit_write(memberTypeCode:String, memberId:number, boardId:number, rmTitle:String, rmBody:String, rmRoleType:string, rmPay:String, rmLocation:string, rmPeriod:string, rmDeadline:string, rmGender:string, rmAge:[], rmScript:string, rmVideoTime:string, rmEtc:string,
    awMedia:string, awName:String, awDirector:string, awCorp:String, awProducer:String, awManager:string, awGenre:String, awStory:string, awWriter:String, awEtc:String,
    arRealName:String, arName:String, arAge:String, arGender:String, arJob:String, arScript:String, arScenesCount:String, arShootingsCount:String, arCharacter:String, arEtc:String, 
    genFileIdsStr:String) {
    return this.mainApi.recruit_write(memberTypeCode, memberId, boardId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awName, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, genFileIdsStr);
  }
 
  recruit_modify(recruitmentId:number, memberId:number, rmTitle:String, rmBody:String, rmRoleType:string, rmPay:String, rmLocation:string, rmPeriod:string, rmDeadline:string, rmGender:string, rmAge:[], rmScript:string, rmVideoTime:string, rmEtc:string,
    awMedia:string, awTitle:String, awDirector:string, awCorp:String, awProducer:String, awManager:string, awGenre:String, awStory:string, awWriter:String, awEtc:String,
    arRealName:String, arName:String, arAge:String, arGender:String, arJob:String, arScript:String, arScenesCount:String, arShootingsCount:String, arCharacter:String, arEtc:String, 
     isFileUploaded:boolean) {
    return this.mainApi.recruit_modify(recruitmentId, memberId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awTitle, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, isFileUploaded );
  }
  
  recruit_list(limit:number|null,keyword:[]|null) {
    return this.mainApi.recruit_list(limit,keyword);
  }
  recruit_listByMemberId(id:number){
    return this.mainApi.recruit_listByMemberId(id);
  }
  recruitByKeyword(keyword:string){
    return this.mainApi.recruitByKeyword(keyword);
  }
  recruit_detail(id:number) {
    return this.mainApi.recruit_detail(id);
  }
  application_list(id:number){
    return this.mainApi.application_list(id);
  }
  application_detail(id:number){
    return this.mainApi.application_detail(id);
  }
  application_select(applicationId:number){
    return this.mainApi.application_select(applicationId);
  }
  application_fail(applicationId:number){
    return this.mainApi.application_fail(applicationId);
  }
  application_like(applicationId:number, memberId:number){
    return this.mainApi.application_like(applicationId, memberId);
  }
  application_cancelLike(loginedMemberId:string, applicationId:number, memberId:number){
    return this.mainApi.application_cancelLike(loginedMemberId, applicationId, memberId);
  }
  ap_list(recruitId:number){
    return this.mainApi.ap_list(recruitId);
  }

  common_recruit_genFile_doUploadForAdd(file:File) {
    const formDate = new FormData();
    formDate.append("file__recruit__0__common__attachment__1", file);
    return this.mainApi.common_recruit_genFile_doUploadForAdd(file);
  }

  common_pdGenFile_doUpload(file:File,id:string) {
    const formDate = new FormData();
    formDate.append("file__pd__"+id+"__common__attachment__1", file);
    return this.mainApi.common_pdGenFile_doUpload(file,id);
  }

  common_recruit_genFile_doUploadForModify(file:any,id:string) {
    const formDate = new FormData();
    formDate.append("file__recruit__"+id+"__common__attachment__1", file);
    return this.mainApi.common_recruit_genFile_doUploadForModify(file,id);
  }

  searchMvList(searchKeyword:string) {
    return this.mainApi.searchMvList(searchKeyword);
  }

  naverMovieApi(keyword:String){
    return this.mainApi.naverMovieApi(keyword);
  }
  kakaoLocalApi(keyword:string){
    return this.mainApi.kakaoLocalApi(keyword);
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

export const useMainService = ():MainService => inject(mainServiceSymbol) as MainService;