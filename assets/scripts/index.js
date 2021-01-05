/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    // $('#menus')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/main.html\',\'indexHtml\')"><a id="indexHtml" class="active"><i class="lnr lnr-home"></i> <span>首页</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/students.html\',\'studentHtml\')"><a id="studentHtml" ><i class="lnr lnr-users"></i> <span>学生信息</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/teachers.html\',\'teacherHtml\')"><a id="teacherHtml" ><i class="lnr lnr-graduation-hat"></i> <span>教师信息</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/department_major.html\',\'department_majorHtml\')"><a id="department_majorHtml" ><i class="lnr lnr-inbox"></i> <span>系部专业</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/menus.html\',\'menusHtml\')"><a id="menusHtml" ><i class="lnr lnr-menu"></i> <span>菜单信息</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/modules.html\',\'modulesHtml\')"><a id="modulesHtml" ><i class="lnr lnr-layers"></i> <span>模块信息</span></a></li>')
    //     .append('<li class="tinyHand" onclick="changeHtml(\'html/roles.html\',\'rolesHtml\')"><a id="rolesHtml" ><i class="lnr lnr-user"></i> <span>角色信息</span></a></li>');
    loadMenus();
});

function loadMenus() {
    $.ajax({
        url: studentManagementSystem + "/index/all/menus",
        type: "GET",
        dataType: "json",
        async: false,
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                var menus = $('#menus');
                var menuArray = data.data;
                for (var index = 0; index < menuArray.length; index++) {
                    var menu = menuArray[index];
                    var menuLinkUrl = menu.menuLinkUrl;
                    var htmlId = menuLinkUrl.substring(menuLinkUrl.indexOf("/") + 1, menuLinkUrl.length).replace(".", "_");
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
    var mainContent = $('#main_content');
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