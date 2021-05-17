<template>
<div class="fixed w-full pt-2 z-10 bg-white">
      <div class="flex justify-between mx-2">
        <ion-button color="medium" :onclick="dismissModal">취소</ion-button>
        <ion-button color="medium" :onclick="confirm">확인</ion-button>
      </div>
      <ion-searchbar clear-icon="close-sharp" debounce="700" @ionChange="searchKeyword($event)"></ion-searchbar>
    </div>
  <ion-content class="ion-padding relative">
    <div class="mt-28">
      <ion-card v-bind:key="item" v-for="item in list.arr" class="p-2 py-4">
        <img :src="item.image" class="mx-auto">
          <ion-card-header>
            <ion-card-title class="text-center">
              {{item.title}}
            </ion-card-title>
            <ion-card-subtitle class="text-center">
              {{item.subtitle}}
            </ion-card-subtitle>
          </ion-card-header>
          <div class="mx-auto flex">
            <ion-checkbox :checked="item.isChecked" @ionChange="checkMovie(item, $event)" class="mx-auto"></ion-checkbox>  
          </div>
      </ion-card>
    </div>

    <ion-infinite-scroll threshold="150px" id="infinite-scroll" @ionInfinite="loadData($event)" class='mt-4'>
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="불러오는 중..">
        </ion-infinite-scroll-content>
    </ion-infinite-scroll>

  </ion-content>
</template>

<script lang="ts">
import { useMainService } from '@/services';
import { pdFilmgraphy } from '@/stores';
import { IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import axios from 'axios';
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'SearchMovie',
  components: { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle, IonInfiniteScroll, IonInfiniteScrollContent  },
  props:{
    title:{
      type:String
    },
    curmodal:{
      type: Object,
      required:true
    }
  },
  setup(props) {

    const mainApiService = useMainService();

    // 페이지가 불러와지면 배열 선언 후 기존의 회원 작품 정보를 담는다. (검색 취소 시 초기 상태로 되돌리기 위함)    
    onMounted(() => {
      for( let i = 0 ; i < pdFilmgraphy.movieList.length; i++) {
          initialMovieList.push(pdFilmgraphy.movieList[i]);
      }     
    })
    const initialMovieList = [] as any;

    /*
    function searchKeyword (event:any){
      mainApiService.searchMvList(event?.target.value)
      .then(axiosResponse => {
      
      list.arr.length = [] as any;

        if(event.target.value.length > 0){
          for( var i = 0 ; i < axiosResponse.data.movieListResult.movieList.length ; i++ ){
                  let isChecked = false;

                  if ( isChecked == false ) {
                    for ( var k = 0; k <  pdFilmgraphy.movieList.length; k++ ){  
                      if ( pdFilmgraphy.movieList[k].movieCd == axiosResponse.data.movieListResult.movieList[i].movieCd ){
                        isChecked = true;
                        break;
                      } else {
                        isChecked = false;
                      }
                    }
                  }
                  
                  let movie = {
                    movieCd: axiosResponse.data.movieListResult.movieList[i].movieCd,
                    movieNm: axiosResponse.data.movieListResult.movieList[i].movieNm,
                    isChecked: isChecked
                  }
                  list.arr.push(movie);
          }
        }
      });
    }
    */

   let keyword = '';
   
    function searchKeyword (event: any){
      keyword = event.target.value;
      mainApiService.naverMovieApi(event?.target.value, 1)
      .then(axiosResponse => {
        
        movieTotalCount = axiosResponse.data.total;
        
        list.arr.length = [] as any;

        if(event.target.value.length > 0){
          for( let i = 0 ; i < axiosResponse.data.items.length ; i++ ){
            
            let isChecked = false;
            // naverMovieApi로 영화 목록 받아온 후 회원에게 이미 등록된 작품이면 체크 된 상태로 만들어두기
            if ( isChecked == false ) {
              for ( let k = 0; k <  pdFilmgraphy.movieList.length; k++ ){  
                  if ( pdFilmgraphy.movieList[k].image == axiosResponse.data.items[i].image ){
                    isChecked = true;
                    break;
                  } else {
                    isChecked = false;
                  }
                }
              }
            // naverMovieApi로 받아온 영화에 들어있는 태그들 제거하고 객체정보로 넣어서 배열에 담기  
            let title = axiosResponse.data.items[i].title.replaceAll("<b>","");
            title = title.replaceAll("</b>","");
            let subtitle = axiosResponse.data.items[i].subtitle.replaceAll("<b>","");
            subtitle = subtitle.replaceAll("</b>","");
            const movie = {
              title: title,
              subtitle: subtitle,
              director: axiosResponse.data.items[i].director,
              image: axiosResponse.data.items[i].image,
              link: axiosResponse.data.items[i].link,
              isChecked: isChecked
            }
            list.arr.push(movie);
          }
        }
      });
    }

    let startIndex = 1;
    let movieTotalCount = 0;

    function movieLoad(keyword: any, startIndex:any){
      
       mainApiService.naverMovieApi(keyword, startIndex)
      .then(axiosResponse => {
       
        if(keyword.length > 0){
          for( let i = 0 ; i < axiosResponse.data.items.length ; i++ ){
            
            let isChecked = false;
            // naverMovieApi로 영화 목록 받아온 후 회원에게 이미 등록된 작품이면 체크 된 상태로 만들어두기
            if ( isChecked == false ) {
              for ( let k = 0; k <  pdFilmgraphy.movieList.length; k++ ){  
                  if ( pdFilmgraphy.movieList[k].image == axiosResponse.data.items[i].image ){
                    isChecked = true;
                    break;
                  } else {
                    isChecked = false;
                  }
                }
              }
            // naverMovieApi로 받아온 영화에 들어있는 태그들 제거하고 객체정보로 넣어서 배열에 담기  
            let title = axiosResponse.data.items[i].title.replaceAll("<b>","");
            title = title.replaceAll("</b>","");
            let subtitle = axiosResponse.data.items[i].subtitle.replaceAll("<b>","");
            subtitle = subtitle.replaceAll("</b>","");
            const movie = {
              title: title,
              subtitle: subtitle,
              director: axiosResponse.data.items[i].director,
              image: axiosResponse.data.items[i].image,
              link: axiosResponse.data.items[i].link,
              isChecked: isChecked
            }
            list.arr.push(movie);
          }
        }
      });
    }

    async function loadData(event: any){
      
     if( startIndex < movieTotalCount){
        event.target.removeAttribute('disable');
     }
     if ( startIndex >= movieTotalCount ) {
        event.target.setAttribute('disabled' , 'true');
        return;
     }
     
      await wait(500);
      event.target.complete();
      startIndex = startIndex + 10;
      addData(startIndex);
    }

    function addData(startIndex: number){
      if(startIndex < movieTotalCount){
        movieLoad(keyword,startIndex);
      }
    }

    async function wait(time: any) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('');
        }, time);
      });
    }

    const list = reactive({
      arr: [] as any
    })

    function checkMovie(item: any, event: any){
      if(event.detail.checked){
        item.isChecked = true;
        pdFilmgraphy.movieList.push(item);
      } else {
        for(let i = 0 ; i < pdFilmgraphy.movieList.length ; i++){
          if(item.title == pdFilmgraphy.movieList[i].title){
            pdFilmgraphy.movieList.splice(i,1);
            break;
          }
        }
      }
      
    }

    function confirm(){
      props.curmodal.dismiss();
    }

    function dismissModal() {
      // 취소를 눌렀을 때 작품 리스트를 초기 상태로 되돌린다.
      pdFilmgraphy.movieList = initialMovieList;
      props.curmodal.dismiss();
    }

    return {
      list,
      checkMovie,
      loadData,
      dismissModal,
      confirm,
      searchKeyword
    }
  }
});
</script>

<style scoped>
ion-card {
  border-radius:25px;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.25);
  border:2px solid #DADADA;
}
</style>