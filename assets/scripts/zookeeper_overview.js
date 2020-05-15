/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    whatIsZooKeeperChart();
    consistencyFeatureGuaranteedByZooKeeperChart();
    ZooKeeperDesignGoalsChart();
    BASETheoryChart();
    consistencyTypeChart();
    twoPhaseCommit();
    threePhaseCommit();
});

/*************************************************************系部信息开始**********************************************************/

/**
 * ZooKeeper是什么
 */
function whatIsZooKeeperChart() {
    var whatIsZooKeeperChart = $('#whatIsZooKeeper');
    whatIsZooKeeperChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(whatIsZooKeeperChart[0], 'macarons');
    var option = null;
    option = {
        title: {
            text: 'ZooKeeper是什么',
            subtext: 'P59',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['数据发布/订阅', '负载均衡', '命名服务', '分布式协调/通知', '集群管理', 'Master选举', '分布式锁', '分布式队列'],
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
                    {value: 1, name: '数据发布/订阅'},
                    {value: 1, name: '负载均衡'},
                    {value: 1, name: '命名服务'},
                    {value: 1, name: '分布式协调/通知'},
                    {value: 1, name: '集群管理'},
                    {value: 1, name: 'Master选举'},
                    {value: 1, name: '分布式锁'},
                    {value: 1, name: '分布式队列'}
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
 * ZooKeeper保证的一致性特性
 */
function consistencyFeatureGuaranteedByZooKeeperChart() {
    var consistencyFeatureGuaranteedByZooKeeperChart = $('#consistencyFeatureGuaranteedByZooKeeper');
    consistencyFeatureGuaranteedByZooKeeperChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(consistencyFeatureGuaranteedByZooKeeperChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        switch (params.name) {
            case '顺序一致性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_sequentialConsistency', 5000);
                break;
            case '原子性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_atomicity', 5000);
                break;
            case '单一视图(Single System Image)':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_singleSystemImage', 5000);
                break;
            case '可靠性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_reliability', 5000);
                break;
            case '实时性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_realTime', 10000);
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: 'ZooKeeper保证的一致性特性',
            subtext: 'P60',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: ['顺序一致性', '原子性', '单一视图(Single System Image)', '可靠性', '实时性'],
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
                    {value: 1, name: '顺序一致性'},
                    {value: 1, name: '原子性'},
                    {value: 1, name: '单一视图(Single System Image)'},
                    {value: 1, name: '可靠性'},
                    {value: 1, name: '实时性'}
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
 * ZooKeeper的设计目标
 */
function ZooKeeperDesignGoalsChart() {
    var ZooKeeperDesignGoalsChart = $('#ZooKeeperDesignGoals');
    ZooKeeperDesignGoalsChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(ZooKeeperDesignGoalsChart[0], 'macarons');
    myChart.on('mouseover', function (params) {
        console.log(params.name);
        switch (params.name) {
            case '高性能':
                layer.tips('一致性</br>数据一致', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '高可用':
                layer.tips('可用性</br>有限时间</br>返回结果', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '严格的顺序访问控制能力':
                layer.tips('分区容错性</br>依旧提供服务</br>', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: 'ZooKeeper的设计目标',
            subtext: 'P60',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['高性能', '高可用', '严格的顺序访问控制能力', '简单的数据模型', '可以构建集群', '顺序访问', '高性能'],
            textStyle: {
                fontSize: 15
            }
        },
        toolbox: {
            show: true,
            feature: {
                restore: {
                    show: true
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        series: [
            {
                name: '目标概述',
                type: 'pie',
                radius: [20, 110],
                center: ['25%', '50%'],
                roseType: 'radius',
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {value: 1, name: '严格的顺序访问控制能力'},
                    {value: 2, name: '高性能'},
                    {value: 3, name: '高可用'},

                ]
            },
            {
                name: '四个设计目标',
                type: 'pie',
                radius: [30, 110],
                center: ['75%', '50%'],
                roseType: 'area',
                data: [
                    {value: 1, name: '简单的数据模型'},
                    {value: 2, name: '可以构建集群'},
                    {value: 3, name: '顺序访问'},
                    {value: 1, name: '高性能'}
                ]
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
                                "color": "#00FFFF",
                                "borderColor": "#00FFFF"
                            }
                        }
                    },
                    {
                        "name": "阶段一：提交事务请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFFF00",
                                "borderColor": "#FFFF00"
                            }
                        }
                    },
                    {
                        "name": "阶段二：执行事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#FF83FA",
                                "borderColor": "#FF83FA"
                            }
                        }
                    },
                    {
                        "name": "执行事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#BFEFFF",
                                "borderColor": "#BFEFFF"
                            }
                        }
                    },
                    {
                        "name": "中断事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#1C86EE",
                                "borderColor": "#1C86EE"
                            }
                        }
                    },
                    {
                        "name": "事务询问",
                        "itemStyle": {
                            "normal": {
                                "color": "#00FF00",
                                "borderColor": "#00FF00"
                            }
                        }
                    },
                    {
                        "name": "执行事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#00FF00",
                                "borderColor": "#00FF00"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务询问的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#00FF00",
                                "borderColor": "#00FF00"
                            }
                        }
                    },
                    {
                        "name": "发送提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#9F79EE",
                                "borderColor": "#9F79EE"
                            }
                        }
                    },
                    {
                        "name": "事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#9F79EE",
                                "borderColor": "#9F79EE"
                            }
                        }
                    },
                    {
                        "name": "反馈事务提交结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#9F79EE",
                                "borderColor": "#9F79EE"
                            }
                        }
                    },
                    {
                        "name": "完成事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#9F79EE",
                                "borderColor": "#9F79EE"
                            }
                        }
                    },
                    {
                        "name": "发送回滚请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#9B30FF",
                                "borderColor": "#9B30FF"
                            }
                        }
                    },
                    {
                        "name": "事务回滚",
                        "itemStyle": {
                            "normal": {
                                "color": "#9B30FF",
                                "borderColor": "#9B30FF"
                            }
                        }
                    },
                    {
                        "name": "反馈事务回滚结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#9B30FF",
                                "borderColor": "#9B30FF"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#9B30FF",
                                "borderColor": "#9B30FF"
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
                    fontSize: 15
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
                                "color": "#FF83FA",
                                "borderColor": "#FF83FA"
                            }
                        }
                    },
                    {
                        "name": "阶段一：CanCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFC125",
                                "borderColor": "#FFC125"
                            }
                        }
                    },
                    {
                        "name": "阶段二：PreCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#C1FFC1",
                                "borderColor": "#C1FFC1"
                            }
                        }
                    },
                    {
                        "name": "阶段三：doCommit",
                        "itemStyle": {
                            "normal": {
                                "color": "#9F79EE",
                                "borderColor": "#9F79EE"
                            }
                        }
                    },
                    {
                        "name": "执行事务预提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#9ACD32",
                                "borderColor": "#9ACD32"
                            }
                        }
                    },
                    {
                        "name": "中断二阶段事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#9ACD32",
                                "borderColor": "#9ACD32"
                            }
                        }
                    },
                    {
                        "name": "中断三阶段事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFF68F",
                                "borderColor": "#FFF68F"
                            }
                        }
                    },
                    {
                        "name": "执行提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#AEEEEE",
                                "borderColor": "#AEEEEE"
                            }
                        }
                    },
                    {
                        "name": "事务询问",
                        "itemStyle": {
                            "normal": {
                                "color": "#EE9A00",
                                "borderColor": "#EE9A00"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务询问的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#EE9A00",
                                "borderColor": "#EE9A00"
                            }
                        }
                    },
                    {
                        "name": "发送预提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#548B54",
                                "borderColor": "#548B54"
                            }
                        }
                    },
                    {
                        "name": "事务预提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#548B54",
                                "borderColor": "#548B54"
                            }
                        }
                    },
                    {
                        "name": "各参与者向协调者反馈事务执行的响应",
                        "itemStyle": {
                            "normal": {
                                "color": "#548B54",
                                "borderColor": "#548B54"
                            }
                        }
                    },
                    {
                        "name": "发送中断请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#00CD00",
                                "borderColor": "#00CD00"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务(二阶段内)",
                        "itemStyle": {
                            "normal": {
                                "color": "#00CD00",
                                "borderColor": "#00CD00"
                            }
                        }
                    },
                    {
                        "name": "发送提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#00F5FF",
                                "borderColor": "#00F5FF"
                            }
                        }
                    },
                    {
                        "name": "事务提交",
                        "itemStyle": {
                            "normal": {
                                "color": "#00F5FF",
                                "borderColor": "#00F5FF"
                            }
                        }
                    },
                    {
                        "name": "反馈事务提交结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#00F5FF",
                                "borderColor": "#00F5FF"
                            }
                        }
                    },
                    {
                        "name": "完成事务",
                        "itemStyle": {
                            "normal": {
                                "color": "#00F5FF",
                                "borderColor": "#00F5FF"
                            }
                        }
                    },
                    {
                        "name": "发送中断提交请求",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFC0CB",
                                "borderColor": "#FFC0CB"
                            }
                        }
                    },
                    {
                        "name": "事务回滚",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFC0CB",
                                "borderColor": "#FFC0CB"
                            }
                        }
                    },
                    {
                        "name": "反馈事务回滚结果",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFC0CB",
                                "borderColor": "#FFC0CB"
                            }
                        }
                    },
                    {
                        "name": "中断提交事务(三阶段内)",
                        "itemStyle": {
                            "normal": {
                                "color": "#FFC0CB",
                                "borderColor": "#FFC0CB"
                            }
                        }
                    }
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
                    fontSize: 15
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