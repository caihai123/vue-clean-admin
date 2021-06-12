import axios from "@/utils/axios";

// 获取当前用户有权限的菜单列表
export function getMenuList() {
  return axios.get("/mock-api/element-admin/get-menu-list.json");
}

// 获取当前用户创建的所有角色
export function getRoleList() {
  return axios.get("/mock-api/element-admin/get-role-list.json");
}
