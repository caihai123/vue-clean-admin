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
import "@/filters/index"; // 全局过滤器

Vue.config.productionTip = false;

// 设置element组件默认值
ElementUI.Input.props.clearable = {
  type: Boolean,
  default: true,
};
ElementUI.Select.props.clearable = {
  type: Boolean,
  default: true,
};

Vue.use(ElementUI);
Vue.use(Fragment.Plugin);
Vue.use(ElTableEdit);

Vue.prototype.$ELEMENT = { size: "medium", zIndex: 3000 };

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
