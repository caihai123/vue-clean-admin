<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path || item.title"
      >
        <router-link v-if="item.path" :to="{ path: item.path }">
          {{ item.title }}
        </router-link>
        <span v-else>{{ item.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { treeFilter } from "@/utils/index.js";

export default {
  computed: {
    levelList() {
      const { path, matched } = this.$route;

      const list = treeFilter(
        this.$store.state.layout.menuList,
        (item) => item.path && item.path === path
      );

      let levelList = this.treeTOList(list);
      if (levelList.length) {
        return levelList;
      } else {
        return matched
          .filter((item) => item.meta && item.meta.title)
          .map((item) => ({
            path: item.path,
            title: item.meta.title,
          }));
      }
    },
  },
  methods: {
    // 将一条枝干的树转成一维数组
    treeTOList(treeList) {
      const list = [];
      while (treeList) {
        let item = treeList[0];
        if (item) {
          list.push({
            title: item.title,
            path: item.path,
          });
          treeList = item.children;
        } else {
          treeList = null;
        }
      }
      return list;
    },
  },
};
</script>

<style scoped lang="scss">
.app-breadcrumb {
  line-height: 48px;
  padding-left: 8px;
  font-size: 14px;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}

.dark-theme .app-breadcrumb {
  ::v-deep .el-breadcrumb__inner {
    color: $dark-header-link-color;
  }
}
.dark-theme .el-breadcrumb__item:last-child .el-breadcrumb__inner a {
  color: $dark-header-link-color;
}
</style>
