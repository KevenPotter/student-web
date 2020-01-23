var teacherId = null;
var teacherName = null;
var teacherDepartmentId = null;
var teacherMajorId = null;
var teacherProfessional = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadTeachersList(teacherId, teacherName, teacherDepartmentId, teacherMajorId, teacherProfessional, pageIndex);
    loadDepartmentsListBySelectpicker();
    loadMajorsList();
    ++pageLoadCounts;
});

/**
 * @param teacherId 教师编号
 * @param teacherName 教师姓名
 * @param departmentId 系别编号
 * @param majorId 专业编号
 * @param professional 教师职称
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2020-01-14 13:29:06
 * @description 加载教师列表
 */
function loadTeachersList(teacherId, teacherName, departmentId, majorId, professional, pageIndex) {
    var teacherTableTBody = $('#teachersTableTBody');
    var teachersPage = $('#teachersPage');
    clearHtml(teacherTableTBody);
    clearHtml(teachersPage);
    var requestParam = {"teacherId": teacherId, "name": teacherName, "departmentId": departmentId, "majorId": majorId, "professional": professional, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: studentManagementSystem + "/teacher/teachers",
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (USER_INFORMATION_EMPTY == data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var teachersArray = data.data.list;
            for (var teacherIndex = 0, length = teachersArray.length; teacherIndex < length; teacherIndex++) {
                var item = teachersArray[teacherIndex];
                var teacherName = item.name;
                var professional = item.professional;
                var departmentId = item.departmentId;
                var majorId = item.majorId;
                var teacherInformation = {"teacherIndex": teacherIndex, "departmentId": departmentId, "majorId": majorId};
                var profile_picture = studentImagesSystem + "/teacher/teacher_" + item.teacherId + ".png";
                teacherTableTBody.append('<tr onclick="jumpToTeacherDetailsPage(' + toObjectString(teacherInformation) + ')"> ' +
                    '<td>' + item.id + '</td>' +
                    '<td id="teacherId_' + teacherIndex + '">' + item.teacherId + '</td>' +
                    '<td>' + teacherName + '</td>' +
                    '<td><img id="profile_picture_' + item.teacherId + '" alt="' + teacherName + '" title="' + teacherName + '" src="' + profile_picture + '" class="avatar img-circle"></td>' +
                    '<td>' + item.sex + '</td>' +
                    '<td id="departmentId_' + teacherIndex + '">' + departmentId + '</td>' +
                    '<td id="majorId_' + teacherIndex + '">' + majorId + '</td>' +
                    '<td>' +
                    '<div class="progress progress-striped active">' +
                    '<div id="professional_' + teacherIndex + '" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="text-align: left;">' +
                    '<span style="margin-left: 7px;">' + professional + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</td>' +
                    '<td>' + item.address + '</td>' +
                    '</tr>');
                if (professional === "助教") {
                    $('#professional_' + teacherIndex).addClass("progress-bar-success").attr("aria-valuenow", professional).width("25%");
                } else if (professional === "讲师") {
                    $('#professional_' + teacherIndex).addClass("progress-bar-success").attr("aria-valuenow", professional).width("50%");
                } else if (professional === "副教授") {
                    $('#professional_' + teacherIndex).addClass("progress-bar-success").attr("aria-valuenow", professional).width("75%");
                } else if (professional === "教授") {
                    $('#professional_' + teacherIndex).addClass("progress-bar-success").attr("aria-valuenow", professional).width("100%");
                }
                $.ajax({
                    url: studentManagementSystem + "/department/department/" + item.departmentId,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $('#departmentId_' + teacherIndex + '').html(data.data.departmentName);
                        $.ajax({
                            url: studentManagementSystem + "/major/major/" + item.majorId,
                            type: "GET",
                            dataType: "json",
                            async: false,
                            success: function (data) {
                                $('#majorId_' + teacherIndex + '').html(data.data.majorName);
                            }
                        });
                    }
                });
                $('#profile_picture_' + item.teacherId).blowup({
                    "cursor": false,
                    "width": 200,
                    "height": 200
                });
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            teachersPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData();
                    loadTeachersList(teacherId, teacherName, teacherDepartmentId, teacherMajorId, null, page);
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
    var teacherIdVal = $('#teacherId').val();
    var teacherNameVal = $('#teacherName').val();
    var teacherDepartmentIdVal = $('#departmentsSelect option:selected').val();
    var teacherMajorIdVal = $('#majorsSelect option:selected').val();
    var teacherProfessionalVal = $('#professionalSelect option:selected').val();
    teacherId = teacherIdVal ? teacherIdVal : null;
    teacherName = teacherNameVal ? teacherNameVal : null;
    teacherDepartmentId = teacherDepartmentIdVal ? teacherDepartmentIdVal : null;
    teacherMajorId = teacherMajorIdVal ? teacherMajorIdVal : null;
    teacherProfessional = teacherProfessionalVal ? teacherProfessionalVal : null;
    if ("null" == teacherId || undefined == teacherId) teacherId = null;
    if ("null" == teacherName || undefined == teacherName) teacherName = null;
    if ("null" == teacherDepartmentId || undefined == teacherDepartmentId || isNaN(teacherDepartmentId)) teacherDepartmentId = null;
    if ("null" == teacherMajorId || undefined == teacherMajorId || isNaN(teacherMajorId)) teacherMajorId = null;
    if ("null" == teacherProfessional || undefined == teacherProfessional) teacherProfessional = null;
}

/**
 * @author KevenPotter
 * @date 2020-01-14 13:19:38
 * @description 搜索内容
 */
function search() {
    scanBasicData();
    loadTeachersList(teacherId, teacherName, teacherDepartmentId, teacherMajorId, teacherProfessional, pageIndex);
}

/**
 * @param teacherInformation 教师列表信息
 * @author KevenPotter
 * @date 2020-01-14 13:41:43
 * @description 跳转至教师详情页面
 */
function jumpToTeacherDetailsPage(teacherInformation) {
    var teacherId = $('#teacherId_' + teacherInformation.teacherIndex + '').text();
    TEACHER_ID = teacherId;
    DEPARTMENT_ID = teacherInformation.departmentId;
    MAJOR_ID = teacherInformation.majorId;
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
        $('#main_detail_content').load("teacherProfile.html");
    });
}