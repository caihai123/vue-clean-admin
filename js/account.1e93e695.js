(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["account"],{4617:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("ElTableEdit",{staticStyle:{width:"100%"},attrs:{data:e.tableData,columns:e.columns,border:""},scopedSlots:e._u([{key:"column-actions",fn:function(t){return[l("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(l){return e.delItem(t.row,t.$index)}}},[e._v(" 删除 ")])]}}])},[l("el-button",{attrs:{slot:"header",size:"small",type:"primary",icon:"el-icon-document-add"},slot:"header"},[e._v(" 新增 ")])],1)},n=[],o={name:"Account",components:{},data(){return{columns:[{title:"关联角色",key:"roleName",width:100},{title:"用户名",key:"userName",edit:!0,rules:[{required:!0,message:"请输入活动名称",trigger:"blur"},{min:3,max:5,message:"长度在 3 到 5 个字符",trigger:"blur"}],clearable:!0},{title:"用户密码",key:"password",edit:!0,clearable:!0},{title:"姓名",key:"name",edit:!0,clearable:!0},{title:"性别",key:"sex",type:"select",options:[{label:"未知",value:"0"},{label:"男",value:"1"},{label:"女",value:"2"}],edit:!0,clearable:!0},{title:"联系电话",key:"phone",edit:!0,clearable:!0},{title:"邮箱",key:"email",edit:!0,clearable:!0}],tableData:[{id:"11111",userName:"admin",password:"123456",name:"蔡海",sex:"男",phone:"155********",email:"ch155********@163.com",roleId:"",roleName:"admin"},{id:"22222",userName:"admin",password:"123456",name:"蔡海",sex:"男",phone:"155********",email:"ch155********@163.com",roleId:"",roleName:"admin"}]}},computed:{},watch:{},created(){},mounted(){},methods:{delItem(e,t){console.log(e),console.log(t)}}},r=o,i=l("2877"),s=Object(i["a"])(r,a,n,!1,null,null,null);t["default"]=s.exports}}]);
//# sourceMappingURL=account.1e93e695.js.map