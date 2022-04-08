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
  proxy: {
    '/api': {
      target: 'http://mystop.top:8001',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  },
});
