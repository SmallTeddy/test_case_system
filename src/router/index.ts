import Vue from 'vue';
import VueRouter, { RouteConfig, RawLocation, Route } from 'vue-router';

const originalPush = VueRouter.prototype.push as unknown as Promise<Route>;
VueRouter.prototype.push = function push(location: RawLocation) {
  return (originalPush as any).call(this, location).catch((err: Error) => err);
};

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    children: [
      {
        path: '/',
        component: () => import('@/views/home/Home.vue'),
      },
      {
        path: '/evaluate',
        component: () => import('@/views/evaluate/Evaluate.vue'),
      },
      {
        path: '/form',
        component: () => import('@/views/form/Form.vue'),
      },
      {
        path: '/editor',
        component: () => import('@/views/editor/Editor.vue'),
      },
      {
        path: '/code',
        component: () => import('@/views/codePage/CodePage.vue'),
      },
      {
        path: '/graph',
        component: () => import('@/views/graph/Graph.vue'),
      },
      {
        path: '/diff',
        component: () => import('@/views/diff/Diff.vue'),
      },
      {
        path: '/drag',
        component: () => import('@/views/dragPage/DragPage.vue'),
      },
      {
        path: '/setting',
        component: () => import('@/views/setting/Setting.vue'),
      },
      {
        path: '/markdown',
        component: () => import('@/views/markdown/MarkdownPage.vue'),
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/notfound/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
