<template>
  <div class="notfound"></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class NotFound extends Vue {}
</script>

<style lang="less" scoped>
.notfound {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url('../../assets/images/404.png') no-repeat center / cover;
}
</style>
