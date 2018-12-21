/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import IdcCommonUI from '../src/index';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(IdcCommonUI);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
const router = new VueRouter({
    routes: [
        {
            path: '/idcHeader',
            component: require('./routers/idcHeader.vue')
        },
        {
            path: '/Table',
            component: require('./routers/Table.vue')
        },
        {
            path: '/idc_export_button',
            component: require('./routers/idcExportButton.vue')
        }
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
