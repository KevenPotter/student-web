var studentId = null;
var menuName = null;
var studentDepartmentId = null;
var studentMajorId = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

var MENU_STATUS = ["停用", "启用"];

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadMenusList(pageIndex);
    loadDepartmentsListBySelectpicker();
    loadMajorsList();
    ++pageLoadCounts;
});

/**
 * 加载菜单列表
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2020-12-28 16:40:45
 */
function loadMenusList(pageIndex) {
    var menusTableTBody = $('#menusTableTBody');
    var menusPage = $('#menusPage');
    clearHtml(menusTableTBody);
    clearHtml(menusPage);
    var requestParam = {"pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: studentManagementSystem + "/menu/menus",
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var menusArray = data.data.list;
            for (var menuIdex = 0, length = menusArray.length; menuIdex < length; menuIdex++) {
                var item = menusArray[menuIdex];
                var menuName = item.menuName;
                var menuLinkUrl = item.menuLinkUrl;
                var menuIcon = item.menuIcon;
                var menuSortNumber = item.menuSortNumber;
                var menuStatus = item.menuStatus;
                menusTableTBody.append('<tr>' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + menuName + '</td>' +
                    '<td>' + menuLinkUrl + '</td>' +
                    '<td> <i class="' + menuIcon + '"></i></td>' +
                    '<td>' + menuSortNumber + '</td>' +
                    '<td>' + MENU_STATUS[menuStatus] + '</td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            menusPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData();
                    loadMenusList(page);
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
    var menuNameVal = $('#menuName').val();
    var studentDepartmentIdVal = $('#departmentsSelect option:selected').val();
    var studentMajorIdVal = $('#majorsSelect option:selected').val();
    studentId = studentIdVal ? studentIdVal : null;
    menuName = menuNameVal ? menuNameVal : null;
    studentDepartmentId = studentDepartmentIdVal ? studentDepartmentIdVal : null;
    studentMajorId = studentMajorIdVal ? studentMajorIdVal : null;
    if ("null" == studentId || undefined == studentId) studentId = null;
    if ("null" == studentName || undefined == studentName) studentName = null;
    if ("null" == studentDepartmentId || undefined == studentDepartmentId || isNaN(studentDepartmentId)) studentDepartmentId = null;
    if ("null" == studentMajorId || undefined == studentMajorId || isNaN(studentMajorId)) studentMajorId = null;
}

/**
 * 加载采用了[Selectpicker]样式的系统菜单列表
 * @author KevenPotter
 * @date 2020-12-28 16:51:23
 */
function loadMenusListBySelectpicker() {
    var departmentsSelect = $('#departmentsSelect');
    $.ajax({
        url: studentManagementSystem + "/department/departments",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var departmentsArray = data.data;
            departmentsSelect.append('<option value="' + null + '">请选择系别</option>');
            for (var departmentIndex = 0, length = departmentsArray.length; departmentIndex < length; departmentIndex++) {
                var item = departmentsArray[departmentIndex];
                departmentsSelect.append('<option id="' + departmentIndex + '" value="' + item.departmentId + '">' + item.departmentName + '</option>');
            }
            bootstrapSelectFlush(departmentsSelect);
        }
    });
}

/**
 * 搜索内容
 * @author KevenPotter
 * @date 2020-12-28 16:42:09
 */
function search() {
    scanBasicData();
    loadMenusList(pageIndex);
}