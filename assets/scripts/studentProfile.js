/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    $("#profile_picture_profile").attr("src", studentImagesSystem + "/student/student_" + STUDENT_ID + ".png");
    $("#profile_picture_layer").attr("src", studentImagesSystem + "/student/student_" + STUDENT_ID + ".png");
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
        url: studentManagementSystem + "/score/scores/" + STUDENT_ID + "/" + semester,
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
                        '<td><img src="../assets/img/user2.png" class="avatar img-circle"> <a href="#">张雪峰</a></td>' +
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
function addScore() {
    var courseLayer = $('#courseLayer');
    $.ajax({
        url: studentManagementSystem + "/course/courses/" + DEPARTMENT_ID + "/" + MAJOR_ID + "/" + $("#semesterList").find('li[class="active"]').val(),
        type: "GET",
        dataType: "json",
        success: function (data) {
            if (SUCCESS_MARK === data.code) {
                loadCoursesList(data.data);
                loadScoreList();
                localStorage.setItem("data", JSON.stringify(data.data));
                layer.open({
                    type: 1,
                    title: '添加成绩',
                    content: courseLayer,
                    area: ['40%', '70%'],
                    move: false,
                    resize: false
                });
            } else if (TARGET_INFORMATION_EMPTY === data.code) {
                layerMsg("未获取到课程列表信息", GREEN_SMILE_MARK, 2000);
            }
        }
    });
}

/**
 * @author KevenPotter
 * @date 2020-01-09 11:39:55
 * @description 加载课程列表
 */
function loadCoursesList(data) {
    var coursesSelect = $('#coursesSelect');
    clearHtml(coursesSelect);
    for (var courseIndex = 0, length = data.length; courseIndex < length; courseIndex++) {
        var item = data[courseIndex];
        coursesSelect.append('<option id="' + courseIndex + '" value="' + item.courseId + '">' + item.courseName + '</option>');
    }
}

/**
 * @author KevenPotter
 * @date 2020-01-10 13:45:22
 * @description 该方法旨在加载分数列表
 */
function loadScoreList() {
    var scoresSelect = $('#scoresSelect');
    clearHtml(scoresSelect);
    for (var scoreIndex = 1; scoreIndex <= 100; scoreIndex++) {
        scoresSelect.append('<option value="' + scoreIndex + '">' + scoreIndex + '</option>');
    }
}

/**
 * @author KevenPotter
 * @date 2020-01-10 13:38:43
 * @description 该方法旨在添加该学生的考试成绩
 */
function insertScore() {
    var courseId = $('#coursesSelect option:selected').val();
    var score = $('#scoresSelect option:selected').val();
    var semester = $("#semesterList").find('li[class="active"]').val();
    var requestParam = {"studentId": STUDENT_ID, "courseId": courseId, "examinationCategoryId": 1, "score": score, "semester": semester};
    log(requestParam);
    $.ajax({
        url: studentManagementSystem + "/score/score",
        type: "POST",
        data: JSON.stringify(requestParam),
        dataType: "JSON",
        contentType: "application/json",
        success: function (data) {
            if (data.code == SUCCESS_MARK) {
                layerMsg("成绩添加成功，请刷新页面检查...", GREEN_SMILE_MARK, 3000);
            } else if (TARGET_INFORMATION_EMPTY = data.code) {
                layerMsg("该学生已有该课程成绩，请勿重复添加...", GRAY_LOCKING_MARK, 3000);
            }
        }
    });
}