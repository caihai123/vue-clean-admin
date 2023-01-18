<template>
  <div class="page">
    <CollapseHead
      v-if="showSearchForm"
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
      <div v-if="showTool" v-show="!selectRowsLength" class="tool-bar">
        <slot
          name="tool-bar"
          :oldParams="backupFormData"
          :curParams="headParams"
          :pagination="privatePagination"
        >
          <ButtonGroud
            v-if="toolButList && toolButList.length"
            :but-list="toolButList"
            :size="(toolBar && toolBar.size) || 'small'"
            :params="[headParams, backupFormData, privatePagination]"
          />

          <div v-else class="empty-dashed">
            您还没有设置操作按钮，请添加 butList 属性或者使用 slot='tool-bar'
          </div>
        </slot>
      </div>

      <div
        v-if="batchBar"
        v-show="selectRowsLength"
        class="el-alert el-alert--success is-light batch-bar"
      >
        <slot
          name="batch-bar"
          :selectRows="selectRows"
          :curParams="headParams"
          :oldParams="backupFormData"
          :pagination="privatePagination"
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

          <ButtonGroud
            v-if="batchBar.butList && batchBar.butList.length"
            :but-list="batchBar.butList"
            :size="(batchBar && batchBar.size) || 'small'"
            :params="[
              selectRows,
              headParams,
              backupFormData,
              privatePagination,
            ]"
          />

          <div v-else class="empty-dashed">
            您还没有设置操作按钮，请添加 butList 属性或者使用 slot='batch-bar'
          </div>
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
          :width="item.width"
          :min-width="item.minWidth"
          :fixed="item.fixed"
        >
          <template slot-scope="{ row, $index }">
            <slot :name="item.key" :row="row" :$index="$index">
              <Render
                v-if="item.render"
                :params="[row, $index]"
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
          v-if="showActions"
          :label="(actions && actions.labelText) || '操作'"
          :width="actions && actions.width"
          :fixed="(actions && actions.fixed) || 'right'"
          :min-width="actions && actions.minWidth"
        >
          <template slot-scope="{ row, $index }">
            <slot name="actions" :row="row" :$index="$index">
              <ButtonGroud
                v-if="actionsButList && actionsButList.length"
                :but-list="actionsButList"
                :size="(actions && actions.size) || 'mini'"
                :params="[row, $index]"
              />

              <div v-else class="empty-dashed">
                您还没有设置操作按钮，请添加 butList 属性或者使用 slot='actions'
              </div>
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
import ButtonGroud from "./components/ButtonGroud";

export default {
  components: {
    CollapseHead,
    DictSelect,
    Render,
    ButtonGroud,
  },
  filters: {
    optionParse(value, options) {
      const found = options.find((item) => item.value === value);
      return found ? found.label : value;
    },
  },
  props: {
    // 表格行的key 某些情况下需要，参考 el-table
    rowKey: {
      type: String,
      default: "",
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
     * 获取表格数据的函数
     * return 有分页时：{ tableData, pageCount, total}; 无分页时：{ tableData } or [...]
     */
    request: {
      type: Function,
      required: true,
    },

    // 列配置
    columns: {
      type: Array,
      required: true,
    },

    // 是否需要手动触发首次请求, 配置为 true 时不可隐藏搜索表单，false 时自动触发
    manualRequest: {
      type: Boolean,
      default: false,
    },

    /**
     * 工具栏渲染
     * butList 按钮列表 第二个参数为当前缓存的搜索条件 第三个参数为当前的搜索条件（可能没通过表单验证）
     * 为 true 时需要使用插槽添加按钮
     * size 按钮大小 默认 small
     */
    toolBar: {
      type: [Object, Boolean],
      default: null,
    },

    /**
     * 批量操作配置，为 null或者false 时不开启
     * butList: 按钮列表
     * reserveSelection: 在数据更新之后保留之前选中的数据，参考：el-table 默认 false
     * select-on-indeterminate 默认：true 参考：el-table-column
     * selectable 多选禁用 参考：el-table-column
     * size 按钮大小
     */
    batchBar: {
      type: [Object, Boolean],
      default: null,
    },

    /**
     * table 操作栏配置
     * labelText 操作栏title 默认：操作
     * fixed 默认 right
     * width
     * minWidth
     * butList 按钮列表
     * size 按钮大小 默认 mini
     */
    actions: {
      type: [Object, Boolean],
      default: null,
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

    // 是否显示搜索栏
    showSearchForm() {
      return this.headFormItems.length && this.search;
    },

    // 工具栏按钮
    toolButList() {
      const { butList = [] } = this.toolBar || {};
      return butList;
    },

    // 是否显示工具栏
    showTool() {
      if (typeof this.toolBar === "boolean") {
        return this.toolBar;
      } else {
        return !!this.toolButList.length;
      }
    },

    // 操作栏按钮
    actionsButList() {
      const { butList = [] } = this.actions || {};
      return butList;
    },

    // 是否显示表格操作栏
    showActions() {
      if (typeof this.actions === "boolean") {
        return this.actions;
      } else {
        return !!this.actionsButList.length;
      }
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
      if (this.showSearchForm) {
        this.$refs["headForm"].validate((valid) => {
          if (valid) {
            this.backupFormData = JSON.parse(JSON.stringify(this.headParams));
            this.getTableData(1, true);
          }
        });
      } else {
        this.getTableData(1, true);
      }
    },

    // 获取表格（list）数据
    async getTableData(page, loading = false) {
      this.loading = loading;
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

      this.loading = false;
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

.empty-dashed {
  border: 1px dashed #d9d9d9;
  padding: 4px 15px;
  border-radius: 6px;
  color: #d9d9d9;
}
</style>
