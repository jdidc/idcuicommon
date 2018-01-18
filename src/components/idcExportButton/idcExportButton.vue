<template>
    <div>
        <Button @click="getInfo">
            <Icon type="ios-cloud-download-outline"></Icon>
            <slot>导出</slot>
        </Button>
        <Modal v-model="showExportModal" :mask-closable="false" title="数据导出">
            <div v-if="showTotal">
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
            </div>
            <div v-else>
                <p>文件正在路上</p>
            </div>
            
            <Progress :percent="percent|numberFormat"></Progress>
            <div  slot="footer" class="btn-wrap">
                <Button :loading="modalLoading"  type="primary" @click="getDataByPage">导出csv</Button>
            </div>

            <!-- <Button type="primary" @click="exportExcel">导出Excel</Button> -->
            <Table v-show="false" ref="table" :data="hiddenData" :columns="hiddenColumns"></Table>
            
        </Modal>
    </div>
</template>
<script>
import table2excel from '../../utils/table2excel';
import ajax from '@/utils/ajax';
export default {
    props: {
        // 查询条件
        condition: {
            type: Object,
            required: true
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
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
            default: 'csv'
        },
        // 导出名字
        fileName: {
            type: String,
            default: 'data'
        },
        // 是否显示总条数
        showTotal: {
            type: Boolean,
            default() {
                return true;
            }
        }
    },
    data() {
        return {
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
            hiddenColumns: [],
            fileExistFlag: 0,
            // 导出中
            modalLoading: false
        };
    },
    methods: {
        // 重置
        reset() {
            this.dataArr = [];
            this.percent = 0;
            this.total = 0;
        },
        // 获得导出信息
        getInfo() {
            this.showExportModal = true;
            this.modalLoading = true;
            this.reset();
            let params = {};
            let data = {
                page: 1,
                pageSize: 1
            };
            Object.assign(params, this.condition);
            Object.assign(params.params, data);
            params.params.nExportFlag = 0;
            params.timeout = 1000 * 60;
            params.params.lastTime = false;
            ajax(params).then(({ data }) => {
                this.modalLoading = false;
                // 总条数
                this.total = data.total;
                // 是否已经查询过该文件
                this.fileExistFlag = data.fileExistFlag;
                if (data.fileExistFlag == 1) {
                    this.strExitFilePath = data.filePath;
                }
            });
        },
        // 创建iframe下载
        downloadByIframe(url, data) {
            if (this.condition.method === 'post') {
                const iframeName = '__iframe_downloader__';
                let iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                iframe.name = iframeName;
                document.body.appendChild(iframe);
                iframe.src = url;
                // 创建一个隐藏的form标签
                const form = document.createElement('form');
                form.style.display = 'none';
                form.target = iframeName;
                form.method = 'get';
                form.acceptCharset = 'utf-8';
                form.action = url;
                // 通过form发送json数据请参考  https://darobin.github.io/formic/specs/json/
                const traverse = (obj, key) => {
                    key = key || '';
                    const result = [];
                    for (let prop in obj) {
                        const value = obj[prop];
                        typeof value === 'object'
                            ? result.push.apply(
                                  result,
                                  traverse(value, key + '[' + prop + ']')
                              )
                            : result.push({
                                  name: key ? key + '[' + prop + ']' : prop,
                                  value: value
                              });
                    }
                    return result;
                };
                const inputs = document.createDocumentFragment();
                const fields = traverse(data);
                fields.forEach(field => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = field.name;
                    input.value = field.value;
                    inputs.appendChild(input);
                });
                form.appendChild(inputs);
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            } else {
                var IFrameRequest = document.createElement('iframe');
                IFrameRequest.id = 'IFrameRequest';
                IFrameRequest.src = url;
                IFrameRequest.style.display = 'none';
                document.body.appendChild(IFrameRequest);
                // document.body.removeChild(IFrameRequest);
            }
            this.percent = 100;
            setTimeout(() => {
                this.modalLoading = false;
                this.showExportModal = false;
            }, 2000);
        },
        // 按页获取
        getDataByPage(event, page = 1) {
            this.modalLoading = true;
            if (this.fileExistFlag === 1) {
                this.downloadByIframe(this.strExitFilePath);
                return;
            }

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
                if (this.condition.method == 'post') {
                    Object.assign(this.condition.data, this.exportParams);
                } else {
                    Object.assign(this.condition.params, this.exportParams);
                }
            }
            let params = {};
            Object.assign(params, this.condition);
            params.params.pageSize = this.exportPageSize;
            params.params.page = page;

            // 判断最后一次导出时，给后端一个标志位。
            let length = _this.dataArr.length;
            if (length + _this.exportPageSize >= _this.total) {
                params.params.lastTime = true;
            } else {
                params.params.lastTime = false;
            }

            ajax(params).then(response => {
                if (response.status != 200) {
                    console.log('错误啦!!', response.data.message);
                    return;
                }
                // 进度条，步进
                this.addPercent();
                let data = response.data;
                // 返回数据长度为0时，停止继续请求。
                if (data.data.length == 0) {
                    return;
                }
                _this.dataArr = _this.dataArr.concat(data.data);

                if (_this.dataArr.length < _this.total) {
                    _this.getDataByPage(null, page + 1);
                } else {
                    this.modalLoading = false;
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
