import axios from "@/utils/axios";

export function getMenuList() {
  return axios.get("/mock-api/element-admin/get-menu-list.json");
}
