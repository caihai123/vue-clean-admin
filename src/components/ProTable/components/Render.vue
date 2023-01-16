<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    render: {
      type: Function,
      required: true,
    },
  },

  render(h) {
    return this.render(h, ...this.data);
  },
};
</script>
