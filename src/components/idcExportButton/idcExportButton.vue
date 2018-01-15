<template>
    <div>
        <Button @click="getInfo">
            <Icon type="ios-cloud-download-outline"></Icon>
            <span>导出</span>
        </Button>
        <Modal v-model="showExportModal" :mask-closable="false" title="数据导出" class="idc-modal-no-footer">
            <p>总共数据量：
                <strong>
                    <h4>{{total}}</h4>
                </strong>
            </p>
            <p>已导出数据量：
                <strong>
                    <h4>{{dataArr.length}}</h4>
                </strong>
            </p>
            <Progress :percent="percent|numberFormat"></Progress>
            <div class="btn-wrap">
                <Button type="primary" @click="getDataByPage">导出csv</Button>
            </div>

            <!-- <Button type="primary" @click="exportExcel">导出Excel</Button> -->
            <Table v-show="false" ref="table" :data="hiddenData" :columns="hiddenColumns"></Table>
            <span slot="footer"></span>
        </Modal>
    </div>
</template>
<script>
import table2excel from '../../utils/table2excel';
import ajax from '@/utils/ajax';
export default {
    props: {
        condition: {
            type: Object,
            required: true
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
            totalPage: 0,
            showExportModal: false,
            // 总记录数
            total: 0,
            // 导出文件大小
            totalSize: 0,
            // 所需时间
            needTime: '',
            // 导出速度，200条/s
            speed: '',
            // 进度
            percent: 0,
            // 导出数据集
            dataArr: [],
            hiddenData: [],
            hiddenColumns: []
        };
    },
    methods: {
        // 重置
        reset() {
            this.dataArr = [];
            this.percent = 0;
        },
        // 获得导出信息
        getInfo() {
            let _this = this;
            this.reset();
            ajax(this.condition).then(({ data }) => {
                _this.showExportModal = true;
                // 总条数
                _this.total = data.total;
                _this.columns = data.title;
                // _this.step = 100;
            });
        },
        // 按页获取
        getDataByPage(event, page = 1) {
            let _this = this;
            if (_this.dataArr.length == _this.total) {
                this.reset();
            }
            if (_this.condition.page) {
                delete _this.condition.page;
            }
            if (_this.condition.pageSize) {
                delete _this.condition.pageSize;
            }

            if (this.exportParams != null) {
                Object.assign(this.condition.data, this.exportParams);
            }

            ajax(this.condition).then(response => {
                if (response.status != 200) {
                    console.log('错误啦!!', response.data.message);
                    return;
                }
                // 进度条，步进
                this.addPercent();
                let data = response.data;
                _this.dataArr = _this.dataArr.concat(data.data);

                if (_this.dataArr.length < _this.total) {
                    _this.getDataByPage(null, page + 1);
                } else {
                    setTimeout(() => {
                        _this.exportData({
                            columns: _this.columns,
                            data: _this.dataArr
                        });
                    }, 200);

                    setTimeout(() => {
                        _this.showExportModal = false;
                    }, 2000);
                }
            });
        },

        // 导出data到csv
        exportData({ columns, data }, type, name) {
            this.$refs.table.exportCsv({
                filename: this.fileName,
                columns: columns,
                data: data
            });
        },

        // 增加进度
        addPercent() {
            var per = 100 / Math.ceil(this.total / this.exportPageSize);
            this.percent = this.percent + per;
        },

        // 导出excel
        exportExcel() {
            table2excel.transform(
                this.$refs.table,
                'hrefToExportTable',
                this.fileName
            );
        }
    },
    filters: {
        numberFormat(value) {
            return Number(value.toFixed(2));
        }
    }
};
</script>
