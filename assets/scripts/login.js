/**
 * @author KevenPotter
 * @date 2019-12-13 11:41:23
 * @description
 */
function login() {
    var userName = $('#userName').val();
    var password = $('#password').val();
    console.log(userName);
    console.log(password);
    var requestParam = {
        "userId": null,
        "userName": userName,
        "userPassword": password
    };
    $.ajax({
        url: studentManagementSystem + "/login",
        type: "POST",
        data: "username=" + userName + "&password=" + password,
        success: function (data) {
            console.log(data);
        }
    });
}

/**
 * @author KevenPotter
 * @date 2019-12-15 00:06:16
 * @description 注册页面
 */
function register() {
    layer.open(
        {
            type: 1,
            title: '注册',
            maxmin: false,
            shadeClose: false, //点击遮罩关闭层
            area: ['800px', '600px'],
            btn: ['关闭'],
            content: $('#register')
        }
    );
}

/**
 * @author KevenPotter
 * @date 2019-12-17 17:16:39
 * @description 此方法旨在对参数进行非空验证
 */
function checkRegisterUsername() {
    debugger;
    var registerUsername = $('#register_username').val();
    if (isEmpty(registerUsername)) {
        $('#register_username_border').removeClass("has-success has-feedback").addClass("has-error has-feedback");
        $('#register_username_icon').removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback")
    } else {
        $('#register_username_border').removeClass("has-error has-feedback").addClass("has-success has-feedback");
        $('#register_username_icon').removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback")
    }
}

/**
 * @param parameter
 * @returns boolean
 * @author KevenPotter
 * @date 2019-12-17 16:50:37
 * @description 此方法旨在对参数进行非空验证
 */
function isEmpty(parameter) {
    if ("" == parameter || null == parameter || undefined == parameter) return true;
    return false;
}
