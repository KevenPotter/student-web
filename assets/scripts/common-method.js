/**
 * @author KevenPotter
 * @date 2019-12-06 16:03:58
 * @description 加载系别列表
 */
function loadDepartmentsList() {
    var departmentsSelect = $('#departmentsSelect');
    $.ajax({
        url: studentManagementSystem + "/department/departments",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var departmentsArray = data.data;
            departmentsSelect.append('<option value="' + null + '">请选择系别</option>');
            for (var departmentIndex = 0, length = departmentsArray.length; departmentIndex < length; departmentIndex++) {
                var item = departmentsArray[departmentIndex];
                departmentsSelect.append('<option id="' + departmentIndex + '" value="' + item.departmentId + '">' + item.departmentName + '</option>');
                bootstrapSelectFlush(departmentsSelect);
            }
        }
    });
}

/**
 * @param element bootstrap-select元素
 * @author KevenPotter
 * @date 2019-12-09 13:40:49
 * @description 重新渲染bootstrap-select元素的内容
 */
function bootstrapSelectFlush(element) {
    $('.selectpicker').selectpicker({
        dropupAuto: false
    });
    element.selectpicker("refresh");
    element.selectpicker("render");
}

/**
 * @param element HTML元素
 * @author KevenPotter
 * @date 2019-11-25 22:45:16
 * @description 清空元素的标签内容
 */
function clearHtml(element) {
    element.html("");
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
 * @param msg 提示消息
 * @param icon 显示图标
 * @param time 显示时长(毫秒)
 * @author KevenPotter
 * @date 2019-12-18 23:19:25
 * @description 该方法旨在封装了layer插件的msg提示消息,使其使用方式更加便捷
 */
function layerMsg(msg, icon, time) {
    if (isEmpty(msg)) msg = "你好，很高兴认识你";
    if (isEmpty(icon)) icon = GREEN_CHECK_MARK;
    if (isEmpty(time)) time = 3000;
    layer.msg(msg, {icon: icon, time: time});
}