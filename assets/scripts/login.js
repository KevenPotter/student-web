/**
 * @author KevenPotter
 * @date 2019-12-13 11:41:23
 * @description
 */
function login() {
    var username = $('#username').val();
    var password = $('#password').val();
    console.log(username);
    console.log(password);
    var requestParam = {
        "userId": null,
        "userName": username,
        "userPassword": password
    };
    $.ajax({
        url: studentManagementSystem + "/login",
        type: "POST",
        data: "username=" + username + "&password=" + password,
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                window.location.href = studentManagementSystem + "/index.html";
            } else if (USER_INFORMATION_EMPTY === data.code) {
                layerMsg('用户名或密码错误', GREEN_SMILE_MARK, 1500);
            }
        }
    });
}