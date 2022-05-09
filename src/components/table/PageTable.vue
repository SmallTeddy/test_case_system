<template>
  <div class="page-table">
    <el-table :data="data" :size="size" :height="height" :fit="fit" :highlight-current-row="highlightCurrentRow" :span-method="spanMethod">
      <slot></slot>
    </el-table>
    <el-pagination class="pagination-box" :current-page="currenPage" :page-size="pageSize" :total="pageTotal" :page-sizes="showSizes" :pager-count="showPager" :layout="layout" :background="background" @size-change="sizeChange" @current-change="pageChange" @prev-click="pageChange" @next-click="pageChange"></el-pagination>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class PageTable extends Vue {
  inheritAttrs: boolean = false;
  /* 表格 */
  @Prop({ type: Array, default: () => [] }) data!: Record<string, unknown>[];
  @Prop({ type: String, default: 'medium' }) size!: string;
  @Prop({ type: [String, Number] }) height!: string | number;
  @Prop({ type: Boolean, default: true }) fit!: boolean;
  @Prop({ type: Boolean, default: true }) highlightCurrentRow!: boolean;
  @Prop({ type: Function }) spanMethod!: Function;
  /* 页码器 */
  @Prop({ type: Number, default: 1 }) currenPage!: number;
  @Prop({ type: Number, default: 10 }) pageSize!: number;
  @Prop({ type: Number, default: 0 }) pageTotal!: number;
  @Prop({ type: Array, default: () => [5, 10, 20, 50] }) showSizes!: number[];
  @Prop({ type: Number, default: 5 }) showPager!: number; // 页码按钮的个数  5=<pager<=21的奇数
  @Prop({ type: String, default: 'total, sizes, prev, pager, next, jumper' }) layout!: string;
  @Prop({ type: Boolean, default: true }) background!: boolean;
  @Emit('page-change') pageChange(page: number) {}
  @Emit('size-change') sizeChange(page: number) {}
}
</script>

<style lang="less" scoped>
.page-table {
  padding: 0 10px;
  background-color: #fff;
  /deep/ .el-table {
    .el-table__header {
      th {
        border-bottom: 1px solid #e4e7ed;
        padding: 12px 0;
        color: #606266;
      }
    }
    .el-table__body {
      td {
        padding: 10px 0;
      }
    }
    .cell {
      padding: 0 8px;
    }
    .el-button--small {
      padding: 6px 8px;
      font-size: 13px;
    }
  }
  .pagination-box {
    text-align: right;
    padding: 10px 20px;
    /deep/ .el-pager {
      li:not(.disabled).active {
        background-color: #378ab9;
        color: #fff;
      }
    }
  }
}
</style>
