<template>
  <div class="setting">
    <el-card>
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">
          <el-input size="small" :readonly="!isChange" :value="user.name"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="手机号">
          <el-input size="small" :readonly="!isChange" :value="user.phone"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="居住地">
          <el-input size="small" :readonly="!isChange" :value="user.address"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-input size="small" :readonly="!isChange" :value="user.des"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="联系地址">
          <el-input size="small" :readonly="!isChange" :value="user.other"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <div class="button-box">
        <el-button v-show="!isChange" size="small" type="warning" @click="changeUserInfo">修改信息</el-button>
        <el-button v-show="isChange" size="small" type="success" class="confirm" @click="confirmChange">确认</el-button>
        <el-button v-show="isChange" size="small" @click="closeChange">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ })
export default class Setting extends Vue {
  isChange = false;
  user = {
    name: 'adhsjkdh',
    phone: '13312345678',
    address: '苏州市',
    des: '学生',
    other: '江苏省苏州市吴中区吴中大道 1188 号'
  }
  changeUserInfo(): void {
    this.isChange = true;
  }
  confirmChange(): void {
    console.log('confirm');
  }
  closeChange(): void {
    this.isChange = false;
  }
}
</script>

<style lang="less" scoped>
.button-box {
  margin-top: 10px;
}
.confirm {
  margin-left: 0;
}
::v-deep .el-descriptions-item__label {
  width: 80px;
  line-height: 32px;
}
::v-deep .el-descriptions .is-bordered td {
  min-width: 100px;
}
</style>
