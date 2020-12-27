/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    $('#menus')
        .append('<li class="tinyHand" onclick="changeHtml(\'html/main.html\',\'indexHtml\')"><a id="indexHtml" class="active"><i class="lnr lnr-home"></i> <span>首页</span></a></li>')
        .append('<li class="tinyHand" onclick="changeHtml(\'html/students.html\',\'studentHtml\')"><a id="studentHtml" ><i class="lnr lnr-users"></i> <span>学生信息</span></a></li>')
        .append('<li class="tinyHand" onclick="changeHtml(\'html/teachers.html\',\'teacherHtml\')"><a id="teacherHtml" ><i class="lnr lnr-graduation-hat"></i> <span>教师信息</span></a></li>')
        .append('<li class="tinyHand" onclick="changeHtml(\'html/department_major.html\',\'department_majorHtml\')"><a id="department_majorHtml" ><i class="lnr lnr-inbox"></i> <span>系部专业</span></a></li>');
    getDashboardData();
    loadSexBar();
    $('#visits').text(WEBSITE_VISITORS);
});

/**
 * 更改主显示区的html页面
 * @param htmlPath 页面路径
 * @date 2020-12-24 14:34:56
 * @author KevenPotter
 */
function changeHtml(htmlPath, htmlId) {
    var mainContent = $('#main_content');
    clearHtml(mainContent);
    mainContent.append('<iframe id="main_content" class="embed-responsive-item" src="' + htmlPath + '" width="100%" height="100%" style="border: 0;"></iframe>');
    $('.active').removeClass('active');
    $('#' + htmlId).addClass('active');
    $("iframe").attr("height", parseInt($('#main_content').css('min-height')) * 0.98);
}

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
            if (SUCCESS_MARK === data.code) {
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
            if (SUCCESS_MARK === data.code) {
                $('#students').html(data.data.totalNumberOfStudents);
                $('#teachers').html(data.data.totalNumberOfTeachers);
                $('#visits').html(data.data.totalNumberOfVisits);
                $('#accounts').html(data.data.totalNumberOfAccounts);
            }
        }
    });
}

/**
 * 退出登录
 * @author KevenPotter
 * @date 2020-12-23 14:16:52
 */
function logout() {
    $.ajax({
        url: studentManagementSystem + "/logout",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg('退出成功', GREEN_SMILE_MARK, 1500);
                console.log(123);
                window.location.href = studentManagementSystem + "/login.html";
            }
        }
    });
}