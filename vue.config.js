const commit = require("./commit.js");

// 打包时间（启动时间）
const nowDate = new Date();
const buildDate = `${nowDate.getFullYear() +
  "-" +
  (nowDate.getMonth() + 1) +
  "-" +
  nowDate.getDate() +
  " " +
  nowDate.getHours() +
  ":" +
  nowDate.getMinutes() +
  ":" +
  nowDate.getSeconds()}`;

module.exports = {
  filenameHashing: true, //是否在文件名中包含了 hash 以便更好的控制缓存
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env"].commitHash = JSON.stringify(commit.commitHash);
      args[0]["process.env"].buildDate = JSON.stringify(buildDate);
      return args;
    });
  },
  devServer: {
    https: false,
    port: 1234,
    // open: 'Chrome'//构建完成之后自动打开谷歌
    proxy: {
      "/api": {
        target: "https://caihai123.com",
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
