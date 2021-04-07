export interface IEntity {
  id:number;
  regDate:string;
  updateDate:string;
}

export interface GlobalState {
  fullPath:string;
  loginedMember:IPd;
  isLogined:boolean;
  isMainLayoutVisible:boolean;
  logout:Function;
}

export interface IPd extends IEntity {
  authKey:string;
  id:number;
  loginId:string;
  authLevel:number;
  name:string;
  email:string;
  cellPhoneNo:string;
  address:string;
  jobPosition:string;
  corpName:string;
  corpType:string;
  extra__thumbImg:string;
}

export interface IRecruit extends IEntity {
delDate: string;
delStatus: number;
memberId: number;
title: string;
body: string;
roleType: string;
pay: string;
location: string;
period: string;
deadline: string;
gender: string;
age: string;
script: string;
videoTime: string;
etc: string;
}

export interface IArtwork extends IEntity {
relTypeCode: string;
relId: number;
title: string;
subtitle: string;
media: string;
genre: string;
corp: string;
director: string;
producer: string;
castingManager: string;
wrtier: string;
story: string;
image: string;
link: string;
etc: string;
}

export interface IActingRole extends IEntity {
  recruitmentId:number;
  realName:string;
  name:string;
  age:string;
  job:string;
  gender:string;
  scriptStatus:string;
  scenesCount:string;
  shootingsCount:string;
  character:string;
  etc:string;
}

export interface IList {
  recruits: IRecruit[],
  artworks: IArtwork[],
  actingRoles: IActingRole[]
}

export interface IGenFile extends IEntity {
  relTypeCode:string;
  relId:number;
  originFileName:string;
  fileExt:string;
  typeCode:string;
  type2Code:string;
  fileSize:number;
  fileExtTypeCode:string;
  scenesCount:number;
  shootingsCount:number;
  character:string;
  etc:string;
}

export interface ISearchMovie {
  movieList: movieInfo[];
  source:string;
  totCnt: number
}

interface movieInfo {
companys: []
directors: []
genreAlt: string;
movieCd: string;
movieNm: string;
movieNmEn: string;
nationAlt: string;
openDt: string;
prdtStatNm: string;
prdtYear: string;
repGenreNm: string;
repNationNm: string;
typeNm: string;
}

export interface naverMovieInfo {
  actor: string; 
  director: string;
  image: string;
  link: string;
  pubDate: string;
  subtitle : string;
  title: string;
  userRating: string;
  }