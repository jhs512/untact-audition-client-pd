<template>
<ion-page>
  <ion-content fullscreen="true">
  <div class="flex flex-col relative min-h-screen mb-20">

    <TitleBar v-if="state.pageNum == 1" title="공고 등록 페이지">
      <div class="hisback absolute left-5" v-on:click="hisback"><FontAweSomeIcon :icon="['fas' , 'arrow-left']" /></div>
    </TitleBar>

    <TitleBar v-if="state.pageNum == 2" title="작품 정보 등록 페이지">
      <div class="hisback absolute left-5" v-on:click="hisback"><FontAweSomeIcon :icon="['fas' , 'arrow-left']" /></div>
    </TitleBar>

    <TitleBar v-if="state.pageNum == 3" title="배역 정보 등록 페이지">
      <div class="hisback absolute left-5" v-on:click="hisback"><FontAweSomeIcon :icon="['fas' , 'arrow-left']" /></div>
    </TitleBar>

    <div class="container mx-auto mt-8 flex flex-col flex-1">
      <form action="" v-on:submit.prevent="checkAndWrite" class="mx-4">
        <input ref="loginedMemberIdElRef" type="hidden" :value="globalShare.loginedMember.id">
        
      <section v-show="state.pageNum == 1">
        <FormRow title="제목:">
          <input ref="titleElRef" type="text" class="p-1 w-full mt-2px" style="">
        </FormRow>

        <FormRow title="내용:">
          <textarea ref="bodyElRef" class="md:h-60 h-32 p-1 w-full mt-2px"></textarea>
        </FormRow>

        <FormRow title="배역:">
          <input ref="roleTypeElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="촬영장소:">
          <input ref="locationElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="촬영기간:">
          <input ref="periodElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="모집기한날짜:">
          <ion-item >
            <ion-datetime id="ion-datetime" placeholder="날짜를 선택해주세요." picker-format="YYYYMMDD" display-format="YYYY - MM - DD" max="2050-12-31" done-text="확인" cancel-text="취소"></ion-datetime>
          </ion-item>
         
        </FormRow>

        <FormRow title="담당자:">
          <input ref="managerElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>
        <div v-on:click="nextPage" class="w-full mt-10 text-center btn-next text-xs text-white mx-auto p-2">다음</div>
      </section>

      
      <section v-show="state.pageNum == 2">
        <FormRow title="작품이름:">
          <input ref="artworkNameElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="장르:">
          <input ref="genreElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="제작사:">
          <input ref="corpElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="감독:">
          <input ref="directorElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="기타:">
          <textarea ref="artworkEtcElRef" class="p-1 w-full mt-2px"></textarea>
        </FormRow>

        <FormRow title="파일첨부:">
          <input ref="fileElRef" type="file" class="p-1 w-full mt-2px" v-on:change="setThumbnail">
        </FormRow>
        <div id="image_container" class="mx-auto">
          <img src="" alt="" class="mx-auto">
        </div>
        <div class="flex justify-around mx-auto">
        <div v-on:click="prevPage" class="w-full mr-1 mt-10 text-center btn-next text-xs text-white p-2">이전</div>
      <div v-on:click="nextPage" class="w-full ml-1 mt-10 text-center btn-next text-xs text-white p-2">다음</div>
      </div>
      </section>

      <section v-show="state.pageNum == 3">
        <FormRow title="배역본명:">
          <input ref="roleRealNameElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>

        <FormRow title="배역이름:">
          <input ref="roleNameElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>
        
        <FormRow title="출연료:">
          <input ref="payElRef" type="text" class="p-1 w-full mt-2px">
        </FormRow>
        
        <FormRow title="나이:">
          <input ref="roleAgeElRef" type="text" class="p-1 w-full mt-2px">
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
          <input ref="roleJobElRef" type="text" class="p-1 w-full mt-2px">
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
          <input ref="roleSceneCountElRef" type="text" class="p-1 w-full mt-2px" pattern="[0-9]*">
        </FormRow>
        
        <FormRow title="촬영횟수:">
          <input ref="roleShootingCountElRef" type="text" class="p-1 w-full mt-2px" pattern="[0-9]*">
        </FormRow>

        <FormRow title="기타:">
          <textarea ref="actingRoleEtcElRef" class="p-1 w-full mt-2px"></textarea>
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

import { defineComponent, getCurrentInstance, ref, reactive, computed, watch } from 'vue'
import { IonPage, IonContent, IonDatetime, IonItem, IonLabel, pickerController } from '@ionic/vue'

import { Router } from 'vue-router'
import { MainApi, useMainApi } from '../../apis'

export default defineComponent({
  name: 'WriteRecruitPage',
  components: {
    IonPage,
    IonContent,
    IonDatetime,
    IonItem,
    IonLabel,    
  },
  props: {
    globalShare: {
      type: Object,
      required:true
    }
  },
  setup(props) {
    const router:Router = getCurrentInstance()?.appContext.config.globalProperties.$router;
    const mainApi:MainApi = useMainApi();

    const titleElRef = ref<HTMLInputElement>();
    const bodyElRef = ref<HTMLInputElement>();
    const roleTypeElRef = ref<HTMLInputElement>();
    const locationElRef = ref<HTMLInputElement>();
    const periodElRef = ref<HTMLInputElement>();
    const managerElRef = ref<HTMLInputElement>();
    
    const artworkNameElRef = ref<HTMLInputElement>();
    const genreElRef = ref<HTMLInputElement>();
    const corpElRef = ref<HTMLInputElement>();
    const directorElRef = ref<HTMLInputElement>();
    const artworkEtcElRef = ref<HTMLInputElement>();
    const fileElRef = ref<HTMLInputElement>();

    const roleRealNameElRef = ref<HTMLInputElement>();
    const roleNameElRef = ref<HTMLInputElement>();
    const payElRef = ref<HTMLInputElement>();
    const roleAgeElRef = ref<HTMLInputElement>();
    const roleGenderMElRef = ref<HTMLInputElement>();
    const roleGenderFElRef = ref<HTMLInputElement>();
    const roleJobElRef = ref<HTMLInputElement>();
    const roleScriptYesElRef = ref<HTMLInputElement>();
    const roleScriptNoElRef = ref<HTMLInputElement>();
    const roleSceneCountElRef = ref<HTMLInputElement>();
    const roleShootingCountElRef = ref<HTMLInputElement>();
    const actingRoleEtcElRef = ref<HTMLInputElement>();
    
   const state = reactive({
     pageNum :1
   })
    
    function prevPage() {
      state.pageNum--;
    }
    function nextPage() {
      state.pageNum++;
    }

    

    function checkAndWrite() {
      // 제목 체크
      if ( titleElRef.value == null ) {
        return;
      }

      const titleEl = titleElRef.value;

      if ( titleEl.value.length == 0 ) {
        alert('제목을 입력해 주세요.');
        state.pageNum = 1;
        titleEl.focus();
        return;
      }

      // 내용 체크
      if ( bodyElRef.value == null ) {
        return;
      }

      const bodyEl = bodyElRef.value;

      if ( bodyEl.value.length == 0 ) {
        alert('내용을 입력해 주세요.');
        bodyEl.focus();
        return;
      }

      // 배역타입 체크
      if ( roleTypeElRef.value == null ) {
        return;
      }

      const roleTypeEl = roleTypeElRef.value;

      if ( roleTypeEl.value.length == 0 ) {
        alert('배역타입을 입력해 주세요.');
        roleTypeEl.focus();
        return;
      }

      // 촬영장소 체크
      if ( locationElRef.value == null ) {
        return;
      }

      const locationEl = locationElRef.value;

      if ( locationEl.value.length == 0 ) {
        alert('촬영장소를 입력해 주세요.');
        locationEl.focus();
        return;
      }

      // 촬영기간 체크
      if ( periodElRef.value == null ) {
        return;
      }

      const periodEl = periodElRef.value;

      if ( periodEl.value.length == 0 ) {
        alert('촬영기간을 입력해 주세요.');
        periodEl.focus();
        return;
      }

      // 모집기간 체크
      const deadline = document.querySelector('ion-datetime')?.value?.split('T')[0];
      if (deadline == null){
        return;
      }
      if (deadline.length == 0 ){
        return;
      }
      // 담당자 체크
      if ( managerElRef.value == null ) {
        return;
      }

      const managerEl = managerElRef.value;

      if ( managerEl.value.length == 0 ) {
        alert('담당자를 입력해 주세요.');
        managerEl.focus();
        return;
      }

      // 작품이름 체크
      if ( artworkNameElRef.value == null ) {
        return;
      }

      const artworkNameEl = artworkNameElRef.value;

      if ( artworkNameEl.value.length == 0 ) {
        alert('작품이름을 입력해 주세요.');
        artworkNameEl.focus();
        return;
      }

      // 장르 체크
      if ( genreElRef.value == null ) {
        return;
      }

      const genreEl = genreElRef.value;

      if ( genreEl.value.length == 0 ) {
        alert('작품장르를 입력해 주세요.');
        genreEl.focus();
        return;
      }

      // 제작사 체크
      if ( corpElRef.value == null ) {
        return;
      }

      const corpEl = corpElRef.value;

      if ( corpEl.value.length == 0 ) {
        alert('제작사를 입력해 주세요.');
        corpEl.focus();
        return;
      }

      // 감독 체크
      if ( directorElRef.value == null ) {
        return;
      }

      const directorEl = directorElRef.value;

      if ( directorEl.value.length == 0 ) {
        alert('감독을 입력해 주세요.');
        directorEl.focus();
        return;
      }

      // 배역본명 체크
      if ( roleRealNameElRef.value == null ) {
        return;
      }

      const roleRealNameEl = roleRealNameElRef.value;

      if ( roleRealNameEl.value.length == 0 ) {
        alert('배역 본명을 입력해 주세요.');
        roleRealNameEl.focus();
        return;
      }

      // 배역이름 체크
      if ( roleNameElRef.value == null ) {
        return;
      }

      const roleNameEl = roleNameElRef.value;

      if ( roleNameEl.value.length == 0 ) {
        alert('배역 이름을 입력해 주세요.');
        roleNameEl.focus();
        return;
      }

      // 출연료 체크
      if ( payElRef.value == null ) {
        return;
      }

      const payEl = payElRef.value;

      if ( payEl.value.length == 0 ) {
        alert('출연료를 입력해 주세요.');
        payEl.focus();
        return;
      }

      // 배역나이 체크
      if ( roleAgeElRef.value == null ) {
        return;
      }

      const roleAgeEl = roleAgeElRef.value;

      if ( roleAgeEl.value.length == 0 ) {
        alert('배역 나이를 입력해 주세요.');
        roleAgeEl.focus();
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
      if ( roleJobElRef.value == null ) {
        return;
      }

      const roleJobEl = roleJobElRef.value;

      if ( roleJobEl.value.length == 0 ) {
        alert('배역 직업을 입력해 주세요.');
        roleJobEl.focus();
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
      if ( roleSceneCountElRef.value == null ) {
        return;
      }

      const roleSceneCountEl = roleSceneCountElRef.value;

      if ( roleSceneCountEl.value.length == 0 ) {
        alert('배역 장면수를 입력해 주세요.');
        roleSceneCountEl.focus();
        return;
      }

      // 촬영횟수 체크
      if ( roleShootingCountElRef.value == null ) {
        return;
      }

      const roleShootingCountEl = roleShootingCountElRef.value;

      if ( roleShootingCountEl.value.length == 0 ) {
        alert('배역 촬영횟수를 입력해 주세요.');
        roleShootingCountEl.focus();
        return;
      }

      // 기타사항 체크
      if(artworkEtcElRef.value == null){
        return;
      }
      if(actingRoleEtcElRef.value == null){
        return;
      }
      
      const artworkEtcEl = artworkEtcElRef.value;
      const actingRoleEtcEl = actingRoleEtcElRef.value;

      const startWrite = (genFileIdsStr:string) => {
      
      write( props.globalShare.loginedMember.id , 3, titleEl.value, bodyEl.value, roleTypeEl.value, locationEl.value, periodEl.value, deadline , managerEl.value, 
      artworkNameEl.value, genreEl.value, corpEl.value, directorEl.value, artworkEtcEl.value,
      roleRealNameEl.value, roleNameEl.value, payEl.value, roleAgeEl.value, roleGenderEl, roleJobEl.value, roleScriptEl, roleSceneCountEl.value, roleShootingCountEl.value, actingRoleEtcEl.value,
      genFileIdsStr);
      
        
      };

      const startFileUpload = (onSuccess:Function) => {
        if ( !!!fileElRef.value?.files ) {
          onSuccess("");
          return;
        }
        
        mainApi.common_genFile_doUpload(fileElRef.value?.files[0])
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
    roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleSceneCount:String, roleShootingCount:String, actingRoleEtc:String,
    genFileIdsStr:String) {
       mainApi.recruit_write(memberId, boardId, title, body, roleType, location, period, deadline, manager, genFileIdsStr)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.body.id ) {
            writeArtwork(axiosResponse.data.body.id, artworkName, genre, corp, director, artworkEtc);
            writeActingRole(axiosResponse.data.body.id, roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleSceneCount, roleShootingCount, actingRoleEtc );
            router.replace('/usr/recruit/detail?id='+axiosResponse.data.body.id);
          }
        });
    }

    function writeArtwork( newRecruitmentId:number,  artworkName:String, genre:String, corp:String, director:String, artworkEtc:String, ) {
       mainApi.recruit_writeArtwork(newRecruitmentId, artworkName, genre, corp, director, artworkEtc )
        .then(axiosResponse => {
          
          if ( axiosResponse.data.body.id ) {
            
          }
    
        });
    }

     function writeActingRole( newRecruitmentId:number,  roleRealName:String, roleName:String, pay:String, roleAge:String, roleGender:String, roleJob:String, roleScript:String, roleScencCount:String, roleShootingCount:String, actingRoleEtc:String ) {
       mainApi.recruit_writeActingRole(newRecruitmentId, roleRealName, roleName, pay, roleAge, roleGender, roleJob, roleScript, roleScencCount, roleShootingCount, actingRoleEtc)
        .then(axiosResponse => {
          
          if ( axiosResponse.data.body.id ) {
            
          }
    
        });
    }

    
    function setThumbnail(event:any){
      
      var reader = new FileReader(); 
      
      reader.onload = function(event) { 
        var img = document.querySelector('img'); 
        if( img == null ) {
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
        img?.setAttribute("src", event.target.result); 
        document.querySelector("div#image_container")?.appendChild(img); 
        }; 
        reader.readAsDataURL(event.target.files[0]);
      }

      function hisback() {
        router.back();
    }

    
    return {
    state,
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
    roleSceneCountElRef,
    roleShootingCountElRef,
    actingRoleEtcElRef,
    fileElRef,
    router,
    setThumbnail,
    hisback
   }
  },
  methods : {
    

  }
  
  
})
</script>

<style scoped>
input {
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