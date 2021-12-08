module.exports = {
  filenameHashing: true, //是否在文件名中包含了 hash 以便更好的控制缓存
  devServer: {
    https: false,
    port: 1234,
    // open: 'Chrome'//构建完成之后自动打开谷歌
    proxy: {
      "/api": {
        target: "https://qcrxr3.api.cloudendpoint.cn",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  publicPath: "./",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/variables/style.scss";`,
      },
    },
  },
};
