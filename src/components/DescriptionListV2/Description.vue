<template>
  <Col :xs="xs" :sm="sm" :md="md">
    <div v-if="term" class="term">{{term}}</div>
    <!-- eslint-disable-next-line -->
    <div v-if="hasSlot" class="detail" :class="{'no-term': !term}">
      <slot></slot>
    </div>
  </Col>
</template>
<script>
import responsive from './responsive';

export default {
  name: 'descriptionV2',
  props: {
    term: String,
    col: {
      type: Number,
      default: 3,
    },
  },
  computed: {
    xs() {
      const column = this.col > 4 ? 4 : this.col;
      return responsive[column].xs;
    },
    sm() {
      const column = this.col > 4 ? 4 : this.col;
      return responsive[column].sm;
    },
    md() {
      const column = this.col > 4 ? 4 : this.col;
      return responsive[column].md;
    },
    hasSlot() {
      const defaultSlot = this.$slots.default[0]
      // 内容为空，视为没有slot，排除嵌套其他组件的情况
      if(!defaultSlot.componentOptions && defaultSlot.text.trim() === ''){
        return false
      }
      return !!this.$slots.default
    },
  },
};
</script>
