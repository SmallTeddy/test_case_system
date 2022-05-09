<template>
  <div>
    <code-diff :old-string="oldStr" :new-string="newStr" outputFormat="side-by-side" diffStyle="char" :context="10" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CodeDiff from 'vue-code-diff';

@Component({ components: { CodeDiff } })
export default class Diff extends Vue {
  oldStr = `import { Vue, Component } from 'vue-property-decorator';
import dataPageTable from '@/components/data/data-page-table.vue';
import { commonGet } from '@/api/service';
@Component({ components: { dataPageTable } })
export default class StatusVs extends Vue {
  pageTableKey = String(new Date());
  showAddCertificate = false;
  tableData: Record<string, unknown>[] = [];
  loading = false;
  currenPage = 1;
  pageSize = 10;
  pageTotal = 0;
  deviceId = '';
  state = '';
  tenant = '';
  protocol = '';
  devicesOptions: Record<string, unknown>[] = [];
  statesOptions: Record<string, unknown>[] = [];
  protocolsOptions: Record<string, unknown>[] = [];
  tenantsOptions: Record<string, unknown>[] = [];
  dataList = [
    { id: 1, prop: 'vs_name', name: '虚拟服务名', width: '600' },
    { id: 2, prop: 'proto', name: '协议' },
    { id: 3, prop: 'ip', name: 'IP' },
    { id: 4, prop: 'port', name: 'Port' }
  ];
  pageChange(page: number): void {
    this.pageTableKey = String(new Date());
    this.currenPage = page;
    this.getTableData(this.currenPage, this.pageSize,this.deviceId,Number(this.state),this.tenant,this.protocol);
  }
  sizeChange(size: number): void {
    this.pageTableKey = String(new Date());
    this.pageSize = size;
    this.currenPage = 1;
    this.getTableData(this.currenPage, this.pageSize,this.deviceId,Number(this.state),this.tenant,this.protocol);
  }
  descriptionsReturn(data: string): string {
    return data ? data : '无';
  }
  mounted(): void {
    this.getselectInfo();
    if (Object.keys(this.$route.query).length === 0) {
      //路由没携带参数
      this.getTableData(1, 10);
    } else {
      const { deviceId, protocol, tenant ,state} = this.$route.query;
      if (Object.keys(this.$route.query)[0] === 'protocol') {
        // VS类型
        this.getTableData(1, 10, deviceId as unknown as number, null, null, protocol as unknown as string);
        this.protocol = String(protocol);
      } else if (Object.keys(this.$route.query)[0] === 'tenant') {
        // VS数量
        this.getTableData(1, 10, deviceId as unknown as number, null, tenant as unknown as string);
        this.tenant = String(tenant);
      }else if (Object.keys(this.$route.query)[0] === 'state') {
        // VS状态
        this.getTableData(1, 10, deviceId as unknown as number, state as unknown as number, null,null);
      }
    }
  }
  // 列表查询
  async getTableData(
    currenPage: number,
    pageSize: number,
    deviceId?: number | string | null,
    state?: number | null,
    tenant?: string | null,
    protocol?: string | null
  ): Promise<void> {
    const parmas = {
      pageIndex: currenPage,
      pageSize: pageSize,
      deviceId: deviceId || '',
      tenant: tenant || '',
      state: state || '',
      protocol: protocol || ''
    };
    const res = await commonGet('mwm', 'virtualServer/vsList', parmas);
    if (res.error_code === 0) {
      this.tableData = (res.response_data as Record<string, unknown>)
        .vs_info as Record<string, unknown>[];
      this.pageTotal = (res.response_data as Record<string, unknown>)
        .total as number;
    } else {
      this.$message.error(res.msg as string);
    }
  }
  // 总览列表页下拉框数据查询
  async getselectInfo(): Promise<void> {
    const res = await commonGet('mwm', 'virtualServer/selectInfo', {});
    if (res.error_code === 0) {
      this.devicesOptions = (res.response_data as Record<string, unknown>)
        .devices as Record<string, unknown>[];
      if(this.$route.query.deviceId){
          const obj: Record<string, unknown> = this.devicesOptions.find(item =>item.Key ===this.$route.query.deviceId) as Record<string, unknown>;
          this.deviceId = obj.Key as string;
        }
      this.statesOptions = (res.response_data as Record<string, unknown>)
        .states as Record<string, unknown>[];

          if(this.$route.query.state){
          const obj: Record<string, unknown> = this.statesOptions.find(item =>item.Key ===this.$route.query.state) as Record<string, unknown>;
          this.state = obj.Key as string;
        }
      let protocolsList = (res.response_data as Record<string, unknown>)
        .protocols as Record<string, unknown>[];
        protocolsList.forEach((item, index) => {
        this.protocolsOptions.push({
          Key: index,
          Value: item
        });
      });
      let tenantsList = (res.response_data as Record<string, unknown>)
        .tenants as Record<string, unknown>[];
      tenantsList.forEach((item, index) => {
        this.tenantsOptions.push({
          Key: index,
          Value: item
        });
      });
    } else {
      this.$message.error(res.msg as string);
    }
  }
  //搜索
  query(): void {
    this.getTableData(
      1,
      10,
      Number(this.deviceId),
      Number(this.state),
      this.tenant,
      this.protocol
    );
  }
}`;
  newStr = `import { Vue, Component } from 'vue-property-decorator';
import dataPageTable from '@/components/data/data-page-table.vue';
import { commonGet } from '@/api/service';
@Component({ components: { dataPageTable } })
export default class StatusVs extends Vue {
  pageTableKey = String(new Date());
  showAddCertificate = false;
  tableData: Record<string, unknown>[] = [];
  loading = false;
  currenPage = 1;
  pageSize = 10;
  pageTotal = 0;
  deviceId = '';
  state = '';
  tenant = '';
  protocol = '';
  devicesOptions: Record<string, unknown>[] = [];
  statesOptions: Record<string, unknown>[] = [];
  protocolsOptions: Record<string, unknown>[] = [];
  tenantsOptions: Record<string, unknown>[] = [];
  dataList = [
    { id: 1, prop: 'vs_name', name: '虚拟服务名', width: '600' },
    { id: 2, prop: 'proto', name: '协议' },
    { id: 3, prop: 'ip', name: 'IP' },
    { id: 4, prop: 'port', name: 'Port' }
  ];
  pageChange(page: number): void {
    this.pageTableKey = String(new Date());
    this.currenPage = page;
    this.getTableData(this.currenPage, this.pageSize, this.deviceId, Number(this.state), this.tenant, this.protocol);
  }
  sizeChange(size: number): void {
    this.pageTableKey = String(new Date());
    this.pageSize = size;
    this.currenPage = 1;
    this.getTableData(this.currenPage, this.pageSize, this.deviceId, Number(this.state), this.tenant, this.protocol);
  }
  descriptionsReturn(data: string): string {
    return data ? data : '无';
  }
  mounted(): void {
    this.getselectInfo();
    if (Object.keys(this.$route.query).length === 0) {
      //路由没携带参数
      this.getTableData(1, 10);
    } else {
      const { deviceId, protocol, tenant ,state } = this.$route.query;
      switch(Object.keys(this.$route.query)[0]) {
        case 'protocol': // VS类型
          this.getTableData(1, 10, deviceId as unknown as number, null, null, protocol as unknown as string);
          this.protocol = String(protocol);
          break;
        case 'tenant': // VS数量
          this.getTableData(1, 10, deviceId as unknown as number, null, tenant as unknown as string);
        this.tenant = String(tenant);
          break;
        case 'state': // VS状态
          this.getTableData(1, 10, deviceId as unknown as number, state as unknown as number, null, null);
          break;
      }
    }
  }
  // 列表查询
  async getTableData(
    currenPage: number,
    pageSize: number,
    deviceId?: number | string | null,
    state?: number | null,
    tenant?: string | null,
    protocol?: string | null
  ): Promise<void> {
    const parmas = {
      pageIndex: currenPage,
      pageSize: pageSize,
      deviceId: deviceId || '',
      tenant: tenant || '',
      state: state || '',
      protocol: protocol || ''
    };
    const res = await commonGet('mwm', 'virtualServer/vsList', parmas);
    if (res.error_code === 0) {
      this.tableData = (res.response_data as Record<string, unknown>).vs_info as Record<string, unknown>[];
      this.pageTotal = (res.response_data as Record<string, unknown>).total as number;
    } else {
      this.$message.error(res.msg as string);
    }
  }
  // 总览列表页下拉框数据查询
  async getselectInfo(): Promise<void> {
    const res = await commonGet('mwm', 'virtualServer/selectInfo', {});
    if (res.error_code === 0) {
      this.devicesOptions = (res.response_data as Record<string, unknown>).devices as Record<string, unknown>[];
      if(this.$route.query.deviceId) {
        const obj: Record<string, unknown> = this.devicesOptions.find(item =>item.Key ===this.$route.query.deviceId) as Record<string, unknown>;
        this.deviceId = obj.Key as string;
      }
      this.statesOptions = (res.response_data as Record<string, unknown>).states as Record<string, unknown>[];

      if(this.$route.query.state) {
        const obj: Record<string, unknown> = this.statesOptions.find(item =>item.Key ===this.$route.query.state) as Record<string, unknown>;
        this.state = obj.Key as string;
      }
      let protocolsList = (res.response_data as Record<string, unknown>).protocols as Record<string, unknown>[];
      protocolsList.forEach((item, index) => this.protocolsOptions.push({ Key: index, Value: item }));
      let tenantsList = (res.response_data as Record<string, unknown>).tenants as Record<string, unknown>[];
      tenantsList.forEach((item, index) => this.tenantsOptions.push({ Key: index, Value: item }));
    } else {
      this.$message.error(res.msg as string);
    }
  }
  //搜索
  query(): void {
    this.getTableData(1, 10, Number(this.deviceId), Number(this.state), this.tenant, this.protocol);
  }`;
}
</script>

<style lang="less" scoped>
::v-deep .d2h-wrapper .d2h-code-side-line,
.d2h-wrapper .d2h-code-line {
  display: inline-block;
}
</style>
