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
    loadDepartmentsListForDepartmentMajorHtml(pageIndex);
    ++pageLoadCounts;
});

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
        success: function (data) {
            log(data);
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var studentsArray = data.data.list;
            for (var studentIndex = 0, length = studentsArray.length; studentIndex < length; studentIndex++) {
                var item = studentsArray[studentIndex];
                var departmentName = item.departmentName;
                var departmentId = item.departmentId;
                departmentsTableBody.append('<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td id="departmentId_' + studentIndex + '">' + departmentId + '</td>' +
                    '<td>' + departmentName + '</td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            departmentsPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData();
                    loadDepartmentsListForDepartmentMajorHtml(page);
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
 * @date 2020-01-15 11:32:40
 * @description 该方法旨在扫描当前页面的基础数据,并将所扫描到的基础数据赋值于全局变量共页面使用
 */
function scanBasicData() {
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
    if ("null" == studentDepartmentId || undefined == studentDepartmentId || isNaN(studentDepartmentId)) studentDepartmentId = null;
    if ("null" == studentMajorId || undefined == studentMajorId || isNaN(studentMajorId)) studentMajorId = null;
}

/**
 * @author KevenPotter
 * @date 2019-11-26 08:33:39
 * @description 搜索内容
 */
function search() {
    scanBasicData();
    loadDepartmentsListForDepartmentMajorHtml(studentId, studentName, studentDepartmentId, studentMajorId, pageIndex);
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
        $('#main_detail_content').load("studentProfile.html");
    });
}