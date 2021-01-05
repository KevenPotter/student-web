var MENU_ID = null;
var MODULE_NAME = null;
var MODULES_STATUS = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadMenuSelect();
    ++pageLoadCounts;
});

/**
 * 加载所属菜单
 * @author KevenPotter
 * @date 2021*-01-05 11:12:46
 */
function loadMenuSelect() {
    var menuSelect = $('#menuSelect');
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/menu/all/menus"),
        type: "GET",
        async: false,
        success: function (data) {
            var menuInfoArray = data.data;
            menuSelect.append('<option value="null">请选择所属菜单</option>')
            for (var index = 0; index < menuInfoArray.length; index++) {
                var menuInfo = menuInfoArray[index];
                menuSelect.append('<option value="' + menuInfo.menuId + '">' + menuInfo.menuName + '</option>')
            }
            loadModulesList(MENU_ID, MODULE_NAME, MODULES_STATUS, pageIndex);
        }
    });
}

/**
 * 加载模块列表
 * @param menuId 菜单编号
 * @param moduleName 模块名称
 * @param moduleStatus 模块状态
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2021-01-04 10:19:51
 */
function loadModulesList(menuId, moduleName, moduleStatus, pageIndex) {
    var modulesTableTBody = $('#modulesTableTBody');
    var modulesPage = $('#modulesPage');
    clearHtml(modulesTableTBody);
    clearHtml(modulesPage);
    var requestParam = {"menuId": menuId, "moduleName": moduleName, "moduleStatus": moduleStatus, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/module/modules"),
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var modulesArray = data.data.list;
            for (var moduleIndex = 0, length = modulesArray.length; moduleIndex < length; moduleIndex++) {
                var item = modulesArray[moduleIndex];
                var moduleId = item.id;                         // 菜单编号
                var moduleName = item.moduleName;               // 菜单名称
                var moduleStatus = item.moduleStatus;           // 菜单状态(0.不启用 1.启用)
                modulesTableTBody.append('<tr>' +
                    '<td id="moduleId_' + moduleId + '">' + moduleId + '</td>' +
                    '<td>' + moduleName + '</td>' +
                    '<td><input type="checkbox" value="' + moduleStatus + '" name="module_status_' + moduleIndex + '"></td>' +
                    '<td><span title="编辑" class="lnr lnr-pencil tinyHand span2" style="padding-right: 5px;"></span><span title="分配权限" class="lnr lnr-pointer-left tinyHand" style="padding-left: 5px;"></span></td>' +
                    '</tr>');
                var moduleStatusCheckBoxVal = $("[name='module_status_" + moduleIndex + "']").val();
                if ("1" === moduleStatusCheckBoxVal) bootstrapSwitchOnInit(moduleId, moduleIndex, true);
                if ("0" === moduleStatusCheckBoxVal) bootstrapSwitchOnInit(moduleId, moduleIndex, false);
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            modulesPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData(MENU_ID, MODULE_NAME, MODULES_STATUS, page);
                    loadModulesList(MENU_ID, MODULE_NAME, MODULES_STATUS, page);
                }
            });
        }
    });
}

/**
 * bootstrap-switch开关初始化
 * @param moduleId 菜单编号
 * @param moduleIndex 模块角标
 * @param moduleStatus 模块状态
 * @author KevenPotter
 * @date 2021-01-05 10:56:29
 */
function bootstrapSwitchOnInit(moduleId, moduleIndex, moduleStatus) {
    $("[name='module_status_" + moduleIndex + "']").bootstrapSwitch({
        state: moduleStatus,
        onText: "ON",
        offText: "OFF",
        onColor: "success",
        offColor: "danger",
        size: "normal",
        onSwitchChange: function (event, state) {
            var moduleStatus;
            if (true === state) moduleStatus = 1; else moduleStatus = 0;
            var requestParam = {"id": $('#moduleId_' + moduleId).text(), "moduleStatus": moduleStatus};
            $.ajax({
                url: studentManagementSystem + "/module/modules",
                type: "PUT",
                dataType: "JSON",
                data: JSON.stringify(requestParam),
                contentType: "application/json",
                success: function (data) {
                    if (SUCCESS_MARK === data.code) {
                        layerMsg("更新模块状态成功", GREEN_CHECK_MARK, 1500);
                    } else if (TARGET_INFORMATION_EMPTY === data.code) {
                        layerMsg(data.msg, RED_ERROR_MARK, 1500);
                    }
                }
            });
        }
    });
}

/**
 * 该方法旨在扫描当前页面的基础数据,并将所扫描到的基础数据赋值于全局变量共页面使用
 * @author KevenPotter
 * @date 2021-01-05 10:52:53
 */
function scanBasicData() {
    debugger;
    var menuIdVal = $('#menuSelect option:selected').val();
    var moduleNameVal = $('#moduleName').val();
    var moduleStatusVal = $('#moduleStatusSelect option:selected').val();
    MENU_ID = menuIdVal ? menuIdVal : null;
    MODULE_NAME = moduleNameVal ? moduleNameVal : null;
    MODULES_STATUS = moduleStatusVal ? moduleStatusVal : null;
    if ("null" === MENU_ID || undefined === MENU_ID) MENU_ID = null;
    if ("null" === MODULE_NAME || undefined === MODULE_NAME) MODULE_NAME = null;
    if ("null" === MODULES_STATUS || undefined === MODULES_STATUS) MODULES_STATUS = null;
}

/**
 * 搜索内容
 * @author KevenPotter
 * @date 2021-01-05 10:54:08
 */
function search() {
    scanBasicData();
    loadModulesList(MENU_ID, MODULE_NAME, MODULES_STATUS, pageIndex);
}

/*添加系统模块图层索引*/
var moduleLayerIndex;

/**
 * 加载添加模块图层
 * @author KevenPotter
 * @date 2021-01-05 09:36:11
 */
function openAddModuleLayer() {
    var moduleLayer = $('#moduleLayer');
    var moduleLayerMenuName = $('#moduleLayer_menuName');
    var moduleLayerModuleName = $('#moduleLayer_moduleName');
    var moduleLayerModuleStatus = $('#moduleLayer_moduleStatus');
    clearHtml(moduleLayerMenuName);
    clearValue(moduleLayerModuleName);
    clearHtml(moduleLayerModuleStatus);
    moduleLayerIndex = layer.open({
        type: 1,
        title: '添加模块',
        content: moduleLayer,
        area: ['35%', '30%'],
        move: false,
        resize: false
    });
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/menu/all/menus"),
        type: "GET",
        success: function (data) {
            var menuInfoArray = data.data;
            moduleLayerMenuName.append('<option value="-1">请选择所属菜单</option>')
            for (var index = 0; index < menuInfoArray.length; index++) {
                var menuInfo = menuInfoArray[index];
                moduleLayerMenuName.append('<option value="' + menuInfo.menuId + '">' + menuInfo.menuName + '</option>')
            }
        }
    });
    moduleLayerModuleStatus.append('<option value="-1">请选择模块状态</option>').append('<option value="1">开启</option>').append('<option value="0">关闭</option>');
}

/**
 * 此方法旨在对[菜单名称]进行合法性检查
 * @author KevenPotter
 * @date 2021-01-05 10:02:12
 */
function checkSystemModuleModuleName() {
    var moduleLayerModuleNameBorder = $('#moduleLayer_moduleName_border');
    var moduleLayerModuleNameIcon = $('#moduleLayer_moduleName_icon');
    var moduleLayerModuleName = $('#moduleLayer_moduleName').val();
    if (isEmpty(moduleLayerModuleName)) {
        addErrorStyle(moduleLayerModuleNameBorder, moduleLayerModuleNameIcon);
        layerMsg('不要忘了模块名称哦......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: urlFiltering(studentManagementSystem + "/module/moduleNa/" + moduleLayerModuleName.trim()),
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || TARGET_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(moduleLayerModuleNameBorder, moduleLayerModuleNameIcon);
                } else {
                    addErrorStyle(moduleLayerModuleNameBorder, moduleLayerModuleNameIcon);
                    layerMsg('这个系统模块名称已经存在了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * 添加模块
 * @author KevenPotter
 * @date 2021-01-05 09:59:53
 */
function insertModule() {
    var moduleLayerMenuNameVal = $('#moduleLayer_menuName option:selected').val();
    var moduleLayerModuleNameVal = $('#moduleLayer_moduleName').val();
    var moduleLayerModuleStatusVal = $('#moduleLayer_moduleStatus option:selected').val();
    if (-1 === Number(moduleLayerMenuNameVal)) {
        layerMsg('不要忘了给模块设定所属菜单哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(moduleLayerModuleNameVal)) {
        layerMsg('不要忘了模块名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (-1 === Number(moduleLayerModuleStatusVal)) {
        layerMsg('不要忘了给模块设定状态哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    var requestParam = {"menuId": moduleLayerMenuNameVal, "moduleName": moduleLayerModuleNameVal, "moduleStatus": moduleLayerModuleStatusVal};
    $.ajax({
        url: studentManagementSystem + "/module/modules",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.moduleName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(moduleLayerIndex);
                search();
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}