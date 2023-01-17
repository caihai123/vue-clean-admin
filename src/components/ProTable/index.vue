<template>
  <div class="page">
    <CollapseHead
      v-if="headFormItems.length && search"
      :search-text="search.searchText || '查 询'"
      :reset-text="search.resetText || '重 置'"
      @onSubmit="searchHeadForm"
      @onReset="resetHeadFrom"
    >
      <el-form
        ref="headForm"
        :model="headParams"
        :rules="search.rules"
        inline
        @submit.native.prevent
      >
        <el-form-item
          v-for="item in headFormItems"
          :key="item.key"
          :label="item.title"
          :prop="item.key"
        >
          <template v-if="item.type === 'select'">
            <DictSelect
              v-if="item.dict"
              v-model="headParams[item.key]"
              :dict-type="item.dict"
              :placeholder="item.placeholder || `请选择${item.title}`"
            />
            <el-select
              v-else
              v-model="headParams[item.key]"
              :placeholder="item.placeholder || `请选择${item.title}`"
            >
              <el-option
                v-for="i in item.options || []"
                :key="i.value"
                :value="i.value"
                :label="i.label"
              ></el-option>
            </el-select>
          </template>

          <el-input
            v-else
            v-model="headParams[item.key]"
            :placeholder="item.placeholder || `请输入${item.title}`"
          />
        </el-form-item>
      </el-form>
    </CollapseHead>

    <div>
      <div v-if="toolBar" v-show="!selectRowsLength" class="tool-bar">
        <slot
          name="tool-bar"
          :backupFormData="backupFormData"
          :headParams="headParams"
        >
          <Render
            v-if="typeof toolBar === 'function'"
            :render="toolBar"
            :data="[backupFormData, headParams]"
          />
        </slot>
      </div>

      <div
        v-if="batchBar"
        v-show="selectRowsLength"
        class="el-alert el-alert--success is-light batch-bar"
      >
        <div>
          <span> 已选{{ selectRowsLength }}项 </span>
          <el-button
            type="text"
            style="margin-left:10px"
            @click="toggleSelection"
          >
            取消选择
          </el-button>
        </div>

        <slot name="tatch-but" :selectRows="selectRows">
          <Render
            v-if="batchBar.tatchBut"
            :render="batchBar.tatchBut"
            :data="[selectRows]"
          />
        </slot>
      </div>
    </div>

    <div class="main">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        :row-key="rowKey"
        :select-on-indeterminate="batchBar && batchBar.selectOnIndeterminate"
        @selection-change="(val) => (selectRows = val)"
      >
        <el-table-column
          v-if="batchBar"
          type="selection"
          width="55"
          :reserve-selection="batchBar && batchBar.reserveSelection"
          fixed="left"
          :selectable="batchBar && batchBar.selectable"
        >
        </el-table-column>

        <el-table-column
          v-for="item in columns"
          :key="item.key"
          :prop="item.key"
          :label="item.title"
        >
          <template slot-scope="{ row, $index }">
            <slot :name="item.key" :row="row" :$index="$index">
              <Render
                v-if="item.render"
                :data="[row, $index]"
                :render="item.render"
              />

              <template v-else-if="item.type === 'index'">
                {{ calcIndex($index, item.index) }}
              </template>

              <template v-else-if="item.type === 'select'">
                <template v-if="item.dict">
                  {{ row[item.key] | dictParse(item.dict) }}
                </template>
                <template v-else>
                  {{ row[item.key] | optionParse(item.options) }}
                </template>
              </template>

              <template v-else>{{ row[item.key] }}</template>
            </slot>
          </template>
        </el-table-column>

        <el-table-column
          v-if="actions"
          :label="(actions && actions.labelText) || '操作'"
          :width="actions && actions.width"
          :fixed="(actions && actions.fixed) || 'right'"
          :min-width="actions && actions.minWidth"
        >
          <template slot-scope="{ row, $index }">
            <slot name="actions" :row="row" :$index="$index">
              <Render
                v-if="actions.render"
                :render="actions.render"
                :data="[row, $index]"
              />
            </slot>
          </template>
        </el-table-column>
      </el-table>

      <div
        v-if="pagination"
        :style="{
          textAlign: pagination.textAlign || 'right',
          marginTop: '20px',
        }"
      >
        <el-pagination
          :current-page="privatePagination.pageCount"
          :page-size.sync="privatePagination.pageSize"
          :total="privatePagination.total"
          :background="pagination && pagination.background"
          :layout="pagination && pagination.layout"
          :page-sizes="pagination && pagination.pageSizes"
          @current-change="getTableData"
          @size-change="getTableData"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import CollapseHead from "@/components/CollapseHead";
import DictSelect from "@/components/DictSelect";
import Render from "./components/Render"; // 使用渲染函数能力

export default {
  components: {
    CollapseHead,
    DictSelect,
    Render,
  },
  filters: {
    optionParse(value, options) {
      const found = options.find((item) => item.value === value);
      return found ? found.label : value;
    },
  },
  props: {
    rowKey: {
      type: String,
      default: "",
    },
    /**
     * 获取表格数据的函数
     * return 有分页时：{ tableData, pageCount, total}; 无分页时：{ tableData } or [...]
     */
    request: {
      type: Function,
      required: true,
    },

    /**
     * 操作栏渲染
     * 可使用渲染函数 第二个参数为当前缓存的搜索条件 第三个参数为当前的搜索条件（可能没通过表单验证）
     * 为 true 时需要使用插槽添加按钮 参数和渲染函数一致
     */
    toolBar: {
      type: [Function, Boolean],
      default: null,
    },

    // 列配置
    columns: {
      type: Array,
      required: true,
    },

    /**
     * 分页配置 可设置null
     * pageSize 初始分页大小 默认10
     * background 参考 el-pagination 默认：true
     * layout 参考 el-pagination
     * pageSizes 参考 el-pagination
     * textAlign 默认 right
     */
    pagination: {
      type: [Object, Boolean],
      default: true,
    },

    // 是否需要手动触发首次请求, 配置为 true 时不可隐藏搜索表单，false 时自动触发
    manualRequest: {
      type: Boolean,
      default: false,
    },

    /**
     * 批量操作配置，默认 false 不显示
     * tatchBut: 按钮渲染函数  batchBar为 true 时可使用 batch-but 插槽
     * reserveSelection: 在数据更新之后保留之前选中的数据，参考：el-table 默认 false
     * select-on-indeterminate 默认：true 参考：el-table-column
     * selectable 多选禁用 参考：el-table-column
     */
    batchBar: {
      type: [Object, Boolean],
      default: null,
    },

    /**
     * 搜索表单配置项 false 时不显示
     * searchText 查询按钮文字 默认：'查 询'
     * resetText 重置按钮文字 默认：'重 置'
     * rules 查询表单验证规则，一般不需要，除非你需要验证查询条件
     */
    search: {
      type: [Object, Boolean],
      default: true,
    },

    /**
     * table 操作栏配置
     * labelText 操作栏title 默认：操作
     * fixed 默认 right
     * width
     * minWidth
     * render 渲染函数
     */
    actions: {
      type: [Object, Boolean],
      default: null,
    },
  },

  data() {
    return {
      headParams: {},
      backupFormData: null, // 储存当前搜索条件，分页或者刷新时使用

      loading: false,
      tableData: [],
      selectRows: [], // 多选时数据

      // 分页
      privatePagination: {
        pageSize: this.pagination ? this.pagination.pageSize || 10 : 10,
        pageCount: 1,
        total: 0,
      },
    };
  },
  computed: {
    // 过滤出搜索表单项
    headFormItems() {
      return this.columns.filter((item) => item.showInSearch);
    },

    // 当前多选选中的数组长度
    selectRowsLength() {
      return this.selectRows.length;
    },
  },
  watch: {
    headFormItems: {
      handler: function(value) {
        const headParams = {};
        value.forEach(({ key, initialValue }) => {
          headParams[key] = initialValue || "";
        });
        this.headParams = headParams;
      },
      immediate: true,
    },
  },
  mounted() {
    !this.manualRequest && this.searchHeadForm();
  },
  methods: {
    // 点击 head 表单查询
    searchHeadForm() {
      this.$refs["headForm"].validate((valid) => {
        if (valid) {
          this.backupFormData = JSON.parse(JSON.stringify(this.headParams));
          this.loading = true;
          this.getTableData(1).finally(() => {
            this.loading = false;
          });
        }
      });
    },

    // 获取表格（list）数据
    async getTableData(page) {
      const params = { ...this.backupFormData };

      if (this.pagination) {
        params.current = page || this.privatePagination.pageCount;
        params.pageSize = this.privatePagination.pageSize;
      }

      const result = await this.request(params);

      if (this.pagination) {
        this.tableData = result.tableData || [];
        this.privatePagination.pageCount = result.pageCount;
        this.privatePagination.total = result.total;
      } else {
        this.tableData = (() => {
          if (Array.isArray(result)) {
            return result;
          } else {
            return result.tableData || [];
          }
        })();
      }
    },

    // 点击 head 表单重置
    resetHeadFrom() {
      this.$refs["headForm"].resetFields();
      this.searchHeadForm();
    },

    // 自定义索引，和 el-table 文档描述的表现一致
    calcIndex($index, index) {
      if (typeof index === "number" || !index) {
        return $index + (index || 1);
      } else if (typeof index === "function") {
        return index($index);
      }
    },

    // 取消多选
    toggleSelection() {
      this.$refs["table"].clearSelection();
    },
  },
};
</script>

<style scoped>
.tool-bar {
  height: 52px;
}
.batch-bar {
  height: 52px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
