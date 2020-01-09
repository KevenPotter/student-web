var studentId = null;
var studentName = null;
var studentDepartmentId = null;
var studentMajorId = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadStudentsList(studentId, studentName, studentDepartmentId, studentMajorId, pageIndex);
    loadDepartmentsList();
    loadMajorsList();
    ++pageLoadCounts;
});

/**
 *
 * @param studentId 学生编号
 * @param studentName 学生姓名
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2019-11-25 22:22:03
 * @description 加载学生列表
 */
function loadStudentsList(studentId, studentName, departmentId, majorId, pageIndex) {
    var studentsTableTBody = $('#studentsTableTBody');
    var studentsPage = $('#studentsPage');
    clearHtml(studentsTableTBody);
    clearHtml(studentsPage);
    var requestParam = {"studentId": studentId, "name": studentName, "departmentId": departmentId, "majorId": majorId, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: studentManagementSystem + "/student/students",
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (data.code == USER_INFORMATION_EMPTY) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var studentsArray = data.data.list;
            for (var studentIndex = 0, length = studentsArray.length; studentIndex < length; studentIndex++) {
                var item = studentsArray[studentIndex];
                var grade = item.grade;
                var departmentId = item.departmentId;
                var majorId = item.majorId;
                var studentInformation = {"studentIndex": studentIndex, "departmentId": departmentId, "majorId": majorId};
                studentsTableTBody.append('<tr onclick="jumpToStudentDetailsPage(' + JSON.stringify(studentInformation).replace(/\"/g, "'") + ')"> ' +
                    '<td>' + item.id + '</td>' +
                    '<td id="studentId_' + studentIndex + '">' + item.studentId + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.sex + '</td>' +
                    '<td id="departmentId_' + studentIndex + '">' + departmentId + '</td>' +
                    '<td id="majorId_' + studentIndex + '">' + majorId + '</td>' +
                    '<td>' +
                    '<div class="progress progress-striped active">' +
                    '<div id="grade_' + studentIndex + '" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="text-align: left;">' +
                    '<span style="margin-left: 7px;">' + grade + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' + item.clazz + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '</tr>');
                $('#grade_' + studentIndex).addClass("progress-bar-info").attr("aria-valuenow", grade).width(grade * 25 + "%");
                $.ajax({
                    url: studentManagementSystem + "/department/department/" + item.departmentId,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $('#departmentId_' + studentIndex + '').html(data.data.departmentName);
                        $.ajax({
                            url: studentManagementSystem + "/major/major/" + item.majorId,
                            type: "GET",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                $('#majorId_' + studentIndex + '').html(data.data.majorName);
                            }
                        });
                    }
                });
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            studentsPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    loadStudentsList(studentId, studentName, departmentId, majorId, page);
                }
            });
        }
    });
}

/**
 * @author KevenPotter
 * @date 2019-12-09 10:46:18
 * @description 加载专业列表
 */
function loadMajorsList() {
    var majorsSelect = $('#majorsSelect');
    clearHtml(majorsSelect);
    var options = $('select option:selected');
    var departmentId = options.val();
    if (undefined == departmentId || null == departmentId || "null" == departmentId) {
        $("#majorsSelect").attr("disabled", true);
        majorsSelect.append('<option value="' + null + '">请选择专业</option>');
        bootstrapSelectFlush(majorsSelect);
        if (pageLoadCounts != 0) {
            search();
        }
        return;
    } else {
        $("#majorsSelect").attr("disabled", false);
    }
    $.ajax({
        url: studentManagementSystem + "/major/majors/" + departmentId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var majorsArray = data.data;
            majorsSelect.append('<option value="' + null + '">请选择专业</option>');
            for (var majorIndex = 0, length = majorsArray.length; majorIndex < length; majorIndex++) {
                var item = majorsArray[majorIndex];
                majorsSelect.append('<option id="' + majorIndex + '" value="' + item.majorId + '">' + item.majorName + '</option>');
                bootstrapSelectFlush(majorsSelect);
            }
        }
    });
    search();
}

/**
 * @author KevenPotter
 * @date 2019-11-26 08:33:39
 * @description 搜索内容
 */
function search() {
    var studentIdVal = $('#studentId').val();
    var studentNameVal = $('#studentName').val();
    var studentDepartmentIdVal = $('#departmentsSelect option:selected').val();
    var studentMajorIdVal = $('#majorsSelect option:selected').val();
    studentId = studentIdVal ? studentIdVal : null;
    studentName = studentNameVal ? studentNameVal : null;
    studentDepartmentId = studentDepartmentIdVal ? studentDepartmentIdVal : null;
    studentMajorId = studentMajorIdVal ? studentMajorIdVal : null;
    if ("null" == studentId || undefined == studentId) studentId = null;
    if ("null" == studentName || undefined == studentName) studentName = null;
    if ("null" == studentDepartmentId || undefined == studentDepartmentId) studentDepartmentId = null;
    if ("null" == studentMajorId || undefined == studentMajorId) studentMajorId = null;
    loadStudentsList(studentId, studentName, studentDepartmentId, studentMajorId, pageIndex);
}

/**
 * @param studentInformation 学生列表信息
 * @author KevenPotter
 * @date 2020-01-03 09:21:19
 * @description 跳转至学生详情页面
 */
function jumpToStudentDetailsPage(studentInformation) {
    var studentId = $('#studentId_' + studentInformation.studentIndex + '').text();
    STUDENT_ID = studentId;
    DEPARTMENT_ID = studentInformation.departmentId;
    MAJOR_ID = studentInformation.majorId;
    loading();
}

/**
 * @author KevenPotter
 * @date 2020-01-04 11:14:14
 * @description 跳转至学生详情页面
 */
function loading() {
    layer.msg("loading...", {
        icon: 16,
        shade: [0.6, '#000005'],//遮罩的颜色与透明度
        time: 100
    }, function () {
        $('#main_content').hide();
        $('#main_detail_content').load("profile.html");
    });
}