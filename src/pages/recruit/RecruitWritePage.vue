<template>
<ion-page>
  <ion-content fullscreen="true">
  <div class="flex flex-col relative min-h-screen mb-20">

    <TitleBar v-if="state.pageNum == 1" title="공고 등록 페이지" btn_back="true"></TitleBar>

    <TitleBar v-if="state.pageNum == 2" title="작품 정보 등록 페이지" btn_back="true"></TitleBar>

    <TitleBar v-if="state.pageNum == 3" title="배역 정보 등록 페이지" btn_back="true"></TitleBar>

    <div class="container mx-auto mt-8">
      <form action="" v-on:submit.prevent="checkAndWrite" class="mx-4">

       <!-- 페이지 1 --> 
      <section v-show="state.pageNum == 1" >

        <div class="mx-auto text-center">
        <span class="subtitle">공고 작성</span>
        </div>

        <FormRow title="제목:">
          <ion-input v-model="input.rmTitleEl" placeholder="공고 제목" type="text"></ion-input>
        </FormRow>

        <FormRow title="내용:">
          <ion-textarea v-model="input.rmBodyEl" placeholder="공고 내용"></ion-textarea>
        </FormRow>

        <FormRow title="배역타입:">
          <ion-input v-model="input.rmRoleTypeEl" placeholder="배역타입 ex) 주연, 조연, 단역" type="text" class="p-1 w-full mt-2px"></ion-input>
        </FormRow>

        <FormRow title="출연료:">
          <ion-input v-model="input.rmPayEl" type="text"></ion-input> 
        </FormRow>

        <hr class="my-8">

        <div class="mx-auto text-center">
        <span class="subtitle">촬영 설명</span>
        </div>

        <FormRow title="촬영장소:">
          <ion-input v-model="input.rmLocationEl" placeholder="촬영장소" type="text"></ion-input>
        </FormRow>

        <FormRow title="촬영기간:">
          <ion-input v-model="input.rmPeriodEl" placeholder="촬영기간" type="text"></ion-input>
        </FormRow>

        <FormRow title="모집기한날짜:">
          <ion-item lines="none">
            <ion-datetime v-model="input.rmDeadlineEl" id="ion-datetime" placeholder="날짜를 선택해주세요." picker-format="YYYYMMDD" display-format="YYYY - MM - DD" max="2050-12-31" :min="today" done-text="확인" cancel-text="취소"></ion-datetime>
          </ion-item>
         
        </FormRow>

        <hr class="my-8">

        <div class="mx-auto text-center">
        <span class="subtitle">지원 요건</span>
        </div>

         <FormRow title="성별:">
          <div class="flex">
            <input id="rmGenderM" ref="rmGenderMElRef" name="rmGender" type="radio"  value="남자">
            <label for="rmGenderM" class="py-3 w-full mt-2px text-center">남자</label>
            <input id="rmGenderF" ref="rmGenderFElRef" name="rmGender" type="radio" value="여자">
            <label for="rmGenderF" class="py-3 w-full mt-2px text-center">여자</label>
            <input id="rmGenderX" ref="rmGenderXElRef" name="rmGender" type="radio" value="상관없음">
            <label for="rmGenderX" class="py-3 w-full mt-2px text-center">상관없음</label>
          </div>
        </FormRow>

        

        <FormRow title="나이:">
        <ion-select v-model="input.rmAgeEl" multiple="true" cancel-text="취소" ok-text="선택" >
          <ion-select-option value="영유아">영유아</ion-select-option>
          <ion-select-option value="10대">10대</ion-select-option>
          <ion-select-option value="20대">20대</ion-select-option>
          <ion-select-option value="30대">30대</ion-select-option>
          <ion-select-option value="40-50대">40-50대</ion-select-option>
          <ion-select-option value="60대이상">60대이상</ion-select-option>
        </ion-select>
        </FormRow>

        <FormRow title="대사:">
          <ion-input v-model="input.rmScriptEl" placeholder="오디션 대사" type="text"></ion-input>
        </FormRow>

        <FormRow title="영상 길이:">
          <ion-select v-model="input.rmVideoTimeEl" cancel-text="취소" ok-text="선택" >
            <ion-select-option value="1분이내">1분이내</ion-select-option>
            <ion-select-option value="1-2분">1-2분</ion-select-option>
            <ion-select-option value="2-3분">2-3분</ion-select-option>
            <ion-select-option value="5분이내">5분이내</ion-select-option>
          </ion-select>
        </FormRow>

        <FormRow title="기타 우대사항:">
          <ion-input v-model="input.rmEtcEl" placeholder="기타 우대사항" type="text"></ion-input>
        </FormRow>

        <div v-on:click="nextPage" class="w-full mt-10 text-center btn-next text-xs text-white mx-auto p-2">다음</div>
      </section>

      

      <!-- 페이지 2 -->
      <section v-show="state.pageNum == 2">

        <div class="mx-auto text-center">
        <span class="subtitle">작품 정보</span>
        </div>
        
        <FormRow title="매체:">
          <ion-input v-model="input.awMediaEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="작품이름:">
          <ion-input v-model="input.awNameEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="감독:">
          <ion-input v-model="input.awDirectorEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="제작사:">
          <ion-input v-model="input.awCorpEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="프로듀서:">
          <ion-input v-model="input.awProducerEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="캐스팅담당자:">
          <ion-input v-model="input.awManagerEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="장르:">
          <ion-input v-model="input.awGenreEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="줄거리:">
          <ion-textarea v-model="input.awStoryEl"></ion-textarea>
        </FormRow>

        <FormRow title="원작자:">
          <ion-input v-model="input.awWriterEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="관련이미지(포스터):">
          <input ref="awFileElRef" type="file" accept="image/*" class="p-1 w-full mt-2px" v-on:change="setThumbnail">
        </FormRow>
        <div id="image_container" class="mx-auto my-6">
          <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
          <video v-if="fileType.type.startsWith('video')" src="" controls></video>
        </div>
        

        <FormRow title="기타:">
          <ion-textarea v-model="input.awEtcEl"></ion-textarea>
        </FormRow>

        
        <div class="flex justify-around mx-auto">
        <div v-on:click="prevPage" class="w-full mr-1 mt-10 text-center btn-next text-xs text-white p-2">이전</div>
      <div v-on:click="nextPage" class="w-full ml-1 mt-10 text-center btn-next text-xs text-white p-2">다음</div>
      </div>

      </section>

      <!-- 페이지 3 -->
      <section v-show="state.pageNum == 3">

        <div class="mx-auto text-center">
        <span class="subtitle">배역 정보</span>
        </div>

        <FormRow title="배역본명:">
          <ion-input v-model="input.arRealNameEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="배역이름:">
          <ion-input v-model="input.arNameEl" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="나이:">
          <ion-input v-model="input.arAgeEl" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="배역성별:">
          <div class="flex">
            <input id="arGenderM" ref="arGenderMElRef" name="arGender" type="radio"  value="남자" v-on:click="arGenderEtcHide">
            <label for="arGenderM" class="py-3 w-full mt-2px text-center">남자</label>
            <input id="arGenderF" ref="arGenderFElRef" name="arGender" type="radio" value="여자" v-on:click="arGenderEtcHide">
            <label for="arGenderF" class="py-3 w-full mt-2px text-center">여자</label>
            <input id="arGenderX" ref="arGenderXElRef" name="arGender" type="radio" value="상관없음" v-on:click="arGenderEtcHide">
            <label for="arGenderX" class="py-3 w-full mt-2px text-center">상관없음</label>
            <input id="arGenderEtc" ref="arGenderEtcElRef" name="arGender" type="radio" value="기타" v-on:click="arGenderEtcShow">
            <label for="arGenderEtc" class="py-3 w-full mt-2px text-center">기타</label>
          </div>
        </FormRow>

        <FormRow>
        <ion-input id="input_arGenderEtc" v-model="input.arGenderEl" placeholder="기타" type="text" class="mt-2"></ion-input>
        </FormRow>

        <FormRow title="직업:">
          <ion-input v-model="input.arJobEl" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="대사유무:">
          <div class="flex">
          <input id="arScriptYes" ref="arScriptYesElRef" name="arScript" type="radio"  value="유">
          <label for="arScriptYes" class="p-1 w-full mt-2px text-center">유</label>
          <input id="arScriptNo" ref="arScriptNoElRef" name="arScript" type="radio" value="무">
          <label for="arScriptNo" class="p-1 w-full mt-2px text-center">무</label>
          </div>
        </FormRow>
        
        <FormRow title="장면수:">
          <ion-input v-model="input.arScenesCountEl" type="text" pattern="[0-9]*"></ion-input>
        </FormRow>
        
        <FormRow title="촬영횟수:">
          <ion-input v-model="input.arShootingsCountEl" type="text" pattern="[0-9]*"></ion-input>
        </FormRow>

        <FormRow title="배역설명:">
          <ion-input v-model="input.arCharacterEl" type="text"></ion-input>
        </FormRow>

        <FormRow title="기타:">
          <ion-textarea v-model="input.arEtcEl"></ion-textarea>
        </FormRow>

        

        <div class="flex justify-around mx-auto">
        <div v-on:click="prevPage" class="w-full mr-1 mt-10 text-center btn-next text-xs text-white p-2">이전</div>
        <input type="submit" class="w-full ml-1 mt-10 text-center btn-next text-xs text-white p-2" value="등록">
        
        </div>
      </section>

      </form>
    </div>
    


  </div>
  </ion-content>
</ion-page>


</template>

<script lang="ts">

import { defineComponent, ref, reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonDatetime, IonItem, IonLabel, IonInput, IonTextarea, IonPicker, IonButton, IonSelect, IonSelectOption } from '@ionic/vue'

import router from '@/router'
import $ from 'jquery'
import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'
import * as Util from '@/utils'
export default defineComponent({
  name: 'RecruitWritePage',
  components: {
    IonPage,
    IonContent,
    IonDatetime,
    IonItem,
    IonLabel,    
    IonInput,
    IonPicker,
    IonButton,
    IonTextarea,
    IonSelect, 
    IonSelectOption
  },
  props: {
    
  },
  setup(props) {
    onMounted(() => {
      $('#input_arGenderEtc').addClass('hidden');
    })
    
    const globalState = useGlobalShare();
    
    const mainApiService = useMainService();

    const rmGenderMElRef = ref<HTMLInputElement>();
    const rmGenderFElRef = ref<HTMLInputElement>();
    const rmGenderXElRef = ref<HTMLInputElement>();

    const awFileElRef = ref<HTMLInputElement>();

    const arGenderMElRef = ref<HTMLInputElement>();
    const arGenderFElRef = ref<HTMLInputElement>();
    const arGenderXElRef = ref<HTMLInputElement>();
    const arGenderEtcElRef = ref<HTMLInputElement>();

    const arScriptYesElRef = ref<HTMLInputElement>();
    const arScriptNoElRef = ref<HTMLInputElement>();

    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
   
    const today = year + "-" + month + "-" + day;
    
   const state = reactive({
     pageNum :1
   })
    
    function prevPage() {
      state.pageNum--;
    }
    function nextPage() {
      state.pageNum++;
    }

    const input = reactive ({
      rmTitleEl:'',
      rmBodyEl:'',
      rmRoleTypeEl:'',
      rmPayEl:'',
      rmLocationEl:'',
      rmPeriodEl:'',
      rmDeadlineEl:'',
      rmGenderEl:'',
      rmAgeEl:[] as any,
      rmScriptEl:'',
      rmVideoTimeEl:'',
      rmEtcEl:'',

      awMediaEl:'',
      awNameEl:'',
      awDirectorEl:'',
      awCorpEl:'',
      awProducerEl:'',
      awManagerEl:'',
      awGenreEl:'',
      awStoryEl:'',
      awWriterEl:'',
      awEtcEl:'',

      arRealNameEl:'',
      arNameEl:'',
      arAgeEl:'',
      arGenderEl:'',
      arJobEl:'',
      arScriptEl:'',
      arScenesCountEl:'',
      arShootingsCountEl:'',
      arCharacterEl:'',
      arEtcEl:''
    })

    function arGenderEtcShow () {
      input.arGenderEl = '';
      $('#input_arGenderEtc').removeClass('hidden');
      $('#input_arGenderEtc').addClass('flex');
    }

    function arGenderEtcHide () {
      $('#input_arGenderEtc').removeClass('flex');
      $('#input_arGenderEtc').addClass('hidden');
    }

    function checkAndWrite() {
      let isFileUploaded = false;
      
      // 제목 체크
      if ( input.rmTitleEl.length == 0 ) {
        alert('제목을 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 내용 체크
      if ( input.rmBodyEl.length == 0 ) {
        alert('내용을 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 배역타입 체크
      if ( input.rmRoleTypeEl.length == 0 ) {
        alert('배역타입을 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 출연료 체크
      if ( input.rmPayEl.length == 0 ) {
        alert('출연료를 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 촬영장소 체크
      if ( input.rmLocationEl.length == 0 ) {
        alert('촬영장소를 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 촬영기간 체크
      if ( input.rmPeriodEl.length == 0 ) {
        alert('촬영기간을 입력해 주세요.');
        state.pageNum = 1;
        return;
      }

      // 모집기간 체크
      if ( input.rmDeadlineEl.length == 0 ){
        alert("모집기간을 입력해 주세요.");
        state.pageNum = 1;
        return;
      }
      input.rmDeadlineEl = input.rmDeadlineEl.split('T')[0];

      // 공고 요건 성별 체크
      if ( rmGenderMElRef.value == null ) {
        return;
      }
      if ( rmGenderFElRef.value == null ) {
        return;
      }
      if ( rmGenderXElRef.value == null ) {
        return;
      }
      

      if( rmGenderMElRef.value.checked ) {
         input.rmGenderEl = rmGenderMElRef.value.value;
      } else if ( rmGenderFElRef.value.checked ){
         input.rmGenderEl = rmGenderFElRef.value.value;
      } else if ( rmGenderXElRef.value.checked ){
         input.rmGenderEl = rmGenderXElRef.value.value;
      }   
      
      if ( input.rmGenderEl.length == 0 ){
        alert("요건 성별을 입력해 주세요.");
        state.pageNum = 1;
        return;
      }

      // 공고 요건 나이 체크
      if ( input.rmAgeEl.length == 0 ){
        alert("요건 나이를 입력해 주세요.");
        state.pageNum = 1;
        return;
      }

      // 공고 요건 대사 체크
      if ( input.rmScriptEl.length == 0 ){
        alert("요건 대사를 입력해 주세요.");
        state.pageNum = 1;
        return;
      }

      // 공고 요건 영상 길이 체크
      if ( input.rmVideoTimeEl.length == 0 ){
        alert("영상 길이를 입력해 주세요.");
        state.pageNum = 1;
        return;
      }
      

      // 작품매체 체크
      if ( input.awMediaEl.length == 0 ) {
        alert('작품매체를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 작품이름 체크
      if ( input.awNameEl.length == 0 ) {
        alert('작품이름을 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 감독 체크
      if ( input.awDirectorEl.length == 0 ) {
        alert('감독을 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 제작사 체크
      if ( input.awCorpEl.length == 0 ) {
        alert('제작사를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 프로듀서 체크
      if ( input.awProducerEl.length == 0 ) {
        alert('프로듀서를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 캐스팅담당자 체크
      if ( input.awManagerEl.length == 0 ) {
        alert('캐스팅담당자를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 장르 체크
      if ( input.awGenreEl.length == 0 ) {
        alert('작품장르를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 줄거리 체크
      if ( input.awStoryEl.length == 0 ) {
        alert('작품 줄거리를 입력해 주세요.');
        state.pageNum = 2;
        return;
      }

      // 배역본명 체크
      if ( input.arRealNameEl.length == 0 ) {
        alert('배역 본명을 입력해 주세요.');
        return;
      }

      // 배역이름 체크
      if ( input.arNameEl.length == 0 ) {
        alert('배역 이름을 입력해 주세요.');
        return;
      }

      // 배역나이 체크
      if ( input.arAgeEl.length == 0 ) {
        alert('배역 나이를 입력해 주세요.');
        return;
      }

      // 배역성별 체크
      if ( arGenderMElRef.value == null ) {
        return;
      }
      if ( arGenderFElRef.value == null ) {
        return;
      }
      if ( arGenderXElRef.value == null ) {
        return;
      }
      if ( arGenderEtcElRef.value == null ) {
        return;
      }

      if( arGenderMElRef.value.checked ) {
         input.arGenderEl = arGenderMElRef.value.value;
      } else if ( arGenderFElRef.value.checked ){
         input.arGenderEl = arGenderFElRef.value.value;
      } else if ( arGenderXElRef.value.checked ){
         input.arGenderEl = arGenderXElRef.value.value;
      }
      
      if ( input.arGenderEl.length == 0 ) {
        alert('배역 성별을 입력해 주세요.');
        return;
      }

      // 배역직업 체크
      if ( input.arJobEl.length == 0 ) {
        alert('배역 직업을 입력해 주세요.');
        return;
      }

      // 배역 대사유무 체크
      if ( arScriptYesElRef.value == null ) {
        return;
      }
      if ( arScriptNoElRef.value == null ) {
        return;
      }

      if( arScriptYesElRef.value.checked ) {
         input.arScriptEl = arScriptYesElRef.value.value;
      } else if ( arScriptNoElRef.value.checked ){
         input.arScriptEl = arScriptNoElRef.value.value;
      }
      
      if ( input.arScriptEl.length == 0 ) {
        alert('배역 대사유무를 입력해 주세요.');
        return;
      }

      // 장면수 체크
      if ( input.arScenesCountEl.length == 0 ) {
        alert('배역 장면수를 입력해 주세요.');
        return;
      }

      // 촬영횟수 체크
      if ( input.arShootingsCountEl.length == 0 ) {
        alert('배역 촬영횟수를 입력해 주세요.');
        return;
      }

      // 배역설명 체크
      if ( input.arCharacterEl.length == 0 ) {
        alert('배역 설명을 입력해 주세요.');
        return;
      }

      // 파일업로드 체크
      if( awFileElRef.value?.files != null ){
        if ( awFileElRef.value?.files.length > 0 ){
          isFileUploaded = true;
        } 
      }
      
      const startWrite = (genFileIdsStr: string) => {

      write( globalState.loginedMember.loginedMemberType, globalState.loginedMember.id , 3, input.rmTitleEl, input.rmBodyEl, input.rmRoleTypeEl, input.rmPayEl, input.rmLocationEl, input.rmPeriodEl , input.rmDeadlineEl, input.rmGenderEl, input.rmAgeEl, input.rmScriptEl, input.rmVideoTimeEl, input.rmEtcEl, 
      input.awMediaEl, input.awNameEl, input.awDirectorEl, input.awCorpEl, input.awProducerEl, input.awManagerEl, input.awGenreEl, input.awStoryEl, input.awWriterEl, input.awEtcEl,
      input.arRealNameEl, input.arNameEl, input.arAgeEl, input.arGenderEl, input.arJobEl, input.arScriptEl, input.arScenesCountEl, input.arShootingsCountEl, input.arCharacterEl ,input.arEtcEl,
      genFileIdsStr);
      
        
      };

      const startFileUpload = (onSuccess: Function) => {
        if ( isFileUploaded == false ) {
          onSuccess("");
          return;
        }
        if ( awFileElRef?.value?.files != null ){
            mainApiService.common_recruit_genFile_doUploadForAdd(awFileElRef.value.files[0])
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              onSuccess(axiosResponse.data.body.genFileIdsStr);
            }
          });
        }
       
      };
      
      startFileUpload(startWrite);

    }

    function write(memberTypeCode: string, memberId: number, boardId: number, rmTitle: string, rmBody: string, rmRoleType: string, rmPay: string, rmLocation: string, rmPeriod: string, rmDeadline: string, rmGender: string, rmAge: [], rmScript: string, rmVideoTime: string, rmEtc: string,
    awMedia: string, awName: string, awDirector: string, awCorp: string, awProducer: string, awManager: string, awGenre: string, awStory: string, awWriter: string, awEtc: string,
    arRealName: string, arName: string, arAge: string, arGender: string, arJob: string, arScript: string, arScenesCount: string, arShootingsCount: string, arCharacter: string, arEtc: string, 
    genFileIdsStr: string) {
       mainApiService.recruit_write(memberTypeCode, memberId, boardId, rmTitle, rmBody, rmRoleType, rmPay, rmLocation, rmPeriod, rmDeadline, rmGender, rmAge, rmScript, rmVideoTime, rmEtc,
      awMedia, awName, awDirector, awCorp, awProducer, awManager, awGenre, awStory, awWriter, awEtc, 
      arRealName, arName, arAge, arGender, arJob, arScript, arScenesCount, arShootingsCount, arCharacter, arEtc, genFileIdsStr)
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림", axiosResponse.data.msg, null);
          }
          Util.showAlert("알림", axiosResponse.data.msg, () => router.replace('/usr/recruit/detail?id='+axiosResponse.data.body.id));
        });
    }

    const fileType = reactive({
      type:''
    })

    function setThumbnail(event: any){
      
      const reader = new FileReader(); 
      fileType.type = event.target.files[0].type as string;
      reader.onload = function(event) { 
        let element: any;
        if( fileType.type.startsWith("image") ){
          element = document.querySelector('img'); 
        }else if ( fileType.type.startsWith("video")) {
          element = document.querySelector('video'); 
        }
        
        if( element == null ) {
          return;
        }
        if(event.target?.result == null && typeof event.target?.result != 'string' ){
          return;
        }
        if( typeof event.target.result == 'number' || typeof event.target.result == 'bigint'
        || typeof event.target.result == 'boolean' || typeof event.target.result == 'symbol' || typeof event.target.result == 'undefined' ||  
        typeof event.target.result == 'object' || typeof event.target.result == 'function'
        ){
          return
        }
        element?.setAttribute("src", event.target.result); 
        document.querySelector("div#image_container")?.appendChild(element); 
        
        }; 
        
        reader.readAsDataURL(event.target.files[0]);
      }


    
    return {
    state,
    globalState,
    today,
    input,
    prevPage,
    nextPage,
    arGenderEtcShow,
    arGenderEtcHide,
    checkAndWrite,
    rmGenderMElRef,
    rmGenderFElRef,
    rmGenderXElRef,
    arGenderMElRef,
    arGenderFElRef,
    arGenderXElRef,
    arGenderEtcElRef,
    arScriptYesElRef,
    arScriptNoElRef,
    awFileElRef,
    router,
    setThumbnail,
    fileType,
   }
  },
  methods : {
    

  }
  
  
})
</script>

<style scoped>
input, ion-input, ion-textarea, ion-item, ion-select {
  border:1px solid #D4D4D4;
}
.subtitle{
background: linear-gradient(white 60%,rgba(200, 94, 94, 0.5) 40%);
}
textarea {
  border:1px solid #D4D4D4;
  resize:none;
}
.btn-cert{
  background-color:#C4C4C4;
}
.btn-next {
  background-color:#C4C4C4;
}
input[type=radio]{
  display:none;
}
label{
  border: 1px solid #D4D4D4;
}
input[type=radio]:checked + label {
  background-color: #D4D4D4;
}
hr {
  background-color: black;
}
</style>