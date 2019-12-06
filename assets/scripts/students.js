var studentsTableTBody = $('#studentsTableTBody');
var studentsPage = $('#studentsPage');
var studentId = $('#studentId').val();
var studentName = $('#studentName').val();
var pageIndex = 1;
$(document).ready(function () {
    loadStudentsList(studentId, studentName, pageIndex);
});

function loadStudentsList(studentId, studentName, pageIndex) {
    clear(studentsTableTBody);
    clear(studentsPage);
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
                console.log(studentsArray[studentIndex]);
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
            var pages = data.data.pages;
            var prePage = data.data.prePage;
            var nextPage = data.data.nextPage;
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            studentsPage.append('<li><a href="#"  onclick="loadStudentsList(' + studentId + ',' + studentName + ',' + prePage + ')">&laquo;</a></li>');
            for (var pageIndex = 1; pageIndex <= pages; pageIndex++) {
                studentsPage.append('<li id="pageIndex"+pageIndex><a href="#" onclick="loadStudentsList(' + studentId + ',' + studentName + ',' + pageIndex + ')">' + pageIndex + '</a></li>');
            }
            studentsPage.append('<li><a href="#" onclick="loadStudentsList(' + studentId + ',' + studentName + ',' + nextPage + ')">&raquo;</a></li>');
        }
    });
}

function search() {
    studentId = $('#studentId').val();
    studentName = $('#studentName').val();
    console.log(studentId + "+" + studentName + "+" + pageIndex);
    loadStudentsList(studentId, studentName, pageIndex);
}

function clear(element) {
    element.html("");
}