<style lang="less">
@import './idcExportTable.less';
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
            <Modal v-model="showExportModal" :mask-closable="false" title="数据导出">
                <p>总共数据量：
                    <strong>
                        <h4>{{page.total}}</h4>
                    </strong>
                </p>
                <p>已导出数据量：
                    <strong>
                        <h4>{{dataArr.length}}</h4>
                    </strong>
                </p>
                <Progress :percent="percent|numberFormat"></Progress>

                <div slot="footer">
                    <Button :loading="modalLoading"  type="primary" @click="getDataByPage">导出csv</Button>
                </div>
            </Modal>
            
            <div class="icon" @click="toggleTools">
                <Tooltip placement="top" :content="'点击' + (showTools ? '收起' : '展开')">
                    <i class="fa fa-cog" aria-hidden="true"></i>
                </Tooltip>
            </div>
            
        </div>

        <Table ref="grid" 
            :data="data" 
            :columns="columns" 
            :stripe="stripe" 
            :border="border" 
            :showHeader="showHeader" 
            :width="width ? width:''" 
            :height="height ? height:''" 
            :loading="loading" 
            :disabledHover="disabledHover" 
            :highlightRow="highlightRow" 
            :rowClassName="rowClassName" 
            :size="size" 
            :noDataText="noDataText" 
            :noFilteredDataText="noFilteredDataText"
            @on-current-change="onCurrentChange"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-selection-change="onSelectionChange"
            @on-sort-change="onSortChange"
            @on-filter-change="onFilterChange"
            @on-row-click="onRowClick"
            @on-row-dblclick="onRowDblclick"
            @on-expand="onExpand"
        >
            <div v-if="showSlotHeader" slot="header">
                <slot name="header"></slot>
            </div>

            <!-- 这个做了个传送slot -->
            <div v-if="showSlotFooter" slot="footer">
                <slot name="footer"></slot>
            </div>
        </Table>

        <div class="page-wrapper">
            <Page 
                @on-page-size-change="pageSizeChange" 
                @on-change="getData" 
                :current.sync="page.currentPage" 
                :total="page.total" 
                show-total 
                show-elevator 
                show-sizer
            ></Page>
        </div>
    </div>
</template>
<script>
import ajax from '../../utils/ajax';
import { oneOf } from '../../utils/assist';
import methods from './methods';

export default {
    name: 'idcExportTable',
    mixins: [methods],
    props: {
        url: {
            required: true
        },
        condition: {
            default: {}
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
                return '';
            }
        },
        size: {
            validator(value) {
                return oneOf(value, ['small', 'large', 'default']);
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
            default: 'excel'
        },
        // 导出名字
        fileName: {
            type: String,
            default: 'data'
        }
    },
    data() {
        return {
            data: [],
            showTools: false,
            page: {
                total: 0,
                currentPage: 1,
                pageSize: 10
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
                    this.data = resp.data.data;
                    this.page.total = resp.data.total;
                    this.$emit('on-data-callback', resp)
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
                        this.$Message.error('错误啦!!', response.data.message);
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

        // page组件的pageSize大小改变后的处理
        pageSizeChange(pageSize) {
            this.page.pageSize = pageSize;
            this.getData();
        },
        toggleTools() {
            this.showTools = !this.showTools;
        },
        onCurrentChange(...arg) {
            this.$emit('on-current-change', ...arg);
        },
        onSelect(selection, row) {
            this.$emit('on-select', selection, row);
        },
        onSelectCancel(selection, row) {
            this.$emit('on-select-cancen', selection, row);
        },
        onSelectAll(selection) {
            this.$emit('on-select-all', selection);
        },
        onSelectionChange(selection) {
            this.$emit('on-selection-change', selection);
        },
        onSortChange(...arg) {
            this.$emit('on-sort-change', ...arg);
        },
        onFilterChange(column) {
            this.$emit('on-filter-change', column);
        },
        onRowClick(row, index) {
            this.$emit('on-row-click', row, index);
        },
        onRowDblclick(row, index) {
            this.$emit('on-row-dblclick', row, index);
        },
        onExpand(row, status) {
            this.$emit('on-expand', row, status);
        }
    },
    created() {
        this.getData();
        this.showSlotFooter = this.$slots.footer !== undefined;
        this.showSlotHeader = this.$slots.header !== undefined;
    },
    watch: {
        // 这样可以遍历condition对象的每个属性
        condition: {
            handler() {
                this.getData();
            },
            deep: true
        },
        columns: {
            handler() {
                this.getData();
            },
            deep: true
        },
        url() {
            this.getData();
        }
    },
    filters: {
        numberFormat(value) {
            return Number(value.toFixed(2));
        }
    }
};
</script>
