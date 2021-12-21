import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import '@purge-icons/generated';

import '@/assets/styles/app.scss';
import '@/assets/styles/_global.scss';
import 'element-plus/dist/index.css';
import VMdEditor from './lib/mdEditor';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(pinia).use(VMdEditor);

app.config.globalProperties.$ELEMENT = {
  // options
  size: 'small',
};

app.mount('#app');
