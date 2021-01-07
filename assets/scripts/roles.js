let ROLE_NAME = null;
let ROLES_STATUS = null;
let pageIndex = 1; // 默认当前页码
let pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadRolesList(ROLE_NAME, ROLES_STATUS, pageIndex);
    ++pageLoadCounts;
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
    let rolesTableTBody = $('#rolesTableTBody');
    let rolesPage = $('#rolesPage');
    clearHtml(rolesTableTBody);
    clearHtml(rolesPage);
    let requestParam = {"roleName": roleName, "roleStatus": roleStatus, "pageNo": pageIndex, "pageSize": 10};
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
            let rolesArray = data.data.list;
            for (let roleIndex = 0, length = rolesArray.length; roleIndex < length; roleIndex++) {
                let item = rolesArray[roleIndex];
                let roleId = item.id;                       // 角色编号
                let roleName = item.roleName;               // 角色名称
                let roleStatus = item.roleStatus;           // 角色状态(0.不启用 1.启用)
                rolesTableTBody.append('<tr>' +
                    '<td id="roleId_' + roleId + '">' + roleId + '</td>' +
                    '<td>' + roleName + '</td>' +
                    '<td><input type="checkbox" value="' + roleStatus + '" name="role_status_' + roleIndex + '"></td>' +
                    '<td><span title="编辑" class="lnr lnr-pencil tinyHand span2" style="padding-right: 5px;"></span><span title="分配权限" class="lnr lnr-pointer-left tinyHand" style="padding-left: 5px;" onclick="assignPermissions(' + roleId + ')"></span></td>' +
                    '</tr>');
                let roleStatusCheckBoxVal = $("[name='role_status_" + roleIndex + "']").val();
                if ("1" === roleStatusCheckBoxVal) bootstrapSwitchOnInit(roleId, roleIndex, true);
                if ("0" === roleStatusCheckBoxVal) bootstrapSwitchOnInit(roleId, roleIndex, false);
            }
            let pageNum = data.data.pageNum;
            let pages = data.data.pages;
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
            let roleStatus;
            if (true === state) roleStatus = 1; else roleStatus = 0;
            let requestParam = {"id": $('#roleId_' + roleId).text(), "roleStatus": roleStatus};
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
    let roleNameVal = $('#roleName').val();
    let roleStatusVal = $('#roleStatusSelect option:selected').val();
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
let roleLayerIndex;

/**
 * 加载添加角色图层
 * @author KevenPotter
 * @date 2021-01-04 11:05:42
 */
function openAddRoleLayer() {
    let roleLayer = $('#roleLayer');
    let roleLayerRoleName = $('#roleLayer_roleName');
    let roleLayerRoleStatus = $('#roleLayer_roleStatus');
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
    let roleLayerRoleNameBorder = $('#roleLayer_roleName_border');
    let roleLayerRoleNameIcon = $('#roleLayer_roleName_icon');
    let roleLayerRoleName = $('#roleLayer_roleName').val();
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
    let roleLayerRoleNameVal = $('#roleLayer_roleName').val();
    let roleLayerRoleStatusVal = $('#roleLayer_roleStatus option:selected').val();
    if (isEmpty(roleLayerRoleNameVal)) {
        layerMsg('不要忘了角色名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (-1 === Number(roleLayerRoleStatusVal)) {
        layerMsg('不要忘了给角色设定状态哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    let requestParam = {"roleName": roleLayerRoleNameVal, "roleStatus": roleLayerRoleStatusVal};
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

let tree;

/**
 * 渲染分配权限的树形组件
 * @param roleId 角色编号
 * @author KevenPotter
 * @date 2021-01-05 21:48:26
 */
function loadMenuAndModulePermission(roleId) {
    let assignPermissionsLayerMenuAndModule = $('#assign_permissions_layer_menu_and_module');                                               // 获取展示[菜单-模块-权限]的树形组件图层
    let menuModulePermissionData = [];                                                                                                      // 定义树形组件初始化时的[菜单-模块-权限]数据源
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/module/all/modules"),                                                             // 获取所有[系统菜单模块数据传输集合]
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            let menuModuleArray = data.data;                                                                                                // 菜单模块数组
            $.ajax({
                url: urlFiltering(studentManagementSystem + "/roleMenuModulePermission/roleMenuModulePermissions/" + roleId),           // 根据[角色编号]查询[当前系统角色-菜单-模块-权限数据传输集合]
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    let currentRoleMenuModulePermissions = data.data;                                                                       // 定义[当前系统角色-菜单-模块-权限数据传输集合]
                    for (let i = 0; i < menuModuleArray.length; i++) {                                                                      // 对所有[系统菜单模块数据传输集合]进行遍历，这一步是要开始初始化树形组件的数据源
                        let moduleArray = getFirstElement(menuModuleArray[i]);                                                              // 获取[系统菜单模块数据传输集合]中的第一个[系统菜单模块数据传输数据]
                        menuModulePermissionData.push({title: moduleArray[0].menuName, id: "menu_" + (i + 1)});                             // 树形组件中一级菜单放入[系统菜单模块数据传输数据]中的菜单名称
                        let children = [];                                                                                                  // 定义二级菜单数据
                        menuModulePermissionData[i].children = [];                                                                          // 对树形组件的数据源添加二级菜单属性，初始化为空数组
                        for (let j = 0; j < moduleArray.length; j++) {                                                                      // 开始遍历[系统菜单模块数据传输数据]中的数据
                            let moduleInfo = moduleArray[j];
                            let moduleName = moduleInfo.moduleName;
                            let moduleId = moduleInfo.moduleId;
                            if (moduleId != null) {                                                                                         // 如果存在模块数据，那么就进行二级菜单的数据源生成，否则跳过
                                children.push({
                                    title: moduleName,
                                    id: "module_" + moduleId,
                                    children: [{title: '查询', id: moduleId + "_select_" + moduleId}, {title: '修改', id: moduleId + "_update_" + moduleId}, {title: '添加', id: moduleId + "_insert_" + moduleId}, {title: '删除', id: moduleId + "_delete_" + moduleId}]
                                });
                            }
                        }
                        if (children.length !== 0) menuModulePermissionData[i].children = children;
                    }
                    if (null !== currentRoleMenuModulePermissions) {
                        for (let i = 0; i < currentRoleMenuModulePermissions.length; i++) {                                                 // 遍历[当前系统角色-菜单-模块-权限数据传输集合]，这是数据库里面存储的。这一步的主要目的是对树形组件已选择的选项进行勾选
                            for (let j = 0; j < menuModulePermissionData.length; j++) {                                                     // 遍历[菜单-模块-权限]数据源
                                let singleMenuModulePermission = menuModulePermissionData[j];                                               // 获取[菜单-模块-权限]数据源中的[单条菜单-模块-权限数据源]，形似：{title: "首页", id: "menu_1", children: Array(3)}
                                let singleCurrentRoleMenuModulePermissions = currentRoleMenuModulePermissions[i];                           // 获取[当前系统角色-菜单-模块-权限数据传输集合]中的[单条当前系统角色-菜单-模块-权限数据传输数据源]，形似：{id: 1, roleId: 1, menuId: 1, moduleId: 1, permissions: "select", …}
                                if (singleMenuModulePermission.id.replace("menu_", "") === singleCurrentRoleMenuModulePermissions.menuId.toString()) { // 判断，如果[单条菜单-模块-权限数据源]中，[菜单编号]与[单条当前系统角色-菜单-模块-权限数据传输数据源]中的[菜单编号]相吻合，则进行树形组件选项勾选的下一步
                                    let singleMenuModulePermissionChildren = singleMenuModulePermission.children;                           // 获取[单条菜单-模块-权限数据源]中的children部分，这里是具体的模块部分。形似：[{title: "列表", id: "module_1", children: Array(4)},{title: "b", id: "module_2", children: Array(4)}]
                                    for (let k = 0; k < singleMenuModulePermissionChildren.length; k++) {                                   // 接下来层层递进，遍历[单条菜单-模块-权限数据源]
                                        let singleModulePermission = singleMenuModulePermissionChildren[k];                                 // 获取[单条模块-权限数据源]，形似：{title: "列表", id: "module_1", children: Array(4)}
                                        let modulePermission = singleModulePermission.children;                                             // 获取[单条模块-权限数据源]中最核心的权限部分，形似：[{title: "查询", id: "1_select_0"},{title: "修改", id: "1_update_0"}]
                                        if (singleModulePermission.id.replace("module_", "") === singleCurrentRoleMenuModulePermissions.moduleId.toString()) {  // 判断，如果[单条模块-权限数据源]中，[模块编号]与[单条当前系统角色-菜单-模块-权限数据传输数据源]中的[模块编号]相吻合，则进行树形组件选项勾选的下一步
                                            let currentPermissionsArray = singleCurrentRoleMenuModulePermissions.permissions.split(","); // 获取[单条当前系统角色-菜单-模块-权限数据传输数据源]中的[权限集合]部分，并将其打散称为[权限数组]
                                            for (let l = 0; l < currentPermissionsArray.length; l++) {                                      // 对打散的[权限数组]进行遍历，对[单条模块-权限数据源]的权限部分进行勾选操作
                                                switch (currentPermissionsArray[l]) {
                                                    case "select":
                                                        modulePermission[0].checked = true;
                                                        break;
                                                    case "update":
                                                        modulePermission[1].checked = true;
                                                        break;
                                                    case "insert":
                                                        modulePermission[2].checked = true;
                                                        break;
                                                    case "delete":
                                                        modulePermission[3].checked = true;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    });
    layui.use(['tree'], function () {
        tree = layui.tree;
        tree.render({
            id: 'permissionTree',
            elem: assignPermissionsLayerMenuAndModule,
            data: menuModulePermissionData,
            showCheckbox: true
        });
    });
}


/*添加分配权限图层索引*/
let assignPermissionsIndex;

/**
 * 进行权限的分配
 * @param roleId 角色编号
 * @author KevenPotter
 * @date 2021-01-05 21:49:01
 */
function assignPermissions(roleId) {
    let assignPermissionsLayerMenuAndModule = $('#assign_permissions_layer_menu_and_module');
    clearHtml(assignPermissionsLayerMenuAndModule);
    loadMenuAndModulePermission(roleId);
    let assignPermissionsLayer = $('#assign_permissions_layer');
    assignPermissionsIndex = layer.open({
        type: 1,
        title: '分配权限',
        content: assignPermissionsLayer,
        area: ['15%', '40%'],
        move: false,
        resize: true,
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            let requestParams = [];
            let checkData = tree.getChecked('permissionTree');
            for (let i = 0; i < checkData.length; i++) {
                let singleCheckData = checkData[i];
                let singleCheckDataId = singleCheckData.id;
                let singleCheckDataChildren = singleCheckData.children;
                for (let j = 0; j < singleCheckDataChildren.length; j++) {
                    let moduleCheckData = singleCheckDataChildren[j];
                    let requestParam = {roleId: roleId, menuId: null, moduleId: null, permissions: ""};
                    let permissions = []
                    requestParam.menuId = singleCheckDataId.replace("menu_", "");
                    requestParam.moduleId = moduleCheckData.id.replace("module_", "");
                    let permissionCheckData = moduleCheckData.children;
                    for (let k = 0; k < permissionCheckData.length; k++) {
                        permissions.push(permissionCheckData[k].id.replace(requestParam.moduleId + "_", "").replace("_" + requestParam.moduleId, ""));
                        requestParam.permissions = permissions.toLocaleString();
                    }
                    requestParams.push(requestParam)
                }
            }
            console.log(requestParams);
            $.ajax({
                url: studentManagementSystem + "/roleMenuModulePermission/roleMenuModulePermissions",
                type: "POST",
                data: JSON.stringify(requestParams),
                contentType: 'application/json',
                dataType: "JSON",
                success: function (data) {
                    log(data);
                }
            });
        },
        shift: 1
    });
}