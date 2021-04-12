<template>
<ion-page>
  <ion-content :fullscreen="true">
  <div class="flex flex-col min-h-screen mb-20">
   
  <TitleBar title="Audictionary" btn_back="true"></TitleBar>    
  
  <div class="font-roboto font-black detail-container container flex flex-col mx-auto">
    <div class="w-full mx-auto mt-4 text-center">
      <div class="text-lg font-coda font-bold">{{state.recruit.extra__aw_title}}</div>
      <div v-if="state.dateDiff >= 0" class="text-xs mt-2">남은 기간: {{state.dateDiff}}일</div>
      <div v-if="state.dateDiff < 0" class="text-xs mt-2">기한 마감</div>
      <router-link v-if="state.recruit.memberId == globalState.loginedMember.id" :to="`/usr/recruit/modify?id=${state.recruit.id}`">수정</router-link>

      <div class="flex">
      <div class="ml-auto mr-4 text-xs font-bold">{{state.recruit.extra__aw_media}}/{{state.recruit.extra__aw_genre}}</div>
      </div>  

      <div v-if="state.recruit.extra != null && state.recruit.extra.file__common__attachment[0].fileExtTypeCode == 'img'" class="img-container mx-4 mb-4 p-4 mt-1">  
      <img :src="state.recruit.extra.file__common__attachment[0].forPrintUrl" class="detail_img mx-auto">
      </div>

      <ion-thumbnail v-if="state.recruit.extra == null" class="w-60 h-60 mx-auto">  
      <ion-img src="/gen/Avatar.jpeg" alt="Avatar" class="w-60 h-60 object-contain mx-auto"></ion-img>
      </ion-thumbnail>
    </div>

    <div class="w-full text-xs mx-auto">
      <ion-grid class="mx-2">
        <ion-row>
      <div class="mx-auto">감독: {{state.recruit.extra__aw_director}}</div>
        </ion-row>
        <ion-row class="mt-2">
          <ion-col>
      <div>작가(원작). {{state.recruit.extra__aw_writer}}</div>
          </ion-col>
          <ion-col>
          <div>제작사. {{state.recruit.extra__aw_corp}}</div>
          </ion-col>
        </ion-row>
        <ion-row>
        <ion-col>
      <div>프로듀서. {{state.recruit.extra__aw_producer}}</div>
        </ion-col>
        <ion-col>
      <div>캐스팅담당자. {{state.recruit.extra__aw_castingManager}}</div>
        </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <div class="mx-4 mt-10">
      <span>스토리 라인(줄거리).</span>
      <div class="detail-box mt-2">{{state.recruit.extra__aw_story}}</div>
    </div>

    <div class="mx-4 mt-10">
      <span>기타사항.</span>
      <div class="detail-box mt-2">{{state.recruit.extra__aw_etc}}</div>
    </div>

    <hr class="my-10 mx-4">

    <div class="mx-auto text-center text-xl">
      <span class="subtitle">배역 상세 내용</span>
    </div>

    <div class="mx-auto text-center text-lg mt-6">
      <span>배역. {{state.recruit.extra__ar_name}}</span>
    </div>

    <div class="w-full text-xs mx-auto">  
      <ion-grid class="mx-2">
        <ion-row>
          <ion-col>
      <div>배역나이. {{state.recruit.extra__ar_age}}</div>
          </ion-col>
          <ion-col>
      <div>배역성별. {{state.recruit.extra__ar_gender}}</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
      <div>배역직업. {{state.recruit.extra__ar_job}}</div>
          </ion-col>
          <ion-col>
      <div>대사유무. {{state.recruit.extra__ar_scriptStatus}}</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>  

    <div class="mx-4 mt-6">
      <span>배역 상세 설정.</span>
      <div class="detail-box mt-2">{{state.recruit.extra__ar_character}}</div>
    </div>

    <hr class="my-10 mx-4">

    <div class="mx-auto text-center text-xl">
      <span class="subtitle">촬영 설명</span>
    </div>

    <div class="w-full text-xs mx-auto mt-6">  
      <ion-grid class="mx-2">
        <ion-row>
          <ion-col>
      <div>촬영기간. {{state.recruit.period}}</div>
          </ion-col>
          <ion-col>
      <div>촬영지역. {{state.recruit.location}}</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
      <div>장면 수. {{state.recruit.extra__ar_scenesCount}}</div>
          </ion-col>
          <ion-col>
      <div>촬영횟수. {{state.recruit.extra__ar_shootingsCount}}</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>  

    <hr class="my-10 mx-4">

    <div class="mx-auto text-center text-xl">
      <span class="subtitle">지원 자격</span>
    </div>  

     <div class="w-full text-xs mx-auto mt-6">  
      <ion-grid class="mx-2">
        <ion-row>
          <ion-col>
      <div>성별. {{state.recruit.gender}}</div>
          </ion-col>
          <ion-col>
      <div>나이대. {{state.recruit.age}}</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
      <div>우대사항. {{state.recruit.etc}}</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>  

    <div class="mx-auto text-center text-xl mt-6">
      <span class="subtitle">지원 필요 서류</span>
    </div>  

    <div class="mx-4 mt-6 flex justify-between"><span class="text-sm">현재 사진.</span><span class="text-xs font-normal">*일주일 내 찍은 사진만 가능</span></div>

    <div class="mx-4 mt-4 flex justify-between"><span class="text-sm">연기 영상.</span><span class="text-xs font-normal">*직접 촬영만 가능</span></div>

    <div class="mx-4 mt-2 text-sm">연기 촬영 시간. {{state.recruit.videoTime}}</div>

    <div class="mx-4 mt-8">
      <span>연기 대사.</span>
      <div class="detail-box mt-2">{{state.recruit.script}}</div>
    </div>

    <div class="mx-4 mt-6">
      <span>기타사항.</span>
      <div class="detail-box mt-2">{{state.recruit.etc}}</div>
    </div>


    <div class="flex w-full mx-auto mt-8 text-sm">
      <div class="btn-like py-1 px-10 bg-black text-white mx-auto">좋아요</div>
      <div class="btn-apply py-1 px-10 mx-auto">지원하기</div>
    </div>
  </div>
  

</div>
  

</ion-content>

</ion-page>
</template>

<script lang="ts">
import { defineComponent,  reactive, onMounted } from 'vue'
import { IonPage, IonContent, IonIcon, IonGrid, IonCol, IonRow, IonThumbnail, IonImg, IonAvatar  } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'
import router from '@/router'
import { IRecruit, IArtwork, IActingRole } from '../../types'

import { useGlobalShare } from '@/stores'
import { useMainService } from '@/services'


export default defineComponent({
  components: { 
    IonPage,
    IonContent,
    IonIcon,
    IonGrid, 
    IonCol, 
    IonRow,
    IonThumbnail, 
    IonImg, 
    IonAvatar 
    },
  name: 'RecruitDetailPage',
  props:{
    id: {
      type: Number,
      required:true
    }
  },
  setup(props) {
      const globalState = useGlobalShare();
      const mainApiService = useMainService();
      
      
      const state = reactive({
      recruit: {} as IRecruit,
      dateDiff: 0
      });

    

    function loadRecruit(id:number) {
      mainApiService.recruit_detail(id)
      .then(axiosResponse => {
        state.recruit = axiosResponse.data.body.recruit;
        let today = new Date();
        let regDate = new Date(state.recruit.deadline);
      
      state.dateDiff = Math.ceil((regDate.getTime()-today.getTime())/(1000*3600*24)); 
      });
    }


    onMounted(() => {
      loadRecruit(props.id);
    });

    function hisback() {
      router.back();
    }
      

    return {
      state,    
      hisback,
      returnUpBackOutline,
      globalState
    }
  }
})

</script>

<style scoped>
.detail-container{
  border-top:1px solid rgba(0,0,0,0.3);
}
.img-container{
  background-color: #D4D4D4;
}
.btn-like {
  border:2px solid black;
  border-radius:6px;
}
.btn-apply {
  border:2px solid black;
  border-radius:6px;
}
.detail-box{
  border:1px solid black;
  border-radius:5px;
  padding:5px;
  min-height:50px;
}
hr {
  height:1px;
  background-color:rgba(0, 0, 0, 0.3);
}
.subtitle{
background: linear-gradient(white 60%,rgba(200, 94, 94, 0.5) 40%);
}
</style>