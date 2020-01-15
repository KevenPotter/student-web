/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    $("#profile_picture_profile").attr("src", studentImagesSystem + "/teacher/teacher_" + TEACHER_ID + ".png");
    getTeacher(TEACHER_ID);
});

/**
 * @param teacherId 教师编号
 * @author KevenPotter
 * @date 2020-01-14 15:44:01
 * @description 依据教师编号获取教师信息
 */
function getTeacher(teacherId) {
    $.ajax({
        url: studentManagementSystem + "/teacher/teacher/" + teacherId,
        type: "GET",
        dataType: "json",
        success: function (data) {
            log(data);
            $('#teacherNameProfile').text(data.data.teacherName);
            $('#teacherDepartmentNameProfile').text(data.data.departmentName);
            $('#teacherProfessionalProfile').text(data.data.professional).append("<span>Professional</span>");
            $('#teacherSexProfile').text(data.data.teacherSex).append("<span>Sex</span>");
            $('#teacherAgeProfile').text(data.data.teacherAge);
            $('#teacherMajorNameProfile').text(data.data.majorName);
            $('#teacherMobileProfile').text(data.data.teacherMobile);
        }
    });
}