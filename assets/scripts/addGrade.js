/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    log(JSON.parse(localStorage.getItem("data")));
    loadCoursesList(JSON.parse(localStorage.getItem("data")));
});

/**
 * @author KevenPotter
 * @date 2020-01-09 11:39:55
 * @description 加载课程列表
 */
function loadCoursesList(data) {
    debugger;
    var coursesSelect = $('#coursesSelect');
    clearHtml(coursesSelect);
    var options = $('select option:selected');
    for (var courseIndex = 0, length = data.length; courseIndex < length; courseIndex++) {
        var item = data[courseIndex];
        coursesSelect.append('<option id="' + courseIndex + '" value="' + item.departmentId + '">' + item.courseName + '</option>');
        bootstrapSelectFlush(coursesSelect);
    }
}