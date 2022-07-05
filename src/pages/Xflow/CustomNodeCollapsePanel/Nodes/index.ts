const files = require.context('.', false, /\.tsx$/);
const modules: { [key: string]: any } = {};

files.keys().forEach(async (key) => {
  if (key === './index.tsx') return;
  const module = await files(key);
  modules[key.replace(/(\.\/|\.tsx)/g, '')] = module.default;
});

export default modules;
