export default {
  entry: ['src/index.ts'],
  esm: {
    type: 'babel',
    file: 'taro-vues',
    mjs: true,
    minify: true,
  },
  cjs: {
    type: 'babel',
    file: 'taro-vues',
    lazy: true,
    minify: true,
  },
  umd: {
    globals: {
      vue: 'vue',
      '@tarojs/taro': 'Taro',
      querystring: 'querystring',
    },
    name: 'taro-vues',
    file: 'taro-vues',
    minFile: true,
    sourcemap: true,
  },
  injectCSS: false, // 不注入css
  extractCSS: false, // 单独提取css
  runtimeHelpers: true,
  disableTypeCheck: true,
};
