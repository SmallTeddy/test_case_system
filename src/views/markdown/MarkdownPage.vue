<template>
  <div class="vs-markdown">
    <VueMarkdown style="margin-top: -16px;" :source="htmlMD"></VueMarkdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VueMarkdown from 'vue-markdown';
const docMD = require('../../../README.md');
import { useCounterStore } from '@/pinia/index';

@Component({
  components: { VueMarkdown }
})
export default class Doc extends Vue {
  htmlMD: any = docMD;
  counter = useCounterStore();

  mounted() {
    console.log(this.counter)
    console.log(this.counter.count)
    this.counter.$patch({ count: this.counter.count + 1 })
  }
}
</script>

<style lang="less">
@import '../../styles/markdown.less';
</style>
