var studentsTableTBody = $('#studentsTableTBody');
var studentsPage = $('#studentsPage');
var studentId = null;
var studentName = null;
var pageIndex = 1;
$(document).ready(function () {
    loadStudentsList(studentId, studentName, pageIndex);
});

function loadStudentsList(studentId, studentName, pageIndex) {
    clearHtml(studentsTableTBody);
    clearHtml(studentsPage);
    var requestParam = {"studentId": studentId, "name": studentName, "pageNo": pageIndex, "pageSize": 5};
    $.ajax({
        url: studentManagementSystem + "/student/student",
        type: "GET",
        data: requestParam,
        success: function (data) {
            console.log(data);
            if (data.code == "100002") return;
            var studentsArray = data.data.list;
            for (var studentIndex = 0, length = studentsArray.length; studentIndex < length; studentIndex++) {
                var item = studentsArray[studentIndex];
                studentsTableTBody.append('<tr> ' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.studentId + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.sex + '</td>' +
                    '<td>' + item.departmentId + '</td>' +
                    '<td>' + item.majorId + '</td>' +
                    '<td>' + item.grade + '</td>' +
                    '<td>' + item.clazz + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '</tr>');
            }
            var pageNum = data.data.pageNum;
            var pages = data.data.pages;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            studentsPage.bootstrapPaginator({
                bootstrapMajorVersion: 3,
                numberOfPages: 5,
                currentPage: pageNum,
                totalPages: pages,
                onPageClicked: function (event, originalEvent, type, page) {
                    loadStudentsList(studentId, studentName, page);
                }
            });
        }
    });
}

function search() {
    studentId = $('#studentId').val() ? $('#studentId').val() : null;
    studentName = $('#studentName').val() ? $('#studentName').val() : null;
    console.log(studentId + "+" + studentName + "+" + pageIndex);
    loadStudentsList(studentId, studentName, pageIndex);
}

function clearHtml(element) {
    element.html("");
}
