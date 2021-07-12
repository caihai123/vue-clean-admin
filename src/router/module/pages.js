// 在这里注册你的业务页面
export default [
  {
    path: "/form",
    name: "Form",
    component: () => import(/* webpackChunkName: "form" */ "@/pages/Form.vue"),
    meta: {},
  },
  {
    path: "/menu1",
    name: "Menu1",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu1.vue"),
    meta: {},
  },
  {
    path: "/menu2",
    name: "Menu2",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu2.vue"),
    meta: {},
  },
  {
    path: "/menu3",
    name: "Menu3",
    component: () => import(/* webpackChunkName: "menu" */ "@/pages/Menu3.vue"),
    meta: {},
  },
  {
    path: "/nested",
    name: "Nested",
    component: () =>
      import(/* webpackChunkName: "nested" */ "@/pages/Nested/index.vue"),
    meta: {},
  },
  {
    path: "/nested/details",
    name: "NesteDetails",
    component: () =>
      import(/* webpackChunkName: "nested" */ "@/pages/Nested/details.vue"),
    meta: {},
  },
];
