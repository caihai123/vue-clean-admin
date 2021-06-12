<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="Id" align="center" width="220">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        align="center"
        width="220"
      >
      </el-table-column>
      <el-table-column prop="description" label="备注"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot="header">
          <el-button
            @click="visible = true"
            size="small"
            type="primary"
            icon="el-icon-document-add"
            >新 增</el-button
          >
        </template>
        <template>
          <el-button size="small" type="primary">
            编 辑
          </el-button>
          <el-button type="danger" size="small">
            删 除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="visible" :title="form.id ? '编辑' : '新增'">
      <el-form ref="form" :model="form" label-width="100px" label-suffix="：">
        <el-form-item
          label="角色名称"
          prop="roleName"
          :rules="[{ required: true, message: '角色名称是必填项！' }]"
        >
          <el-input v-model="form.roleName" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="4"
            maxlength="200"
            show-word-limit
            v-model="form.description"
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
import { getMenuList, getRoleList } from "@/api/permis";

const defaultForm = {
  roleName: "",
  description: "",
  roles: [],
};

export default {
  name: "Role",
  components: {},
  data() {
    return {
      menuList: [],
      tableData: [],
      visible: false,
      form: { ...defaultForm },
    };
  },
  created() {
    getMenuList().then((value) => (this.menuList = value.data.data || []));
    getRoleList().then((value) => (this.tableData = value.data.data || []));
  },
  methods: {
    submitForm() {},
  },
};
</script>
