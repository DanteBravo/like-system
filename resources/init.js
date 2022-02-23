import Vue from "vue";
import VueRouter from "vue-router";

import Likes from "./public/views/Likes";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Likes,
        }
    ],
    mode: "history"
});

new Vue({
    router
}).$mount('#app');