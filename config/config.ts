import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  history: {
    type: process.env.BUILD_ENV === 'github' ? 'hash' : 'browser',
  },
  routes: [
    {
      path: '/',
      redirect: '/xflow',
    },
    {
      name: '流程可视化',
      path: '/xflow',
      icon: 'SmileOutlined',
      component: '@/pages/xflow',
    },
    {
      name: '表单模板',
      path: '/playground',
      icon: 'FormOutlined',
      component: '@/pages/playground',
    },
    {
      name: '表单设计',
      path: '/playground/details',
      component: '@/pages/playground/details',
      headerRender: false,
      footerRender: false,
      menuRender: false,
      hideInMenu: true,
    },
  ],
  publicPath: process.env.BUILD_ENV === 'github' ? './' : '/',
  hash: true,
  mfsu: {},
  fastRefresh: {},
});
