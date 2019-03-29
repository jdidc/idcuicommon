const isProduction = process.env.NODE_ENV === 'production';
// 发布的时候，手动将其改为true
const isPublish = true;
module.exports = {
  publicPath: isProduction ? '/idcuicommon/' : '/',
  outputDir: isPublish ? 'dist' : 'docs',
  chainWebpack: (config) => {
    if (isPublish) {
      config.externals({
        vue: {
          root: 'Vue',
          commonjs: 'vue',
          commonjs2: 'vue',
          amd: 'vue',
        },
        xlsx: 'xlsx',
        iview: 'iview',
      });
    }
  },
  css: {
    extract: false,
  },
};
