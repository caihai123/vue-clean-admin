<script>
export default {
  props: {
    params: {
      type: Array,
      default: () => [],
    },
    render: {
      type: Function,
      required: true,
    },
  },

  render(h) {
    return this.render(h, ...this.params);
  },
};
</script>
