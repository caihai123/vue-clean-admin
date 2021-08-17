<template>
  <Dialog
    v-bind="$attrs"
    :class="className"
    :style="
      mousePosition
        ? `transform-origin:${mousePosition.x}px ${mousePosition.y}px`
        : ''
    "
    v-on="$listeners"
  >
    <slot />
    <template slot="title">
      <slot name="title" />
    </template>
    <template slot="footer">
      <slot name="footer" />
    </template>
  </Dialog>
</template>

<script>
import { Dialog } from "element-ui";

let mousePosition = null;
function getClickPosition(e) {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => {
    mousePosition = null;
  }, 100);
}

export default {
  name: "ElDialog",
  components: { Dialog },
  data() {
    return {
      mousePosition: null,
    };
  },
  computed: {
    className: function() {
      if (this.mousePosition) {
        return this.$attrs.visible ? "zoom-enter-active" : "zoom-leave-active";
      } else {
        return "";
      }
    },
  },
  watch: {
    "$attrs.visible": function(val) {
      if (val) {
        this.mousePosition = mousePosition;
      }
    },
  },
  created() {
    document.documentElement.addEventListener("click", getClickPosition, true);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", getClickPosition, true);
  },
};
</script>

<style scoped>
@-webkit-keyframes antZoomIn {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes antZoomIn {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes antZoomOut {
  0% {
    transform: scale(1);
  }

  to {
    transform: scale(0.2);
    opacity: 0;
  }
}

@keyframes antZoomOut {
  0% {
    transform: scale(1);
  }

  to {
    transform: scale(0.2);
    opacity: 0;
  }
}

.zoom-enter-active {
  -webkit-animation-name: antZoomIn;
  animation-name: antZoomIn;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}

.zoom-leave-active {
  -webkit-animation-name: antZoomOut;
  animation-name: antZoomOut;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  pointer-events: none;
}
</style>
