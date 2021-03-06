<template>
  <div @click="setTotal" class="button-wrapper">
    <slot>
      <Button :loading="loading" :disabled="disabled" icon="md-download" type="primary">{{title}}</Button>
    </slot>
    <processModal
      :currentNumber="currentNumber"
      :exporting="exporting"
      :percent="percent"
      :total="cloneTotal"
      @startExport="startExport"
      v-if="modal"
      v-model="processModalShow"
    ></processModal>
  </div>
</template>
<script>
import processModal from './processModal';
import {export_json_to_excel} from './Export2Excel'
export default {
  name: "ExportButton",
  components: {
    processModal,
  },
  props: {
    request: {
      type: Function,
      required: false
    },
    total: {
      type: Number,
      default(){
        return 0
      }
    },
    getTotal: Function,
    pageSize: {
      default: 100,
      type: Number
    },
    loading: {
      type: Boolean,
      default(){
        return false
      }
    },
    disabled: {
      type: Boolean,
      default(){
        return false
      }
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
      cloneTotal: 0,
      percent: 0,
      currentNumber: 0,
      processModalShow: false,
      exporting: false
    };
  },
  methods: {
    async setTotal() {
      this.reset();
      if(this.loading || this.disabled){
        return;
      }
      if (this.data.length > 0) {
        const tHeader = [];
        const filterVal = [];
        this.columns.forEach(item => {
          tHeader.push(item.title);
          filterVal.push(item.key);
        });

        let data = this.formatJson(filterVal, this.data);

        export_json_to_excel({
          multiHeader: [],
          header: tHeader,
          data,
          merges: [],
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
      } else if(this.total>0){
        this.cloneTotal = this.total;
        this.processModalShow = true;
      } else {
        let num = await this.getTotal();
        this.cloneTotal = num;
        this.processModalShow = true;
      }
    },

    getData(times) {
      return new Promise(resolve => {
        let data = [];
        let i = 1;
        let self = this;
        function request() {
          if (!self.exporting) self.exporting = true;
          self.request(i, self.pageSize).then(res => {
            self.addPercent();
            i++;
            data.push(...res);
            self.currentNumber = data.length;
            if (i > times) {
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
      let times = Math.ceil(this.cloneTotal / this.pageSize);
      let data = await this.getData(times);

      const tHeader = [];
      const filterVal = [];
      this.columns.forEach(item => {
        tHeader.push(item.title);
        filterVal.push(item.key);
      });

      data = this.formatJson(filterVal, data);

      export_json_to_excel({
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
      const per = 100 / Math.ceil(this.cloneTotal / this.pageSize);
      this.percent += per;
    },

    reset() {
      this.cloneTotal = 0;
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
