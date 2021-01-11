let USER_ID = null;
let USER_NICKNAME = null;
let ROLES_STATUS = null;
let pageIndex = 1; // 默认当前页码
let pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadSystemUsersList(USER_ID, USER_NICKNAME, ROLES_STATUS, pageIndex);
    ++pageLoadCounts;
});

/**
 * 加载系统用户列表
 * @param userId 用户编号
 * @param userNickname 用户昵称
 * @param userStatus 用户状态
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2021-01-11 11:00:12
 */
function loadSystemUsersList(userId, userNickname, userStatus, pageIndex) {
    let usersTableTBody = $('#usersTableTBody');
    let usersPage = $('#usersPage');
    clearHtml(usersTableTBody);
    clearHtml(usersPage);
    let requestParam = {"userId": userId, "userNickName": userNickname, "userStatus": userStatus, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/systemUser/systemUsers"),
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            let usersArray = data.data.list;
            for (let userIndex = 0, length = usersArray.length; userIndex < length; userIndex++) {
                let item = usersArray[userIndex];
                let userNo = item.id;                           // 主键编号
                let userId = item.userId;                       // 用户编号
                let userNickname = item.userNickName;           // 角色名称
                let userMobile = item.userMobile;               // 角色手机
                let userEmail = item.userEmail;                 // 角色邮箱
                let userStatus = item.userStatus;               // 角色状态(0.不启用 1.启用)
                usersTableTBody.append('<tr>' +
                    '<td id="userNo_' + userNo + '">' + userNo + '</td>' +
                    '<td>' + userId + '</td>' +
                    '<td>' + userNickname + '</td>' +
                    '<td>' + userMobile + '</td>' +
                    '<td>' + userEmail + '</td>' +
                    '<td><input type="checkbox" value="' + userStatus + '" name="user_status_' + userIndex + '"></td>' +
                    '<td><span title="编辑" class="lnr lnr-pencil tinyHand span2" style="padding-right: 5px;"></span><span title="分配角色" class="lnr lnr-pointer-left tinyHand" style="padding-left: 5px;" onclick="assignRole(\'' + userId + '\')"></span></td>' +
                    '</tr>');
                let userStatusCheckBoxVal = $("[name='user_status_" + userIndex + "']").val();
                if ("1" === userStatusCheckBoxVal) bootstrapSwitchOnInit(userNo, userIndex, true);
                if ("0" === userStatusCheckBoxVal) bootstrapSwitchOnInit(userNo, userIndex, false);
            }
            let pageNum = data.data.pageNum;
            let pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            usersPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    scanBasicData(USER_ID, USER_NICKNAME, ROLES_STATUS, page);
                    loadSystemUsersList(USER_ID, USER_NICKNAME, ROLES_STATUS, page);
                }
            });
        }
    });
}

/**
 * bootstrap-switch开关初始化
 * @param userId 用户编号
 * @param userIndex 用户角标
 * @param userStatus 用户状态
 * @author KevenPotter
 * @date 2021-01-11 11:08:11
 */
function bootstrapSwitchOnInit(userId, userIndex, userStatus) {
    $("[name='user_status_" + userIndex + "']").bootstrapSwitch({
        state: userStatus,
        onText: "ON",
        offText: "OFF",
        onColor: "success",
        offColor: "danger",
        size: "normal",
        onSwitchChange: function (event, state) {
            let userStatus;
            if (true === state) userStatus = 1; else userStatus = 0;
            let requestParam = {"id": $('#userNo_' + userId).text(), "userStatus": userStatus};
            $.ajax({
                url: studentManagementSystem + "/systemUser/systemUsers",
                type: "PUT",
                dataType: "JSON",
                data: JSON.stringify(requestParam),
                contentType: "application/json",
                success: function (data) {
                    if (SUCCESS_MARK === data.code) {
                        layerMsg("更新系统用户状态成功", GREEN_CHECK_MARK, 1500);
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
    let userIdVal = $('#user_id').val();
    let userNicknameVal = $('#user_nickname').val();
    let userStatusSelectVal = $('#userStatusSelect option:selected').val();
    USER_ID = userIdVal ? userIdVal : null;
    USER_NICKNAME = userNicknameVal ? userNicknameVal : null;
    ROLES_STATUS = userStatusSelectVal ? userStatusSelectVal : null;
    if ("null" === USER_ID || undefined === USER_ID) USER_ID = null;
    if ("null" === USER_NICKNAME || undefined === USER_NICKNAME) USER_NICKNAME = null;
    if ("null" === ROLES_STATUS || undefined === ROLES_STATUS) ROLES_STATUS = null;
}

/**
 * 搜索内容
 * @author KevenPotter
 * @date 2021-01-11 14:17:02
 */
function search() {
    scanBasicData();
    loadSystemUsersList(USER_ID, USER_NICKNAME, ROLES_STATUS, pageIndex);
}

let tree;

/**
 * 渲染分配角色的树形组件
 * @param userId 用户编号
 * @author KevenPotter
 * @date 2021-01-11 14:27:01
 */
function loadUserRole(userId) {
    let assignRolesLayerRole = $('#assign_roles_layer_role');
    var userRoleData = [];
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/role/all/roles"),
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            let roleArray = data.data;
            $.ajax({
                url: urlFiltering(studentManagementSystem + "/userRole/userRole/" + userId),
                type: "GET",
                dataType: "json",
                async: false,
                success: function (data) {
                    let currentUserRole = data.data;
                    for (let i = 0; i < roleArray.length; i++) {
                        userRoleData.push({title: roleArray[i].roleName, id: "role_" + (i + 1)});
                    }
                    if (null !== currentUserRole) {
                        for (let i = 0; i < userRoleData.length; i++) {
                            if (userRoleData[i].id.replace("role_", '') === currentUserRole.systemRoleId.toString()) userRoleData[i].checked = true;
                        }
                    }
                }
            });
        }
    });
    layui.use(['tree'], function () {
        tree = layui.tree;
        tree.render({
            id: 'roleTree',
            elem: assignRolesLayerRole,
            data: userRoleData,
            showCheckbox: true
        });
    });
}

/*添加分配权限图层索引*/
let assignRolesIndex;

/**
 * 进行角色的分配
 * @param userId 用户编号
 * @author KevenPotter
 * @date 2021-01-11 14:25:36
 */
function assignRole(userId) {
    let assignRolesLayerRole = $('#assign_roles_layer_role');
    clearHtml(assignRolesLayerRole);
    loadUserRole(userId);
    let assignRolesLayer = $('#assign_roles_layer');
    assignRolesIndex = layer.open({
        type: 1,
        title: '分配角色',
        content: assignRolesLayer,
        area: ['15%', '40%'],
        move: false,
        resize: true,
        shade: 0,
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            let checkData = tree.getChecked('roleTree');
            if (checkData.length > 1) {
                layerMsg('目前用户分配角色数量只能为一个哦~', GREEN_SMILE_MARK, 3000);
                return;
            }
            let requestParam = {systemUserId: userId, systemRoleId: checkData[0].id.replace("role_", "")};
            $.ajax({
                url: studentManagementSystem + "/userRole/userRoles",
                type: "POST",
                data: JSON.stringify(requestParam),
                contentType: 'application/json',
                dataType: "JSON",
                success: function (data) {
                    if (SUCCESS_MARK === data.code) {
                        layerMsg("分配角色成功", GREEN_CHECK_MARK, 1500);
                        layer.close(assignRolesIndex);
                    } else {
                        layerMsg("分配角色失败", RED_CRYING_MARK, 1500);
                    }
                }
            });
        },
        shift: 1
    });
}