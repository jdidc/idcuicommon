<template>
  <div>
    <h3>1. DescriptoinList key value格式</h3>

    <Divider/>

    <DescriptionList title="基本信息">
      <Description term="工单编号">基本信息</Description>
      <Description term="类型">服务器故障单</Description>
      <Description term="状态">处理中</Description>
      <Description term="优先级">重要</Description>
      <Description term="发单时间">2019-08-08 08:08:08</Description>
      <Description term="更新时间">2019-08-08 08:08:08</Description>
      <Description
        term="工单描述"
      >这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述</Description>
    </DescriptionList>

    <Divider/>

    <h3>2. 限制 “工单描述” 独占一行</h3>

    <Divider/>

    <DescriptionList title="基本信息">
      <Description term="工单编号">基本信息</Description>
      <Description term="类型">服务器故障单</Description>
      <Description
        :col="1"
        term="工单描述"
      >这是一个很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的描述</Description>
    </DescriptionList>

    <Divider/>

    <h3>3. 循环遍历key value形式</h3>
    <Divider/>
    <DescriptionList title="基本信息">
      <Description
        :key="item.id"
        :term="item.title"
        v-for="item in tableColumns"
      >
        {{tableData[0][item.key]}}
      </Description>
    </DescriptionList>

    <p style="margin-top: 16px;">
      <strong>不过呢，该种情况需要控制数据只能是对象，如果是数组，那么需要指定下标，从而遍历对象</strong>
    </p>

    <Divider/>

    <h3>4. 嵌套表格，效果也是很棒的</h3>
    <Divider/>
    <DescriptionList title="基本信息">
      <Description :col="1">
        <Table :columns="tableColumns" :data="tableData"></Table>
      </Description>
    </DescriptionList>
    <p>
      <strong>如果指定tableDescriptionList中，只含有一个列，且占满行，那么需要设置 :col="1"</strong>
    </p>
    <Divider/>

    <h3>5. 嵌套表格，并且指定某些操作</h3>
    <Divider/>
    <DescriptionList title="基本信息">
      <template slot="buttons">
        <Button type="primary">导出</Button>
        <Poptip confirm title="是否确认忽略？">
          <Button style="margin-left: 10px" type="info">批量设置关机</Button>
        </Poptip>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
      </template>
      <Description :col="1">
        <Table :columns="tableColumns" :data="tableData"></Table>
      </Description>
    </DescriptionList>
    <Divider/>


    <h3>6. 嵌套表格，可以没有title，仅仅加操作名</h3>
    <Divider/>
    <DescriptionList>
      <template slot="buttons">
        <Button type="primary">导出</Button>
        <Poptip confirm title="是否确认忽略？">
          <Button style="margin-left: 10px" type="info">批量设置关机</Button>
        </Poptip>
        <Button size="small" style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
        <Button style="margin-left: 10px" type="info">干点啥</Button>
      </template>
      <Description :col="1">
        <Table :columns="tableColumns" :data="tableData"></Table>
      </Description>
    </DescriptionList>
    <Divider/>


    <h3>6. 针对firefox调整，增加span标签，否则内容为空时，会窜行。</h3>
    <Divider/>
    <DescriptionList title="基本信息">
      <Description
        :key="item.id"
        :term="item.title"
        v-for="item in tableColumns"
      >
       
      <span>
         {{tableData[0][item.key]}}
      </span>
      </Description>
    </DescriptionList>
    <Divider/>
  </div>
</template>
<script>
export default {
  name: "DescirptionList",
  data() {
    return {
      split1: 0.5,
      tableColumns: [
        {
          key: "id",
          title: "工单编号"
        },
        {
          key: "type",
          title: "类型"
        },
        {
          key: "status",
          title: "状态"
        },
        {
          key: "youxian",
          title: "优先级"
        },
        {
          key: "time",
          title: "发单时间"
        }
      ],
      tableData: [
        {
          id: "100000001",
          type: "",
          status: "进行中",
          youxian: "优先",
          time: "2019-08-08 08:08:08"
        }
      ]
    };
  }
};
</script>
