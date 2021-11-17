import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export class TablePageTableMixins extends Vue {
  loading = false;
  tableData: any = [];
  currenPage = 1;
  pageSize = 1;
  pageTotal = 0;

  pageChange(page: number): void {
    this.currenPage = page;
    this.getTable(this.currenPage, this.pageSize);
  }
  sizeChange(size: number): void {
    this.pageSize = size;
    this.getTable(this.currenPage, this.pageSize);
  }
  getTable(page: number, size: number): void {
    this.loading = true;
    this.pageTotal = this.tableData.length;
    this.loading = false;
  }

  mounted(): void {
    this.getTable(1, 10);
  }
}