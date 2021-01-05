var ROLE_NAME = null;
var ROLES_STATUS = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadRolesList(ROLE_NAME, ROLES_STATUS, pageIndex);
    ++pageLoadCounts;
    a();
});

/**
 * 加载角色列表
 * @param roleName 角色名称
 * @param roleStatus 角色状态
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2021-01-04 10:19:51
 */
function loadRolesList(roleName, roleStatus, pageIndex) {
    var rolesTableTBody = $('#rolesTableTBody');
    var rolesPage = $('#rolesPage');
    clearHtml(rolesTableTBody);
    clearHtml(rolesPage);
    var requestParam = {"roleName": roleName, "roleStatus": roleStatus, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/role/roles"),
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var rolesArray = data.data.list;
            for (var roleIndex = 0, length = rolesArray.length; roleIndex < length; roleIndex++) {
                var item = rolesArray[roleIndex];
                var roleId = item.id;                       // 角色编号
                var roleName = item.roleName;               // 角色名称
                var roleStatus = item.roleStatus;           // 角色状态(0.不启用 1.启用)
                rolesTableTBody.append('<tr>' +
                    '<td id="roleId_' + roleId + '">' + roleId + '</td>' +
                    '<td>' + roleName + '</td>' +
                    '<td><input type="checkbox" value="' + roleStatus + '" name="role_status_' + roleIndex + '"></td>' +
                    '<td><span title="编辑" class="lnr lnr-pencil tinyHand span2" style="padding-right: 5px;"></span><span title="分配权限" class="lnr lnr-pointer-left tinyHand" style="padding-left: 5px;"></span></td>' +
                    '</tr>');
                var roleStatusCheckBoxVal = $("[name='role_status_" + roleIndex + "']").val();
                if ("1" === roleStatusCheckBoxVal) bootstrapSwitchOnInit(roleId, roleIndex, true);
                if ("0" === roleStatusCheckBoxVal) bootstrapSwitchOnInit(roleId, roleIndex, false);
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            rolesPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData(ROLE_NAME, ROLES_STATUS, page);
                    loadRolesList(ROLE_NAME, ROLES_STATUS, page);
                }
            });
        }
    });
}

/**
 * bootstrap-switch开关初始化
 * @param roleId 角色编号
 * @param roleIndex 角色角标
 * @param roleStatus 角色状态
 * @author KevenPotter
 * @date 2021-01-04 13:35:45
 */
function bootstrapSwitchOnInit(roleId, roleIndex, roleStatus) {
    $("[name='role_status_" + roleIndex + "']").bootstrapSwitch({
        state: roleStatus,
        onText: "ON",
        offText: "OFF",
        onColor: "success",
        offColor: "danger",
        size: "normal",
        onSwitchChange: function (event, state) {
            var roleStatus;
            if (true === state) roleStatus = 1; else roleStatus = 0;
            var requestParam = {"id": $('#roleId_' + roleId).text(), "roleStatus": roleStatus};
            $.ajax({
                url: studentManagementSystem + "/role/roles",
                type: "PUT",
                dataType: "JSON",
                data: JSON.stringify(requestParam),
                contentType: "application/json",
                success: function (data) {
                    if (SUCCESS_MARK === data.code) {
                        layerMsg("更新角色状态成功", GREEN_CHECK_MARK, 1500);
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
 * @date 2021-01-04 11:06:55
 */
function scanBasicData() {
    var roleNameVal = $('#roleName').val();
    var roleStatusVal = $('#roleStatusSelect option:selected').val();
    ROLE_NAME = roleNameVal ? roleNameVal : null;
    ROLES_STATUS = roleStatusVal ? roleStatusVal : null;
    if ("null" === ROLE_NAME || undefined === ROLE_NAME) ROLE_NAME = null;
    if ("null" === ROLES_STATUS || undefined === ROLES_STATUS) ROLES_STATUS = null;
}

/**
 * 搜索内容
 * @author KevenPotter
 * @date 2021-01-04 11:06:23
 */
function search() {
    scanBasicData();
    loadRolesList(ROLE_NAME, ROLES_STATUS, pageIndex);
}

/*添加系统角色图层索引*/
var roleLayerIndex;

/**
 * 加载添加角色图层
 * @author KevenPotter
 * @date 2021-01-04 11:05:42
 */
function openAddRoleLayer() {
    var roleLayer = $('#roleLayer');
    var roleLayerRoleName = $('#roleLayer_roleName');
    var roleLayerRoleStatus = $('#roleLayer_roleStatus');
    clearValue(roleLayerRoleName);
    clearHtml(roleLayerRoleStatus);
    clearBorderStyle($('#roleLayer_roleName_border'), $('#roleLayer_roleName_icon'));
    roleLayerIndex = layer.open({
        type: 1,
        title: '添加角色',
        content: roleLayer,
        area: ['35%', '30%'],
        move: false,
        resize: false
    });
    roleLayerRoleStatus.append('<option value="-1">请选择角色状态</option>').append('<option value="1">开启</option>').append('<option value="0">关闭</option>');
}

/**
 * 此方法旨在对[菜单名称]进行合法性检查
 * @author KevenPotter
 * @date 2021-01-04 11:11:11
 */
function checkSystemRoleRoleName() {
    var roleLayerRoleNameBorder = $('#roleLayer_roleName_border');
    var roleLayerRoleNameIcon = $('#roleLayer_roleName_icon');
    var roleLayerRoleName = $('#roleLayer_roleName').val();
    if (isEmpty(roleLayerRoleName)) {
        addErrorStyle(roleLayerRoleNameBorder, roleLayerRoleNameIcon);
        layerMsg('不要忘了角色名称哦......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: urlFiltering(studentManagementSystem + "/role/roleNa/" + roleLayerRoleName.trim()),
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || TARGET_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(roleLayerRoleNameBorder, roleLayerRoleNameIcon);
                } else {
                    addErrorStyle(roleLayerRoleNameBorder, roleLayerRoleNameIcon);
                    layerMsg('这个系统角色名称已经存在了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * 添加角色
 * @author KevenPotter
 * @date 2021-01-01 19:54:23
 */
function insertRole() {
    var roleLayerRoleNameVal = $('#roleLayer_roleName').val();
    var roleLayerRoleStatusVal = $('#roleLayer_roleStatus option:selected').val();
    if (isEmpty(roleLayerRoleNameVal)) {
        layerMsg('不要忘了角色名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (-1 === Number(roleLayerRoleStatusVal)) {
        layerMsg('不要忘了给角色设定状态哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    var requestParam = {"roleName": roleLayerRoleNameVal, "roleStatus": roleLayerRoleStatusVal};
    $.ajax({
        url: studentManagementSystem + "/role/roles",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.roleName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(roleLayerIndex);
                search();
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}

function a() {
    var data3 = [];
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/module/all/modules"),
        type: "GET",
        dataType: "json",
        success: function (data) {
            var menuArray = data.data;
            for (var i = 0; i < menuArray.length; i++) {
                var key = i + 1;
                var moduleArray = menuArray[i][key];
                data3.push({title: menuArray[i][key][0].menuName, id: i + 1});
                var childrens = [];
                debugger;
                Object.defineProperty(data3[i], "children", childrens);
                for (var j = 0; j < moduleArray.length; j++) {
                    log(moduleArray[j]);
                    childrens.push({title: moduleArray[j].moduleName, id: moduleArray[j].moduleId});
                    data3[j].children = childrens;
                }

            }
        }
    });
    layui.use(['tree', 'util'], function () {
        var tree = layui.tree;
        var data2 = [
            {title: '早餐', id: 1, children: [{title: '油条', id: 5}, {title: '包子', id: 6}, {title: '豆浆', id: 7}]},
            {title: '午餐', id: 2, checked: true, children: [{title: '藜蒿炒腊肉', id: 8}, {title: '西湖醋鱼', id: 9}, {title: '小白菜', id: 10}, {title: '海带排骨汤', id: 11}]},
            {title: '晚餐', id: 3, children: [{title: '红烧肉', id: 12, fixed: true}, {title: '番茄炒蛋', id: 13}]},
            {title: '夜宵', id: 4, children: [{title: '小龙虾', id: 14, checked: true}, {title: '香辣蟹', id: 15, disabled: true}, {title: '烤鱿鱼', id: 16}]}
        ];
        tree.render({
            elem: '#test7'
            , data: data3
            , showCheckbox: true
        });
    });
}