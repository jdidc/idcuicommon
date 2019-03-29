const isProduction = process.env.NODE_ENV === 'production';
const isPublish = false;
module.exports = {
  baseUrl: isProduction ? '/idcuicommon/' : '/',
  outputDir: 'docs',
  chainWebpack: (config) => {
    if (isPublish) {
      config.externals({
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
        axios: 'axios',
        iview: 'iview',
      });
    }
  },
  css: {
    extract: false,
  },
};
