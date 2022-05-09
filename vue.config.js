const path = require('path');

module.exports = {
  // eslint-loader 是否在保存的时候检查 安装@vue/cli-plugin-eslint有效
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template
  runtimeCompiler: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps
    sourceMap: false,
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: '3333',
    open: true, //自动打开浏览器
  },
  chainWebpack: (config) => {
    // 压缩图片
    config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({ bypassOnDebug: true }).end();
  },
  configureWebpack: {
    module: {
      rules: [
        { test: /\.mjs$/, include: /node_modules/, type: 'javascript/auto' },
        { test: /\.md$/, use: [{ loader: 'html-loader' }, { loader: 'markdown-loader' }] },
      ],
    },
  },
};
