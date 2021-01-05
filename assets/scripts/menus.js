var MENU_NAME = null;
var MENUS_STATUS = null;
var pageIndex = 1; // 默认当前页码
var pageLoadCounts = 0;

/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    pageLoadCounts = 0;
    loadMenusList(MENU_NAME, MENUS_STATUS, pageIndex);
    ++pageLoadCounts;
    initialLnrIcon();
});

/**
 * 加载菜单列表
 * @param menuName 菜单名称
 * @param menuStatus 菜单状态
 * @param pageIndex 当前页码
 * @author KevenPotter
 * @date 2020-12-28 16:40:45
 */
function loadMenusList(menuName, menuStatus, pageIndex) {
    var menusTableTBody = $('#menusTableTBody');
    var menusPage = $('#menusPage');
    clearHtml(menusTableTBody);
    clearHtml(menusPage);
    var requestParam = {"menuName": menuName, "menuStatus": menuStatus, "pageNo": pageIndex, "pageSize": 10};
    $.ajax({
        url: urlFiltering(studentManagementSystem + "/menu/menus"),
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (TARGET_INFORMATION_EMPTY === data.code) {
                layer.msg('未搜索出指定信息......', {icon: 6, time: 2000});
                return;
            }
            var menusArray = data.data.list;
            for (var menuIndex = 0, length = menusArray.length; menuIndex < length; menuIndex++) {
                var item = menusArray[menuIndex];
                var menuId = item.id;                       // 菜单编号
                var menuName = item.menuName;               // 菜单名称
                var menuLinkUrl = item.menuLinkUrl;         // 菜单连接
                var menuIcon = item.menuIcon;               // 菜单图标
                var menuSortNumber = item.menuSortNumber;   // 菜单排序编号
                var menuStatus = item.menuStatus;           // 菜单状态(0.不启用 1.启用)
                menusTableTBody.append('<tr>' +
                    '<td id="menuId_' + menuId + '">' + menuId + '</td>' +
                    '<td>' + menuName + '</td>' +
                    '<td>' + menuLinkUrl + '</td>' +
                    '<td class="tinyHand"> <i class="' + menuIcon + '"></i></td>' +
                    '<td>' + menuSortNumber + '</td>' +
                    '<td><input type="checkbox" value="' + menuStatus + '" name="menu_status_' + menuIndex + '"></td>' +
                    '<td><span title="编辑" class="lnr lnr-pencil tinyHand"></span></td>' +
                    '</tr>');
                var menuStatusCheckBoxVal = $("[name='menu_status_" + menuIndex + "']").val();
                if ("1" === menuStatusCheckBoxVal) bootstrapSwitchOnInit(menuId, menuIndex, true);
                if ("0" === menuStatusCheckBoxVal) bootstrapSwitchOnInit(menuId, menuIndex, false);
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
                    scanBasicData(MENU_NAME, MENUS_STATUS, page);
                    loadMenusList(MENU_NAME, MENUS_STATUS, page);
                }
            });
        }
    });
}

/**
 * bootstrap-switch开关初始化
 * @param menuId 菜单编号
 * @param menuIndex 菜单角标
 * @param menuStatus 菜单状态
 * @author KevenPotter
 * @date 2020-12-29 12:21:02
 */
function bootstrapSwitchOnInit(menuId, menuIndex, menuStatus) {
    $("[name='menu_status_" + menuIndex + "']").bootstrapSwitch({
        state: menuStatus,
        onText: "ON",
        offText: "OFF",
        onColor: "success",
        offColor: "danger",
        size: "normal",
        onSwitchChange: function (event, state) {
            var menuStatus;
            if (true === state) menuStatus = 1; else menuStatus = 0;
            var requestParam = {"id": $('#menuId_' + menuId).text(), "menuStatus": menuStatus};
            $.ajax({
                url: studentManagementSystem + "/menu/menus",
                type: "PUT",
                dataType: "JSON",
                data: JSON.stringify(requestParam),
                contentType: "application/json",
                success: function (data) {
                    if (SUCCESS_MARK === data.code) {
                        layerMsg("更新菜单状态成功", GREEN_CHECK_MARK, 1500);
                    } else if (TARGET_INFORMATION_EMPTY === data.code) {
                        layerMsg(data.msg, RED_ERROR_MARK, 1500);
                    }
                }
            });
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-12-29 09:53:11
 * @description 该方法旨在扫描当前页面的基础数据,并将所扫描到的基础数据赋值于全局变量共页面使用
 */
function scanBasicData() {
    var menuNameVal = $('#menuName').val();
    var menuStatusVal = $('#menuStatusSelect option:selected').val();
    MENU_NAME = menuNameVal ? menuNameVal : null;
    MENUS_STATUS = menuStatusVal ? menuStatusVal : null;
    if ("null" === MENU_NAME || undefined === MENU_NAME) MENU_NAME = null;
    if ("null" === MENUS_STATUS || undefined === MENUS_STATUS) MENUS_STATUS = null;
}

/**
 * 搜索内容
 * @author KevenPotter
 * @date 2020-12-28 16:42:09
 */
function search() {
    scanBasicData();
    loadMenusList(MENU_NAME, MENUS_STATUS, pageIndex);
}

/*添加系统菜单图层索引*/
var menuLayerIndex;

/**
 * 加载添加菜单图层
 * @author KevenPotter
 * @date 2020-12-29 16:10:15
 * @description
 */
function openAddMenuLayer() {
    var majorLayer = $('#menuLayer');
    var menuLayerMenuName = $('#menuLayer_menuName');
    var menuLayerMenuLinkUrl = $('#menuLayer_menuLinkUrl');
    var menuLayerMenuIcon = $('#menuLayer_menuIcon');
    var menuLayerMenuSortNumber = $('#menuLayer_menuSortNumber');
    var menuLayerMenuStatus = $('#menuLayer_menuStatus');
    clearValue(menuLayerMenuName);
    clearValue(menuLayerMenuLinkUrl);
    clearValue(menuLayerMenuIcon);
    clearHtml(menuLayerMenuSortNumber);
    clearHtml(menuLayerMenuStatus);
    menuLayerIndex = layer.open({
        type: 1,
        title: '添加菜单',
        content: majorLayer,
        area: ['35%', '50%'],
        move: false,
        resize: false
    });
    menuLayerMenuSortNumber.append('<option id="menu_layer_menu_sort_number_option" value="0">请选择菜单排序序号</option>');
    var menuLayerMenuSortNumberOption = $('#menu_layer_menu_sort_number_option');
    for (var majorNumberOptionIndex = 99; majorNumberOptionIndex >= 1; majorNumberOptionIndex--) {
        menuLayerMenuSortNumberOption.after('<option value="' + majorNumberOptionIndex + '">' + majorNumberOptionIndex + '</option>');
    }
    menuLayerMenuStatus.append('<option value="-1">请选择菜单状态</option>').append('<option value="1">开启</option>').append('<option value="0">关闭</option>');
}

/*添加统菜单图层-菜单图标-菜单图标详情索引*/
var menuLayerMenuIconMenuIconsLayerIndex;

/**
 * 打开系统菜单图层-菜单图标-菜单图标详情图层
 * @author KevenPotter
 * @date 2020-12-30 09:07:51
 */
function openMenuLayerMenuIconMenuIconsLayer() {
    menuLayerMenuIconMenuIconsLayerIndex = layer.open({
        type: 1,
        title: '选择图标',
        content: $('#menuLayer_menuIcon_menuIcons'),
        area: ['80%', '70%'],
        move: false,
        resize: false
    });
}

/**
 * 系统菜单图标选择
 * @param id 系统菜单图标编号
 * @author KevenPotter
 * @date 2020-12-30 09:08:11
 */
function chooseIcon(id) {
    $('#menuLayer_menuIcon').val($('#' + id).text());
    layer.close(menuLayerMenuIconMenuIconsLayerIndex);
    checkSystemMenuMenuIcon();
}

/**
 * 此方法旨在对[菜单名称]进行合法性检查
 * @author KevenPotter
 * @date 2020-12-30 13:58:12
 */
function checkSystemMenuMenuName() {
    var menuLayerMenuNameBorder = $('#menuLayer_menuName_border');
    var menuLayerMenuNameIcon = $('#menuLayer_menuName_icon');
    var menuLayerMenuName = $('#menuLayer_menuName').val();
    if (isEmpty(menuLayerMenuName)) {
        addErrorStyle(menuLayerMenuNameBorder, menuLayerMenuNameIcon);
        layerMsg('不要忘了菜单名称哦......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: urlFiltering(studentManagementSystem + "/menu/menuNa/" + menuLayerMenuName.trim()),
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || TARGET_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(menuLayerMenuNameBorder, menuLayerMenuNameIcon);
                } else {
                    addErrorStyle(menuLayerMenuNameBorder, menuLayerMenuNameIcon);
                    layerMsg('这个系统菜单名称已经存在了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * 此方法旨在对[菜单连接]进行合法性检查
 * @author KevenPotter
 * @date 2021-01-01 18:54:03
 */
function checkSystemMenuMenuLink() {
    var menuLayerMenuLinkUrlBorder = $('#menuLayer_menuLinkUrl_border');
    var menuLayerMenuLinkUrlIcon = $('#menuLayer_menuLinkUrl_icon');
    var menuLayerMenuLinkUrl = $('#menuLayer_menuLinkUrl').val();
    if (isEmpty(menuLayerMenuLinkUrl)) {
        addErrorStyle(menuLayerMenuLinkUrlBorder, menuLayerMenuLinkUrlIcon);
        layerMsg('不要忘了菜单连接哦......', GREEN_SMILE_MARK, 3000);
    } else {
        var requestParam = {"menuLinkUrl": menuLayerMenuLinkUrl.trim()};
        $.ajax({
            url: urlFiltering(studentManagementSystem + "/menu/menuLi"),
            type: "POST",
            dataType: "JSON",
            data: requestParam,
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || TARGET_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(menuLayerMenuLinkUrlBorder, menuLayerMenuLinkUrlIcon);
                } else {
                    addErrorStyle(menuLayerMenuLinkUrlBorder, menuLayerMenuLinkUrlIcon);
                    layerMsg('这个系统菜单连接已经存在了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * 此方法旨在对[菜单图标]进行合法性检查
 * @author KevenPotter
 * @date 2021-01-01 19:16:19
 */
function checkSystemMenuMenuIcon() {
    var menuLayerMenuIconBorder = $('#menuLayer_menuIcon_border');
    var menuLayerMenuIconIcon = $('#menuLayer_menuIcon_icon');
    var menuLayerMenuIcon = $('#menuLayer_menuIcon').val();
    if (isEmpty(menuLayerMenuIcon)) {
        addErrorStyle(menuLayerMenuIconBorder, menuLayerMenuIconIcon);
        layerMsg('不要忘了菜单图标哦......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: urlFiltering(studentManagementSystem + "/menu/menuIc/" + menuLayerMenuIcon.trim()),
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || TARGET_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(menuLayerMenuIconBorder, menuLayerMenuIconIcon);
                } else {
                    addErrorStyle(menuLayerMenuIconBorder, menuLayerMenuIconIcon);
                    layerMsg('这个系统菜单图标已经存在了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * 添加菜单
 * @author KevenPotter
 * @date 2021-01-01 19:54:23
 */
function insertMenu() {
    var menuLayerMenuNameVal = $('#menuLayer_menuName').val();
    var menuLayerMenuLinkUrlVal = $('#menuLayer_menuLinkUrl').val();
    var menuLayerMenuIconVal = $('#menuLayer_menuIcon').val();
    var menuLayerMenuSortNumberVal = $('#menuLayer_menuSortNumber option:selected').val();
    var menuLayerMenuStatusVal = $('#menuLayer_menuStatus option:selected').val();
    if (isEmpty(menuLayerMenuNameVal)) {
        layerMsg('不要忘了菜单名称哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(menuLayerMenuLinkUrlVal)) {
        layerMsg('不要忘了菜单链接哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (isEmpty(menuLayerMenuIconVal)) {
        layerMsg('不要忘了菜单图标哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (0 === Number(menuLayerMenuSortNumberVal)) {
        layerMsg('不要忘了给菜单排序哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    if (-1 === Number(menuLayerMenuStatusVal)) {
        layerMsg('不要忘了给菜单设定状态哦......', GREEN_SMILE_MARK, 1500);
        return;
    }
    var requestParam = {"menuName": menuLayerMenuNameVal, "menuLinkUrl": menuLayerMenuLinkUrlVal, "menuIcon": menuLayerMenuIconVal, "menuSortNumber": menuLayerMenuSortNumberVal, "menuStatus": menuLayerMenuStatusVal};
    $.ajax({
        url: studentManagementSystem + "/menu/menus",
        type: "POST",
        dataType: "JSON",
        data: JSON.stringify(requestParam),
        contentType: "application/json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg(data.data.menuName + "添加成功", GREEN_CHECK_MARK, 1500);
                layer.close(menuLayerIndex);
                search();
            } else if (DUPLICATE_TARGET_INFORMATION === data.code) {
                layerMsg(data.msg, RED_ERROR_MARK, 1500);
            }
        }
    });
}

/**
 * 初始化linearicons图标
 * @author KevenPotter
 * @date 2021-01-04 15:56:19
 */
function initialLnrIcon() {
    $.ajax({
        url: "../assets/vendor/linearicons/style.css",
        dataType: "text",
        success: function (css) {
            var cssArray = css.match(/lnr-(\S*):/g);
            var lnrIconUl = $('#lnrIcon');
            for (var index = 0; index < cssArray.length; index++) {
                var lnrIcon = cssArray[index].substring(0, cssArray[index].indexOf(":"));
                var lnrIconForSpanId = lnrIcon.replace("-", "_");
                lnrIconUl.append(
                    '<li class="col-md-2 col-sm-4 col-xs-6 tinyHand" onclick="chooseIcon(\'' + lnrIconForSpanId + '\')">' +
                    '<span class="lnr ' + lnrIcon + '"></span> <span id="' + lnrIconForSpanId + '" class="cssclass">lnr ' + lnrIcon + '</span>' +
                    '</li>'
                );
            }
        }
    });
}