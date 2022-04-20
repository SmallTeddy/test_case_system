import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './components';
import './styles/index.less';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import VueCodemirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import "codemirror/theme/dracula.css"
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false;

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.use(VueCodemirror);

new Vue({
  el: '#app',
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
