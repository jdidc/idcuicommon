<style lang="less">
@import "./Table.less";
</style>

<template>
  <div class="idc-export-table">
    <div class="tools" v-if="toolsOpen">
      <transition name="fade">
        <div v-if="showTools">
          <Button @click="showExportModal = true">
            <Icon type="ios-cloud-download-outline"></Icon>
            <span>导出</span>
          </Button>
        </div>
      </transition>
      <Modal :mask-closable="false" title="数据导出" v-model="showExportModal">
        <p>
          总共数据量：
          <strong>
            <h4>{{page.total}}</h4>
          </strong>
        </p>

        <p>
          已导出数据量：
          <strong>
            <h4>{{dataArr.length}}</h4>
          </strong>
        </p>
        <Progress :percent="percent|numberFormat"></Progress>
        <div slot="footer">
          <Button
            :loading="modalLoading"
            @click="getDataByPage"
            type="primary"
            v-if="type === 'server'"
          >导出csv</Button>
          <Button :loading="modalLoading" @click="clientExport" type="primary" v-else>导出csv</Button>
        </div>
      </Modal>

      <div @click="toggleTools" class="icon">
        <Tooltip :content="'点击' + (showTools ? '收起' : '展开')" placement="top" transfer>
          <i aria-hidden="true" class="fa fa-cog"></i>
        </Tooltip>
      </div>
    </div>

    <Table
      :border="border"
      :columns="columns"
      :data="tableData"
      :disabledHover="disabledHover"
      :height="height ? height:''"
      :highlightRow="highlightRow"
      :loading="loading"
      :noDataText="noDataText"
      :noFilteredDataText="noFilteredDataText"
      :rowClassName="rowClassName"
      :showHeader="showHeader"
      :size="size"
      :stripe="stripe"
      :width="width ? width:''"
      @on-current-change="onCurrentChange"
      @on-expand="onExpand"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-select="onSelect"
      @on-select-all="onSelectAll"
      @on-select-cancel="onSelectCancel"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      ref="grid"
    >
      <div slot="header" v-if="showSlotHeader">
        <slot name="header"></slot>
      </div>

      <!-- 这个做了个传送slot -->
      <div slot="footer" v-if="showSlotFooter">
        <slot name="footer"></slot>
      </div>
    </Table>

    <div class="page-wrapper">
      <!-- 服务端分页 -->
      <Page
        :current.sync="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @on-change="getData"
        @on-page-size-change="pageSizeChange"
        show-elevator
        show-sizer
        show-total
        v-if="type === 'server'"
      ></Page>

      <!-- 本地分页 -->
      <Page
        :current.sync="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @on-change="getClientDataByPage"
        @on-page-size-change="pageSizeChange"
        show-elevator
        show-sizer
        show-total
        v-else-if="pagination"
      ></Page>
    </div>
  </div>
</template>
<script>
import ajax from "../../utils/ajax";
import { oneOf } from "../../utils/assist";
import methods from "./methods";

export default {
  name: "idcExportTable",
  mixins: [methods],
  props: {
    type: {
      type: String,
      // client | server
      default: "client"
    },
    data: {
      default() {
        return [];
      }
    },
    // 是否显示分页组件
    pagination: {
      type: Boolean,
      default: false
    },
    // 分页的每页显示数量
    pageSize: {
      type: Number,
      default: 10
    },
    url: {
      type: String
    },
    condition: {
      type: Object,
      default() {
        return {};
      }
    },
    toolsOpen: {
      default: false
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabledHover: {
      type: Boolean,
      default: false
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default() {
        return "";
      }
    },
    size: {
      validator(value) {
        return oneOf(value, ["small", "large", "default"]);
      }
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    // 导出参数
    exportParams: {
      type: Object
    },
    // 每次请求数量
    exportPageSize: {
      type: Number,
      default: 1000
    },
    // 导出类型
    exportType: {
      type: String,
      default: "csv"
    },
    // 导出名字
    fileName: {
      type: String,
      default: "data"
    }
  },
  data() {
    return {
      tableData: [],
      showTools: false,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: this.pageSize
      },
      showSlotHeader: true,
      showSlotFooter: true,
      // 是否显示导出modal
      showExportModal: false,
      modalLoading: false,
      // 进度
      percent: 0,
      // 导出数据集
      dataArr: []
    };
  },
  methods: {
    // 获取表格数据
    getData() {
      let data = {
        page: this.page.currentPage,
        pageSize: this.page.pageSize
      };
      Object.assign(data, this.condition);

      ajax
        .get(this.url, {
          params: data
        })
        .then(resp => {
          this.tableData = resp.data.data;
          this.page.total = resp.data.total;
          this.$emit("on-data-callback", resp);
        });
    },
    // 重置
    reset() {
      this.dataArr = [];
      this.percent = 0;
    },
    // 按页获取，导出所有
    getDataByPage(event, page = 1) {
      this.modalLoading = true;

      if (this.dataArr.length == this.page.total) {
        this.reset();
      }
      if (this.condition.page) {
        delete this.condition.page;
      }
      if (this.condition.pageSize) {
        delete this.condition.pageSize;
      }

      let data = {
        page: page,
        pageSize: this.exportPageSize
      };

      Object.assign(data, this.condition);

      if (this.exportParams != null) {
        Object.assign(data, this.exportParams);
      }

      ajax
        .get(this.url, {
          params: data
        })
        .then(response => {
          if (response.status != 200) {
            this.$Message.error("错误啦!!", response.data.message);
            return;
          }
          // 进度条，步进
          this.addPercent();
          let data = response.data;
          // 返回数据长度为0时，停止继续请求。
          if (data.data.length == 0) {
            return;
          }
          this.dataArr = this.dataArr.concat(data.data);

          if (this.dataArr.length < this.page.total) {
            this.getDataByPage(null, page + 1);
          } else {
            this.modalLoading = false;

            setTimeout(() => {
              this.exportData({
                columns: this.columns,
                data: this.dataArr
              });
            }, 200);

            setTimeout(() => {
              this.showExportModal = false;
              this.reset();
            }, 2000);
          }
        });
    },
    // 增加进度
    addPercent() {
      var per = 100 / Math.ceil(this.page.total / this.exportPageSize);
      this.percent = this.percent + per;
    },

    // 导出data到csv
    exportData({ columns, data }, type, name) {
      this.$refs.grid.exportCsv({
        filename: this.fileName,
        columns: columns,
        data: data
      });
    },

    // 客户端导出
    clientExport() {
      this.dataArr = this.data;
      this.percent = 100;
      setTimeout(() => {
        this.exportData({
          columns: this.columns,
          data: this.data
        });
      }, 200);

      setTimeout(() => {
        this.showExportModal = false;
        this.reset();
      }, 2000);
    },

    // 本地分页
    getClientDataByPage() {
      let dataLength = this.data.length;
      this.page.total = dataLength;
      if (this.page.pageSize < dataLength && this.pagination) {
        let startIndex = this.page.pageSize * (this.page.currentPage - 1);
        this.tableData = this.data.slice(
          startIndex,
          startIndex + this.page.pageSize
        );
      } else {
        this.tableData = this.data;
      }
    },

    // page组件的pageSize大小改变后的处理
    pageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      if (this.type === "server") {
        this.getData();
      } else {
        this.getClientDataByPage();
      }
    },
    toggleTools() {
      this.showTools = !this.showTools;
    },
    onCurrentChange(...arg) {
      this.$emit("on-current-change", ...arg);
    },
    onSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },
    onSelectCancel(selection, row) {
      this.$emit("on-select-cancen", selection, row);
    },
    onSelectAll(selection) {
      this.$emit("on-select-all", selection);
    },
    onSelectionChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    onSortChange(...arg) {
      this.$emit("on-sort-change", ...arg);
    },
    onFilterChange(column) {
      this.$emit("on-filter-change", column);
    },
    onRowClick(row, index) {
      this.$emit("on-row-click", row, index);
    },
    onRowDblclick(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    onExpand(row, status) {
      this.$emit("on-expand", row, status);
    }
  },
  created() {
    if (this.type === "server") {
      this.getData();
    } else {
      this.getClientDataByPage();
    }
    this.showSlotFooter = this.$slots.footer !== undefined;
    this.showSlotHeader = this.$slots.header !== undefined;
  },
  watch: {
    // 这样可以遍历condition对象的每个属性
    condition: {
      handler() {
        if (this.type === "server") {
          this.getData();
        }
      },
      deep: true
    },
    data: {
      handler() {
        if (this.type === "client") {
          this.getClientDataByPage();
        }
      },
      deep: true
    },
    columns: {
      handler() {
        if (this.type === "server") {
          this.getData();
        } else {
          this.getClientDataByPage();
        }
      },
      deep: true
    },
    url() {
      if (this.type === "server") {
        this.getData();
      }
    }
  },
  filters: {
    numberFormat(value) {
      return Number(value.toFixed(2));
    }
  }
};
</script>
