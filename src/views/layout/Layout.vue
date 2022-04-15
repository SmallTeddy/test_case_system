<template>
  <el-container class="container">
    <el-aside class="aside" width="180px">
      <el-menu router :collapse-transition="false" :default-active="$route.path"
        background-color="#fff" text-color="#666" active-text-color="#409EFF"
        style=" border-right: none; font-weight: 700">
        <el-menu-item v-for="menu in menuItems" :key="menu.index" :index="menu.index">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <span class="text">Welcome Test Case System</span>
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
  menuItems = [
    { index: '/',         icon: 'el-icon-s-home',              title: '首页'    },
    { index: '/evaluate', icon: 'el-icon-document',            title: '评价管理' },
    { index: '/form',     icon: 'el-icon-s-claim',             title: '表单测试' },
    { index: '/editor',   icon: 'el-icon-edit',                title: '富文本框' },
    { index: '/code',     icon: 'el-icon-coin',                title: '代码界面' },
    { index: '/graph',    icon: 'el-icon-s-data',              title: '关系图'   },
    { index: '/diff',     icon: 'el-icon-c-scale-to-original', title: 'diff案例' },
    { index: '/setting',  icon: 'el-icon-setting',             title: '个人设置'  }
  ]
  logout() {
    this.$router.push("/login");
  }
  setting() {
    this.$router.push("/setting");
  }

  dropdownClick(command: string): void {
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
