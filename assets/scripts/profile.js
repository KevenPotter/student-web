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
            $('#studentNameProfile').text(data.data.studentName);
            $('#studentDepartmentName').text(data.data.departmentName);
            $('#studentGradeProfile').text(data.data.studentGrade).append("<span>Grade</span>");
            $('#studentClazzProfile').text(data.data.studentClazz).append("<span>Class</span>");
            $('#studentSex').text(data.data.studentSex).append("<span>Sex</span>");
        }
    });
}