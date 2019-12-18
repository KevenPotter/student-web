/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    loadDepartmentsList();
    loadRegisterMajorsList();
});

/**
 * @author KevenPotter
 * @date 2019-12-09 10:46:18
 * @description 加载专业列表
 */
function loadRegisterMajorsList() {
    var majorsSelect = $('#majorsSelect');
    clearHtml(majorsSelect);
    var options = $('#departmentsSelect option:selected');
    var departmentId = options.val();
    if (undefined == departmentId || null == departmentId || "null" == departmentId) {
        $("#majorsSelect").attr("disabled", true);
        majorsSelect.append('<option value="' + null + '">请选择专业</option>');
        bootstrapSelectFlush(majorsSelect);
        return;
    } else {
        $("#majorsSelect").attr("disabled", false);
    }
    $.ajax({
        url: studentManagementSystem + "/major/majors/" + departmentId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var majorsArray = data.data;
            majorsSelect.append('<option value="' + null + '">请选择专业</option>');
            for (var majorIndex = 0, length = majorsArray.length; majorIndex < length; majorIndex++) {
                var item = majorsArray[majorIndex];
                majorsSelect.append('<option id="' + majorIndex + '" value="' + item.majorId + '">' + item.majorName + '</option>');
                bootstrapSelectFlush(majorsSelect);
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2019-12-17 17:16:39
 * @description 此方法旨在对[用户名称]进行合法性检查
 */
function checkRegisterUsername() {
    var registerUsernameBorder = $('#register_username_border');
    var registerUsername = $('#register_username').val();
    if (isEmpty(registerUsername)) {
        layerMsg('不要忘了名字哦......', GREEN_SMILE_MARK, 3000);
        addErrorStyle(registerUsernameBorder, null);
    } else {
        addSuccessStyle(registerUsernameBorder, null);
    }
}

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
        layer.msg('起一个你喜欢的昵称吧......', {icon: 6, time: 3000});
    } else if (registerNickname.indexOf(REGEX_NICKNAME) === -1) {
        addErrorStyle(registerNicknameBorder, registerNicknameIcon);
        layer.msg('是不是忘了下划线呢......', {icon: 6, time: 3000});
    } else if (registerNickname.indexOf(REGEX_MAIL) > 0) {
        addErrorStyle(registerNicknameBorder, registerNicknameIcon);
        layer.msg('我这里不需要"@"哦......', {icon: 6, time: 3000});
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserNi/" + registerNickname.trim(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                debugger;
                if (data.code == REQUEST_PARAMETER_EMPTY || data.code == USER_INFORMATION_EMPTY) {
                    addSuccessStyle(registerNicknameBorder, registerNicknameIcon);
                } else {
                    addErrorStyle(registerNicknameBorder, registerNicknameIcon);
                    layer.msg('此用户昵称已存在，请尝试其他昵称......', {icon: 6, time: 3000});
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
        layer.msg('不要忘了邮箱哦......', {icon: 6, time: 3000});
    } else if (!REGEX_EMAIL.test(registerEmail)) {
        addErrorStyle(registerEmailBorder, registerNicknameIcon);
        layer.msg('要填写正确的邮箱形式呢......', {icon: 6, time: 3000});
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserEm/" + registerEmail.trim(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                debugger;
                if (data.code == REQUEST_PARAMETER_EMPTY || data.code == USER_INFORMATION_EMPTY) {
                    addSuccessStyle(registerEmailBorder, registerNicknameIcon);
                } else {
                    addErrorStyle(registerEmailBorder, registerNicknameIcon);
                    layer.msg('这个用户邮箱被绑定了哦，换一个试试......', {icon: 6, time: 3000});
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
        layer.msg('不要忘了手机号码哦......', {icon: 6, time: 3000});
    } else if (!REGEX_MOBILE.test(registerMobile)) {
        layer.msg('要填写正确的手机形式呢......', {icon: 6, time: 3000});
    } else {
        $.ajax({
            url: studentManagementSystem + "/systemUser/systemUserMo/" + registerMobile,
            type: "GET",
            dataType: "json",
            success: function (data) {
                debugger;
                if (data.code == REQUEST_PARAMETER_EMPTY || data.code == USER_INFORMATION_EMPTY) {
                    addSuccessStyle(registerMobileBorder, registerMobileIcon);
                } else {
                    addErrorStyle(registerMobileBorder, registerMobileIcon);
                    layer.msg('这个用户手机被绑定了哦，换一个试试......', {icon: 6, time: 3000});
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
        layer.msg('不要忘了密码哦......', {icon: 6, time: 3000});
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
        layer.msg('是在想别的事情吗，有错误哦......', {icon: GREEN_SMILE, time: 3000});
        addErrorStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    } else {
        addSuccessStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    }
}

/**
 * @param divElement div边界框
 * @param spanElement span图标
 * @author KevenPotter
 * @date 2019-12-17 22:22:27
 * @description 此方法旨在[div边界框]和[span图标]进行成功样式的添加
 */
function addSuccessStyle(divElement, spanElement) {
    if (!isEmpty(divElement)) {
        divElement.removeClass("has-error has-feedback").addClass("has-success has-feedback");
    }
    if (!isEmpty(spanElement)) {
        spanElement.removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
    }
}

/**
 * @param divElement div边界框
 * @param spanElement span图标
 * * @author KevenPotter
 * @date 2019-12-17 22:23:11
 * @description 此方法旨在[div边界框]和[span图标]进行失败样式的添加
 */
function addErrorStyle(divElement, spanElement) {
    if (!isEmpty(divElement)) {
        divElement.removeClass("has-success has-feedback").addClass("has-error has-feedback");
    }
    if (!isEmpty(spanElement)) {
        spanElement.removeClass("glyphicon glyphicon-ok form-control-feedback").addClass("glyphicon glyphicon-remove form-control-feedback");
    }
}
