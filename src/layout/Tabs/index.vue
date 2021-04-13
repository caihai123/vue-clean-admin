<template>
  <div class="container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <draggable
        v-model="tabsItem"
        v-bind="options"
        group="people"
        @start="drag = true"
        @end="drag = false"
        tag="span"
      >
        <template v-for="(item, index) in tabsItem">
          <el-popover
            placement="bottom"
            trigger="manual"
            :key="item.path"
            popper-class="layout--tabs--popover"
            v-model="item.visible"
          >
            <ul v-click-outside="closeTabsPopver">
              <li @click="refresh(item)">刷新</li>
              <li v-if="!item.affix" @click="delTabs(item)">
                关闭
              </li>
              <li @click="closeOthers(item)">关闭其他</li>
              <li @click="closeAll(item)">关闭所有</li>
            </ul>

            <router-link
              slot="reference"
              ref="tag"
              class="tabs-item"
              :to="item.to"
              @contextmenu.prevent.native="openTabsPopver(index)"
            >
              {{ item.title }}
              <i
                class="el-icon-close"
                v-if="!item.affix"
                @click.prevent.stop="delTabs(item)"
              ></i>
            </router-link>
          </el-popover>
        </template>
      </draggable>
    </scroll-pane>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ScrollPane from "./ScrollPane";

export default {
  components: {
    draggable,
    ScrollPane,
  },
  data() {
    return {
      options: {
        animation: 300, //拖动过程中的延时动画
        forceFallback: false, //是否显示原生的html5的拖放
        ghostClass: "ghost-class", //拖动项的类名
        scroll: true, //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
        scrollSensitivity: 100, //就是鼠标靠近边缘多远开始滚动默认30
        scrollSpeed: 500, //滚动速度，单位应该是:像素/秒
      },
    };
  },
  mounted() {
    this.$store.commit("addTabs", this.$route);
  },
  methods: {
    moveToCurrentTag() {
      this.$nextTick(() => {
        const tags = this.$refs.tag || [];
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveCenter(tag);
            break;
          }
        }
      });
    },
    // 打开popver
    openTabsPopver(index) {
      const list = this.tabsItem.map((item) => {
        return {
          ...item,
          visible: false,
        };
      });
      list[index].visible = true;
      this.tabsItem = list;
    },
    // 关闭popver
    closeTabsPopver() {
      const list = this.tabsItem.map((item) => {
        return {
          ...item,
          visible: false,
        };
      });
      this.tabsItem = list;
    },
    //刷新
    refresh(item) {
      this.$store.commit("setRedirectName", item.name);
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + item.to,
        });
      });
    },
    //删除tabs
    delTabs(item) {
      this.closeTabsPopver();
      if (item.affix) return;
      this.$store.commit("delTabs", item);
    },
    //关闭其他
    closeOthers(item) {
      this.closeTabsPopver();
      this.$store.commit("closeOthers", item);
    },
    //关闭所有
    closeAll() {
      this.$store.commit("emptyTabs"); //清空tabs
    },
  },
  computed: {
    // tabs标签列表
    tabsItem: {
      get() {
        return this.$store.state.layout.tabs;
      },
      set(value) {
        this.$store.commit("replaceTabs", value);
      },
    },
  },
  watch: {
    $route() {
      this.$store.commit("addTabs", this.$route);
      this.moveToCurrentTag();
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  position: relative;
  background-color: #dcdfe6;
}
.tabs-item {
  display: inline-block;
  overflow: hidden;
  height: 30px;
  line-height: 30px;
  margin-right: 8px;
  padding: 0 12px;
  border: 1px solid #f2f6fc;
  background-color: #f2f6fc;
  color: #909399;
  cursor: pointer;
}
.tabs-item:hover {
  color: #606266;
  border-color: #fff;
  background-color: #fff;
}
.tabs-item:hover::before {
  background: $tabs-item-active-color;
}
.tabs-item i {
  margin-left: 5px;
}

.router-link-active {
  background: #fff;
  border-color: #fff;
  color: #606266;
}
.router-link-active:hover {
  background: #fff;
  border-color: #fff;
  color: #909399;
}
.tabs-item::before {
  content: "";
  background: #dcdfe6;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin: 0 2px;
}
.router-link-active::before {
  content: "";
  background: $tabs-item-active-color;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin: 0 2px;
}

.ghost-class {
  opacity: 0;
}
.el-icon-close {
  border-radius: 50%;
  font-size: 12px;
}
.el-icon-close:hover {
  background-color: #c0c4cc;
  color: #fff;
}
</style>
<style>
body .layout--tabs--popover {
  min-width: 100px;
  padding: 5px 0;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
body .layout--tabs--popover ul {
  list-style-type: none;
}
body .layout--tabs--popover li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
body .layout--tabs--popover li:hover {
  background: #eee;
}
</style>
