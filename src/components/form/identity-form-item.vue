<template>
  <el-form-item
    :label="label"
    :rules="[
      {
        required: required,
        message: '请输入身份证号',
        trigger: 'blur',
      },
      {
        pattern: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
        message: '请输入正确的身份证号',
        trigger: 'blur',
      },
    ]"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-input v-model="valueVice" maxlength="18" clearable></el-input>
  </el-form-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "身份证号",
    },
  },
  computed: {
    valueVice: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
