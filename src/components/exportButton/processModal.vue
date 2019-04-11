<template>
  <Modal
    :mask-closable="false"
    :title="modalTitle"
    v-model="show"
  >
  <div class="content">
     <div class="number">
      <span class="number-first">{{currentNumber}}</span>
      <span class="number-op">/</span>
      <span class="number-total">{{total}}</span>
    </div>
    <Progress :percent="percent|numberFormat"></Progress>
  </div>
    
    <div slot="footer">
      <Button :loading="exporting" @click="startExport" type="primary">{{buttonName}}</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  props: {
    value: Boolean,
    total: Number,
    percent: Number,
    exporting: Boolean,
    currentNumber: Number,
    modalTitle: {
      type: String,
      default() {
        return "数据导出";
      }
    }
  },
  data() {
    return {
      show: false
    };
  },
  computed:{
    buttonName(){
      if(this.currentNumber ===0){
        return '开始导出';
      }else if(this.currentNumber < this.total){
        return '数据获取中';
      }else{
        return '已下载';
      }
    }
  },
  methods: {
    startExport() {
      this.$emit("startExport");
    }
  },
  watch: {
    show(newVal) {
      this.$emit("input", newVal);
    },
    value(newVal) {
      this.show = newVal;
    }
  },
  filters: {
    numberFormat(value) {
      return Number(value.toFixed(2));
    }
  }
};
</script>
<style scoped>
.content{
  text-align: center;
}

.number{
  font-size: 28px;
}
</style>
