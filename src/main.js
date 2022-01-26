import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './includes/firebase';
import i18n from './includes/i18n';
import Icon from './directives/icon';
import VeeValidatePlugin from './includes/validation';
import GlobalComponents from './includes/_globals';
import './assets/tailwind.css';
import './assets/css/main.css';
import './registerServiceWorker';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(i18n)
      .use(store)
      .use(VeeValidatePlugin)
      .use(GlobalComponents)
      .use(router);
    app.directive('icon', Icon);
    app.mount('#app');
  }
});
