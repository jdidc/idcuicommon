<template>
  <div class="idc-table">
    <div class="tools">
      <Tooltip content="点击下载" transfer>
        <Icon @click="exportFile" type="ios-download-outline"/>
      </Tooltip>

      <Tooltip content="点击放大" transfer>
        <Icon type="ios-expand"/>
      </Tooltip>

      <Tooltip content="点击缩小" transfer>
        <Icon type="ios-contract"/>
      </Tooltip>

      <Tooltip content="定制列" transfer>
        <Icon type="ios-construct-outline"/>
      </Tooltip>
    </div>

    <div :class="wrapClasses" :style="styles">
      <div :class="classes">
        <div :class="[prefixCls + '-title']" ref="title" v-if="showSlotHeader">
          <slot name="header"></slot>
        </div>
        <div
          :class="[prefixCls + '-header']"
          @mousewheel="handleMouseWheel"
          ref="header"
          v-if="showHeader"
        >
          <table-head
            :column-rows="columnRows"
            :columns="cloneColumns"
            :columns-width="columnsWidth"
            :data="rebuildData"
            :obj-data="objData"
            :prefix-cls="prefixCls"
            :styleObject="tableHeaderStyle"
          ></table-head>
        </div>
        <div
          :class="[prefixCls + '-body']"
          :style="bodyStyle"
          @scroll="handleBodyScroll"
          ref="body"
          v-show="!((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
        >
          <table-body
            :columns="cloneColumns"
            :columns-width="columnsWidth"
            :data="rebuildData"
            :obj-data="objData"
            :prefix-cls="prefixCls"
            :styleObject="tableStyle"
            ref="tbody"
          ></table-body>
        </div>
        <div
          :class="[prefixCls + '-tip']"
          :style="bodyStyle"
          @scroll="handleBodyScroll"
          v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
        >
          <table border="0" cellpadding="0" cellspacing="0">
            <tbody>
              <tr>
                <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`}">
                  <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                  <span v-else v-html="localeNoFilteredDataText"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div :class="[prefixCls + '-fixed']" :style="fixedTableStyle" v-if="isLeftFixed">
          <div :class="fixedHeaderClasses" v-if="showHeader">
            <table-head
              :column-rows="columnRows"
              :columns="leftFixedColumns"
              :columns-width="columnsWidth"
              :data="rebuildData"
              :fixed-column-rows="leftFixedColumnRows"
              :obj-data="objData"
              :prefix-cls="prefixCls"
              :styleObject="fixedTableStyle"
              fixed="left"
            ></table-head>
          </div>
          <div
            :class="[prefixCls + '-fixed-body']"
            :style="fixedBodyStyle"
            @DOMMouseScroll="handleFixedMousewheel"
            @mousewheel="handleFixedMousewheel"
            ref="fixedBody"
          >
            <table-body
              :columns="leftFixedColumns"
              :columns-width="columnsWidth"
              :data="rebuildData"
              :obj-data="objData"
              :prefix-cls="prefixCls"
              :styleObject="fixedTableStyle"
              fixed="left"
            ></table-body>
          </div>
        </div>
        <div
          :class="[prefixCls + '-fixed-right']"
          :style="fixedRightTableStyle"
          v-if="isRightFixed"
        >
          <div :class="fixedHeaderClasses" v-if="showHeader">
            <table-head
              :column-rows="columnRows"
              :columns="rightFixedColumns"
              :columns-width="columnsWidth"
              :data="rebuildData"
              :fixed-column-rows="rightFixedColumnRows"
              :obj-data="objData"
              :prefix-cls="prefixCls"
              :styleObject="fixedRightTableStyle"
              fixed="right"
            ></table-head>
          </div>
          <div
            :class="[prefixCls + '-fixed-body']"
            :style="fixedBodyStyle"
            @DOMMouseScroll="handleFixedMousewheel"
            @mousewheel="handleFixedMousewheel"
            ref="fixedRightBody"
          >
            <table-body
              :columns="rightFixedColumns"
              :columns-width="columnsWidth"
              :data="rebuildData"
              :obj-data="objData"
              :prefix-cls="prefixCls"
              :styleObject="fixedRightTableStyle"
              fixed="right"
            ></table-body>
          </div>
        </div>
        <div
          :class="[prefixCls + '-fixed-right-header']"
          :style="fixedRightHeaderStyle"
          v-if="isRightFixed"
        ></div>
        <div :class="[prefixCls + '-footer']" ref="footer" v-if="showSlotFooter">
          <slot name="footer"></slot>
        </div>
      </div>
      <Spin fix size="large" v-if="loading">
        <slot name="loading"></slot>
      </Spin>
    </div>
  </div>
</template>
<script>
import { Table } from "iview";
export default {
  name: "Table",
  mixins: [Table],
  props: {
    export: {
      type: Boolean,
      default: false
    },
    exportName: String,
    fullScreenable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    exportFile() {
      let name = `${new Date().valueOf()}`;
      if (this.exportName) {
        name = this.exportName + name;
      }
      this.exportCsv({ filename: name });
    },
    fullScreen() {}
  }
};
</script>
<style lang="less">
@import "./Table.less";
</style>
