(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"40b3":function(e,r,s){"use strict";s("e7dd")},a55b:function(e,r,s){"use strict";s.r(r);var t=function(){var e=this,r=e.$createElement,s=e._self._c||r;return s("div",{staticClass:"container"},[s("el-form",{ref:"form",staticClass:"form",attrs:{model:e.form,rules:e.rules},nativeOn:{submit:function(e){e.preventDefault()}}},[s("h1",{staticClass:"title"},[e._v("Login Form")]),s("el-form-item",{attrs:{prop:"username"}},[s("el-input",{attrs:{placeholder:"请输入用户名",clearable:"","prefix-icon":"el-icon-user-solid"},model:{value:e.form.username,callback:function(r){e.$set(e.form,"username",r)},expression:"form.username"}})],1),s("el-form-item",{attrs:{prop:"password"}},[s("el-input",{attrs:{placeholder:"请输入密码",clearable:"","show-password":"","prefix-icon":"el-icon-lock"},model:{value:e.form.password,callback:function(r){e.$set(e.form,"password",r)},expression:"form.password"}})],1),s("el-form-item",[s("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary"},on:{click:e.onSubmit}},[e._v(" 登 陆 ")])],1)],1)],1)},o=[],n={data(){return{form:{username:"admin",password:"password"},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"change"}]}}},mounted(){window.addEventListener("keypress",this.onEnter)},beforeDestroy(){window.removeEventListener("keypress",this.onEnter)},methods:{onSubmit(){this.$refs.form.validate(e=>{e?"admin"===this.form.username&&"password"===this.form.password?(this.$store.commit("setMenuList",[]),this.$store.commit("updateLock",null),this.$router.push("/")):this.$message.error("用户名或密码错误"):this.$message.error("请输入用户名或密码！")})},onEnter(e){"Enter"===e.key&&this.onSubmit()}}},i=n,a=(s("40b3"),s("2877")),l=Object(a["a"])(i,t,o,!1,null,"b0f916b6",null);r["default"]=l.exports},e7dd:function(e,r,s){}}]);
//# sourceMappingURL=login.edb369f1.js.map