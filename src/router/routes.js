const routes = [
  {
    path: '/:roomId?',
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
