<template>
  <div class="home">
    <div class="card-box-first">
      <CardItem :list="dataListFirst" />
    </div>
    <div class="card-box-second">
      <CardItem :list="dataListSecond" />
    </div>
    <div>
      <data-echarts :echart="eventLineChart" class="eventLineChart"></data-echarts>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DataEcharts from "@/components/data/DataEcharts.vue"
import CardItem from "./CardItem.vue"

@Component({ components: { DataEcharts, CardItem }})
export default class Home extends Vue {
  eventLineChart = {
    echartId: 'echart1',
    option: {
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
      },
      yAxis: {},
      series: [
        {
          data: [10, 22, 28, 23, 19, 10, 18, 24, 14, 17, 23],
          type: 'line',
          lineStyle: { color: 'skyblue', width: 2 },
        },
      ]
    }
  }
  dataListFirst = [
    { id: '1', icon: 'el-icon-s-home', title: '首页', data: '13', bgcolor: 'item-img-first'},
    { id: '2', icon: 'el-icon-s-promotion', title: '数据传输量', data: '56', bgcolor: 'item-img-second'},
    { id: '3', icon: 'el-icon-picture', title: '图片名称', data: '273', bgcolor: 'item-img-third'},
    { id: '4', icon: 'el-icon-s-comment', title: '消息名称', data: '975', bgcolor: 'item-img-fourth'},
    { id: '5', icon: 'el-icon-s-marketing', title: '图表名称', data: '21', bgcolor: 'item-img-fiveth'}
  ]
  dataListSecond = [
    { id: '1', icon: 'el-icon-folder-opened', title: '文件数量', data: '45', bgcolor: 'item-img-first'},
    { id: '2', icon: 'el-icon-folder-delete', title: '失效文件量', data: '26', bgcolor: 'item-img-second'},
    { id: '5', icon: 'el-icon-s-order', title: '评论数量', data: '33', bgcolor: 'item-img-third'},
    { id: '3', icon: 'el-icon-warning-outline', title: '警告数量', data: '12', bgcolor: 'item-img-fourth'},
    { id: '4', icon: 'el-icon-question', title: '问题数量', data: '1', bgcolor: 'item-img-fiveth'}
  ]
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}

.card-box-first,
.card-box-second {
  display: flex;
  height: 120px;
  width: 100%;
}

.card-box-second {
  margin-top: 20px;
}

.eventLineChart {
  width: 100%;
  height: 500px;
}
</style>

