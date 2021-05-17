import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { inject } from 'vue';
import { IActingRole, IApplication, IArtwork, IList, IPd, IAp, IRecruit, ISearchMovie, naverMovieInfo } from '../types';


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
  resultCode: string;
  msg: string;
  fail: boolean;
  success: boolean;
}

// /member/join 의 응답 타입
export interface MainApi__pd_doJoin__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}
export interface MainApi__pd_emailDupCheck__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    
  };
}
export interface MainApi__pd_sendEmail__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    
  };
}
export interface MainApi__pd_emailCert__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    isCert: boolean;
  };
}
export interface MainApi__pd_doLogin__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    authKey: string;
    pd: IPd;
  };
}
export interface MainApi__pd_doKakaoLogin__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    authKey: string;
    pd: any;
  };
}
export interface MainApi__pd_doModify__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    authKey: string;
    pd: IPd;
  };
}
export interface MainApi__pd_doUpdate__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    pd: IPd;
  };
}
export interface MainApi__pd_doFindLoginId__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    pd: IPd;
  };
}
export interface MainApi__pd_doFindLoginPw__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    loginPw: string;
    pd: IPd;
  };
}
export interface MainApi__pd_doModifyPw__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    loginPw: string;
    pd: IPd;
  };
}
export interface MainApi__pd_doDelete__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}
export interface MainApi__pd_showDetail__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    pd: IPd;
    aps: any[];
  };
}
export interface MainApi__pd_getArtwork__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    artworks: IArtwork;
  };
}
export interface MainApi__recruit_write__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}
export interface MainApi__recruit_modify__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruit: IRecruit;
  };
}
export interface MainApi__recruit_list__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruits: IRecruit[];
    artworks: IArtwork[];
    actingRoles: IActingRole[];
    isAllLoaded: boolean;
  };
}
export interface MainApi__recruit_search__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruits: IRecruit[];
    artworks: IArtwork[];
    actingRoles: IActingRole[];
    isAllLoaded: boolean;
  };
}
export interface MainApi__recruit_detail__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    recruit: IRecruit;
    artwork: IArtwork;
    actingRole: IActingRole;
  };
}
export interface MainApi__application_list__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    applications: any[];
  };
}
export interface MainApi__application_detail__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    application: any[];
    ap: IAp;
  };
}
export interface MainApi__application_select__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}
export interface MainApi__application_like__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
    isLike: boolean;
  };
}
export interface MainApi__ap_select__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    id: number;
  };
}
export interface MainApi__ap_list__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    apListAll: any[];
    apListLike: any[];
    apList1Pass: any[];
    apList2Pass: any[];
    apList3Pass: any[];
  };
}
export interface MainApi__common_genFile_doUpload__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    genFileIdsStr: string;
  };
}
export interface MainApi__searchMvList__IResponseBody extends Base__IResponseBodyType1 {
  movieListResult: ISearchMovie; 
}

export interface MainApi__naverApi__IResponseBody extends Base__IResponseBodyType1 {
  items: naverMovieInfo[]; 
  total: number;
  display: number;
}
export interface MainApi__kakaoApi__IResponseBody extends Base__IResponseBodyType1 {
  items: string; 
}
export interface MainApi__sendSms__IResponseBody extends Base__IResponseBodyType1 {
  body: {
    from: string;
    to: string;
    msg: string;
    rb: any;
  };
}

// 백엔드 와의 통신장치
export class MainApi extends HttpClient {
  
  public constructor() {
    super(
      axios.create({
      // baseURL:'http://172.30.1.15:8024/', // 테스트용 로컬아이피
      baseURL:'https://backend.audictionary.com/' // 서비스용 백엔드주소
      })
    );
  }

  protected _handleRequest(config: AxiosRequestConfig) {
    config.params = {};
    config.params.authKey = localStorage.getItem("authKey");
    config.params.loginedMemberType = localStorage.getItem("loginedMemberType");
    return config;
  }

  protected _handleResponse(axiosResponse: AxiosResponse): AxiosResponse {
    if ( axiosResponse?.data?.requestCode == "F-B" ) {
      alert('로그인 후 이용해주세요.');
      location.replace('/usr/member/login');
    }

    return axiosResponse;
  }

  // axios 함수
  public pd_doJoin(name: string, regNumber: string, gender: string, cellPhoneNo: string, email: string, address: string, jobPosition: string, loginPw: string) {
    return this.postByForm<MainApi__pd_doJoin__IResponseBody>(`/usr/pd/doJoin`,{name, regNumber, gender, cellPhoneNo, email, address, jobPosition, loginPw});
  }

  public pd_emailDupCheck(email: string) {
    return this.get<MainApi__pd_emailDupCheck__IResponseBody>(`/usr/pd/emailDupCheck?email=${email}` );
  }

  public pd_sendEmail(email: string) {
    return this.get<MainApi__pd_sendEmail__IResponseBody>(`/usr/pd/sendEmailForJoin?email=${email}` );
  }
  
  public pd_emailCert(email: string, key: string) {
    return this.get<MainApi__pd_emailCert__IResponseBody>(`/usr/pd/emailCertForJoin?email=${email}&key=${key}` );
  }

  public pd_checkEmailCertificated(email: string) {
    return this.get<MainApi__pd_emailCert__IResponseBody>(`/usr/pd/isEmailCert?email=${email}` );
  }

  public pd_doLogin( email: string, loginPw: string) {
    return this.postByForm<MainApi__pd_doLogin__IResponseBody>(`/usr/pd/doLogin`,{ email, loginPw });
  }
  public pd_doLogout() {
    return this.get<MainApi__pd_doLogin__IResponseBody>(`/usr/pd/doLogout`);
  }

  public pd_doKakaoLogin( code: string ) {
    return this.get<MainApi__pd_doKakaoLogin__IResponseBody>(`/usr/pd/kakaoLogin?code=${code}`);
  }

  public pd_doModify( loginedMemberId: string, name: string, loginPw: string, address: string, cellPhoneNo: string, jobPosition: string, corpName: string, artwork: string, isFileUploaded: boolean ) {
    return this.postByForm<MainApi__pd_doModify__IResponseBody>(`/usr/pd/doModify`,{ loginedMemberId, name, loginPw, address, cellPhoneNo, jobPosition, corpName, artwork, isFileUploaded });
  }

  public pd_deleteProfileImg( loginedMemberId: string ) {
    return this.get<MainApi__pd_doDelete__IResponseBody>(`/usr/pd/deleteProfileImg?id=${loginedMemberId}`);
  }

  public pd_showDetail( loginedMemberId: string ) {
    return this.get<MainApi__pd_showDetail__IResponseBody>(`/usr/pd/showDetail?id=${loginedMemberId}`);
  }
  public pd_getArtwork( loginedMemberId: string ) {
    return this.get<MainApi__pd_getArtwork__IResponseBody>(`/usr/pd/getArtwork?loginedMemberId=${loginedMemberId}`);
  }
  public pd_deleteArtwork( artworkId: number ) {
    return this.get<MainApi__pd_getArtwork__IResponseBody>(`/usr/pd/deleteArtwork?id=${artworkId}`);
  }
  public pd_update(loginedMemberId: string) {
    return this.postByForm<MainApi__pd_doUpdate__IResponseBody>(`/usr/pd/update`, {loginedMemberId} );
  }
  public pd_doFindLoginId( name: string, regNumber: string ) {
    return this.postByForm<MainApi__pd_doFindLoginId__IResponseBody>(`/usr/pd/doFindLoginId`,{ name, regNumber });
  }
  public pd_doFindLoginPw( email: string, regNumber: string ) {
    return this.postByForm<MainApi__pd_doFindLoginPw__IResponseBody>(`/usr/pd/doFindLoginPw`,{ email, regNumber });
  }
  public pd_doModifyPw( email: string, key: string, loginPw: string ) {
    return this.postByForm<MainApi__pd_doModifyPw__IResponseBody>(`/usr/pd/doModifyPw`,{ email, key, loginPw });
  }
  public pd_doDelete( loginedMemberId: number, loginedMemberType:String, ) {
    return this.postByForm<MainApi__pd_doDelete__IResponseBody>(`/usr/pd/doDelete`,{ loginedMemberId , loginedMemberType});
  }
  public recruit_write(memberTypeCode: string, memberId: number, boardId: number, rmTitle: string, rmBody: string, rmRoleType: string, rmPay: string, rmLocation: string, rmPeriod: string, rmDeadline: string, rmGender: string, rmAge: [], rmScript: string, rmVideoTime: string, rmEtc: string,
    awMedia: string, awTitle: string, awDirector: string, awCorp: string, awProducer: string, awManager: string, awGenre: string, awStory: string, awWriter: string, awEtc: string,
    arRealName: string, arName: string, arAge: string, arGender: string, arJob: string, arScript: string, arScenesCount: string, arShootingsCount: string, arCharacter: string, arEtc: string, 
    genFileIdsStr: string) {
    return this.postByForm<MainApi__recruit_write__IResponseBody>('/usr/recruit/write', { memberTypeCode, memberId, boardId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awTitle, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, genFileIdsStr });
  }
 
  public recruit_modify(recruitmentId: number, memberId: number, rmTitle: string, rmBody: string, rmRoleType: string, rmPay: string, rmLocation: string, rmPeriod: string, rmDeadline: string, rmGender: string, rmAge: [], rmScript: string, rmVideoTime: string, rmEtc: string,
    awMedia: string, awTitle: string, awDirector: string, awCorp: string, awProducer: string, awManager: string, awGenre: string, awStory: string, awWriter: string, awEtc: string,
    arRealName: string, arName: string, arAge: string, arGender: string, arJob: string, arScript: string, arScenesCount: string, arShootingsCount: string, arCharacter: string, arEtc: string, 
     isFileUploaded: boolean) {
    return this.postByForm<MainApi__recruit_modify__IResponseBody>('/usr/recruit/modify', { recruitmentId, memberId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awTitle, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, isFileUploaded });
  }
  
  public recruit_list(limit: number|null,filter: []|null) {
    return this.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/list?limit=${limit}&filter=${filter}`);
  }
  public recruit_listByMemberId(id: number){
    return this.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/listByMemberId?id=${id}`);
  }
  public recruit_detail(id: number) {
    return this.get<MainApi__recruit_detail__IResponseBody>(`/usr/recruit/detail?id=${id}`);
  }
  public recruitByKeyword(keyword: string) {
    return this.get<MainApi__recruit_search__IResponseBody>(`/usr/recruit/search?keyword=${keyword}`);
  }
  public recruit_showList_orderBy_deadline(){
    return this.get<MainApi__recruit_list__IResponseBody>(`/usr/recruit/listOrderByDeadline`)
  }
  public application_list(id: number, loginedMemberId:number){
    return this.get<MainApi__application_list__IResponseBody>(`/usr/application/list?id=${id}&loginedMemberId=${loginedMemberId}`)
  }
  public application_detail(id: number, loginedMemberId:number){
    return this.get<MainApi__application_detail__IResponseBody>(`/usr/application/detail?id=${id}&loginedMemberId=${loginedMemberId}`)
  }
  public application_select(applicationId: number){
    return this.get<MainApi__ap_select__IResponseBody>(`/usr/application/select?applicationId=${applicationId}`)
  }
  public application_fail(applicationId: number){
    return this.get<MainApi__ap_select__IResponseBody>(`/usr/application/fail?applicationId=${applicationId}`)
  }
  public application_like(applicationId: number, memberId: number){
    return this.get<MainApi__application_like__IResponseBody>(`/usr/application/like?applicationId=${applicationId}&memberId=${memberId}`)
  }
  public application_cancelLike(loginedMemberId: string, applicationId: number, memberId: number){
    return this.get<MainApi__application_list__IResponseBody>(`/usr/application/cancelLike?id=${loginedMemberId}&applicationId=${applicationId}&memberId=${memberId}`)
  }
  public ap_list(recruitId: number){
    return this.get<MainApi__ap_list__IResponseBody>(`/usr/ap/list?id=${recruitId}`)
  }
  public common_recruit_genFile_doUploadForAdd(file: File) {
    const formDate = new FormData();
    formDate.append("file__recruit__0__common__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_pdGenFile_doUpload(file: File,id: string) {
    const formDate = new FormData();
    formDate.append("file__pd__"+id+"__common__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public common_recruit_genFile_doUploadForModify(file: any,id: string) {
    const formDate = new FormData();
    formDate.append("file__recruit__"+id+"__common__attachment__1", file);
    return this.post<MainApi__common_genFile_doUpload__IResponseBody>(
      `/common/genFile/doUpload`, formDate
    );
  }

  public searchMvList(movieName: string) {
    return this.get<MainApi__searchMvList__IResponseBody>(`/usr/pd/searchMvList?movieName=${movieName}`);
  }

  public naverMovieApi(keyword: string, startIndex: number) {
    return this.get<MainApi__naverApi__IResponseBody>(`/usr/naver/movie?keyword=${keyword}&startIndex=${startIndex}`);
  }

  public kakaoLocalApi(keyword: string) {
    return this.get<MainApi__kakaoApi__IResponseBody>(`/usr/kakao/localApi?keyword=${keyword}`);
  }

  public sendSms(from: string, to: string, msg: string){
    return this.get<MainApi__sendSms__IResponseBody>(`/usr/sms/doSendSms?from=${from}&to=${to}&msg=${msg}`);
  }

}




export const mainApiSymbol = Symbol('mainApiSymbol');

class Singleton {
  static mainApi: MainApi;
}

export const createMainApi = () => {
  if( Singleton.mainApi == null ) {
  Singleton.mainApi = new MainApi();
  }
  return Singleton.mainApi;
}

export const useMainApi = (): MainApi => inject(mainApiSymbol) as MainApi;
export const getMainApi = createMainApi;