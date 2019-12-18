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