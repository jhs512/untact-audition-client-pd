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

  pd_doModify( loginedMemberId:string, name:String, loginPw:String, address:String, cellPhoneNo:String, jobPosition:String, corpName:String, isFileUploaded:boolean ) {
    return this.mainApi.pd_doModify(loginedMemberId, name, loginPw, address, cellPhoneNo, jobPosition, corpName, isFileUploaded );
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
  pd_doDelete( loginedMemberId:string ) {
    return this.mainApi.pd_doDelete(loginedMemberId);
  }

  recruit_write(memberId:number, boardId:number,  title:String, body:String, roleType:string, location:string, period:string, deadline:string, manager:string,
    artworkName:String, genre:String, corp:String, director:String, artworkEtc:String,
    roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleScenesCount:String, roleShootingsCount:String, roleCharacter:String, actingRoleEtc:String, 
    genFileIdsStr:String) {
    return this.mainApi.recruit_write(memberId, boardId, title, body, roleType, location, period, deadline, manager, artworkName, genre, corp, director, artworkEtc,
      roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleScenesCount, roleShootingsCount, roleCharacter, actingRoleEtc, genFileIdsStr);
  }
 
  recruit_modify(recruitmentId:number,memberId:number, boardId:number,  title:String, body:String, roleType:string, location:string, period:string, deadline:string, manager:string,
    artworkName:String, genre:String, corp:String, director:String, artworkEtc:String,
    roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleScenesCount:String, roleShootingsCount:String, roleCharacter:String, actingRoleEtc:String, 
     isFileUploaded:boolean) {
    return this.mainApi.recruit_modify(recruitmentId, memberId, boardId, title, body, roleType, location, period, deadline, manager, artworkName, genre, corp, director, artworkEtc,
      roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleScenesCount, roleShootingsCount, roleCharacter, actingRoleEtc, isFileUploaded);
  }
  
  recruit_list(limit:number) {
    return this.mainApi.recruit_list(limit);
  }

  recruit_detail(id:number) {
    return this.mainApi.recruit_detail(id);
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

  testApi() {
    return this.mainApi.testApi();
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