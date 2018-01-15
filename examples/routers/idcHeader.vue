<template>
    <idcHeader :list="list"></idcHeader>
</template>
<script>
export default {
    data() {
        return {
            respData: [
                {
                    check: 'IdcOp_Procure',
                    text: 'DEMO',
                    new: true,
                    url: '/demo'
                },
                {
                    check: 'IdcOp_Procure',
                    text: '帮助',
                    new: true,
                    url: '/help'
                },
                {
                    text: '导航一',
                    new: false,
                    children: [
                        {
                            text: '管理中心',
                            subChild: [
                                {
                                    text: '设备管理',
                                    url: '#'
                                },
                                {
                                    text: '设备运维',
                                    url: '#'
                                },
                                {
                                    text: '运维群组',
                                    url: '#'
                                }
                            ]
                        },
                        {
                            text: '权限中心',
                            subChild: [
                                {
                                    text: '权限查询',
                                    url: '#'
                                },
                                {
                                    text: '我的权限',
                                    url: '#'
                                }
                            ]
                        },
                        {
                            text: '利用率',
                            subChild: [
                                {
                                    text: '物理机利用率',
                                    url: '#'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
</script>
