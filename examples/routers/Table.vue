<template>
  <div>
    <div style="margin-bottom: 10px;">
      <Button @click="change" type="success">change</Button>
      <Button @click="exportCsv" type="success">exportCsv</Button>
      <Button @click="clearCurrentRow" type="success">调用table的clearCurrentRow方法</Button>
      <div style="margin-top: 10px;">
        <Input style="display:inline-block;" v-model="condition.code"/>
      </div>
    </div>

    <idc-table
      :columns="columns1"
      :export-page-size="10"
      :tools-open="true"
      :url="url"
      @on-data-callback="callback"
      @on-row-click="onRowClick"
      @on-select="selectChange"
      @on-sort-change="sortChange"
      border
      highlight-row
      ref="table"
      stripe
      type="server"
    ></idc-table>

    <idc-table
      :columns="columns1"
      :data="data"
      :page-size="5"
      :pagination="true"
      ref="table"
      style="margin-top: 10px;"
    ></idc-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: "v1.0/cmdb/packages",
      condition: {
        code: ""
      },
      data: [
        {
          status: 1,
          created_at: "12312334",
          type_name: "address"
        },
        {
          status: 2,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 3,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 4,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 5,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 6,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 7,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 8,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 9,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 10,
          created_at: "123123",
          type_name: "address"
        },
        {
          status: 11,
          created_at: "123123",
          type_name: "adsf"
        },
        {
          status: 12,
          created_at: "123123",
          type_name: "asdf"
        },
        {
          status: 13,
          created_at: "123123",
          type_name: "dff"
        }
      ],
      columns1: [
        {
          title: "序号",
          type: "selection"
        },
        {
          title: "Name",
          key: "status",
          sortable: true
        },
        {
          title: "Age",
          key: "created_at"
        },
        {
          title: "Address",
          key: "type_name"
        }
      ]
    };
  },
  methods: {
    change() {
      if (0.5 < Math.random()) {
        this.columns1[0].title = "name1";
        this.url = "v1.0/cmdb/packages";
      } else {
        this.columns1[0].title = "name2";
        this.url = "v1.0/cmdb/package";
      }
    },
    exportCsv() {
      this.$refs.table.exportCsv({ filename: "test.csv" });
    },
    clearCurrentRow() {
      this.$refs.table.clearCurrentRow();
    },
    sortChange({ column, key, order }) {
      console.log(column);
      console.log(key);
      console.log(order);
      this.$Message.success("sort change");
    },
    selectChange(selection, row) {
      console.log(1, selection);
      console.log(2, row);
      this.$Message.success("sort change");
    },
    onRowClick(data, index) {
      console.log(3, data);
      console.log(3, index);
    },
    callback(resp) {
      console.log(resp);
    }
  }
};
</script>
