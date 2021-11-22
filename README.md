# vue-clean-admin

> 一个简单干净的后台管理框架

### 预览链接

- https://caihai123.com/vue-clean-admin/
- https://caihai123.gitee.io/vue-clean-admin/

> 参考框架：[vue-element-admin](https://gitee.com/panjiachen/vue-element-admin)

### 介绍

思来想去也就做了一件有意义的事情，就是使用后端返回的路由表控制路由权限，后端返回的数据格式应该是这样

```json
[
  {
    "id": "1",
    "type": "1",// 1 代表是菜单 2 代表是目录
    "path": "/index",
    "title": "首页",
    "icon": "el-icon-s-home",
    "affix": true,// 最好把首页设置为true
    "index": 1
  },
  {
    "id": "2",
    "type": "2",
    "title": "权限管理",
    "icon": "el-icon-s-tools",
    "index": 2,
    "children": [
      {
        "parentId": "2",
        "id": "2-1",
        "type": "1",
        "path": "/permis/menu",
        "title": "菜单管理",
        "index": 1
      },
      {
        "parentId": "2",
        "id": "2-2",
        "type": "1",
        "path": "/permis/role",
        "title": "角色管理",
        "index": 2
      },
      {
        "parentId": "2",
        "id": "2-3",
        "type": "1",
        "path": "/permis/account",
        "title": "用户管理",
        "index": 3
      }
    ]
  }
]
```

### 目录结构

```bash
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # api管理
│   ├── assets                 # 图片，字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── layout                 # 全局 layout
│   ├── pages                  # 业务相关页面
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── variables              # 全局css变量
│   ├── views                  # 所有框架自带的页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── .browserslistrc            # 配置兼容浏览器
├── .eslintrc.js               # ESLint规则
├── .gitignore                 # git忽略文件配置
├── .prettierrc.js             # prettier配置
├── package-lock.json          # 依赖版本描述文件
├── package.json               # package.json
├── README.md                  # 项目描述文件
└── vue.config.js              # vue-cli 配置
```

### 安装

```bash
# 克隆项目
git clone https://github.com/caihai123/vue-clean-admin.git
# or
git clone https://gitee.com/caihai123/vue-clean-admin.git

# 进入项目目录
cd vue-clean-admin

# 安装依赖，不建议使用 cnpm 或者 yarn 安装
npm install

# 本地开发 启动项目
npm run dev
```

> 项目中的所有代码都需要通过 [ESLint](https://eslint.bootcss.com/) 的检测，为了保持更好的开发体验，建议在 vscode 中安装 ESLint 和 Prettier 插件并添加以下配置：
> `
> "editor.codeActionsOnSave": {

    "source.fixAll.eslint": true

},
`

### 开发注意事项

- 后端返回的`path`必须和本地路由表完全对应，它是通过地址匹配
- 所有页面都应该是一级页面，否则会没有路由缓存
- 所有页面都必须同时在页面和路由配置中添加 `name` 属性，否则也不会有路由缓存
- 最好在给任何用户都分配出“首页”的权限