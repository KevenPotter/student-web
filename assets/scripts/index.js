/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    getDashboardData();
    loadSexBar();
    $('#visits').text(WEBSITE_VISITORS);
});

/**
 * @author KevenPotter
 * @date 2019-12-20 14:56:40
 * @description 展示各系男女人数
 */
function loadSexBar() {
    $.ajax({
        url: studentManagementSystem + "/index/sexStatistics",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == SUCCESS_MARK) {
                console.log(data.data);
                console.log(data.data.length);
                var myChart = echarts.init($('#sexBar')[0], 'macarons');
                var option;
                var xAxisData = [];
                var numberOfMales = [];
                var numberOfFemales = [];
                for (var i = 0; i < data.data.length; i++) {
                    xAxisData.push(data.data[i].departmentName);
                    numberOfMales.push(data.data[i].numberOfMales);
                    numberOfFemales.push(data.data[i].numberOfFemales);
                }
                option = {
                    title: {
                        text: '学生男女人数'
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
                        data: numberOfMales,
                        animationDelay: function (idx) {
                            return idx * 10;
                        }
                    }, {
                        name: '女',
                        type: 'bar',
                        data: numberOfFemales,
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
        }
    });
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