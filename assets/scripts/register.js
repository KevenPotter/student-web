/**
 * @author KevenPotter
 * @date 2019-12-17 22:42:40
 * @description 此方法旨在对[用户昵称]进行合法性检查
 */
function checkRegisterNickname() {
    var REGEX_NICKNAME = "_";
    var REGEX_MAIL = "@";
    var registerNicknameBorder = $('#register_nickname_border');
    var registerNicknameIcon = $('#register_nickname_icon');
    var registerNickname = $('#register_nickname').val();
    if (isEmpty(registerNickname)) {
        addErrorStyle(registerNicknameBorder, registerNicknameIcon);
        layerMsg('起一个你喜欢的昵称吧......', GREEN_SMILE_MARK, 3000);
    } else if (registerNickname.indexOf(REGEX_NICKNAME) === -1) {
        addErrorStyle(registerNicknameBorder, registerNicknameIcon);
        layerMsg('是不是忘了下划线呢......', GREEN_SMILE_MARK, 3000);
    } else if (registerNickname.indexOf(REGEX_MAIL) > 0) {
        addErrorStyle(registerNicknameBorder, registerNicknameIcon);
        layerMsg('我这里不需要"@"哦......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserNi/" + registerNickname.trim(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.code == REQUEST_PARAMETER_EMPTY || data.code == USER_INFORMATION_EMPTY) {
                    addSuccessStyle(registerNicknameBorder, registerNicknameIcon);
                } else {
                    addErrorStyle(registerNicknameBorder, registerNicknameIcon);
                    layerMsg('此用户昵称已存在，请尝试其他昵称......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-17 22:44:12
 * @description 此方法旨在对[用户邮箱]进行合法性检查
 */
function checkRegisterEmail() {
    var REGEX_EMAIL = /^([a-z0-9A-Z]+[_|-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
    var registerEmailBorder = $('#register_email_border');
    var registerNicknameIcon = $('#register_email_icon');
    var registerEmail = $('#register_email').val();
    if (isEmpty(registerEmail)) {
        addErrorStyle(registerEmailBorder, registerNicknameIcon);
        layerMsg('不要忘了邮箱哦......', GREEN_SMILE_MARK, 3000);
    } else if (!REGEX_EMAIL.test(registerEmail)) {
        addErrorStyle(registerEmailBorder, registerNicknameIcon);
        layerMsg('要填写正确的邮箱形式呢......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserEm/" + registerEmail.trim(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (REQUEST_PARAMETER_EMPTY === data.code || USER_INFORMATION_EMPTY === data.code) {
                    addSuccessStyle(registerEmailBorder, registerNicknameIcon);
                } else {
                    addErrorStyle(registerEmailBorder, registerNicknameIcon);
                    layerMsg('这个用户邮箱被绑定了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-17 22:51:59
 * @description 此方法旨在对[用户密码]进行合法性检查
 */
function checkRegisterMobile() {
    var REGEX_MOBILE = /^((17[0-9])|(14[0-9])|(13[0-9])|(15[^4,\D])|(18[0-9]))\d{8}$/;
    var registerMobileBorder = $('#register_mobile_border');
    var registerMobileIcon = $('#register_mobile_icon');
    var registerMobile = $('#register_mobile').val();
    if (isEmpty(registerMobile)) {
        addErrorStyle(registerMobileBorder, registerMobileIcon);
        layerMsg('不要忘了手机号码哦......', GREEN_SMILE_MARK, 3000);
    } else if (!REGEX_MOBILE.test(registerMobile)) {
        addErrorStyle(registerMobileBorder, registerMobileIcon);
        layerMsg('要填写正确的手机形式呢......', GREEN_SMILE_MARK, 3000);
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserMo/" + registerMobile,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (data.code == REQUEST_PARAMETER_EMPTY || data.code == USER_INFORMATION_EMPTY) {
                    addSuccessStyle(registerMobileBorder, registerMobileIcon);
                } else {
                    addErrorStyle(registerMobileBorder, registerMobileIcon);
                    layerMsg('这个用户手机被绑定了哦，换一个试试......', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-17 22:59:01
 * @description 此方法旨在对[用户密码]进行合法性检查
 */
function checkRegisterPassword() {
    var registerPasswordBorder = $('#register_password_border');
    var registerPasswordIcon = $('#register_password_icon');
    var registerPassword = $('#register_password').val();
    if (isEmpty(registerPassword)) {
        layerMsg('不要忘了密码哦......', GREEN_SMILE_MARK, 3000);
        addErrorStyle(registerPasswordBorder, registerPasswordIcon);
    } else {
        addSuccessStyle(registerPasswordBorder, registerPasswordIcon);
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-17 23:09:44
 * @description 此方法旨在对[用户确认密码]进行合法性检查
 */
function checkRegisterConfirmPassword() {
    var registerConfirmPasswordBorder = $('#register_confirm_password_border');
    var registerConfirmPasswordIcon = $('#register_confirm_password_icon');
    var registerPassword = $('#register_password').val();
    var registerConfirmPassword = $('#register_confirm_password').val();
    if (isEmpty(registerConfirmPassword) || registerPassword.length != registerConfirmPassword.length || registerPassword != registerConfirmPassword) {
        layerMsg('是在想别的事情吗，有错误哦......', GREEN_SMILE_MARK, 3000);
        addErrorStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    } else {
        addSuccessStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-19 09:11:09
 * @description 页面注册方法
 */
function register() {
    var nicknameStatus = $('#register_nickname_border').hasClass("has-success");
    var emailStatus = $('#register_email_border').hasClass("has-success");
    var mobileStatus = $('#register_mobile_border').hasClass("has-success");
    var passwordStatus = $('#register_password_border').hasClass("has-success");
    var confirmPasswordStatus = $('#register_confirm_password_border').hasClass("has-success");
    if (nicknameStatus === true && emailStatus === true && mobileStatus === true && passwordStatus === true && confirmPasswordStatus === true) {
        var systemUserDto = {
            "userMobile": $('#register_mobile').val(),
            "userEmail": $('#register_email').val(),
            "userNickName": $('#register_nickname').val(),
            "userPassword": $('#register_confirm_password').val()
        };
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUser",
            type: "POST",
            data: JSON.stringify(systemUserDto),
            contentType: 'application/json',
            dataType: "JSON",
            success: function (data) {
                if (data.code == SUCCESS_MARK) {
                    $('#register_nickname').val('');
                    $('#register_email').val('');
                    $('#register_mobile').val('');
                    $('#register_password').val('');
                    $('#register_confirm_password').val('');
                    window.location.href = "./register-success.html";
                } else {
                    layerMsg('输入的信息可能有误哦~再确认一下下哦~', GREEN_SMILE_MARK, 3000);
                }
            }
        });
    } else {
        layerMsg('有错误哦......', RED_CRYING_MARK, 3000);
    }
}
