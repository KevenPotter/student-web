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
                    '<td style="width: 10%;">' + item.id + '</td>' +
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
 * @date 2020-01-17 11:21:00
 * @description 加载添加系部图层
 */
function openAddDepartmentLayer() {
    var departmentLayer = $('#departmentLayer');
    var departmentCreationDate = $('#departmentCreationDate');
    var departmentNumberSelect = $('#departmentNumberSelect');
    clearValue(departmentCreationDate);
    clearHtml(departmentNumberSelect);
    layer.open({
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
        departmentNumberOption.after('<option value="' + departmentNumberOptionIndex + '">' + departmentNumberOptionIndex + '</option>')
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
        data: requestParam,
        success: function (data) {
            if (SUCCESS_MARK === data.data.code) {
                log(data);
            }
        }
    });
}