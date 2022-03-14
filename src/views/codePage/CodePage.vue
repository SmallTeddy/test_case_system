<template>
  <div>
    <codemirror v-model="code" :options="cmOption" @focus="sqlCodeFocus(code)" @blur="sqlCodeBlur(code)" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({ })
export default class CodePage extends Vue {
  code = '请输入代码';
  cmOption = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    line: true,
    mode: 'text/x-mysql',
    theme: 'dracula dark'
  };
  sqlCodeFocus(code: string): void {
    if(code == '请输入代码') {
      this.code = '';
    }
  }
  sqlCodeBlur(code: string): void {
    if(String(code).trim() == '') {
      this.code = '请输入代码';
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .CodeMirror {
  height: 800px;
}
::v-deep .cm-s-solarized.CodeMirror {
  box-shadow: none;
}
</style>
