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
            name: 'NoteDetail',
            path: '/space/:sid/note/:nid',
            component: () => import('@/pages/Front/NoteDetail.vue'),
          },
        ],
      },
    ],
  },
  {
    name: 'NoteNew',
    path: '/space/:sid/note/new',
    component: () => import('@/pages/Front/NoteNew.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: {
      name: 'Front',
    },
  },
];

export default routes;
