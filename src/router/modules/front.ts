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
        path: '/space',
        component: () => import('@/pages/Front/SpaceList.vue'),
      },
      {
        name: 'SpaceDetail',
        path: '/space/:sid',
        component: () => import('@/pages/Front/SpaceDetail.vue'),
        children: [
          {
            name: 'Note',
            path: '/space/:sid/note/:nid',
            component: () => import('@/pages/Front/Note.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'Front',
    },
  },
];

export default routes;
