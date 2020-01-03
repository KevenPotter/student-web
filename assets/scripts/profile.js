/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    getStudent(STUDENT_ID);
});

/**
 * @param studentId 学生编号
 * @author KevenPotter
 * @date 2019-01-03 16:07:59
 * @description 依据学生编号获取学生信息
 */
function getStudent(studentId) {
    $.ajax({
        url: studentManagementSystem + "/student/student/" + studentId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#studentNameProfile').text(data.data.name);
        }
    });
}