<template>
  <div>
    <h3>ajax导出</h3>
    <ExportButton :columns="columns" :getTotal="getTotal" :request="request"/>
    <Divider/>

    <h3>客户端导出</h3>
    <ExportButton :columns="columns" :data="data" filename="设备列表"/>

    <Divider/>

    <h3>自定义导出组件样式</h3>
    <ExportButton :columns="columns" :getTotal="getTotal" :request="request">
      <Button icon="md-download" shape="circle" type="primary"></Button>
    </ExportButton>

    <Divider/>

    <h3>自定义导出格式</h3>
    <ExportButton :columns="columns" :data="data" bookType="txt" filename="设备列表" title="导出txt"/>
    
    <ExportButton
      :columns="columns"
      :data="data"
      bookType="csv"
      filename="设备列表"
      style="margin-left: 20px;"
      title="导出csv"
    />

  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          key: "name",
          title: "名字"
        },
        {
          key: "page",
          title: "页码"
        }
      ],
      data: [
        {
          name: "张三",
          page: 1
        },
        {
          name: "李四",
          page: 22
        },
        {
          name: "王五",
          page: 344
        }
      ]
    };
  },
  methods: {
    request(page, pageSize) {
      return new Promise((res) => {
        setTimeout(() => {
          let i = 0;
          let data = [];
          while (i < pageSize) {
            data.push({ name: `name${page}`, page });
            i++;
          }
          res(data);
        }, 10);
      });
    },

    getTotal() {
      return new Promise(res => {
        setTimeout(() => {
          res(200);
        }, 100);
      });
    }
  }
};
</script>
