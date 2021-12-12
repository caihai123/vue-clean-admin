<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-input v-model="params.nickname" placeholder="姓名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="params.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="params.phoneNumber"
          placeholder="手机号"
          maxlength="11"
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="params.roleId" placeholder="角色">
          <el-option
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="params.status" placeholder="状态">
          <el-option label="启用" :value="true"> </el-option>
          <el-option label="禁用" :value="false"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getTableData(1)">查 询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="avatar" label="avatar"> </el-table-column>
        <el-table-column prop="nickname" label="nickname"> </el-table-column>
        <el-table-column prop="username" label="username"> </el-table-column>
        <el-table-column prop="phoneNumber" label="phone"> </el-table-column>
        <el-table-column label="roleId">
          <template slot-scope="{ row }">
            {{ roleParse(row.roleId) }}
          </template>
        </el-table-column>
        <el-table-column label="status">
          <template slot-scope="{ row }">
            <el-switch v-model="row.status"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="action">
          <template>
            <el-button type="primary" plain size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top:20px;text-align:right">
        <el-pagination
          :total="pagination.total"
          :page-size="pagination.pageSize"
          :current-page="pagination.page"
          @current-change="getTableData"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";

export default {
  name: "Account",
  data() {
    return {
      params: {
        nickname: "",
        username: "",
        phoneNumber: "",
        roleId: "",
        status: "",
      },
      roleOptions: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
    };
  },
  created() {
    axios("select_role").then((value) => {
      this.roleOptions = value.data || [];
      this.getTableData();
    });
  },
  methods: {
    // 获取表格列表
    getTableData(page) {
      axios("get_user_list", {
        page: page || this.pagination.page,
        pageSize: this.pagination.pageSize,
        params: this.params,
      }).then((value) => {
        const data = value.data;
        this.tableData = data.list || [];
        this.pagination.page = data.page;
        this.pagination.total = data.total;
      });
    },
    // 新增用户
    addUserItem() {},
    delItem(row, index) {
      console.log(row);
      console.log(index);
    },
    // 将roleId转roleName
    roleParse: function(value) {
      let found = this.roleOptions.find((item) => item.value === value);
      if (found) {
        return found.label;
      } else {
        return value;
      }
    },
  },
};
</script>
