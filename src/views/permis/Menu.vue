<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-input
        v-model="searchValue"
        placeholder="可输入 title path icon 查询"
        prefix-icon="el-icon-search"
        style="width:400px"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-document-add"
        @click="visible = true"
      >
        新增
      </el-button>
    </div>

    <el-table :data="filterTableData" border row-key="id">
      <el-table-column label="标题">
        <template slot-scope="{ row }">
          <el-tag v-if="row.affix" size="mini">affix</el-tag>
          <span size="small">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="{ row }">
          <i :class="row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="index" label="排序"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="{ row }">
          <el-button size="mini" type="primary" plain @click="editRow(row)">
            编辑
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="
              () => {
                form.parentId = row.id;
                visible = true;
              }
            "
          >
            添加子菜单
          </el-button>
          <el-button
            v-if="!row.children || !row.children.length"
            size="mini"
            type="danger"
            @click="delRow(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="form.id ? '编辑' : '新增'"
      :visible.sync="visible"
      @closed="resetFields"
    >
      <el-form ref="form" :model="form" label-width="80px" label-suffix="：">
        <el-form-item>
          <div slot="label">
            <el-tooltip
              effect="dark"
              content="菜单和目录有明显区别，菜单下不要创建目录"
              placement="top"
            >
              <div>
                类型
                <i class="el-icon-info"></i>：
              </div>
            </el-tooltip>
          </div>

          <el-radio-group v-model="form.type" size="medium">
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">目录</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col v-if="form.parentId" :span="12">
            <el-form-item key="parentId" label="父节点" required>
              <el-cascader
                v-model="form.parentId"
                :options="tableData"
                :props="{
                  value: 'id',
                  label: 'title',
                  checkStrictly: true,
                }"
                disabled
                style="width:100%"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-Col :span="12">
            <el-form-item
              key="title"
              label="标题"
              prop="title"
              :rules="[
                { required: true, message: '标题是必填项！' },
                {
                  min: 2,
                  max: 10,
                  message: '长度在 2 到 10 个字符！',
                },
              ]"
            >
              <el-input v-model="form.title" clearable></el-input>
            </el-form-item>
          </el-Col>
          <el-Col v-if="form.type === '1'" :span="12">
            <PathFormItem key="path" v-model="form.path" prop="path" required />
          </el-Col>
          <el-Col :span="12">
            <el-form-item key="icon" label="图标">
              <IconSelect
                v-model="form.icon"
                clearable
                style="width:100%"
              ></IconSelect>
            </el-form-item>
          </el-Col>
          <el-Col :span="12">
            <el-form-item label="排序" required>
              <el-input-number v-model="form.index" :min="0"></el-input-number>
            </el-form-item>
          </el-Col>
        </el-row>
        <el-row>
          <el-Col v-if="form.type === '1'" :span="8">
            <el-form-item label="affix">
              <el-checkbox v-model="form.affix">开启</el-checkbox>
            </el-form-item>
          </el-Col>
          <el-Col v-if="form.type === '1'" :span="8">
            <el-form-item label="hidden">
              <el-checkbox v-model="form.hidden">开启</el-checkbox>
            </el-form-item>
          </el-Col>
        </el-row>
      </el-form>

      <span slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import { treeFilter } from "@/utils/index";
import IconSelect from "@/components/IconSelect";
import PathFormItem from "@/components/form/path-form.item";

const defaultForm = {
  parentId: "",
  type: "1",
  title: "",
  path: "",
  icon: "",
  index: "",
  affix: false,
  hidden: false,
};

export default {
  name: "Menu",
  components: { IconSelect, PathFormItem },
  data() {
    return {
      searchValue: "",
      tableData: [],

      visible: false,
      form: { ...defaultForm },
    };
  },
  computed: {
    filterTableData() {
      return treeFilter(
        this.tableData,
        (item) =>
          !this.searchValue ||
          item.title.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          (item.path &&
            item.path.toLowerCase().includes(this.searchValue.toLowerCase())) ||
          (item.icon &&
            item.icon.toLowerCase().includes(this.searchValue.toLowerCase()))
      );
    },
  },
  created() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      axios("get_menu").then((value) => (this.tableData = value.data || []));
    },
    // 编辑
    editRow(row) {
      this.form = { ...defaultForm, ...row };
      this.visible = true;
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            parentId: this.form.parentId,
            title: this.form.title,
            icon: this.form.icon,
            index: this.form.index,
            type: this.form.type,
          };

          if (this.form.type === "1") {
            // 菜单类型
            params.path = this.form.path;
            params.affix = this.form.affix || false;
            params.hidden = this.form.hidden || false;
          }

          if (this.form.id) {
            axios("update_menu", {
              id: this.form.id,
              ...params,
            }).then(() => {
              this.getTableData();
              this.visible = false;
              this.$message.success("修改成功！");
            });
          } else {
            axios("add_menu", params).then(() => {
              this.getTableData();
              this.visible = false;
              this.$message.success("新增成功！");
            });
          }
        }
      });
    },

    // 删除菜单
    delRow(id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios("del_menu", { id }).then(() => {
          this.$message.success("删除成功!");
          this.getTableData();
        });
      });
    },
    // 重置表单
    resetFields() {
      this.$refs.form.resetFields();
      this.form = { ...defaultForm };
    },
  },
};
</script>
