<template>
  <component :is="group ? 'el-button-group' : 'fragment'">
    <el-button
      v-for="(item, index) in butList"
      :key="item.key || index"
      :type="item.type || type"
      :size="item.size || size"
      :plain="item.plain || plain"
      :round="item.round || round"
      :circle="item.circle || circle"
      :disabled="item.disabled || disabled"
      :loading="item.loading"
      :icon="item.icon"
      @click="item.onClick(...params) || undefined"
    >
      {{ item.text }}
    </el-button>
  </component>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: () => [],
    },
    // 是否以按钮组的形式展现
    group: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: "small",
    },
    type: {
      type: String,
      default: "primary",
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },

    // 按钮列表
    butList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
