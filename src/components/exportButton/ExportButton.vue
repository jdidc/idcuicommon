<template>
  <div @click="setTotal" class="button-wrapper">
    <slot>
      <Button icon="md-download" type="primary">{{title}}</Button>
    </slot>
    <processModal
      :currentNumber="currentNumber"
      :exporting="exporting"
      :percent="percent"
      :total="total"
      @startExport="startExport"
      v-if="modal"
      v-model="processModalShow"
    ></processModal>
  </div>
</template>
<script>
export default {
  name: "ExportButton",
  components: {
    processModal: () => import("./processModal")
  },
  props: {
    request: {
      type: Function,
      required: false
    },
    getTotal: Function,
    pageSize: {
      default: 100,
      type: Number
    },
    modal: {
      type: Boolean,
      default() {
        return true;
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    filename: {
      type: String,
      default() {
        return "导出文件";
      }
    },
    title: {
      type: String,
      default: "数据导出"
    },
    columns: {
      type: Array,
      required: true
    },
    autoWidth: {
      type: Boolean,
      default() {
        return true;
      }
    },
    bookType: {
      type: String,
      default() {
        return "xlsx";
      }
    }
  },
  data() {
    return {
      total: 0,
      percent: 0,
      currentNumber: 0,
      processModalShow: false,
      exporting: false
    };
  },
  methods: {
    async setTotal() {
      if (this.data.length > 0) {
        const excel = await import("./Export2Excel");
        const tHeader = [];
        const filterVal = [];
        this.columns.forEach(item => {
          tHeader.push(item.title);
          filterVal.push(item.key);
        });

        let data = this.formatJson(filterVal, this.data);

        excel.export_json_to_excel({
          multiHeader: [],
          header: tHeader,
          data,
          merges: [],
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
      } else {
        this.reset();
        let num = await this.getTotal();
        this.total = num;
        this.processModalShow = true;
      }
    },

    getData(times) {
      return new Promise(resolve => {
        let data = [];
        let i = 0;
        let self = this;
        function request() {
          if (!self.exporting) self.exporting = true;
          self.request(i, self.pageSize).then(res => {
            self.addPercent();
            i++;
            data.push(...res);
            self.currentNumber = data.length;
            if (i >= times) {
              resolve(data);
              return;
            }
            return request();
          });
        }
        request();
      });
    },

    async startExport() {
      // 获得需要请求的次数
      let times = Math.ceil(this.total / this.pageSize);
      let data = await this.getData(times);

      console.log("total data", data);

      const excel = await import("./Export2Excel");
      const tHeader = [];
      const filterVal = [];
      this.columns.forEach(item => {
        tHeader.push(item.title);
        filterVal.push(item.key);
      });

      data = this.formatJson(filterVal, data);

      excel.export_json_to_excel({
        multiHeader: [],
        header: tHeader,
        data,
        merges: [],
        filename: this.filename,
        autoWidth: this.autoWidth,
        bookType: "xlsx"
      });

      setTimeout(() => {
        this.processModalShow = false;
        this.exporting = false;
      }, 1000);
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    },

    // num表示已经完成导入的数量
    addPercent() {
      const per = 100 / Math.ceil(this.total / this.pageSize);
      this.percent += per;
    },

    reset() {
      this.total = 0;
      this.percent = 0;
      this.currentNumber = 0;
    }
  }
};
</script>
<style scoped>
.button-wrapper {
  display: inline-block;
}
</style>
