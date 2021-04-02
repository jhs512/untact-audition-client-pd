<template>
  <ion-content class="ion-padding">
    <ion-button :onclick="dismissModal">Close</ion-button>
    <ion-button :onclick="confirm">Confirm</ion-button>
    <ion-searchbar clear-icon="close-sharp" debounce="700" @ionChange="searchKeyword($event)"></ion-searchbar>
             <ion-item lines="none" v-bind:key="item" v-for="item in list.arr">
              <ion-label class="text-center">
                {{item.movieNm}}
              </ion-label>
              <ion-checkbox :checked="item.isChecked" @ionChange="checkMovie(item, $event)"></ion-checkbox>
            </ion-item>
  </ion-content>
</template>

<script lang="ts">
import { useMainService } from '@/services';
import { pdFilmgraphy } from '@/stores';

import { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar } from '@ionic/vue';

import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'SearchMovie',
  components: { IonContent, IonItem, IonLabel, IonCheckbox, IonButton, IonSearchbar },
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

    

    function searchKeyword (event:any){
      mainApiService.searchMvList(event?.target.value)
    .then(axiosResponse => {

      list.arr.length = [] as any;

      if(event.target.value.length > 0){
        for( var i = 0 ; i < axiosResponse.data.movieListResult.movieList.length ; i++ ){
                let isChecked = false;
                for( var j = 0 ; j < selectedMovieList.movies.length ; j++ ){
                  if ( selectedMovieList.movies[j].movieNm == axiosResponse.data.movieListResult.movieList[i].movieNm ){
                    isChecked = true;
                    break;
                  } else {
                    isChecked = false;
                  }
                }

                if ( isChecked == false ) {
                  for ( var k = 0; k <  pdFilmgraphy.movieList.length; k++ ){  
                      if ( pdFilmgraphy.movieList[k].movieNm == axiosResponse.data.movieListResult.movieList[i].movieNm ){
                        isChecked = true;
                        break;
                      } else {
                        isChecked = false;
                      }
                    }
                  }
                
                let movie = {
                  movieNm: axiosResponse.data.movieListResult.movieList[i].movieNm,
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

    function checkMovie(item:any, event:any){
      if(event.detail.checked){
        item.isChecked = true;
        pdFilmgraphy.movieList.push(item);
      } else {
        for(var i = 0 ; i < pdFilmgraphy.movieList.length ; i++){
          if(item.movieNm == pdFilmgraphy.movieList[i].movieNm){
            pdFilmgraphy.movieList.splice(i,1);
            break;
          }
        }
      }
      
    }

    const selectedMovieList = reactive ({
      movies: [] as any
    })

    function confirm(){
      props.curmodal.dismiss();
    }

    function dismissModal() {
      props.curmodal.dismiss();
    }

    return {
      list,
      checkMovie,
      dismissModal,
      confirm,
      searchKeyword,
      selectedMovieList
    }
  }
});
</script>

<style scoped>
</style>