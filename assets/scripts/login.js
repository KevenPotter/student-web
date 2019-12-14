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
    layer.msg('注册开始......', {icon: 6, time: 2000});
}
