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

const { Button, ...Element } = ElementUI;

Vue.use(Element);
Vue.use(Fragment.Plugin);
Vue.use(ElTableEdit);
// 重写el-button，给el-button添加水波纹
Vue.component("el-button", {
  render: function(h) {
    return h(
      Button,
      {
        props: this.$attrs,
        on: this.$listeners,
        directives: [{ name: "waves" }],
      },
      this.$slots.default
    );
  },
});

// 水波纹指令
import waves from "@/directive/waves/index.js";
Vue.directive("waves", waves); // 全局注册

// 设置element组件默认值
Vue.prototype.$ELEMENT = { size: "medium", zIndex: 3000 };
Element.Input.props.clearable = {
  type: Boolean,
  default: true,
};
Element.Select.props.clearable = {
  type: Boolean,
  default: true,
};

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
