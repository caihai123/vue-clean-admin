<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="_id" label="Id" width="220"> </el-table-column>
      <el-table-column prop="name" label="角色名称" width="220">
      </el-table-column>
      <el-table-column prop="describe" label="备注"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot="header">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-document-add"
            @click="
              () => {
                $refs.menuListRef && $refs.menuListRef.setCheckedKeys([]);
                visible = true;
              }
            "
          >
            新 增
          </el-button>
        </template>
        <template slot-scope="{ row }">
          <el-button
            size="small"
            type="primary"
            @click="
              () => {
                form = { ...row };
                $refs.menuListRef &&
                  $refs.menuListRef.setCheckedKeys(form.permis || []);
                visible = true;
              }
            "
          >
            编 辑
          </el-button>
          <el-button type="danger" size="small" @click="delRow(row._id)">
            删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="visible"
      :title="form.id ? '编辑' : '新增'"
      @closed="resetFields"
    >
      <el-form ref="form" :model="form" label-width="100px" label-suffix="：">
        <el-form-item
          label="角色名称"
          prop="name"
          :rules="[{ required: true, message: '角色名称是必填项！' }]"
        >
          <el-input v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.describe"
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="权限配置" required>
          <el-tree
            ref="menuListRef"
            :data="menuList"
            show-checkbox
            node-key="id"
            check-on-click-node
            :props="{
              label: 'title',
            }"
            style="border: 1px solid #DCDFE6;border-radius:4px;"
          >
          </el-tree>
        </el-form-item>
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

const defaultForm = {
  _id: "",
  name: "",
  describe: "",
  permis: [],
};

export default {
  name: "Role",
  data() {
    return {
      menuList: [],
      tableData: [],
      visible: false,
      form: { ...defaultForm },
    };
  },
  created() {
    // 获取菜单列表
    axios("get_menu").then((value) => (this.menuList = value.data || []));
    this.getRoleTable();
  },
  methods: {
    // 获取角色列表
    getRoleTable() {
      axios("get_role_list").then(
        (value) => (this.tableData = value.data || [])
      );
    },

    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.permis = this.$refs.menuListRef.getCheckedKeys();
          if (this.form._id) {
            axios("update_role", this.form).then(() => {
              this.getRoleTable();
              this.visible = false;
              this.$message.success("修改成功!");
            });
          } else {
            // eslint-disable-next-line no-unused-vars
            const { _id, ...params } = this.form;
            axios("add_role", params).then(() => {
              this.getRoleTable();
              this.visible = false;
              this.$message.success("新增成功!");
            });
          }
        }
      });
    },

    // 删除菜单
    delRow(_id) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios("del_role", { _id }).then(() => {
          this.$message.success("删除成功!");
          this.getRoleTable();
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
