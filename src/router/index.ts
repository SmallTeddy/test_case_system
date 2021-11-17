import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return originalPush.call(this, location).catch((err: any) => err);
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/evaluate',
        component: () => import('@/views/evaluate/Evaluate.vue')
      },
      {
        path: '/form',
        component: () => import('@/views/form/Form.vue')
      },
      {
        path: '/editor',
        component: () => import('@/views/editor/Editor.vue')
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/Setting.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/notfound/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
