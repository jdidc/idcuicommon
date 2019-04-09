<template>
  <Col :xs="xs" :sm="sm" :md="md">
    <div v-if="term" class="term">{{term}}</div>
    <!-- eslint-disable-next-line -->
    <div class="detail" :class="{'no-term': !term}">
      <div>
        <slot></slot>
      </div>
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
      if (!this.$slots.default) {
        return 0;
      }
      return true;
    },
  },
};
</script>
