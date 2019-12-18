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
    debugger;
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
    var register_nickname_border = $('#register_nickname_border');
    var register_nickname_icon = $('#register_nickname_icon');
    var registerNickname = $('#register_nickname').val();
    if (isEmpty(registerNickname) || registerNickname.indexOf(REGEX_NICKNAME) == -1) {
        addErrorStyle(register_nickname_border, register_nickname_icon);
    } else {
        addSuccessStyle(register_nickname_border, register_nickname_icon);
    }
}

/**
 * @author KevenPotter
 * @date 2019-12-17 22:44:12
 * @description 此方法旨在对[用户邮箱]进行合法性检查
 */
function checkRegisterEmail() {
    var REGEX_EMAIL = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
    var registerEmailBorder = $('#register_email_border');
    var registerNicknameIcon = $('#register_email_icon');
    var registerEmail = $('#register_email').val();
    if (isEmpty(registerEmail) || !REGEX_EMAIL.test(registerEmail)) {
        addErrorStyle(registerEmailBorder, registerNicknameIcon);
    } else {
        addSuccessStyle(registerEmailBorder, registerNicknameIcon);
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
    if (isEmpty(registerMobile) || !REGEX_MOBILE.test(registerMobile)) {
        addErrorStyle(registerMobileBorder, registerMobileIcon);
    } else {
        addSuccessStyle(registerMobileBorder, registerMobileIcon);
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
        addErrorStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    } else {
        addSuccessStyle(registerConfirmPasswordBorder, registerConfirmPasswordIcon);
    }
}

/**
 * @param parameter 验证参数
 * @returns boolean
 * @author KevenPotter
 * @date 2019-12-17 16:50:37
 * @description 此方法旨在对参数进行非空验证
 */
function isEmpty(parameter) {
    if ("" == parameter || null == parameter || undefined == parameter) return true;
    return false;
}

/**
 * @param divElement div边界框
 * @param spanElement span图标
 * @author KevenPotter
 * @date 2019-12-17 22:22:27
 * @description 此方法旨在[div边界框]和[span图标]进行成功样式的添加
 */
function addSuccessStyle(divElement, spanElement) {
    divElement.removeClass("has-error has-feedback").addClass("has-success has-feedback");
    spanElement.removeClass("glyphicon glyphicon-remove form-control-feedback").addClass("glyphicon glyphicon-ok form-control-feedback");
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
