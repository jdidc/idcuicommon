<template>
    <div>
        <div style="margin-bottom: 10px;">
            <Button type="success" @click="change">change</Button>
            <Button type="success" @click="exportCsv">exportCsv</Button>
            <Button type="success" @click="clearCurrentRow">调用table的clearCurrentRow方法</Button>
            <div style="margin-top: 10px;">
                <Input v-model="condition.code" style="display:inline-block;"/>
            </div>
            
        </div>

        <idc-export-table
            @on-sort-change="sortChange"
            @on-select="selectChange"
            @on-row-click="onRowClick"
            @on-data-callback="callback"
            ref="table" 
            border
            :toolsOpen="true"
            stripe
            :exportPageSize="10"
            :url="url"
            :condition="condition"
            :columns="columns1"
            highlight-row
        >
        </idc-export-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: 'v1.0/cmdb/packages',
            condition: {
                code: ''
            },
            columns1: [
                {
                    title: '序号',
                    type: 'selection'
                },
                {
                    title: 'Name',
                    key: 'status',
                    sortable: true
                },
                {
                    title: 'Age',
                    key: 'created_at'
                },
                {
                    title: 'Address',
                    key: 'type_name'
                }
            ]
        };
    },
    methods: {
        change() {
            if (0.5 < Math.random()) {
                this.columns1[0].title = 'name1';
                this.url = 'v1.0/cmdb/packages';
            } else {
                this.columns1[0].title = 'name2';
                this.url = 'v1.0/cmdb/package';
            }
        },
        exportCsv() {
            this.$refs.table.exportCsv({ filename: 'test.csv' });
        },
        clearCurrentRow() {
            this.$refs.table.clearCurrentRow();
        },
        sortChange({ column, key, order }) {
            console.log(column);
            console.log(key);
            console.log(order);
            this.$Message.success('sort change');
        },
        selectChange(selection, row) {
            console.log(1, selection);
            console.log(2, row);
            this.$Message.success('sort change');
        },
        onRowClick(data, index) {
            console.log(3, data);
            console.log(3, index);
        },
        callback(resp){
            console.log(resp)
        }
    }
};
</script>
