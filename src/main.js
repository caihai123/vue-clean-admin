import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "@/permissions.js"; // 路由权限
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "@/assets/theme/index.css"; //换肤样式
import "@/assets/style/index.scss"; //全局公共样式
import Fragment from "vue-fragment"; // 可产生虚拟根节点
import ElTableEdit from "el-table-edit";
import vClickOutside from "v-click-outside";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Fragment.Plugin);
Vue.use(ElTableEdit);
Vue.use(vClickOutside); // 在元素外部点击时触发

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
