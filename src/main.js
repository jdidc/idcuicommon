import Vue from 'vue';
import App from './App.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import idcuicommon from './components/index.js';
import VueRouter from 'vue-router';

Vue.use(iView);
Vue.use(idcuicommon);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/export-button',
      component: () => import('./example/ExportButton.vue'),
    },
    {
      path: '/description-list',
      component: () => import('./example/DescriptionList.vue'),
    },
  ],
});

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
