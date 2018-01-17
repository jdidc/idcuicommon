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

        <idc-table
            @on-sort-change="sortChange"
            @on-select="selectChange"
            @on-row-click="onRowClick"
            @on-data-callback="callback"
            ref="table" 
            border
            :tools-open="true"
            stripe
            :export-page-size="10"
            :url="url"
            type="server"
            :columns="columns1"
            highlight-row
        >
        </idc-table>

         <idc-table
            style="margin-top: 10px;"
            ref="table"
            :data="data"
            :page-size="5"
            :pagination="true"     
            :columns="columns1"
        >
        </idc-table>
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
            data:[{
                status: 1,
                created_at: '12312334',
                type_name: 'address'
            },{
                status: 2,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 3,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 4,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 5,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 6,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 7,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 8,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 9,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 10,
                created_at: '123123',
                type_name: 'address'
            },{
                status: 11,
                created_at: '123123',
                type_name: 'adsf'
            },{
                status: 12,
                created_at: '123123',
                type_name: 'asdf'
            },{
                status: 13,
                created_at: '123123',
                type_name: 'dff'
            }],
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
