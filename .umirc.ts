import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: 'login' },
    { path: '/demo', component: 'demo' },
    { path: '/home', component: 'home' },
    { path: '/user', component: 'user' },
    { path: '/home/video', component: 'home/videoPage' },
    { path: '/home/editor', component: 'user/editor' },
    { path: '/home/upload', component: 'user/upload' },
    { path: '/create', component: 'create' },
    { path: '/history', component: 'HistoryView' },
    // CreateCharts HistoryView
    {
      path: '/', component: 'index',
      routes: [
        { path: '/home', component: 'home' },
      ]
    },
  ],
  proxy: {
    '/api': {
      target: 'http://mystop.top:8001/',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  },
  mfsu: {},
  fastRefresh: {},
});
