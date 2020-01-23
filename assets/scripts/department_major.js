var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;
var DEPARTMENT_ID = -1;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadDepartmentsList();
    loadDepartmentsListForDepartmentMajorHtml(pageIndex);
    loadMajorsListForDepartmentMajorHtml(DEPARTMENT_ID, pageIndex);
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
                log(data);
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
            log(data);
            if (TARGET_INFORMATION_EMPTY === data.code) {
                debugger;
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
                    '<td>' + majorName + '</td>' +
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
                log(data);
                layerMsg(data.data.majorName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(majorLayerIndex);
                loadMajorsListForDepartmentMajorHtml(DEPARTMENT_ID, pageIndex);
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}