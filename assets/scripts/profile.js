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
            $('#studentNameProfile').text(data.data.studentName);
            $('#studentDepartmentNameProfile').text(data.data.departmentName);
            $('#studentGradeProfile').text(data.data.studentGrade).append("<span>Grade</span>");
            $('#studentClazzProfile').text(data.data.studentClazz).append("<span>Class</span>");
            $('#studentSexProfile').text(data.data.studentSex).append("<span>Sex</span>");
            $('#studentAgeProfile').text(data.data.studentAge);
            $('#studentMajorNameProfile').text(data.data.majorName);
            $('#studentMobileProfile').text(data.data.studentMobile);
        }
    });
}

/**
 * @param semester
 * @author KevenPotter
 * @date 2019-01-03 14:25:53
 * @description 根据学生编号和学期查询学生成绩信息
 */
function getScoreByStudentId(semester) {
    $.ajax({
        url: studentManagementSystem + "/score/score/" + STUDENT_ID + "/" + semester,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
        }
    });
}