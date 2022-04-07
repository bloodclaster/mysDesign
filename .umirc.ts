import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path:'/login',component: '@/pages/login'},
    {
      path: '/', component: '@/pages/index',
      routes: [
        // { path: '/list', component: 'list' },
        // { path: '/admin', component: 'admin' },
      ],
    },
  ],
  mfsu:{},
  fastRefresh: {},
});
