<template>
  <div class="data-echarts">
    <div :id="echart.echartId" class="echart-box"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import * as echarts from "echarts";
import { EchartClass } from '@/utils/class/EchartsClass';

@Component({})
export default class Home extends Vue {
  @Prop({ default: () => new EchartClass() }) echart!: EchartClass;
  myEchart: unknown = null;

  dispose(): void {
    let chart = document.getElementById(this.echart.echartId);
    let existInstance = echarts.getInstanceByDom(chart as HTMLElement);
    if (existInstance) echarts.dispose(chart as HTMLElement);
  }
  init(): void {
    const domElement = document.getElementById(this.echart.echartId);
    if (domElement) {
      this.myEchart = echarts.init(domElement);
      (this.myEchart as echarts.ECharts).setOption(this.echart.option);
    }
  }
  mounted(): void {
    this.dispose();
    this.init();
  }
}
</script>

<style lang="less" scoped>
.data-echarts {
  width: 100%;
  height: 100%;
  position: relative;
  .echart-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
  }
}
</style>

