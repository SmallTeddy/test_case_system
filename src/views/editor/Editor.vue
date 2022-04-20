<template>
  <div class="editor-box">
    <quill-editor
      class="editor"
      ref="myTextEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Editor extends Vue {
  content = `<h1>使用 Rustup（推荐）</h1>
您似乎正在运行 macOS、Linux 或其它类 Unix 系统。要下载 Rustup 并安装 Rust，请在终端中运行以下命令，然后遵循屏幕上的指示。如果您在 Windows 上，请参见 “其他安装方式”。
<br /><br />
<code>curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh</code>
<br /><br />
<h1>Rust 安装须知</h1>
<br />
<h2>入门</h2>
如果您希望通过一份详细的步骤指南来开始学习 Rust ，请阅读马上开始页面。

<br /><br />
<h2>用 <code>rustup</code> 管理工具链</h2>
<br /><br />
Rust 由工具 rustup 安装和管理。Rust 有着以 6 星期为周期的 快速版本迭代机制，支持 大量平台，因而不同时期存在大量不同的 Rust 构建版本。 rustup 用于管理不同平台下的 Rust 构建版本并使其互相兼容， 支持安装由 Beta 和 Nightly 频道发布的版本，并支持其他用于交叉编译的编译版本。

如果您曾经安装过 rustup，可以执行 rustup update 来升级 Rust。

更多信息请查阅 rustup 文档。
<br /><br />
<h2>配置 <code>PATH</code> 环境变量</h2>
<br /><br />
在 Rust 开发环境中，所有工具都安装在 ~/.cargo/bin 目录中，您可以在这里找到包括 rustc、cargo 和 rustup 在内的 Rust 工具链。

Rust 开发者通常会将该目录加入 PATH环境变量中。在安装过程中，rustup 会尝试配置 PATH。 由于不同平台、命令行 Shell 之间存在差异，rustup 中也可能存在 Bug，因此在终端重启或用户重新登录之前，rustup 对 PATH 的修改可能不会生效，甚至完全无效。

如果安装后在终端尝试执行 rustc --version 失败，那么，以上内容就是最可能的原因。
<br /><br />
<h2>卸载 <code>Rust</code></h2>
在任何时候如果您想卸载 Rust，您可以运行 rustup self uninstall。但我们会想念您的！`;
  editorOption = {
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{ header: 1 }, { header: 2 }], // 1、2 级标题
        [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
        [{ script: "sub" }, { script: "super" }], // 上标/下标
        [{ indent: "-1" }, { indent: "+1" }], // 缩进
        // [{'direction': 'rtl'}],                         // 文本方向
        [{ size: ["small", false, "large", "huge"] }], // 字体大小
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
        [{ font: [] }], // 字体种类
        [{ align: [] }], // 对齐方式
        ["clean"], // 清除文本格式
        ["link", "image", "video"], // 链接、图片、视频
      ], //工具菜单栏配置
    },
    placeholder: "请在这里添写评论", //提示
    readyOnly: false, //是否只读
    theme: "snow", //主题 snow/bubble
    syntax: true, //语法检测
  };
  // 失去焦点
  onEditorBlur(editor: unknown): void {}
  // 获得焦点
  onEditorFocus(editor: unknown): void {}
  // 开始
  onEditorReady(editor: unknown): void {}
  // 修改值
  onEditorChange(editor: Record<string, string>): void {
    this.content = editor.html;
  }
}
</script>

<style lang="less" scoped>
.editor-box {
  width: 100%;
  height: 100%;
}
.editor {
  line-height: normal !important;
  height: 750px;
}
::v-deep .ql-snow .ql-tooltip .ql-flip {
  left: -5px !important;
}
::v-deep .ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
::v-deep .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

::v-deep .ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

::v-deep .ql-snow .ql-picker.ql-size .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="small"]::before,
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="large"]::before,
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-label[data-value="huge"]::before,
::v-deep
  .ql-snow
  .ql-picker.ql-size
  .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
::v-deep .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

::v-deep .ql-snow .ql-picker.ql-font .ql-picker-label::before,
::v-deep .ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
::v-deep
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="serif"]::before,
::v-deep
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
::v-deep
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="monospace"]::before,
::v-deep
  .ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
