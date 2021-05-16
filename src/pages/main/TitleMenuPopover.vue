<template>
  <ion-content class="ion-padding">
    <!-- 임시로 주석 처리, 나중에 내용 만들어지면 주석해제하고 onClick으로 페이지 이동 만들기
    <ion-item lines="none" button="true">
      <ion-label color="light" class="text-center">
        이것만은 꼭!
      </ion-label>
    </ion-item>

    <ion-item lines="none" button="true">
      <ion-label color="light" class="text-center">
        공지사항
      </ion-label>
    </ion-item>

    <ion-item lines="none" button="true">
      <ion-label color="light" class="text-center">
        문의사항
      </ion-label>
    </ion-item>

    <ion-item lines="none" button="true">
      <ion-label color="light" class="text-center">
        About Audictionary
      </ion-label>
    </ion-item>
    -->
  
    <ion-item lines="none" button="true" :onclick="moveInfoPage">
      <ion-label color="light" class="text-center">
        마이 페이지
      </ion-label>
    </ion-item>

    <ion-item lines="none" button="true" :onclick="moveModifyPdPage">
      <ion-label color="light" class="text-center">
        프로필 편집
      </ion-label>
    </ion-item>

    <ion-item lines="none" button="true" :onclick="logout">
      <ion-label color="light" class="text-center">
        로그아웃
      </ion-label>
    </ion-item>
  </ion-content>
</template>

<script>
import { useGlobalShare } from '@/stores';
import { IonContent, IonItem, IonLabel, popoverController, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import router from '@/router'
import { useMainService } from '@/services';

export default defineComponent({
  name: 'TitleMenuPopover',
  components: { IonContent, IonItem, IonLabel },
  setup(){
    const globalState = useGlobalShare();
    const mainApiService = useMainService();

    function moveInfoPage(){
      popoverController.dismiss();
      router.push('/usr/pd/info?id='+globalState.loginedMember.id);
    }

    function moveModifyPdPage(){
      popoverController.dismiss();
      router.push('/usr/pd/modify?id='+globalState.loginedMember.id);
    }

    async function logout(){
        const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: '로그아웃?',
          message: '로그아웃 하시겠습니까?',
          buttons: [
            {
              text: '취소',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
              },
            },
            {
              text: '로그아웃',
              handler: () => {
                logoutPd();
                popoverController.dismiss();
              },
            },
          ],
        });
      return alert.present();

      function logoutPd(){
        mainApiService.pd_doLogout()
        .then(axiosResponse => {
          globalState.logout();
        })
      }
    }

    return{
      moveInfoPage,
      moveModifyPdPage,
      logout
    }
  }
});
</script>

<style scoped>
ion-content{
  --background: #C85E5E;
}
ion-item {
  --background: #C85E5E;
}
ion-item::after{
  content:'';
  display:block;
  background-color:white;
  width:90%;
  height:1px;
  margin:0 auto;
}
</style>