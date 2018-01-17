<template>
    <div>
        <idc-export-button 
            :exportPageSize="exportPageSize"
            :condition="condition" 
            :exportParams="exportParams"
            :columns="columns"
        ></idc-export-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
