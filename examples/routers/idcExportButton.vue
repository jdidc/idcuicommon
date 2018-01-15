<template>
    <div>
        <idc-export-button :exportPageSize="exportPageSize" :condition="condition" :exportParams="exportParams"></idc-export-button>
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
            }
        };
    },
    methods: {}
};
</script>
