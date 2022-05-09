<template>
  <div class="template_box">
    <div class="template_in">
      <h1>流程模板</h1>
      <div class="templateInfo">
        <el-form label-width="100px" :model="templateForm" ref="templateForm" :rules="templateRules">
          <el-form-item label="模板名称:" prop="name">
            <el-input v-model="templateForm.name" placeholder="请输入模板名称" />
          </el-form-item>
          <el-form-item label="模板说明:" prop="msg">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 4 }" v-model="templateForm.msg" placeholder="请输入模板说明" />
          </el-form-item>
        </el-form>
      </div>
      <div class="step_box">
        <div class="start-steps">
          <button class="start-btn">开始</button>
        </div>
        <draggable :list="list" disabled class="list-group" ghost-class="ghost" @start="dragging = true" @end="dragging = false" filter=".undraggable">
          <div class="step" v-for="(v, i) in list" :key="v.id">
            <textarea class="list-group-item" placeholder="请选择流程" maxlength="30" autofocus readonly="readonly" @focus="iptFocus(v, i)" @blur="iptBlur(v, i)" :value="v.step_name" />
            <div class="stepsAdd stepsAdd-before" @click="addBefore(i)">+</div>
            <div class="stepsAdd stepsAdd-after" @click="addAfter(i)">+</div>
            <div class="sb-close" @click="deleteStep(i)">-</div>
          </div>
          <div class="end-steps undraggable">
            <button class="end-btn">结束</button>
            <div class="stepsAdd stepsAdd-end" v-if="showEndSteps" @click="addBefore()">+</div>
          </div>
        </draggable>
      </div>
      <div class="stepInfo">
        <p>步骤详情（请点击上方加号添加步骤）</p>
        <div class="stepDetails">
          <el-form ref="stepForm" label-width="100px" :model="stepForm" :rules="stepRules">
            <el-form-item label="步骤名称:" prop="step_name">
              <el-input v-model="stepForm.step_name" @change="stepnameChange" :disabled="templateAddDisable" placeholder="请输入步骤名称" />
            </el-form-item>
            <el-form-item label="步骤类型:" prop="step_type">
              <el-select class="typeBox" v-model="stepForm.step_type" placeholder="请选择类型" style="width: 500px" @change="steptypeChange" :disabled="templateAddDisable">
                <el-option v-for="i in typeItem" :key="i.id" :label="i.label" :value="i.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="步骤功能:" prop="step_func">
              <el-select class="typeBox" v-model="stepForm.step_func" placeholder="请选择功能" style="width: 500px" @change="featureChange" :disabled="templateAddDisable">
                <el-option v-for="i in featureItem" :key="i.id" :label="i.label" :value="i.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="URL地址:" prop="step_url">
              <el-input v-model="stepForm.step_url" @change="urlChange" :disabled="templateAddDisable" placeholder="请输入Url地址" />
            </el-form-item>
            <el-form-item label="备注:" prop="step_msg">
              <el-input type="textarea" v-model="stepForm.step_msg" :autosize="{ minRows: 3, maxRows: 4 }" @change="remarksChange" :disabled="templateAddDisable" placeholder="请输入备注" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="confirmBox">
        <el-button size="medium" style="padding: 8px 18px; font-size: 14px" @click="closeDialog">返回</el-button>
        <el-button type="primary" size="medium" style="padding: 8px 18px; margin-left: 20px; font-size: 14px" @click="replace">重置</el-button>
        <el-button type="success" size="medium" style="padding: 8px 18px; margin-left: 20px; font-size: 14px" @click="confirm">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import draggable from 'vuedraggable';

@Component({
  components: { draggable },
})
export default class templateAdd extends Vue {
  @Ref() formRef!: any;
  id: any = 0;
  showEndSteps: boolean = true;
  dragging: boolean = false;
  list: any = [];
  templateAddDisable: boolean = true;

  typeItem: any = [
    { id: '1', label: '接口触发', value: 'api' },
    { id: '2', label: '人工流转', value: 'manual' },
  ];
  featureItem: any = [
    { id: '1', label: 'Jenkins构建', value: 'build' },
    { id: '2', label: '应用部署', value: 'deploy' },
    { id: '3', label: '应用验证', value: 'validate' },
    { id: '4', label: '镜像同步', value: 'sync' },
  ];
  stepForm: any = {
    new_or_edit: 'new',
    step_name: '',
    step_type: '',
    step_func: '',
    step_url: '',
    step_msg: '',
  };
  templateForm: any = {
    name: '',
    msg: '',
  };
  templateRules: any = {
    name: [{ required: true, message: '模板名称不能为空', trigger: 'blur' }],
    msg: [{ required: true, message: '模板说明不能为空', trigger: 'blur' }],
  };
  stepRules: any = {
    step_name: [{ required: true, message: '步骤名不能为空', trigger: 'blur' }],
    step_type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
    step_func: [{ required: true, message: '功能不能为空', trigger: 'blur' }],
  };
  index: any = '';
  selectValue: any = '';

  addBefore(i: any): void {
    this.templateAddDisable = false;
    this.stepForm.step_name = '';
    this.stepForm.step_type = '';
    this.stepForm.step_func = '';
    this.stepForm.step_url = '';
    this.stepForm.step_msg = '';
    this.list.splice(i, 0, {
      id: this.id++,
      new_or_edit: 'new',
      step_name: '',
      step_type: '',
      step_func: '',
      step_url: '',
      step_msg: '',
    });
    if (this.list.length !== 0) {
      this.showEndSteps = false;
    }
    this.selectValue = '';
    let stepsArrey = document.getElementsByTagName('textarea');
    if (i) {
      window.setTimeout(() => {
        stepsArrey[i + 1].focus();
      }, 0);
    } else {
      window.setTimeout(() => {
        stepsArrey[1].focus();
      }, 0);
    }
  }
  addAfter(i: any): void {
    this.stepForm.step_name = '';
    this.stepForm.step_type = '';
    this.stepForm.step_func = '';
    this.stepForm.step_url = '';
    this.stepForm.step_msg = '';
    let stepsArrey = document.getElementsByTagName('textarea');
    if (i == 0) {
      window.setTimeout(() => {
        stepsArrey[2].focus();
      }, 0);
    } else if (i > 0) {
      i = i + 1;
      window.setTimeout(() => {
        stepsArrey[i + 1].focus();
      }, 0);
    }
    this.list.splice(i, 0, {
      id: this.id++,
      new_or_edit: 'new',
      step_name: '',
      step_type: '',
      step_func: '',
      step_url: '',
      step_msg: '',
    });
  }
  deleteStep(i: any): void {
    this.list.splice(i, 1);
    if (this.list.length === 0) {
      this.showEndSteps = true;
      this.templateAddDisable = true;
      this.stepForm = { new_or_edit: 'new', step_name: '', step_type: '', step_func: '', step_url: '', step_msg: '' };
    }
    let stepsArrey = document.querySelectorAll('textarea');
    for (let i = 1; i < stepsArrey.length - 1; i++) {
      stepsArrey[i].style.backgroundColor = '#ecf5ff';
      stepsArrey[i].style.color = '#409eff';
    }
  }
  iptFocus(v: any, i: any): void {
    this.stepForm.step_name = v.step_name;
    this.stepForm.step_type = v.step_type;
    this.stepForm.step_func = v.step_func;
    this.stepForm.step_url = v.step_url;
    this.stepForm.step_msg = v.step_msg;
    let stepsArrey = document.querySelectorAll('textarea');
    this.index = i + 1;
    for (let i = 1; i < stepsArrey.length - 1; i++) {
      stepsArrey[i].style.backgroundColor = '#ecf5ff';
      stepsArrey[i].style.color = '#409eff';
    }
    stepsArrey[this.index].style.backgroundColor = '#409eff';
    stepsArrey[this.index].style.color = '#fff';
  }
  iptBlur(v: any, i: any): void {
    this.index = i;
  }

  stepnameChange(selVal: any): void {
    this.list[this.index].step_name = selVal;
    this.stepForm.step_name = selVal;
  }
  steptypeChange(selVal: any): void {
    this.list[this.index].step_type = selVal;
  }
  featureChange(selVal: any): void {
    this.list[this.index].step_func = selVal;
  }
  urlChange(selVal: any): void {
    this.list[this.index].step_url = selVal;
  }
  remarksChange(selVal: any): void {
    this.list[this.index].step_msg = selVal;
  }
  closeDialog(): void {
    this.$router.push('/conf/template');
  }

  confirm() {
    if (this.templateForm.name == '') return this.$message.error('模板名称不能为空');
    if (this.templateForm.msg == '') return this.$message.error('模板说明不能为空');
    if (this.stepForm.step_name == '') return this.$message.error('步骤名不能为空');
    if (this.stepForm.step_type == '') return this.$message.error('步骤类型不能为空');
    if (this.stepForm.step_func == '') return this.$message.error('步骤功能不能为空');
    let stepsMessage = [];
    let stepsArrey = document.querySelectorAll('textarea');
    for (let i = 1; i < stepsArrey.length - 1; i++) {
      stepsArrey[i].style.backgroundColor = '#ecf5ff';
      stepsArrey[i].style.color = '#409eff';
    }
    for (let i = 1; i < stepsArrey.length - 1; i++) {
      if (stepsArrey[i].value != '') {
        stepsMessage.push(stepsArrey[i].value);
      } else {
        for (let i = 1; i < stepsArrey.length - 1; i++) {
          if (stepsArrey[i].value === '') {
            stepsArrey[i].style.backgroundColor = '#EE1111';
            stepsArrey[i].style.color = '#fff';
          }
        }
        return this.$message({ type: 'error', message: '请填写完整的流程' });
      }
    }
    let params = {
      id: 0,
      name: this.templateForm.name,
      msg: this.templateForm.msg,
      steps: this.list,
    };
    console.log(params);
  }
  replace(): void {
    this.list = [];
    this.templateForm = { name: '', msg: '' };
    this.stepForm = { new_or_edit: 'new', step_name: '', step_type: '', step_func: '', step_url: '', step_msg: '' };
    this.templateAddDisable = true;
    this.showEndSteps = true;
  }
}
</script>
<style lang="less" scoped>
.template_box {
  margin-top: -8px;
  background-color: #fff;
  min-height: 680px;
  .template_in {
    margin: 5px 0 20px 10px;
    padding: 15px 0;
    width: 720px;
    letter-spacing: 1px;
  }
  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
  }
}
/deep/ .el-form-item--small.el-form-item {
  margin-bottom: 12px;
}
/deep/ .el-input--small .el-input__inner,
.el-input--small .el-textarea__inner {
  font-size: 12px;
}
/deep/ .el-input--small .el-textarea__inner {
  font-size: 12px;
}
/deep/ .el-input--small .el-input__inner {
  height: 28px;
  line-height: 28px;
}
/deep/ textarea {
  font: 400 13.3333px Arial;
  resize: none;
}
/deep/ .step_box textarea {
  outline: 0;
  caret-color: transparent;
}
.step_box textarea::-webkit-input-placeholder {
  color: #ccc;
}
.templateInfo {
  padding: 0 30px 2px 50px;
  margin: 0 auto;
  margin-top: 10px;
  width: 600px;
}
.stepInfo {
  background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
  background-size: 14px 2px;
  background-repeat: repeat-x;
  padding: 15px 10px 0 50px;
  margin: 10px auto 25px;
  width: 600px;
  p {
    font-size: 14px;
    color: grey;
    margin: 5px 0 15px -10px;
  }
}
.confirmBox {
  text-align: center;
}
button {
  outline: 0;
}
.step_box {
  min-height: 72px;
  width: 810px;
  display: flex;

  .start-steps,
  .end-steps {
    width: 90px;
    position: relative;
    padding: 15px 30px 15px 0;
  }
  .end-steps {
    box-sizing: border-box;
    position: relative;
    padding: 15px 0 15px 15px;
    .stepsAdd {
      left: -19px;
    }
  }
  .start-btn,
  .end-btn {
    width: 90px;
    height: 40px;
    border: 1px solid #b3d8ff;
    border-radius: 20px;
    text-align: center;
    color: #409eff;
    line-height: 40px;
    font-size: 12px;
    cursor: pointer;
    background: #ecf5ff;
  }
}
.end-steps::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -30px;
  width: 40px;
  height: 1px;
  background: #c0c4cc;
}
.end-steps::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: dashed solid;
  top: 50%;
  left: 10px;
  margin-top: -4px;
  border-color: transparent transparent transparent #c0c4cc;
}
.stepsAdd-before {
  display: none;
  left: -19px;
  z-index: 2;
}
.stepsAdd {
  font-size: 14px;
  text-align: center;
  position: absolute;
  top: 50%;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 18px;
  margin-top: -10px;
  background-color: #409eff;
  color: #fff;
  z-index: 1;
  cursor: pointer;
}
.stepsAdd-end {
  display: block;
}
.stepsAdd-after {
  display: none;
  right: -1px;
  z-index: 2;
}
.end-steps:hover {
  .stepsAdd-after {
    display: block;
  }
}
.step:hover {
  .stepsAdd-before {
    display: block;
  }
  .stepsAdd-after {
    display: block;
  }
  .sb-close {
    display: block;
  }
}
.sb-close {
  cursor: default;
  display: none;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  color: #fff;
  text-align: center;
  position: absolute;
  color: #fff;
  background: #f56c6c;
  font-size: 16px;
  border-radius: 50%;
  top: 3px;
  right: 23px;
  line-height: 12px;
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  display: flex;
  flex-wrap: wrap;
}
.step::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -30px;
  width: 40px;
  height: 1px;
  background: #c0c4cc;
}
.step {
  position: relative;
  padding: 10px 30px 10px 15px;
}
.step::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: dashed solid;
  top: 50%;
  left: 10px;
  margin-top: -4px;
  border-color: transparent transparent transparent #c0c4cc;
}
.list-group-item {
  position: relative;
  width: 90px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #409eff;
  height: 48px;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  padding: 0 5px;
  font-size: 12px;
  line-height: 48px;
  background: #ecf5ff;
  color: #409eff;
}
</style>
