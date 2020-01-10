/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    getStudent(STUDENT_ID);
    getScoreByStudentId(1);
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
    var scoresTableTBody = $('#scoresTableTBody');
    clearHtml(scoresTableTBody);
    $.ajax({
        url: studentManagementSystem + "/score/score/" + STUDENT_ID + "/" + semester,
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (data.code == SUCCESS_MARK) {
                var scoresArray = data.data;
                for (var scoreIndex = 0, length = scoresArray.length; scoreIndex < length; scoreIndex++) {
                    var item = scoresArray[scoreIndex];
                    var score = item.courseScore;
                    var courseId = item.courseId;
                    scoresTableTBody.append('<tr>' +
                        '<td>' + item.courseName + '</td>' +
                        '<td>' +
                        '<div class="progress progress-striped active">' +
                        '<div id="progressbar_' + courseId + '" class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="text-align: left;">' +
                        '<span style="margin-left: 7px;">' + score + ' points completed</span>' +
                        '</div>' +
                        '</div>' +
                        '</td>' +
                        '<td><img src="../assets/img/user2.png" alt="Avatar" class="avatar img-circle"> <a href="#">张雪峰</a></td>' +
                        '<td><span id="passedStatus_' + courseId + '" class="label"></span></td>' +
                        '</tr>');
                    if (score == 100) {
                        $('#progressbar_' + courseId).addClass("progress-bar-success").attr("aria-valuenow", score).width(score + "%");
                        $('#passedStatus_' + courseId).addClass("label-success").text("通过");
                    } else if (score < 100 && score > 60) {
                        $('#progressbar_' + courseId).addClass("progress-bar-info").attr("aria-valuenow", score).width(score + "%");
                        $('#passedStatus_' + courseId).addClass("label-success").text("通过");
                    } else {
                        $('#progressbar_' + courseId).addClass("progress-bar-danger").attr("aria-valuenow", score).width(score + "%");
                        $('#passedStatus_' + courseId).addClass("label-danger").text("未通过");
                    }
                }
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-01-08 09:41:37
 * @description 添加学生成绩
 */
function addGrade() {
    $.ajax({
        url: studentManagementSystem + "/course/courses/" + DEPARTMENT_ID + "/" + MAJOR_ID + "/" + $("#semesterList").find('li[class="active"]').val(),
        type: "GET",
        dataType: "json",
        success: function (data) {
            localStorage.setItem("data", JSON.stringify(data.data));
            if (data.code == SUCCESS_MARK) {
                layer.open({
                    type: 2,
                    title: '添加成绩',
                    content: ['./addGrade.html'],
                    area: ['40%', '50%'],
                    move: false,
                    resize: false
                });
            }
        }
    });
}