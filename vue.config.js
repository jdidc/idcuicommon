const isDev = process.env.NODE_ENV === 'development';

// 发布的时候，手动将其改为true
const isPublish = process.env.NODE_ENV === 'production';
module.exports = {
  publicPath: isDev ? '/idcuicommon/' : '/',
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
