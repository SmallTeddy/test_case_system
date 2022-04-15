<template>
  <div class="card-row">
    <el-card v-for="v in list" :key="v.id">
        <div class="card-item">
          <i :class="[v.icon, v.bgcolor]" class="item-img"></i>
          <div class="card-text">
            <h4>{{ v.title }}</h4>
            <p>{{ v.data }}</p>
          </div>
        </div>
      </el-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ })
export default class CardItem extends Vue {
  @Prop({ type: Array, default: () => {[]} }) list!: Array<Record<string, unknown>>;
}
</script>

<style lang="less" scoped>
.card-row {
  display: flex;
}
.el-card {
  flex: 1;
  margin: 0 10px;
}
.card-item {
  height: 80px;
  display: flex;

  .item-img {
    width: 80px;
    height: 80px;
    font-size: 40px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .item-img-first {
    background: #f89490fd;
  }
  .item-img-second {
    background: #84c9c8;
  }
  .item-img-third {
    background: #f3dd8d;
  }
  .item-img-fourth {
    background: #90d6f0;
  }
  .item-img-fiveth {
    background: #e775f19a;
  }

  .card-text {
    font-size: 20px;
    height: 80px;
    width: 140px;

    h4, p {
      text-align: center;
      margin: 10px 0 0 0;
    }
  }
}
</style>
