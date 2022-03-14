<template>
  <div class="login">
    <el-card class="card">
      <div class="title">
        Student Evaluation System
      </div>
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <el-form-item class="el-form-item" prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" class="el-input"></el-input>
        </el-form-item>
        <el-form-item class="el-form-item" prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            class="el-input"
            style="width:230px;margin-right:15px;"
          ></el-input>
          <el-button style="background:black;color:white" @click="getCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item class="el-form-item">
          <el-checkbox v-model="agreement" style="color:black">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item class="el-form-item">
          <el-button type="primary" style="width:100%;background-color:black;color:white" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ })
export default class Login extends Vue {
  loginForm = {
    mobile: "13312345678",
    code: ""
  };
  agreement = false;
  loginRules = {
    mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
  };

  getCode(): void {
    this.$message.info('密码是：123456');
  }

  login(): void {
    if(this.agreement) {
      if(this.loginForm.mobile == '13312345678' && this.loginForm.code == '123456') {
        this.$router.push('/');
      } else {
        this.getCode();
      }
    } else {
      this.$message.info('请勾选用户协议和隐私条款');
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/login-bg.jpg") no-repeat center / cover;
  .card {
    width: 400px;
    height: 320px;
    background: #333;
    opacity: 0.7;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    .title {
      font-size: 20px;
      color: white;
      display: block;
      width: 260px;
      margin-bottom: 20px;
    }
    .el-checkbox__label {
      color: white;
    }
    .el-checkbox__inner {
      background-color: black;
    }
    .el-input__inner {
      background-color: black;
      color: white;
    }
    .el-form-item:nth-child(1) {
      margin-bottom: 28px;
    }
    .el-form-item:nth-child(2) {
      margin-bottom: 20px;
    }
    .el-form-item:nth-child(3) {
      margin-bottom: 10px;
    }
    .el-form-item:nth-child(4) {
      margin-bottom: 16px;
    }
  }
}
</style>
