/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    loadSexBar();
});

/**
 * @author KevenPotter
 * @date 2019-12-20 14:56:40
 * @description 展示各系男女人数
 */
function loadSexBar() {
    var myChart = echarts.init($('#sexBar')[0], 'macarons');
    var option = null;
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
        xAxisData.push('类目' + i);
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }
    option = {
        title: {
            text: '男女人数'
        },
        legend: {
            data: ['bar', 'bar2'],
            align: 'left'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {},
        series: [{
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'bar2',
            type: 'bar',
            data: data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
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
 * @date 2019-12-20 14:58:45
 * @description 依据浏览器大小重新定义图表尺寸
 */
function resize(ECharts) {
    $(window).resize(function () {
        ECharts.resize();
    });
}