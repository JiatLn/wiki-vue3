import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Front',
    component: () => import('@/pages/Front.vue'),
    redirect: {
      name: 'SpaceList',
    },
    children: [
      {
        name: 'SpaceList',
        path: '/spaces',
        component: () => import('@/pages/Front/SpaceList.vue'),
      },
      {
        name: 'SpaceDetail',
        path: '/spaces/:id',
        component: () => import('@/pages/Front/SpaceDetail.vue'),
      },
    ],
  },
];

export default routes;
