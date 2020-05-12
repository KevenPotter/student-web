/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    distributedFeatureChart();
    distributedEnvironmentIssuesChart();
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
                layer.tips('消息丢失</br>消息延迟', distributedEnvironmentIssuesChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '网络分区':
                layer.tips('脑裂', distributedEnvironmentIssuesChart, {
                    tips: [2, '#008B45'],
                    time: 3000
                });
                break;
            case '三态':
                layer.tips('成功</br>失败</br>超时', distributedEnvironmentIssuesChart, {
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