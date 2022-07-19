import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
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
  // mfsu: {},
  fastRefresh: {},
});
