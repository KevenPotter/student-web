/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    log(getQueryVariable("username"))
    let systemUserId = getQueryVariable("username");
    loadMenus(systemUserId);
});

/**
 * 加载菜单列表
 * @param systemUserId 系统用户编号
 * @author KevenPotter
 * @date 2021-01-15 16:39:09
 */
function loadMenus(systemUserId) {
    $.ajax({
        url: studentManagementSystem + "/index/permissions/" + systemUserId,
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                let menus = $('#menus');
                let menuArray = data.data;
                for (let index = 0; index < menuArray.length; index++) {
                    let menu = menuArray[index];
                    let menuLinkUrl = menu.menuLinkUrl;
                    let htmlId = menuLinkUrl.substring(menuLinkUrl.indexOf("/") + 1, menuLinkUrl.length).replace(".", "_");
                    if (0 === index) menus.append('<li class="tinyHand" onclick="changeHtml(\'' + menuLinkUrl + '\',\'' + htmlId + '\')"><a id="' + htmlId + '" class="active"><i class="' + menu.menuIcon + '"></i> <span>' + menu.menuName + '</span></a></li>');
                    else menus.append('<li class="tinyHand" onclick="changeHtml(\'' + menuLinkUrl + '\',\'' + htmlId + '\')"><a id="' + htmlId + '"><i class="' + menu.menuIcon + '"></i> <span>' + menu.menuName + '</span></a></li>');
                    initialHighlyExpanded();
                }
            }
        }
    });
}

/**
 * 更改主显示区的html页面
 * @param htmlPath 页面路径
 * @param htmlId 页面编号
 * @date 2020-12-24 14:34:56
 * @author KevenPotter
 */
function changeHtml(htmlPath, htmlId) {
    let mainContent = $('#main_content');
    clearHtml(mainContent);
    mainContent.append('<iframe id="main_content" class="embed-responsive-item" src="' + htmlPath + '" width="100%" height="100%" style="border: 0;"></iframe>');
    $('.active').removeClass('active');
    $('#' + htmlId).addClass('active');
    highlyExpanded();
}

/**
 * 首页加载时，将iframe初始化高度展开
 * @date 2020-12-28 13:41:09
 * @author KevenPotter
 */
function initialHighlyExpanded() {
    window.onload = (function () {
        highlyExpanded();
    });
}

/**
 * 将iframe高度展开
 * @date 2020-12-28 13:37:12
 * @author KevenPotter
 */
function highlyExpanded() {
    $("iframe").attr("height", parseInt($('#main_content').css('min-height')) * 0.98);
}

/**
 * 退出登录
 * @author KevenPotter
 * @date 2020-12-23 14:16:52
 */
function logout() {
    $.ajax({
        url: studentManagementSystem + "/logout",
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                layerMsg('退出成功', GREEN_SMILE_MARK, 1500);
                window.location.href = studentManagementSystem + "/login.html";
            }
        }
    });
}