<template>
  <div :class="calsses">
    <p class="title" v-if="title">{{title}}</p>
    <div v-if="hasButtonsSlot && title" class="buttons-wrapper">
      <slot name="buttons"></slot>
    </div>
    <div v-else-if="hasButtonsSlot && !title" class="buttons-wrapper-no-title">
      <slot name="buttons"></slot>
    </div>
    <!-- <Row :gutter="gutter"> -->
    <Row>
      <slot></slot>
    </Row>
  </div>
</template>

<script>
import classNames from 'classnames';

export default {
  name: 'descriptionListV2',
  props: {
    className: [String, Array],
    title: String,
    col: {
      type: Number,
      default: 3,
    },
    layout: {
      type: String,
      default: 'horizontal',
    },
    // gutter: {
    //   type: Number,
    //   default: 32
    // },
    size: String,
  },
  computed: {
    calsses() {
      const clsString = classNames('descriptionList', this.layout, this.className, {
        small: this.size === 'small',
        large: this.size === 'large',
      });
      return clsString;
    },

    hasButtonsSlot () {
      return !!this.$slots['buttons']
    }
  },
};
</script>

<style lang="less">
@import "./index.less";
</style>

