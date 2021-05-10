<template>
  <ion-content class="ion-padding">
    <ion-button :onclick="dismissModal">Close</ion-button>
    <ion-button :onclick="confirm">Confirm</ion-button>
    <ion-searchbar clear-icon="close-sharp" debounce="700" @ionChange="searchKeyword($event)"></ion-searchbar>
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
  </ion-content>
</template>

<script lang="ts">
import { useMainService } from '@/services';
import { pdFilmgraphy } from '@/stores';

import { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';

import { defineComponent, onMounted, reactive } from 'vue';
import { text } from '@fortawesome/fontawesome-svg-core';

export default defineComponent({
  name: 'SearchMovie',
  components: { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar, IonText, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle  },
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
      
        
      
    })
    }
    */

    function searchKeyword (event: any){
      mainApiService.naverMovieApi(event?.target.value)
    .then(axiosResponse => {
      
      list.arr.length = [] as any;

      if(event.target.value.length > 0){
        for( let i = 0 ; i < axiosResponse.data.items.length ; i++ ){
          
                let isChecked = false;

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
      
        
      
    })
    }

    const list = reactive({
      arr: [] as any
    })

    const initialMovieList = [] as any;

      onMounted(() => {
        for( let i = 0 ; i < pdFilmgraphy.movieList.length; i++) {
           initialMovieList.push(pdFilmgraphy.movieList[i]);
        }     
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
      pdFilmgraphy.movieList = initialMovieList;
      props.curmodal.dismiss();
    }

    return {
      list,
      checkMovie,
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