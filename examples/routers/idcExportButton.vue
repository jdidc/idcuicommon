<template>
    <div>
        <idc-export-button 
            :exportPageSize="exportPageSize"
            :condition="condition" 
            :exportParams="exportParams"
            :columns="columns"
        ></idc-export-button>

        <br>

        <idc-export-button 
            :condition="objExport.condition"
            :columns="objExport.columns"
            :showTotal="false"
            :file-name="objExport.condition.params.depId+'&'+objExport.condition.params.begin+'&'+objExport.condition.params.end"
            :exportParams= "{nExportFlag: 1}"
        ></idc-export-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            objExport: {
                condition: {
                    // method: 'get',
                    // url: '/v1.0/utilization/device/download',
                    // params: {
                    //     depId: 1001957,
                    //     begin: '2017-12-05',
                    //     end: '2017-12-12'
                    // }
                    method: 'get',
                    url: '/v1.0/utilization/device/report',
                    params: {
                        depId: 0,
                        begin: '2017-12-05',
                        end: '2017-12-12'
                    }
                },
                columns: [
                    { title: 'SN', key: 'sn' },
                    { title: '品牌', key: 'brand' },
                    { title: '管理IP', key: 'ilo_ip' },
                    { title: '系统IP', key: 'eth_ip' },
                    { title: '机型', key: 'jixing' },
                    { title: '机房信息', key: 'idc_short_name' },
                    { title: '运维组', key: 'operation_erp' },
                    { title: '内存均值', key: 'memory' },
                    { title: '内存峰值', key: 'memPeakValue' },
                    { title: 'cpu均值', key: 'cpu' },
                    { title: 'cpu峰值', key: 'cpuPeakValue' },
                    { title: '磁盘均值', key: 'disk' },
                    { title: '磁盘峰值', key: 'diskPeakValue' },
                    { title: '利用率均值', key: 'sys' },
                    { title: '利用率峰值', key: 'sysPeakValue' },
                    { title: '模型', key: 'model' },
                    { title: '模型描述', key: 'modelIntr' },
                    { title: '组织架构', key: 'mountNode' }
                ]
            },
            // ajax操作参数，包括url的各种参数
            condition: {
                method: 'post',
                url: '/v1.0/procurement/purchase_list',
                data: {},
                params: {}
            },
            exportPageSize: 2000,
            exportParams: {
                export: true
            },
            columns: [
                { key: 'specification_on', title: '需求单号' },
                { key: 'system_node_name', title: '体系' },
                { key: 'business_name', title: '业务' },
                { key: 'set_meal_name', title: '套餐类型' },
                { key: 'device_type_name', title: '设备类型' },
                { key: 'brand_name', title: '厂商' },
                { key: 'model_name', title: '型号' },
                { key: 'specification_number', title: '需求数量' },
                { key: 'actual_come_number', title: '分配数量' },
                { key: 'distribution_proportion', title: '分配比例' },
                { key: 'located_idc_name', title: '期望机房' },
                { key: 'erp_name', title: '录入人员' },
                { key: 'batch_number', title: '订单批次号' },
                { key: 'order_state', title: '订单状态' }
            ]
        };
    },
    methods: {}
};
</script>
