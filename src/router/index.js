/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-20 09:02:14
 * @LastEditors: 192.168.0.12
 * @LastEditTime: 2023-02-02 10:24:36
 * @FilePath: \meet\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'signIn',
            component: () => import('@/views/signIn.vue'),
        },
        {
            path: '/signOut/:id',
            name: 'signOut',
            component: () => import('@/views/signOut.vue')
        },
        {
            path: '/404',
            name: 'demo',
            component: () => import('@/views/demo.vue')
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})

export default router
