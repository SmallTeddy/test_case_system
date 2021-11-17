<template>
  <el-container class="container">
    <el-aside class="aside" width="180px">
      <el-menu router :collapse-transition="false" :default-active="$route.path"
        background-color="#fff" text-color="#666" active-text-color="#409EFF"
        style=" border-right: none; font-weight: 700">
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/evaluate">
          <i class="el-icon-document"></i>
          <span slot="title">评价管理</span>
        </el-menu-item>
        <el-menu-item index="/form">
          <i class="el-icon-s-claim"></i>
          <span slot="title">表单测试</span>
        </el-menu-item>
        <el-menu-item index="/editor">
          <i class="el-icon-edit"></i>
          <span slot="title">富文本框</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <span class="text">Welcome Student Evaluation System</span>
        <el-dropdown class="dropdown" @command="dropdownClick">
          <span class="el-dropdown-link">
            <img :src="userPhoto" class="user-avatar" />
            <span class="user-name">{{ userName }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Layout extends Vue {
  userName = "测试用户";
  userPhoto = require('../../assets/images/user_photo.png');
  logout() {
    this.$router.push("/login");
  }
  setting() {
    this.$router.push("/setting");
  }

  dropdownClick(command: any): void {
    switch(command) {
      case 'setting': this.setting(); break;
      case 'logout': this.logout(); break;
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .el-main {
  overflow-y: auto;
  padding: 10px;
}
.container {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  .aside {
    background-color: #fff;
  }
  .header {
    line-height: 60px;
    .icon {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      user-select: none;
      font-size: 20px;
      vertical-align: middle;
      margin-left: 10px;
      cursor: default;
    }
    .dropdown {
      float: right;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .user-name {
        margin-left: 10px;
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}
</style>
