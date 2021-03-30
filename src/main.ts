import { createApp } from 'vue'
import App from './App.vue'

import FormRow from './components/FormRow.vue'
import TitleBar from './components/TitleBar.vue'
import BottomBar from './components/BottomBar.vue'

import { IonicVue } from '@ionic/vue';

import { globalShare, globalShareSymbol } from './stores';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

import router from './router'
/* Theme variables */
import './theme/variables.css';
import './index.css'

// MainApi 불러오기
import { mainApi, mainApiSymbol } from './apis/'


// 폰트어썸 불러오기
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, fas, faBars, faHome, faSearch, faComment, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faUserSecret );
library.add( fas );
library.add( faBars );
library.add( faHome );
library.add( faSearch );
library.add( faComment );
library.add( faUser );
library.add( faArrowLeft );

const app = createApp(App);

  app.component('FormRow', FormRow);
  app.component('TitleBar', TitleBar);
  app.component('BottomBar', BottomBar);
  app.component('FontAweSomeIcon', FontAwesomeIcon);
  app.use(IonicVue);
  app.use(router);
  app.provide(globalShareSymbol,globalShare());
  app.provide(mainApiSymbol, mainApi());

  router.isReady().then(() => {
    app.mount('#app');
  });
  
// 전역 라이브러리 등록
app.config.globalProperties.$router = router;