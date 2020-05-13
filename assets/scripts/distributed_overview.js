/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    distributedFeatureChart();
    distributedEnvironmentIssuesChart();
    CAPTheoryChart();
    BASETheoryChart();
    consistencyTypeChart();
    twoPhaseCommit();
    threePhaseCommit();
});

/*************************************************************系部信息开始**********************************************************/

/**
 * 分布式特征图表
 */
function distributedFeatureChart() {
    var distributedFeatureChart = $('#distributedFeature');
    distributedFeatureChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(distributedFeatureChart[0], 'macarons');
    var option = null;
    option = {
        title: {
            text: '分布式特性',
            subtext: 'P2',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['分布性', '对等性', '并发性', '缺乏全局时钟', '故障总是会发生'],
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {value: 1, name: '分布性'},
                    {value: 1, name: '对等性'},
                    {value: 1, name: '并发性'},
                    {value: 1, name: '缺乏全局时钟'},
                    {value: 1, name: '故障总是会发生'}
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 15
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * 分布式特征图表
 */
function distributedEnvironmentIssuesChart() {
    var distributedEnvironmentIssuesChart = $('#distributedEnvironmentIssues');
    distributedEnvironmentIssuesChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(distributedEnvironmentIssuesChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        switch (params.name) {
            case '通信异常':
                layer.tips('1.消息丢失</br>2.消息延迟', distributedEnvironmentIssuesChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '网络分区':
                layer.tips('1.脑裂', distributedEnvironmentIssuesChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '三态':
                layer.tips('1.成功</br>2.失败</br>3.超时', distributedEnvironmentIssuesChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: '分布式环境问题',
            subtext: 'P4',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['通信异常', '网络分区', '三态', '节点故障'],
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {value: 1, name: '通信异常'},
                    {value: 1, name: '网络分区'},
                    {value: 1, name: '三态'},
                    {value: 1, name: '节点故障'}
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 15
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * CAP理论图表
 */
function CAPTheoryChart() {
    var CAPTheoryChart = $('#CAPTheory');
    CAPTheoryChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(CAPTheoryChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        switch (params.name) {
            case 'Consistency':
                layer.tips('一致性</br>数据一致', CAPTheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case 'Availability':
                layer.tips('可用性</br>有限时间</br>返回结果', CAPTheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case 'Partition tolerance':
                layer.tips('分区容错性</br>依旧提供服务</br>', CAPTheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: 'CAP理论',
            subtext: 'P10',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Consistency', 'Availability', 'Partition tolerance'],
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {value: 1, name: 'Consistency'},
                    {value: 1, name: 'Availability'},
                    {value: 1, name: 'Partition tolerance'}
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 15
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * BASE理论图表
 */
function BASETheoryChart() {
    var BASETheoryChart = $('#BASETheory');
    BASETheoryChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(BASETheoryChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        switch (params.name) {
            case 'Basically Available':
                layer.tips('基本可用</br>1.响应时间上的损失</br>2.功能上的损失', BASETheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case 'Soft state':
                layer.tips('软状态</br>1.允许存在延时', BASETheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case 'Eventually consistent':
                layer.tips('最终一致性</br>1.因果一致性(Causal consistency)</br>2.读己之所写(Read your writes)</br>3.会话一致性(Session consistency)</br>4.单调读一致(Monotonic read consistency)</br>5.单调写一致(Monotonic write consistency)', BASETheoryChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: 'BASE理论',
            subtext: 'P12',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['Basically Available', 'Soft state', 'Eventually consistent'],
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {value: 1, name: 'Basically Available'},
                    {value: 1, name: 'Soft state'},
                    {value: 1, name: 'Eventually consistent'}
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 15
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * 一致性类型图表
 */
function consistencyTypeChart() {
    var consistencyTypeChart = $('#consistencyType');
    consistencyTypeChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(consistencyTypeChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        if (params.name === "最终一致性") {
            layer.tips('属于弱一致性', consistencyTypeChart, {
                tips: [2, '#008B45'],
                time: 1500
            });
        }
    });
    var option = null;
    option = {
        title: {
            text: '一致性类型',
            subtext: '前言-问题的提出',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['强一致性', '弱一致性', '最终一致性'],
            textStyle: {
                fontSize: 15
            }
        },
        series: [
            {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: [
                    {value: 1, name: '强一致性'},
                    {value: 1, name: '弱一致性'},
                    {value: 1, name: '最终一致性'}
                ],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 15
                        }
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * 两阶段提交图表
 */
function twoPhaseCommit() {
    var twoPhaseCommitChart = $('#twoPhaseCommit');
    twoPhaseCommitChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(twoPhaseCommitChart[0], 'macarons');
    var option = null;
    option = {
        title: {
            subtext: 'p17',
            left: 'center'
        },
        backgroundColor: "#FFFFFF",
        series: [
            {
                type: "sankey",
                left: 50.0,
                top: 20.0,
                right: 150.0,
                bottom: 25.0,
                data: [
                    {
                        "name": "2PC：Two-Phase Commit",
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(106,82,134,255)",
                                "borderColor": "rgba(106,82,134,255)"
                            }
                        }
                    },
                    {
                        "name": "阶段一：提交事务请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#C32D2E",
                                "borderColor": "#C32D2E"
                            }
                        }
                    },
                    {
                        "name": "阶段二：执行事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "执行事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "中断事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "事务询问",
                        "itemStyle": {
                            "normal": {
                                "color": "#E8B7B7",
                                "borderColor": "#E8B7B7"
                            }
                        }
                    },
                    {
                        "name": "执行事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#A28E6A",
                                "borderColor": "#A28E6A"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务询问的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFE2C5",
                                "borderColor": "#FFE2C5"
                            }
                        }
                    },
                    {
                        "name": "发送提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#881798",
                                "borderColor": "#881798"
                            }
                        }
                    },
                    {
                        "name": "事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#efa835",
                                "borderColor": "#efa835"
                            }
                        }
                    },
                    {
                        "name": "反馈事务提交结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "完成事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "发送回滚请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "事务回滚",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "反馈事务回滚结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    }
                ],
                links: [
                    {
                        "source": "2PC：Two-Phase Commit",
                        "target": "阶段一：提交事务请求",
                        "value": 9
                    },
                    {
                        "source": "阶段一：提交事务请求",
                        "target": "事务询问",
                        "value": 3
                    },
                    {
                        "source": "阶段一：提交事务请求",
                        "target": "执行事务",
                        "value": 3
                    },
                    {
                        "source": "阶段一：提交事务请求",
                        "target": "各参与者向协调者反馈事务询问的响应",
                        "value": 3
                    },
                    {
                        "source": "2PC：Two-Phase Commit",
                        "target": "阶段二：执行事务提交",
                        "value": 8
                    },
                    {
                        "source": "阶段二：执行事务提交",
                        "target": "执行事务提交",
                        "value": 4
                    },
                    {
                        "source": "执行事务提交",
                        "target": "发送提交请求",
                        "value": 1
                    },
                    {
                        "source": "执行事务提交",
                        "target": "事务提交",
                        "value": 1
                    },
                    {
                        "source": "执行事务提交",
                        "target": "反馈事务提交结果",
                        "value": 1
                    },
                    {
                        "source": "执行事务提交",
                        "target": "完成事务",
                        "value": 1
                    },
                    {
                        "source": "阶段二：执行事务提交",
                        "target": "中断事务",
                        "value": 4
                    },
                    {
                        "source": "中断事务",
                        "target": "发送回滚请求",
                        "value": 1
                    },
                    {
                        "source": "中断事务",
                        "target": "事务回滚",
                        "value": 1
                    },
                    {
                        "source": "中断事务",
                        "target": "反馈事务回滚结果",
                        "value": 1
                    },
                    {
                        "source": "中断事务",
                        "target": "中断提交事务",
                        "value": 1
                    }
                ],
                lineStyle: {
                    color: "source",
                    curveness: 0.5
                },
                itemStyle: {
                    color: "#1f77b4",
                    borderColor: "#1f77b4"
                },
                label: {
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Arial",
                    fontSize: 10
                }
            }],
        tooltip: {
            trigger: "item"
        }
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * 三阶段提交图表
 */
function threePhaseCommit() {
    var threePhaseCommitChart = $('#threePhaseCommit');
    threePhaseCommitChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(threePhaseCommitChart[0], 'macarons');
    var option = null;
    option = {
        title: {
            subtext: 'p21',
            left: 'center'
        },
        backgroundColor: "#FFFFFF",
        series: [
            {
                type: "sankey",
                left: 50.0,
                top: 20.0,
                right: 150.0,
                bottom: 25.0,
                data: [
                    {
                        "name": "3PC：Three-Phase Commit",
                        "itemStyle": {
                            "normal": {
                                "color": "rgba(106,82,134,255)",
                                "borderColor": "rgba(106,82,134,255)"
                            }
                        }
                    },
                    {
                        "name": "阶段一：CanCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#C32D2E",
                                "borderColor": "#C32D2E"
                            }
                        }
                    },
                    {
                        "name": "阶段二：PreCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "阶段三：doCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "执行事务预提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "中断二阶段事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "执行提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#5ba33b",
                                "borderColor": "#5ba33b"
                            }
                        }
                    },
                    {
                        "name": "事务询问",
                        "itemStyle": {
                            "normal": {
                                "color": "#E8B7B7",
                                "borderColor": "#E8B7B7"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务询问的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFE2C5",
                                "borderColor": "#FFE2C5"
                            }
                        }
                    },
                    {
                        "name": "发送预提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#881798",
                                "borderColor": "#881798"
                            }
                        }
                    },
                    {
                        "name": "事务预提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#efa835",
                                "borderColor": "#efa835"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务执行的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "发送中断请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务(二阶段内)",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "发送提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "反馈事务提交结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "完成事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "发送中断提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "事务回滚",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "反馈事务回滚结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    }, {
                        "name": "中断三阶段事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务(三阶段内)",
                        "itemStyle": {
                            "normal": {
                                "color": "#69797E",
                                "borderColor": "#69797E"
                            }
                        }
                    },
                ],
                links: [
                    {
                        "source": "3PC：Three-Phase Commit",
                        "target": "阶段一：CanCommit",
                        "value": 12
                    },
                    {
                        "source": "阶段一：CanCommit",
                        "target": "事务询问",
                        "value": 6
                    },
                    {
                        "source": "阶段一：CanCommit",
                        "target": "各参与者向协调者反馈事务询问的响应",
                        "value": 6
                    },
                    {
                        "source": "3PC：Three-Phase Commit",
                        "target": "阶段二：PreCommit",
                        "value": 10
                    },
                    {
                        "source": "阶段二：PreCommit",
                        "target": "执行事务预提交",
                        "value": 6
                    },
                    {
                        "source": "执行事务预提交",
                        "target": "发送预提交请求",
                        "value": 2
                    },
                    {
                        "source": "执行事务预提交",
                        "target": "事务预提交",
                        "value": 2
                    },
                    {
                        "source": "执行事务预提交",
                        "target": "各参与者向协调者反馈事务执行的响应",
                        "value": 2
                    },
                    {
                        "source": "阶段二：PreCommit",
                        "target": "中断二阶段事务",
                        "value": 4
                    },
                    {
                        "source": "中断二阶段事务",
                        "target": "发送中断请求",
                        "value": 2
                    },
                    {
                        "source": "中断二阶段事务",
                        "target": "中断提交事务(二阶段内)",
                        "value": 2
                    },
                    {
                        "source": "阶段三：doCommit",
                        "target": "执行提交",
                        "value": 4
                    },
                    {
                        "source": "执行提交",
                        "target": "发送提交请求",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "事务提交",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "反馈事务提交结果",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "完成事务",
                        "value": 1
                    },
                    {
                        "source": "3PC：Three-Phase Commit",
                        "target": "阶段三：doCommit",
                        "value": 8
                    },
                    {
                        "source": "阶段三：doCommit",
                        "target": "执行提交",
                        "value": 2
                    },
                    {
                        "source": "执行提交",
                        "target": "发送提交请求",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "事务提交",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "反馈事务提交结果",
                        "value": 1
                    },
                    {
                        "source": "执行提交",
                        "target": "完成事务",
                        "value": 1
                    },
                    {
                        "source": "阶段三：doCommit",
                        "target": "中断三阶段事务",
                        "value": 4
                    },
                    {
                        "source": "中断三阶段事务",
                        "target": "发送中断提交请求",
                        "value": 1
                    },
                    {
                        "source": "中断三阶段事务",
                        "target": "事务回滚",
                        "value": 1
                    },
                    {
                        "source": "中断三阶段事务",
                        "target": "反馈事务回滚结果",
                        "value": 1
                    },
                    {
                        "source": "中断三阶段事务",
                        "target": "中断提交事务(三阶段内)",
                        "value": 1
                    }
                ],
                lineStyle: {
                    color: "source",
                    curveness: 0.5
                },
                itemStyle: {
                    color: "#1f77b4",
                    borderColor: "#1f77b4"
                },
                label: {
                    color: "rgba(0,0,0,0.7)",
                    fontFamily: "Arial",
                    fontSize: 10
                }
            }],
        tooltip: {
            trigger: "item"
        }
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
    resize(myChart);
}

/**
 * @param ECharts 图表
 * @author KevenPotter
 * @date 2020-02-08 18:08:32
 * @description 依据浏览器大小重新定义图表尺寸
 */
function resize(ECharts) {
    $(window).resize(function () {
        ECharts.resize();
    });
}