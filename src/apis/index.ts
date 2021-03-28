import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject, reactive } from 'vue';
import { IActingRole, IArtwork, IPd, IRecruit } from '../types';


// API 원형
abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(instance: AxiosInstance) {
    this.instance = instance;

    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  }

  private _initializeResponseInterceptor() {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError,
    );
  }

  protected _handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    return axiosResponse;
  }

  protected _handleError(error: AxiosError) {
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
      alert('요청을 처리하는 중에 오류가 발생하였습니다.');
    }
    else if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      alert('서버 또는 네트워크의 상태가 좋지 않습니다.');
    }
    else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(error);
  }

  public postByForm<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    const params = new URLSearchParams();
    for ( const key in data ) {
      params.append(key, data[key]);
    }
    config =  {} as AxiosRequestConfig;
    config.headers = {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Accept': '*/*'
    };
  
    return this.instance.post(url, params, config);
  }
  
  public post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.instance.get(url, config);
  }
}



// 응답타입1
interface Base__IResponseBodyType1 {
  resultCode:string;
  msg:string;
  fail:boolean;
  success:boolean;
}

// /member/join 의 응답 타입
export interface MainApi__pd_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: Number
  };
}
export interface MainApi__pd_doLogin__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey: string,
    pd: IPd
  };
}
export interface MainApi__pd_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    authKey: string,
    pd: IPd
  };
}
export interface MainApi__pd_doFindLoginId__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    pd: IPd
  };
}
export interface MainApi__pd_doFindLoginPw__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    loginPw: string,
    pd: IPd
  };
}
export interface MainApi__pd_doDelete__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}
export interface MainApi__recruit_write__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}
export interface MainApi__recruit_writeArtwork__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}
export interface MainApi__recruit_writeActingRole__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    id: number
  };
}
export interface MainApi__recruit_list__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    recruits: IRecruit[],
    isAllLoaded: boolean
  };
}
export interface MainApi__recruit_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    recruit: IRecruit
  };
}
export interface MainApi__artwork_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    artwork: IArtwork
  };
}
export interface MainApi__actingRole_detail__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    actingRole: IActingRole
  };
}
export interface MainApi__common_genFile_doUpload__IResponseBody extends Base__IResponseBodyType1 {
  body:{
    genFileIdsStr: string,
  };
}
// http://localhost:8021/usr/ 와의 통신장치
export class MainApi extends HttpClient {
  public constructor() {
    super(
      axios.create({
        baseURL:'http://172.30.1.15:8024/',
      })
    );
  }

  protected _handleRequest(config:AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    return config;
  };

  protected _handleResponse(axiosResponse:AxiosResponse) : AxiosResponse {
    if ( axiosResponse?.data?.requestCode == "F-B" ) {
      alert('로그인 후 이용해주세요.');
      location.replace('/usr/member/login');
    }

    return axiosResponse;
  }

  // axios 함수
  public pd_doJoin(name:String, regNumber:String, gender:String, cellPhoneNo:String, email:String, address:String, jobPosition:String, loginPw:String) {
    return this.postByForm<MainApi__pd_doJoin__IResponseBody>(`/usr/pd/doJoin`,{name, regNumber, gender, cellPhoneNo, email, address, jobPosition, loginPw});
  }

  public pd_doLogin( email:String, loginPw:String) {
    return this.postByForm<MainApi__pd_doLogin__IResponseBody>(`/usr/pd/doLogin`,{ email, loginPw });
  }

  public pd_doModify( loginedMemberId:string, name:String, loginPw:String, address:String, cellPhoneNo:String, jobPosition:String, corpName:String, genFileIdsStr:string) {
    return this.postByForm<MainApi__pd_doModify__IResponseBody>(`/usr/pd/doModify`,{ loginedMemberId, name, loginPw, address, cellPhoneNo, jobPosition, corpName, genFileIdsStr });
  }
  public pd_doFindLoginId( name:String, regNumber:String ) {
    return this.postByForm<MainApi__pd_doFindLoginId__IResponseBody>(`/usr/pd/doFindLoginId`,{ name, regNumber });
  }
  public pd_doFindLoginPw( email:String, regNumber:String ) {
    return this.postByForm<MainApi__pd_doFindLoginPw__IResponseBody>(`/usr/pd/doFindLoginPw`,{ email, regNumber });
  }
  public pd_doDelete( loginedMemberId:string ) {
    return this.postByForm<MainApi__pd_doDelete__IResponseBody>(`/usr/pd/doDelete`,{ loginedMemberId });
  }

  public recruit_write(memberId:number, boardId:number, title:String, body:String, roleType:string, location:string, period:string, deadline:string, manager:string,
    genFileIdsStr:String) {
    return this.postByForm<MainApi__recruit_write__IResponseBody>('/usr/recruit/write', {memberId, boardId, title, body, roleType, location, period, deadline, manager,
      genFileIdsStr});
  }
  public recruit_writeArtwork( newRecruitmentId:number,  artworkName:String, genre:String, corp:String, director:String, artworkEtc:String, ) {
    return this.postByForm<MainApi__recruit_writeArtwork__IResponseBody>('/usr/recruit/writeArtwork', {newRecruitmentId, artworkName, genre, corp, director, artworkEtc });
  }
  public recruit_writeActingRole( newRecruitmentId:number,  roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleSceneCount:String, roleShootingCount:String, actingRoleEtc:String ) {
    return this.postByForm<MainApi__recruit_writeActingRole__IResponseBody>('/usr/recruit/writeActingRole', {newRecruitmentId, roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleSceneCount, roleShootingCount, actingRoleEtc});
  }
  public recruit_list(limit:number) {
    return this.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/list?limit=${limit}`);
  }
  public recruit_detail(id:number) {
    return this.get<MainApi__recruit_detail__IResponseBody>(`/usr/recruit/detail?id=${id}`);
  }
  public artwork_detail(recruitId:number) {
    return this.get<MainApi__artwork_detail__IResponseBody>(`/usr/recruit/artwork?recruitmentId=${recruitId}`);
  }
  public actingRole_detail(recruitId:number) {
    return this.get<MainApi__actingRole_detail__IResponseBody>(`/usr/recruit/actingRole?recruitmentId=${recruitId}`);
  }

  public common_genFile_doUpload(file:File) {
    const formDate = new FormData();
    formDate.append("file__recruit__0__common__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_pdGenFile_doUpload(file:File) {
    const formDate = new FormData();
    formDate.append("file__pd__0__common__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }



}


export const mainApiSymbol = Symbol('mainApiSymbol');

export const mainApi = () => {
  return new MainApi();
}

export const useMainApi = ():MainApi => inject(mainApiSymbol) as MainApi;