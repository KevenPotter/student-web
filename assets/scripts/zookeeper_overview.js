/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    whatIsZooKeeperChart();
    consistencyFeatureGuaranteedByZooKeeperChart();
    basicConceptsOfZooKeeperChart();
    ZooKeeperDesignGoalsChart();
    typicalApplicationScenariosOfZooKeeperChart();
    consistencyTypeChart();
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
            formatter: '{b} : {c} ({d}%)'
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
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_sequentialConsistency', 5000, 20, 20);
                break;
            case '原子性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_atomicity', 5000, 20, 20);
                break;
            case '单一视图(Single System Image)':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_singleSystemImage', 5000, 20, 20);
                break;
            case '可靠性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_reliability', 5000, 20, 20);
                break;
            case '实时性':
                layerCapture('consistencyFeatureGuaranteedByZooKeeper_realTime', 10000, 20, 20);
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
            formatter: '{b} : {c} ({d}%)'
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
 * ZooKeeper的基本概念
 */
function basicConceptsOfZooKeeperChart() {
    var basicConceptsOfZooKeeperChart = $('#basicConceptsOfZooKeeper');
    basicConceptsOfZooKeeperChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(basicConceptsOfZooKeeperChart[0], 'macarons');
    myChart.on('click', function (params) {
        switch (params.name) {
            case '集群角色':
                layerCapture('basicConceptsOfZooKeeper_clusterRole', 0, 30, 30);
                break;
            case '会话（Session）':
                layerCapture('basicConceptsOfZooKeeper_Session', 0, 30, 30);
                break;
            case '数据节点（Znode）':
                layerCapture('basicConceptsOfZooKeeper_znode', 0, 30, 30);
                break;
            case '版本':
                layerCapture('basicConceptsOfZooKeeper_version', 0, 30, 30);
                break;
            case 'Watcher':
                layerCapture('basicConceptsOfZooKeeper_watcher', 0, 30, 30);
                break;
            case 'ACL':
                layerCapture('basicConceptsOfZooKeeper_ACL', 0, 30, 30);
                break;
        }
    });
    var option = null;
    option = {
        title: {
            text: 'ZooKeeper的基本概念',
            subtext: 'P62',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
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
            data: ['集群角色', '会话（Session）', '数据节点（Znode）', '版本', 'Watcher', 'ACL'],
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
                    {value: 1, name: '集群角色'},
                    {value: 1, name: '会话（Session）'},
                    {value: 1, name: '数据节点（Znode）'},
                    {value: 1, name: '版本'},
                    {value: 1, name: 'Watcher'},
                    {value: 1, name: 'ACL'}
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
        switch (params.name) {
            case '高性能':
                layer.tips('高性能使得ZooKeeper能够应用于那些对系统吞吐有明确要求的大型分布式系统中。', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '高可用':
                layer.tips('高可用使得分布式的单点问题得到了很好的解决。', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '严格的顺序访问控制能力':
                layer.tips('严格的顺序访问控制能力使得客户端能够基于ZooKeeper实现一些复杂的同步原语。', ZooKeeperDesignGoalsChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
        }
    });
    myChart.on('click', function (params) {
        switch (params.name) {
            case '1.简单的数据模型':
                layerCapture('ZooKeeperDesignGoals_simpleDataModel', 10000, 30, 30);
                break;
            case '2.可以构建集群':
                layerCapture('ZooKeeperDesignGoals_canBuildClusters', 10000, 30, 30);
                break;
            case '3.顺序访问':
                layerCapture('ZooKeeperDesignGoals_sequentialAccess', 10000, 30, 30);
                break;
            case '4.高性能':
                layerCapture('ZooKeeperDesignGoals_highPerformance', 10000, 30, 30);
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
            formatter: '{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: ['高性能', '高可用', '严格的顺序访问控制能力', '1.简单的数据模型', '2.可以构建集群', '3.顺序访问', '4.高性能'],
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
                    {value: 1, name: '1.简单的数据模型'},
                    {value: 2, name: '2.可以构建集群'},
                    {value: 3, name: '3.顺序访问'},
                    {value: 1, name: '4.高性能'}
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
 * ZooKeeper的典型应用场景
 */
function typicalApplicationScenariosOfZooKeeperChart() {
    var typicalApplicationScenariosOfZooKeeperChart = $('#typicalApplicationScenariosOfZooKeeper');
    typicalApplicationScenariosOfZooKeeperChart.removeAttr("_echarts_instance_");
    var myChart = echarts.init(typicalApplicationScenariosOfZooKeeperChart[0], 'macarons');
    var option = null;
    option = {
        title: {
            text: 'ZooKeeper的典型应用场景',
            subtext: 'P163',
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
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
            formatter: '{b} : {c} ({d}%)'
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