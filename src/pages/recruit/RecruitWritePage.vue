<template>
<ion-page>
  <ion-content fullscreen="true">
  <div class="flex flex-col relative min-h-screen mb-20">

    <TitleBar v-if="state.pageNum == 1" title="공고 등록 페이지" btn_back="true"></TitleBar>

    <TitleBar v-if="state.pageNum == 2" title="작품 정보 등록 페이지" btn_back="true"></TitleBar>

    <TitleBar v-if="state.pageNum == 3" title="배역 정보 등록 페이지" btn_back="true"></TitleBar>

    <div class="container mx-auto mt-8 flex flex-col flex-1">
      <form action="" v-on:submit.prevent="checkAndWrite" class="mx-4">
        
      <section v-show="state.pageNum == 1">
        <FormRow title="제목:">
          <ion-input v-model="input.titleEl" ref="titleElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="내용:">
          <ion-textarea v-model="input.bodyEl" ref="bodyElRef"></ion-textarea>
        </FormRow>

        <FormRow title="배역:">
          <ion-input v-model="input.roleTypeEl" ref="roleTypeElRef" type="text" class="p-1 w-full mt-2px"></ion-input>
        </FormRow>

        <FormRow title="촬영장소:">
          <ion-input v-model="input.locationEl" ref="locationElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="촬영기간:">
          <ion-input v-model="input.periodEl" ref="periodElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="모집기한날짜:">
          <ion-item lines="none">
            <ion-datetime v-model="input.deadlineEl" id="ion-datetime" placeholder="날짜를 선택해주세요." picker-format="YYYYMMDD" display-format="YYYY - MM - DD" max="2050-12-31" done-text="확인" cancel-text="취소"></ion-datetime>
          </ion-item>
         
        </FormRow>

        <FormRow title="담당자:">
          <ion-input v-model="input.managerEl" ref="managerElRef" type="text"></ion-input>
        </FormRow>
        <div v-on:click="nextPage" class="w-full mt-10 text-center btn-next text-xs text-white mx-auto p-2">다음</div>
      </section>

      
      <section v-show="state.pageNum == 2">
        <FormRow title="작품이름:">
          <ion-input v-model="input.artworkNameEl" ref="artworkNameElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="장르:">
          <ion-input v-model="input.genreEl" ref="genreElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="제작사:">
          <ion-input v-model="input.corpEl" ref="corpElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="감독:">
          <ion-input v-model="input.directorEl" ref="directorElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="기타:">
          <ion-textarea v-model="input.artworkEtcEl" ref="artworkEtcElRef"></ion-textarea>
        </FormRow>

        <FormRow title="파일첨부:">
          <ion-input v-model="input.fileEl" ref="fileElRef" type="file" class="p-1 w-full mt-2px" v-on:change="setThumbnail"></ion-input>
        </FormRow>
        <div id="image_container" class="mx-auto">
          <img v-if="fileType.type.startsWith('image')" src="" alt="" class="mx-auto">
          <video v-if="fileType.type.startsWith('video')" src="" controls></video>
        </div>
        <div class="flex justify-around mx-auto">
        <div v-on:click="prevPage" class="w-full mr-1 mt-10 text-center btn-next text-xs text-white p-2">이전</div>
      <div v-on:click="nextPage" class="w-full ml-1 mt-10 text-center btn-next text-xs text-white p-2">다음</div>
      </div>
      </section>

      <section v-show="state.pageNum == 3">
        <FormRow title="배역본명:">
          <ion-input v-model="input.roleRealNameEl" ref="roleRealNameElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="배역이름:">
          <ion-input v-model="input.roleNameEl" ref="roleNameElRef" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="출연료:">
          <ion-input v-model="input.payEl" ref="payElRef" type="text"></ion-input> 
        </FormRow>
        
        <FormRow title="나이:">
          <ion-input v-model="input.roleAgeEl" ref="roleAgeElRef" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="배역성별:">
          <div class="flex">
            <input id="roleGenderM" ref="roleGenderMElRef" name="roleGender" type="radio"  value="남">
            <label for="roleGenderM" class="p-1 w-full mt-2px text-center">남자</label>
            <input id="roleGenderF" ref="roleGenderFElRef" name="roleGender" type="radio" value="여">
            <label for="roleGenderF" class="p-1 w-full mt-2px text-center">여자</label>
          </div>
        </FormRow>

        <FormRow title="직업:">
          <ion-input v-model="input.roleJobEl" ref="roleJobElRef" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="대사유무:">
          <div class="flex">
          <input id="roleScriptYes" ref="roleScriptYesElRef" name="roleScript" type="radio"  value="1">
          <label for="roleScriptYes" class="p-1 w-full mt-2px text-center">유</label>
          <input id="roleScriptNo" ref="roleScriptNoElRef" name="roleScript" type="radio" value="2">
          <label for="roleScriptNo" class="p-1 w-full mt-2px text-center">무</label>
          </div>
        </FormRow>
        
        <FormRow title="장면수:">
          <ion-input v-model="input.roleScenesCountEl" ref="roleScenesCountElRef" type="text" pattern="[0-9]*"></ion-input>
        </FormRow>
        
        <FormRow title="촬영횟수:">
          <ion-input v-model="input.roleShootingsCountEl" ref="roleShootingsCountElRef" type="text" pattern="[0-9]*"></ion-input>
        </FormRow>

        <FormRow title="배역설명:">
          <ion-input v-model="input.roleCharacterEl" ref="roleCharacterElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="기타:">
          <ion-textarea v-model="input.roleEtcEl" ref="roleEtcElRef"></ion-textarea>
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

import { defineComponent, ref, reactive } from 'vue'
import { IonPage, IonContent, IonDatetime, IonItem, IonLabel, IonInput, IonTextarea, IonRadio, IonRadioGroup } from '@ionic/vue'

import router from '@/router'
import { MainApi, useMainApi } from '../../apis'
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
    IonTextarea,
    IonRadioGroup,
    IonRadio
  },
  props: {
    
  },
  setup(props) {
    const globalState = useGlobalShare();
    
    const mainApiService = useMainService();

    const titleElRef = ref<HTMLIonInputElement>();
    const bodyElRef = ref<HTMLIonInputElement>();
    const roleTypeElRef = ref<HTMLIonInputElement>();
    const locationElRef = ref<HTMLIonInputElement>();
    const periodElRef = ref<HTMLIonInputElement>();
    const managerElRef = ref<HTMLIonInputElement>();
    
    const artworkNameElRef = ref<HTMLIonInputElement>();
    const genreElRef = ref<HTMLIonInputElement>();
    const corpElRef = ref<HTMLIonInputElement>();
    const directorElRef = ref<HTMLIonInputElement>();
    const artworkEtcElRef = ref<HTMLIonInputElement>();
    const fileElRef = ref<HTMLIonInputElement>();

    const roleRealNameElRef = ref<HTMLIonInputElement>();
    const roleNameElRef = ref<HTMLIonInputElement>();
    const payElRef = ref<HTMLIonInputElement>();
    const roleAgeElRef = ref<HTMLIonInputElement>();
    const roleGenderMElRef = ref<HTMLInputElement>();
    const roleGenderFElRef = ref<HTMLInputElement>();
    const roleJobElRef = ref<HTMLIonInputElement>();
    const roleScriptYesElRef = ref<HTMLInputElement>();
    const roleScriptNoElRef = ref<HTMLInputElement>();
    const roleScenesCountElRef = ref<HTMLIonInputElement>();
    const roleShootingsCountElRef = ref<HTMLIonInputElement>();
    const roleEtcElRef = ref<HTMLIonInputElement>();
    
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
      titleEl:'',
      bodyEl:'',
      roleTypeEl:'',
      locationEl:'',
      periodEl:'',
      deadlineEl:'',
      managerEl:'',
      artworkNameEl:'',
      genreEl:'',
      corpEl:'',
      directorEl:'',
      artworkEtcEl:'',
      fileEl: new File([''],''),
      roleRealNameEl:'',
      roleNameEl:'',
      payEl:'',
      roleAgeEl:'',
      roleJobEl:'',
      roleScenesCountEl:'',
      roleShootingsCountEl:'',
      roleCharacterEl:'',
      roleEtcEl:''
    })

    function checkAndWrite() {
      // 제목 체크
      if ( input.titleEl.length == 0 ) {
        alert('제목을 입력해 주세요.');
        state.pageNum = 1;
        titleElRef.value?.setFocus;
        return;
      }

      // 내용 체크
      if ( input.bodyEl.length == 0 ) {
        alert('내용을 입력해 주세요.');
        bodyElRef.value?.focus();
        return;
      }

      // 배역타입 체크
      if ( input.roleTypeEl.length == 0 ) {
        alert('배역타입을 입력해 주세요.');
        roleTypeElRef.value?.focus();
        return;
      }

      // 촬영장소 체크
      if ( input.locationEl.length == 0 ) {
        alert('촬영장소를 입력해 주세요.');
        locationElRef.value?.focus();
        return;
      }

      // 촬영기간 체크
      if ( input.periodEl.length == 0 ) {
        alert('촬영기간을 입력해 주세요.');
        periodElRef.value?.focus();
        return;
      }

      // 모집기간 체크
      if ( input.deadlineEl.length == 0 ){
        alert("모집기간을 입력해 주세요.");
        return;
      }
      const deadline = input.deadlineEl.split('T')[0];

      // 담당자 체크
      if ( input.managerEl.length == 0 ) {
        alert('담당자를 입력해 주세요.');
        managerElRef.value?.focus();
        return;
      }

      // 작품이름 체크
      if ( input.artworkNameEl.length == 0 ) {
        alert('작품이름을 입력해 주세요.');
        artworkNameElRef.value?.focus();
        return;
      }

      // 장르 체크
      if ( input.genreEl.length == 0 ) {
        alert('작품장르를 입력해 주세요.');
        genreElRef.value?.focus();
        return;
      }

      // 제작사 체크
      if ( input.corpEl.length == 0 ) {
        alert('제작사를 입력해 주세요.');
        corpElRef.value?.focus();
        return;
      }

      // 감독 체크
      if ( input.directorEl.length == 0 ) {
        alert('감독을 입력해 주세요.');
        directorElRef.value?.focus();
        return;
      }

      // 배역본명 체크
      if ( input.roleRealNameEl.length == 0 ) {
        alert('배역 본명을 입력해 주세요.');
        roleRealNameElRef.value?.focus();
        return;
      }

      // 배역이름 체크
      if ( input.roleNameEl.length == 0 ) {
        alert('배역 이름을 입력해 주세요.');
        roleNameElRef.value?.focus();
        return;
      }

      // 출연료 체크
      if ( input.payEl.length == 0 ) {
        alert('출연료를 입력해 주세요.');
        payElRef.value?.focus();
        return;
      }

      // 배역나이 체크
      if ( input.roleAgeEl.length == 0 ) {
        alert('배역 나이를 입력해 주세요.');
        roleAgeElRef.value?.focus();
        return;
      }

      // 배역성별 체크
      if ( roleGenderMElRef.value == null ) {
        return;
      }
      if ( roleGenderFElRef.value == null ) {
        return;
      }

      let roleGenderEl = '';
      if( roleGenderMElRef.value.checked ) {
         roleGenderEl = roleGenderMElRef.value.value;
      } else if ( roleGenderFElRef.value.checked ){
         roleGenderEl = roleGenderFElRef.value.value;
      }
      
      if ( roleGenderEl.length == 0 ) {
        alert('배역 성별을 입력해 주세요.');
        return;
      }

      // 배역직업 체크
      if ( input.roleJobEl.length == 0 ) {
        alert('배역 직업을 입력해 주세요.');
        roleJobElRef.value?.focus();
        return;
      }

      // 대사유무 체크
      if ( roleScriptYesElRef.value == null ) {
        return;
      }
      if ( roleScriptNoElRef.value == null ) {
        return;
      }

      let roleScriptEl = '0';
      if( roleScriptYesElRef.value.checked ) {
         roleScriptEl = roleScriptYesElRef.value.value;
      } else if ( roleScriptNoElRef.value.checked ){
         roleScriptEl = roleScriptNoElRef.value.value;
      }
      
      if ( roleScriptEl == '0' ) {
        alert('배역 대사유무를 입력해 주세요.');
        return;
      }

      // 장면수 체크
      if ( input.roleScenesCountEl.length == 0 ) {
        alert('배역 장면수를 입력해 주세요.');
        roleScenesCountElRef.value?.focus();
        return;
      }

      // 촬영횟수 체크
      if ( input.roleShootingsCountEl.length == 0 ) {
        alert('배역 촬영횟수를 입력해 주세요.');
        roleShootingsCountElRef.value?.focus();
        return;
      }


      const startWrite = (genFileIdsStr:string) => {
      
      write( globalState.loginedMember.id , 3, input.titleEl, input.bodyEl, input.roleTypeEl, input.locationEl, input.periodEl, deadline , input.managerEl, 
      input.artworkNameEl, input.genreEl, input.corpEl, input.directorEl, input.artworkEtcEl,
      input.roleRealNameEl, input.roleNameEl, input.payEl, input.roleAgeEl, roleGenderEl, input.roleJobEl, roleScriptEl, input.roleScenesCountEl, input.roleShootingsCountEl, input.roleCharacterEl ,input.roleEtcEl,
      genFileIdsStr);
      
        
      };

      const startFileUpload = (onSuccess:Function) => {
        if ( !!!input.fileEl ) {
          onSuccess("");
          return;
        }
        
        mainApiService.common_recruit_genFile_doUploadForAdd(input.fileEl)
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              alert(axiosResponse.data.msg);
              return;
            }
            else {
              onSuccess(axiosResponse.data.body.genFileIdsStr);
            }
          });
      };
      
      startFileUpload(startWrite);

    }

    function write(memberId:number, boardId:number,  title:String, body:String, roleType:string, location:string, period:string, deadline:string, manager:string,
    artworkName:String, genre:String, corp:String, director:String, artworkEtc:String,
    roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleScenesCount:String, roleShootingsCount:String, roleCharacter:String, actingRoleEtc:String, 
    genFileIdsStr:String) {
       mainApiService.recruit_write(memberId, boardId, title, body, roleType, location, period, deadline, manager, artworkName, genre, corp, director, artworkEtc,
    roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleScenesCount, roleShootingsCount, roleCharacter, actingRoleEtc, genFileIdsStr)
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            Util.showAlert("알림", axiosResponse.data.msg, null);
          }
          Util.showAlert("알림", axiosResponse.data.msg, () => router.replace('/usr/recruit/detail?id='+axiosResponse.data.body.id));
        });
    }

    var fileType = reactive({
      type:''
    })

    function setThumbnail(event:any){
      
      var reader = new FileReader(); 
      fileType.type = event.target.files[0].type as string;
      reader.onload = function(event) { 
        var element:any;
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
        input.fileEl = event.target.files[0];
      }

      function hisback() {
        router.back();
    }

    
    return {
    state,
    globalState,
    input,
    prevPage,
    nextPage,
    checkAndWrite,
    titleElRef,
    bodyElRef,
    roleTypeElRef,
    locationElRef,
    periodElRef,
    managerElRef,
    artworkNameElRef,
    genreElRef,
    corpElRef,
    directorElRef,
    artworkEtcElRef,
    roleRealNameElRef,
    roleNameElRef,
    payElRef,
    roleAgeElRef,
    roleGenderMElRef,
    roleGenderFElRef,
    roleJobElRef,
    roleScriptYesElRef,
    roleScriptNoElRef,
    roleScenesCountElRef,
    roleShootingsCountElRef,
    roleEtcElRef,
    fileElRef,
    router,
    setThumbnail,
    fileType,
    hisback
   }
  },
  methods : {
    

  }
  
  
})
</script>

<style scoped>
input, ion-input, ion-textarea {
  border:1px solid #D4D4D4;
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
</style>