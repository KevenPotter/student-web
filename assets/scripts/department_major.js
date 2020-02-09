var pageIndex = 1; // 默认当前页码
var DEPARTMENT_ID = -1;
var MAJOR_ID = -1;
var SEMESTER = 0;
var MAJOR_ADD_COURSES_ARRAY = [];

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    loadDepartmentsList();
    loadDepartmentsListForDepartmentMajorHtml(pageIndex);
    loadMajorsListForDepartmentMajorHtml(DEPARTMENT_ID, pageIndex);
    loadCoursesListForDepartmentMajorHtml(MAJOR_ID, SEMESTER, pageIndex, 1);
    loadSemesterSelect(SEMESTER);
});

/*************************************************************系部信息开始**********************************************************/

/**
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2020-01-16 16:24:54
 * @description 加载系部列表
 */
function loadDepartmentsListForDepartmentMajorHtml(pageIndex) {
    var departmentsTableBody = $('#departmentsTableBody');
    var departmentsPage = $('#departmentsPage');
    clearHtml(departmentsTableBody);
    clearHtml(departmentsPage);
    var requestParam = {"pageNo": pageIndex, "pageSize": 5};
    $.ajax({
        url: studentManagementSystem + "/department/departments",
        type: "PATCH",
        dataType: "JSON",
        data: requestParam,
        async: false,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var departmentsArray = data.data.list;
            for (var departmentIndex = 0, length = departmentsArray.length; departmentIndex < length; departmentIndex++) {
                var item = departmentsArray[departmentIndex];
                var departmentName = item.departmentName;
                var departmentId = item.departmentId;
                departmentsTableBody.append('<tr onclick="loadMajorsListForDepartmentMajorHtml(' + departmentId + ',' + pageIndex + ')">' +
                    '<td style="width: 10%;">' + item.id + '</td>' +
                    '<td id="departmentId_' + departmentIndex + '">' + departmentId + '</td>' +
                    '<td>' + departmentName + '</td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfoForDepartments').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            departmentsPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    loadDepartmentsListForDepartmentMajorHtml(page);
                }
            });
            loadDepartmentNestedPies();
        }
    });
}

/*添加系部图层索引*/
var departmentLayerIndex;

/**
 * @author KevenPotter
 * @date 2020-01-17 11:21:00
 * @description 加载添加系部图层
 */
function openAddDepartmentLayer() {
    var departmentLayer = $('#departmentLayer');
    var departmentCreationDate = $('#departmentCreationDate');
    var departmentNumberSelect = $('#departmentNumberSelect');
    clearValue(departmentCreationDate);
    clearHtml(departmentNumberSelect);
    departmentLayerIndex = layer.open({
        type: 1,
        title: '添加系部',
        content: departmentLayer,
        area: ['35%', '30%'],
        move: false,
        resize: false
    });
    laydate.render({
        elem: departmentCreationDate[0],
        theme: '#393D49'
    });
    departmentNumberSelect.append('<option id="departmentNumberOption" value="0">编号</option>');
    var departmentNumberOption = $('#departmentNumberOption');
    for (var departmentNumberOptionIndex = 99; departmentNumberOptionIndex >= 1; departmentNumberOptionIndex--) {
        departmentNumberOption.after('<option value="' + departmentNumberOptionIndex + '">' + departmentNumberOptionIndex + '</option>');
    }
}

/**
 * @author KevenPotter
 * @date 2020-01-17 15:07:27
 * @description 添加系部
 */
function insertDepartment() {
    var departmentCreationDateVal = $('#departmentCreationDate').val();
    var departmentNumberVal = $('#departmentNumberSelect option:selected').val();
    var departmentNameVal = $('#departmentName').val();
    if (isEmpty(departmentCreationDateVal)) {
        layerMsg('不要忘了创建日期哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(departmentNumberVal)) {
        layerMsg('不要忘了给系别加编号哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(departmentNameVal)) {
        layerMsg('不要忘了系部名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (Number(departmentNumberVal) < 10) {
        departmentNumberVal = '0' + departmentNumberVal;
    }
    var departmentId = departmentCreationDateVal.replace(/-/g, '') + departmentNumberVal;
    var requestParam = {"departmentId": departmentId, "departmentName": departmentNameVal};
    $.ajax({
        url: studentManagementSystem + "/department/departments",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.departmentName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(departmentLayerIndex);
                loadDepartmentsListForDepartmentMajorHtml(pageIndex);
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-02-08 18:09:14
 * @description 加载各系部专业数量图表
 */
function loadDepartmentNestedPies() {
    $.ajax({
        url: studentManagementSystem + "/department/departmentNestedPiesStatistics",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                var departmentsTablePanelBodyHeight = $("#departmentsTablePanelBody").height();
                var departmentNightingaleRoseDiagramPie = $('#departmentNightingaleRoseDiagramPie');
                departmentNightingaleRoseDiagramPie.removeAttr("_echarts_instance_");
                departmentNightingaleRoseDiagramPie.css({"height": departmentsTablePanelBodyHeight});
                var myChart = echarts.init(departmentNightingaleRoseDiagramPie[0], 'macarons');
                var option = null;
                option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: '10',
                        data: data.data.majorNameList
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '面积模式',
                            type: 'pie',
                            radius: [30, 110],
                            roseType: 'area',
                            data: data.data.departmentNestedPiesDataDtoList
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
                resize(myChart);
            }
        }
    });
}

/*************************************************************系部信息结束**********************************************************/


/*************************************************************专业信息开始**********************************************************/

/**
 * @param pageIndex 当前页码
 * @param departmentId 系部编号
 * @author KevenPotter
 * @date 2020-01-21 09:14:15
 * @description 加载专业列表
 */
function loadMajorsListForDepartmentMajorHtml(departmentId, pageIndex) {
    DEPARTMENT_ID = departmentId;
    var majorsTableBody = $('#majorsTableBody');
    var majorsPage = $('#majorsPage');
    clearHtml(majorsTableBody);
    clearHtml(majorsPage);
    var requestParam = {"pageNo": pageIndex, "pageSize": 5};
    $.ajax({
        url: studentManagementSystem + "/major/majors/" + departmentId,
        type: "PATCH",
        dataType: "JSON",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                clearHtml($('#pageInfoForMajors'));
                return;
            }
            var majorsArray = data.data.list;
            for (var majorIndex = 0, length = majorsArray.length; majorIndex < length; majorIndex++) {
                var item = majorsArray[majorIndex];
                var majorName = item.majorName;
                var majorId = item.majorId;
                majorsTableBody.append('<tr>' +
                    '<td style="width: 10%;">' + item.id + '</td>' +
                    '<td id="majorId_' + majorIndex + '">' + majorId + '</td>' +
                    '<td onclick="loadCoursesListForDepartmentMajorHtml(' + majorId + ',' + SEMESTER + ',' + pageIndex + ',1)">' + majorName + '</td>' +
                    '<td style="text-align: center" onclick="openMajorAddCourseLayer(' + majorId + ',\'' + majorName + '\')"><span class="btn label label-primary">绑定课程</span></td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfoForMajors').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            majorsPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    loadMajorsListForDepartmentMajorHtml(DEPARTMENT_ID, page);
                }
            });
        }
    });
}

/*添加系部图层索引*/
var majorLayerIndex;

/**
 * @author KevenPotter
 * @date 2020-01-21 09:58:41
 * @description 加载添加专业图层
 */
function openAddMajorLayer() {
    var majorLayer = $('#majorLayer');
    var majorCreationDate = $('#majorCreationDate');
    var majorNumberSelect = $('#majorNumberSelect');
    var departmentsSelect = $('#departmentsSelect');
    clearValue(majorCreationDate);
    clearHtml(majorNumberSelect);
    clearHtml(departmentsSelect);
    majorLayerIndex = layer.open({
        type: 1,
        title: '添加专业',
        content: majorLayer,
        area: ['35%', '50%'],
        move: false,
        resize: false
    });
    laydate.render({
        elem: majorCreationDate[0],
        theme: '#393D49'
    });
    majorNumberSelect.append('<option id="majorNumberOption" value="0">编号</option>');
    var majorNumberOption = $('#majorNumberOption');
    for (var majorNumberOptionIndex = 99; majorNumberOptionIndex >= 1; majorNumberOptionIndex--) {
        majorNumberOption.after('<option value="' + majorNumberOptionIndex + '">' + majorNumberOptionIndex + '</option>');
    }
    loadDepartmentsList();
}

/**
 * @author KevenPotter
 * @date 2020-01-21 10:26:35
 * @description 添加专业
 */
function insertMajor() {
    var majorCreationDateVal = $('#majorCreationDate').val();
    var majorNumberVal = $('#majorNumberSelect option:selected').val();
    var departmentIdVal = $('#departmentsSelect option:selected').val();
    var majorNameVal = $('#majorName').val();
    if (isEmpty(majorCreationDateVal)) {
        layerMsg('不要忘了创建日期哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(majorNumberVal)) {
        layerMsg('不要忘了给专业加编号哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(departmentIdVal)) {
        layerMsg('请选择专业所属系别......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(majorNameVal)) {
        layerMsg('不要忘了专业名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (Number(majorNumberVal) < 10) {
        majorNumberVal = '0' + majorNumberVal;
    }
    var majorId = majorCreationDateVal.replace(/-/g, '') + majorNumberVal;
    var requestParam = {"majorId": majorId, "majorName": majorNameVal, "departmentId": departmentIdVal};
    $.ajax({
        url: studentManagementSystem + "/major/majors",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.majorName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(majorLayerIndex);
                loadMajorsListForDepartmentMajorHtml(DEPARTMENT_ID, pageIndex);
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}

/*************************************************************专业信息结束**********************************************************/

/*************************************************************课程信息开始**********************************************************/

/**
 * @param majorId 专业编号
 * @param semester 学期
 * @param pageIndex 当前页码
 * @param trigger 触发者
 * @author KevenPotter
 * @date 2020-01-26 23:38:06
 * @description 加载课程列表
 */
function loadCoursesListForDepartmentMajorHtml(majorId, semester, pageIndex, trigger) {
    MAJOR_ID = majorId;
    if (1 == trigger) {
        loadSemesterSelect(SEMESTER);
    }
    if (-1 == majorId) {
        $('#semesterSelect').attr("disabled", true);
    } else {
        $('#semesterSelect').attr("disabled", false);
    }
    var coursesTableBody = $('#coursesTableBody');
    var coursesPage = $('#coursesPage');
    clearHtml(coursesTableBody);
    clearHtml(coursesPage);
    var requestParam = {"pageNo": pageIndex, "pageSize": 5};
    $.ajax({
        url: studentManagementSystem + "/course/courses/" + majorId + "/" + semester,
        type: "PATCH",
        dataType: "JSON",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var coursesArray = data.data.list;
            for (var courseIndex = 0, length = coursesArray.length; courseIndex < length; courseIndex++) {
                var item = coursesArray[courseIndex];
                var courseName = item.courseName;
                var courseId = item.courseId;
                coursesTableBody.append('<tr>' +
                    '<td  style="width: 10%;">' + item.id + '</td>' +
                    '<td id="courseId_' + courseIndex + '">' + courseId + '</td>' +
                    '<td>' + courseName + '</td>' +
                    '<td>' + item.hour + '</td>' +
                    '<td>' + item.credit + '</td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfoForCourses').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            coursesPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    loadCoursesListForDepartmentMajorHtml(MAJOR_ID, semester, page, 2);
                }
            });
        }
    });
}

/*添加课程图层索引*/
var courseLayerIndex;

/**
 * @author KevenPotter
 * @date 2020-01-27 09:59:28
 * @description 加载添加课程图层
 */
function openAddCourseLayer() {
    var courseLayer = $('#courseLayer');
    var courseCreationDate = $('#courseCreationDate');
    var courseNumberSelect = $('#courseNumberSelect');
    var hourSelect = $('#hourSelect');
    var creditSelect = $('#creditSelect');
    clearValue(courseCreationDate);
    clearHtml(courseNumberSelect);
    clearHtml(hourSelect);
    clearHtml(creditSelect);
    courseLayerIndex = layer.open({
        type: 1,
        title: '添加课程',
        content: courseLayer,
        area: ['35%', '50%'],
        move: false,
        resize: false
    });
    laydate.render({
        elem: courseCreationDate[0],
        theme: '#393D49'
    });
    courseNumberSelect.append('<option id="courseNumberOption" value="0">编号</option>');
    hourSelect.append('<option id="hourOption" value="0">课时</option>');
    creditSelect.append('<option id="creditOption" value="0">学分</option>');
    var courseNumberOption = $('#courseNumberOption');
    var hourOption = $('#hourOption');
    var creditOption = $('#creditOption');
    for (var courseNumberOptionIndex = 99; courseNumberOptionIndex >= 1; courseNumberOptionIndex--) {
        courseNumberOption.after('<option value="' + courseNumberOptionIndex + '">' + courseNumberOptionIndex + '</option>');
    }
    for (var hourOptionIndex = 20; hourOptionIndex >= 1; hourOptionIndex--) {
        hourOption.after('<option value="' + hourOptionIndex + '">' + hourOptionIndex + '</option>');
    }
    for (var creditOptionIndex = 20; creditOptionIndex >= 1; creditOptionIndex--) {
        creditOption.after('<option value="' + creditOptionIndex + '">' + creditOptionIndex + '</option>');
    }
}

/**
 * @author KevenPotter
 * @date 2020-01-27 22:36:08
 * @description 添加课程
 */
function insertCourse() {
    var courseCreationDate = $('#courseCreationDate').val();
    var courseNumberSelectVal = $('#courseNumberSelect option:selected').val();
    var hourSelectVal = $('#hourSelect option:selected').val();
    var creditSelectVal = $('#creditSelect option:selected').val();
    var courseNameVal = $('#courseName').val();
    if (isEmpty(courseCreationDate)) {
        layerMsg('不要忘了创建日期哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(courseNumberSelectVal)) {
        layerMsg('不要忘了给课程加编号哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(hourSelectVal)) {
        layerMsg('不要忘了给课程加课时哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(creditSelectVal)) {
        layerMsg('不要忘了给课程加学分哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(courseNameVal)) {
        layerMsg('不要忘了课程名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (Number(courseNumberSelectVal) < 10) {
        courseNumberSelectVal = '0' + courseNumberSelectVal;
    }
    var courseId = courseCreationDate.replace(/-/g, '') + courseNumberSelectVal;
    var requestParam = {"courseId": courseId, "courseName": courseNameVal, "hour": hourSelectVal, "credit": creditSelectVal};
    $.ajax({
        url: studentManagementSystem + "/course/courses",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.courseName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(courseLayerIndex);
                loadCoursesListForDepartmentMajorHtml(MAJOR_ID, SEMESTER, pageIndex, 2);
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            } else if (TARGET_INFORMATION_EMPTY === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-01-29 22:46:48
 * @description 加载学习下拉选项
 */
function loadSemesterSelect(semester) {
    var semesterSelect = $('#semesterSelect');
    clearHtml(semesterSelect);
    semesterSelect.append('<option value="0">选择学期</option>' +
        '<option value="1">第一学期</option>' +
        '<option value="2">第二学期</option>' +
        '<option value="3">第三学期</option>' +
        '<option value="4">第四学期</option>' +
        '<option value="5">第五学期</option>' +
        '<option value="6">第六学期</option>' +
        '<option value="7">第七学期</option>' +
        '<option value="8">第八学期</option>');
}

/**
 * @author KevenPotter
 * @date 2020-01-28 23:10:44
 * @description 点击学期选择标签进行筛选指定专业下的学期课程
 */
function loadCoursesListForDepartmentMajorHtmlBySemester() {
    loadCoursesListForDepartmentMajorHtml(MAJOR_ID, $('#semesterSelect option:selected').val(), pageIndex, 2);
}

/*专业绑定课程图层索引*/
var majorAddCourseLayerIndex;

/**
 * @param majorId 专业编号
 * @param majorName 专业名称
 * @author KevenPotter
 * @date 2020-01-31 15:43:06
 * @description 加载专业绑定课程图层
 */
function openMajorAddCourseLayer(majorId, majorName) {
    var majorAddCourseLayer = $('#majorAddCourseLayer');
    var majorAddCourseLayerSemesterSelect = $('#majorAddCourseLayerSemesterSelect');
    clearHtml(majorAddCourseLayerSemesterSelect);
    majorAddCourseLayerIndex = layer.open({
        type: 1,
        title: '绑定课程',
        content: majorAddCourseLayer,
        area: ['35%', '60%'],
        cancel: function (index, layero) {
            $('.choose-type-right li').each(function () {
                $(this).removeClass();
            });
        },
        move: false,
        resize: false
    });
    $('#majorAddCourseLayerMajorId').text(majorId).hide();
    $('#majorAddCourseLayerMajorName').text(majorName);
    majorAddCourseLayerSemesterSelect.append('<option value="0">选择学期</option>' +
        '<option value="1">第一学期</option>' +
        '<option value="2">第二学期</option>' +
        '<option value="3">第三学期</option>' +
        '<option value="4">第四学期</option>' +
        '<option value="5">第五学期</option>' +
        '<option value="6">第六学期</option>' +
        '<option value="7">第七学期</option>' +
        '<option value="8">第八学期</option>');
    $.ajax({
        url: studentManagementSystem + "/course/courses",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var coursesArray = data.data;
            var majorAddCourseLayerCoursesSelect = $('#majorAddCourseLayerCoursesSelect');
            clearHtml(majorAddCourseLayerCoursesSelect);
            for (var coursesIndex = 0, length = coursesArray.length; coursesIndex < length; coursesIndex++) {
                var item = coursesArray[coursesIndex];
                majorAddCourseLayerCoursesSelect.append('<option value="' + item.courseId + '">' + item.courseName + '</option>');
            }
            initializeMajorAddCoursesMultipleSelectionBlock(majorId);
            $('.choose-type-right li').each(function () {
                $(this).css("margin", "3px");
            });
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-01-31 15:27:38
 * @description 点击[专业信息]表格中的[绑定课程]来对专业进行课程的分配.
 */
function majorAddCourses() {
    var majorId = $('#majorAddCourseLayerMajorId').text();
    var semester = $('#majorAddCourseLayerSemesterSelect option:selected').val();
    var majorAddCoursesArrayString = MAJOR_ADD_COURSES_ARRAY.join(',');
    if (0 === Number(semester)) {
        layerMsg('不要忘记选择对应的学期哦...', GREEN_SMILE_MARK, 2500);
        return;
    }
    if (isEmpty(majorAddCoursesArrayString)) {
        layerMsg('不要忘记选择对应的课程哦...', GREEN_SMILE_MARK, 2500);
        return;
    }
    var requestParam = {"majorId": majorId, "majorAddCoursesArrayString": majorAddCoursesArrayString, "semester": semester};
    $.ajax({
        url: studentManagementSystem + "/departmentMajorSemesterCourse/departmentMajorSemesterCourses",
        type: "POST",
        dataType: "JSON",
        data: requestParam,
        success: function (data) {
            log(data);
            if (SUCCESS_MARK === data.code) {
                layerMsg("所选" + data.data + "门课程绑定添加成功~", GREEN_CHECK_MARK, 1500);
            } else if (MESSAGE_ADDITION_FAILED === data.code) {
                layerMsg(data.msg, GREEN_CHECK_MARK, 1500);
            }
            layer.close(majorAddCourseLayerIndex);
        }
    });
}

/**
 * @param majorId 专业编号
 * @author KevenPotter
 * @date 2020-02-03 00:14:26
 * @description 初始化专业绑定课程的多选项模块
 */
function initializeMajorAddCoursesMultipleSelectionBlock(majorId) {
    // 将所有.ui-choose实例化
    $('.ui-choose').ui_choose();
    // majorAddCourseLayerCoursesSelect select 多选
    var majorAddCourseLayerCoursesSelect = $('#majorAddCourseLayerCoursesSelect').ui_choose();
    majorAddCourseLayerCoursesSelect.click = function (value, item) {
        if (0 !== value.length) {
            $.ajax({
                url: studentManagementSystem + "/departmentMajorSemesterCourse/departmentMajorSemesterCourses/" + majorId + "/" + value.join(','),
                type: "GET",
                dataType: "JSON",
                success: function (data) {
                    if (data.data.length > 0) {
                        var majorAddCoursesArray = data.data;
                        for (var i = 0; i < majorAddCoursesArray.length; i++) {
                            var item = majorAddCoursesArray[i];
                            var courseInfo = $('li[data-value=' + item.courseId + ']');
                            layerMsg(courseInfo[0].title + " 已经绑定过啦~~~", GREEN_SMILE_MARK, 2500);
                            courseInfo.removeClass();
                            if (0 === MAJOR_ADD_COURSES_ARRAY.length) {
                                MAJOR_ADD_COURSES_ARRAY = [];
                            }
                            var index = MAJOR_ADD_COURSES_ARRAY.indexOf(item.courseId.toString());
                            if (index > -1) MAJOR_ADD_COURSES_ARRAY.splice(index, 1);
                        }
                    }
                }
            });
        }
        MAJOR_ADD_COURSES_ARRAY = value;
    };
}

/*************************************************************课程信息结束**********************************************************/

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