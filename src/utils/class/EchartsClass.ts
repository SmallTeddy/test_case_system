import echarts from 'echarts';

class EchartClass {
  echartId = '';
  option: echarts.EChartsCoreOption = {};

  constructor(data: Partial<EchartClass> = {}) {
      Object.assign(this, data);
  }
}

export { EchartClass };