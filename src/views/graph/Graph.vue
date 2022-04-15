<template>
  <div>
     <div style="height:calc(100vh - 50px);">
        <RelationGraph ref="seeksRelationGraph" :options="graphOptions" :on-node-click="onNodeClick" :on-line-click="onLineClick" />
     </div>
   </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import RelationGraph from 'relation-graph';

@Component({ components: { RelationGraph }})
export default class Graph extends Vue {
  $refs!: { seeksRelationGraph: typeof RelationGraph };
  name = 'Demo';
  graphOptions = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultJunctionPoint: 'border'
    // 这里可以参考"Graph 图谱"中的参数进行设置
  }
  showSeeksGraph(query?: any): void {
    var __graph_json_data = {
      rootId: 'a',
      nodes: [
        { id: 'a', text: 'A', borderColor: 'yellow' },
        { id: 'b', text: 'B', color: '#43a2f1', fontColor: 'yellow' },
        { id: 'c', text: 'C', nodeShape: 1, width: 80, height: 60 },
        { id: 'e', text: 'E', nodeShape: 0, width: 150, height: 150 }
      ],
      links: [
        { from: 'a', to: 'b', text: '关系1', color: '#43a2f1' },
        { from: 'a', to: 'c', text: '关系2' },
        { from: 'a', to: 'e', text: '关系3' },
        { from: 'b', to: 'e', color: '#67C23A' }
      ]
    }
    // 以上数据中的node和link可以参考"Node节点"和"Link关系"中的参数进行配置 
    this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph: any) => {
      console.log(seeksRGGraph)
    })
  }
  onNodeClick(nodeObject: any, $event: any): void {
    console.log('onNodeClick:', nodeObject)
  }
  onLineClick(lineObject: any, $event: any): any {
    console.log('onLineClick:', lineObject)
  }
  mounted(): void {
    this.showSeeksGraph()
  }
}
</script>

<style lang="less" scoped>

</style>
