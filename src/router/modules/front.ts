import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Front',
    component: () => import('@/pages/Front.vue'),
    // redirect: {
    //   name: 'EquipList',
    // },
    // children: [],
  },
];

export default routes;
