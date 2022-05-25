import Vue from 'vue'
import App from './App.vue'
// import VueResource from 'vue-resource'
import router from './router/index';
import VueRouter from 'vue-router';
import mock from "./plugins/mock"
Vue.config.productionTip = false
    // Vue.use(VueResource)
Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router,
}).$mount('#app')