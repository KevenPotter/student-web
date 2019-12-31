/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    getDashboardData();
    loadSexBar();
    onlineUserCounts();
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
            data: ['男', '女'],
            align: 'left'
        },
        toolbox: {
            show: true,
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                restore: {
                    show: true
                },
                dataZoom: {
                    show: true
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
            name: '男',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: '女',
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

/**
 * @author KevenPotter
 * @date 2019-12-21 23:18:09
 * @description 返回首页的仪表盘展示数据
 */
function getDashboardData() {
    $.ajax({
        url: studentManagementSystem + "/index/counts",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == SUCCESS_MARK) {
                $('#students').html(data.data.totalNumberOfStudents);
                $('#teachers').html(data.data.totalNumberOfTeachers);
                $('#visits').html(data.data.totalNumberOfVisits);
                $('#accounts').html(data.data.totalNumberOfAccounts);
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2019-21-27 15:01:12
 * @description 对后端服务器发送请求以统计在线人数
 */
function onlineUserCounts() {
    if (!checkWebSocket()) {
        layerMsg('该浏览器暂不支持WebSocket', GREEN_SMILE_MARK, 3000);
        return;
    }
    var onlineUserCountSocket = new WebSocket(studentManagementSystemWebSocket + "/dashboard");
    onlineUserCountSocket.onmessage = function (msg) {
        $('#visits').text(msg.data);
    };
    $(window).on("unload", function (e) {
        onlineUserCountSocket.close();
    });

    /**
     * @returns {boolean}
     * @author KevenPotter
     * @date 2019-12-31 11:32:44
     * @description 检测该浏览器是否支持WebSocket
     */
    function checkWebSocket() {
        var onlineUserCountSocket;
        if ('WebSocket' in window || 'MozWebSocket' in window) {
            return true;
        } else {
            return false;
        }
    }
}