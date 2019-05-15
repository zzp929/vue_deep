import Vue from 'vue'
import App from './app.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter);
Vue.use(Vuex)

const router = createRouter();
const store = createStore();
// 路由守卫
// 全局前置守卫，每次路由改变都会被首先调用
router.beforeEach((to, from, next) => {
    console.log(to);
    console.log(from);
    console.log('全局 beforeEach 守卫')
    next()
    // if (to.fullPath === '/app') {
    //     next('/login1')
    // } else {
    //     next()
    // }
});
// 和 router.beforeEach 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to, from, next) => {
    console.log('全局 beforeResolve 守卫')
    next()
});
// 全局后置钩子
router.afterEach((to, from) => {
    console.log('全局 afterEach 守卫')
});
new Vue({
    el: '#root',
    router,
    store,
    render: (h) => h(App)
})
