<template>
<ion-page>
  <ion-content :fullscreen="true">
    
     
          
  <div class="flex flex-col min-h-screen mb-20">

     <TitleBar title="Audictionary" btn_back="true"></TitleBar>

    <div class="flex flex-col mt-4 container mx-auto">
      
      <form action="" v-on:submit.prevent="checkAndModify" class="mx-4">

        <FormRow title="이름:">
          <ion-input v-model="input.nameEl" ref="nameElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="비밀번호:">
          <ion-input v-model="input.loginPwEl" ref="loginPwElRef" type="password"></ion-input>
        </FormRow>

         <FormRow class="mt-7" title="주소:">
          <ion-input readonly="true" v-model="input.addressEl" ref="addressElRef" type="text" placeholder="주소" enterkeyhint="next" class="input-address relative pr-10">
            <ion-button color="light" class="absolute right-0" @click="openApi">검색</ion-button>
          </ion-input>
          <div v-if="api.isTrue" class="my-4">
            <VueDaumPostcode @complete="confirm"/>
          </div>
          <ion-input v-model="input.address2El" ref="addressElRef" type="text" placeholder="상세주소" enterkeyhint="next" class="mt-2"></ion-input>
        </FormRow>

        <FormRow title="전화번호:">
          <ion-input v-model="input.cellPhoneNoEl" ref="cellPhoneNoElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="직급:">
          <ion-input v-model="input.jobPositionEl" ref="jobPositionElRef" type="text"></ion-input>
        </FormRow>

        <FormRow title="회사:">
          <ion-input v-model="input.corpNameEl" ref="corpNameElRef" type="text"></ion-input>
        </FormRow>
        
        <FormRow title="작품:">
             <ion-button color="light" :onclick="openModal">검색</ion-button>
             <ion-item-sliding  v-bind:key="item" v-for="item in pdFilmgraphy.movieList">
              <ion-item lines="none">
                <ion-label>{{item.title}}</ion-label>
                <img :src=item.image>
              </ion-item>
              <ion-item-options side="end">
                <ion-item-option @click="deleteItem(item)">제거</ion-item-option>
              </ion-item-options>
            </ion-item-sliding>
        </FormRow>  

        <FormRow title="프로필 이미지:" v-if="globalState.loginedMember.loginedMemberType == 'pd'">
            <ion-input v-model="input.fileEl" @ionChange="setProfileImg($event)" type="file" accept="image/*"></ion-input>
        </FormRow>

        <input accept="true" type="submit" class="w-full mt-10 text-center btn-next text-xs mx-auto p-2">
      </form>
      </div>
    </div>
  </ion-content>
</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { IonPage, IonContent, IonIcon, IonInput, IonButton, IonLabel, IonItem, IonItemSliding, IonItemOption, IonItemOptions, IonPopover, IonModal, modalController } from '@ionic/vue'
import { returnUpBackOutline } from 'ionicons/icons'


import { sha256 } from 'js-sha256'
import { pdFilmgraphy, useGlobalShare } from '@/stores'
import * as Util from '@/utils'
import { useMainService } from '@/services'

import SearchMovie from './SearchMovie.vue'
import '../global.css'
import axios from 'axios'
import { IPd } from '@/types'

export default defineComponent({
  name: 'JoinSelectPage',
  components: {
    IonPage,
    IonContent,
    IonIcon,
    IonInput,
    IonButton, 
    IonLabel, 
    IonItem,
    IonItemSliding, 
    IonItemOption, 
    IonItemOptions,
    IonPopover,
    IonModal,
    SearchMovie
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const mainApiService = useMainService();
    const globalState = useGlobalShare();
    
    const nameElRef = ref<HTMLInputElement>();
    const loginPwElRef = ref<HTMLInputElement>();
    const addressElRef = ref<HTMLInputElement>();
    const cellPhoneNoElRef = ref<HTMLInputElement>();
    const jobPositionElRef = ref<HTMLInputElement>();
    const corpNameElRef = ref<HTMLInputElement>();
    
    const input = reactive({
      nameEl:globalState.loginedMember.name,
      loginPwEl:'',
      address:'',
      addressEl:globalState.loginedMember.address ? globalState.loginedMember.address : '',
      address2El:'',
      cellPhoneNoEl:globalState.loginedMember.cellPhoneNo,
      jobPositionEl:globalState.loginedMember.jobPosition,
      corpNameEl:globalState.loginedMember.corpName,
      fileEl: new File([""],"")
    })

    onMounted(() => {
        loadData();
    })

    const state = reactive({
      pd: {} as IPd,
      artworks: [] as any,
    })
    

    function loadData(){
      mainApiService.pd_showDetail(props.id)
      .then(axiosResponse => {
        state.pd = axiosResponse.data.body.pd;
      })


      mainApiService.pd_getArtwork(props.id)
      .then(axiosResponse => {
        if( !!!axiosResponse.data.fail ){
          state.artworks = axiosResponse.data.body.artworks;
          pdFilmgraphy.movieList = axiosResponse.data.body.artworks;
        }
        
      })
    }

  
   function setProfileImg(event:any){
        input.fileEl = event.target.children[0].files[0];
   }

    let isFileUploaded = false;

    function checkAndModify() {
      pdFilmgraphy.movieList = pdFilmgraphy.movieList;
      var artwork = JSON.stringify(pdFilmgraphy.movieList);
      
      let loginPwRealEl = '';
        if (input.loginPwEl.length > 0 ){
          loginPwRealEl = sha256(input.loginPwEl);
        }

      
      if ( input.addressEl.length > 0 && input.address2El.length > 0 ){
        input.address = input.addressEl + "//" +input.address2El;
      }
      
        
      const startModify = () => {

        if ( input.fileEl != null && input.fileEl.size > 0) {
          isFileUploaded = true;
        }

         modify(Util.toStringOrNull(globalState.loginedMember.id), input.nameEl, loginPwRealEl, input.address, input.cellPhoneNoEl, input.jobPositionEl, input.corpNameEl, artwork, isFileUploaded);


      }

      startModify();

    }

    function modify(loginedMemberId:string, name:string, loginPwReal:string, address:string, cellPhoneNo:string,  jobPosition:string, corpName:string, artwork:string, isFileUploaded:boolean ){
         mainApiService.pd_doModify( loginedMemberId, name, loginPwReal, address, cellPhoneNo, jobPosition, corpName, artwork, isFileUploaded )
        .then(axiosResponse => {
          if ( axiosResponse.data.fail ) {
            return;
          }
        
        const loginedPd = axiosResponse.data.body.pd;
          
          if( loginedPd.name != null ){
              localStorage.removeItem("loginedMemberName");
              localStorage.setItem("loginedMemberName", loginedPd.name);
          }
          if( loginedPd.cellPhoneNo != null ){
              localStorage.removeItem("loginedMemberCellPhoneNo");
              localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          }
          if( loginedPd.address != null ){
              localStorage.removeItem("loginedMemberAddress");
              localStorage.setItem("loginedMemberAddress", loginedPd.address);
          }
          if( loginedPd.jobPosition != null ){
              localStorage.removeItem("loginedMemberJobPosition");
              localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          }
          if( loginedPd.corpName != null ){
              localStorage.removeItem("loginedMemberCorpName");
              localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          }
          if( loginedPd.extra__thumbImg != null ){
              localStorage.removeItem("loginedMemberExtra__thumbImg");
              localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra__thumbImg);
          }
          
          
          if ( isFileUploaded ){
            doFileUpload();
          }else{
            Util.showAlert("알림",axiosResponse.data.msg, () => location.replace('/usr/pd/info?id='+globalState.loginedMember.id));
          }
          
    });
      }


     function doFileUpload(){
        if(globalState.loginedMember.id == null){
          return;
        }

        mainApiService.common_pdGenFile_doUpload(input.fileEl, Util.toStringOrNull(globalState.loginedMember.id))
          .then(axiosResponse => {
            if ( axiosResponse.data.fail ) {
              return;
            }

            mainApiService.pd_update(Util.toStringOrNull(globalState.loginedMember.id))
            .then( axiosResponse => {
              if(axiosResponse.data.fail){
                return;
              }
              const loginedPd = axiosResponse.data.body.pd;
          
          if( loginedPd.name != null ){
              localStorage.removeItem("loginedMemberName");
              localStorage.setItem("loginedMemberName", loginedPd.name);
          }
          if( loginedPd.cellPhoneNo != null ){
              localStorage.removeItem("loginedMemberCellPhoneNo");
              localStorage.setItem("loginedMemberCellPhoneNo", loginedPd.cellPhoneNo);
          }
          if( loginedPd.address != null ){
              localStorage.removeItem("loginedMemberAddress");
              localStorage.setItem("loginedMemberAddress", loginedPd.address);
          }
          if( loginedPd.jobPosition != null ){
              localStorage.removeItem("loginedMemberJobPosition");
              localStorage.setItem("loginedMemberJobPosition", loginedPd.jobPosition);
          }
          if( loginedPd.corpName != null ){
              localStorage.removeItem("loginedMemberCorpName");
              localStorage.setItem("loginedMemberCorpName", loginedPd.corpName);
          }
          if( loginedPd.extra__thumbImg != null ){
              localStorage.removeItem("loginedMemberExtra__thumbImg");
              localStorage.setItem("loginedMemberExtra__thumbImg", loginedPd.extra__thumbImg);
          }
          
          Util.showAlert("알림","회원정보수정",() => location.replace('/usr/pd/info?id='+globalState.loginedMember.id));

            })
            
          });
        }

 
        const items = reactive({
          arr: pdFilmgraphy.movieList
        })

    function deleteItem(item:any){
      for(var i = 0; i < items.arr.length; i++) {
      if(items.arr[i].title == item.title && items.arr[i].director == item.director){
        pdFilmgraphy.movieList.splice(i, 1);
      }

    }
    };

     const isOpenRef = ref(false);
    
    const setOpen = (isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }
    const setClose = ( isOpened: boolean) => {
      isOpenRef.value = isOpened;
    }

    
     async function openModal() {
      const modal = await modalController
        .create({
          component: SearchMovie,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'New Title',
            curmodal: modalController
          },
        })
        
      return modal.present();
        
    }

    const api = reactive({
      isTrue:false
    })

    function openApi(){
      if( api.isTrue ){
        api.isTrue = false;
      } else {
        api.isTrue = true;
      }
    }

    function confirm(result:any){
      if(result.buildingName.length > 0 ){
        input.addressEl = result.address + " ("+result.buildingName +")";
      } else {
        input.addressEl = result.address;
      }
      api.isTrue = false;
    }

  
    

    return { 
      globalState,
      items,
      deleteItem,
      input,
      nameElRef,
      loginPwElRef,
      addressElRef,
      cellPhoneNoElRef,
      jobPositionElRef,
      corpNameElRef,
      checkAndModify,
      modify,
      returnUpBackOutline,
      setProfileImg,
      isOpenRef,
      setOpen,
      setClose,
      openModal,
      pdFilmgraphy,
      api,
      openApi,
      confirm
    }
  }
  
})
</script>

<style scoped>
input, ion-input {
  border:2px solid #D4D4D4;
}
ion-card {
  border-radius:25px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border:2px solid #DADADA;
}
</style>