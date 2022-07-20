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
      component: '@/pages/Xflow',
    },
  ],
  base: process.env.BUILD_ENV === 'github' ? '/designable-xflow/dist/' : '/',
  publicPath: process.env.BUILD_ENV === 'github' ? './' : '/',
  mfsu: {},
  fastRefresh: {},
});
