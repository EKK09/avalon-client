const routes = [
  {
    path: '/',
    component: () => import('pages/EntrancePage.vue'),
  },
  {
    path: '/game',
    component: () => import('layouts/GameLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
