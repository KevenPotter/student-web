var studentsTableTBody = $('#studentsTableTBody');
var studentsPage = $('#studentsPage');
$(document).ready(function () {
    loadStudentsList();
});

function loadStudentsList() {
    $.ajax({
        url: studentManagementSystem + "/student/student",
        type: "GET",
        success: function (data) {
            console.log(data);
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
            console.log(data.data.pages);
            $('#pageInfo').html('第 <b>' + data.data.pageNum + '</b> 页 第 ' + data.data.startRow + ' 到 ' + data.data.endRow + ' 条记录，共 ' + data.data.total + ' 条');
            studentsPage.append('<li><a href="#">&laquo;</a></li>');
            for (var pageIndex = 1; pageIndex <= pages; pageIndex++) {
                studentsPage.append('<li id="pageIndex"+pageIndex><a href="#">' + pageIndex + '</a></li>');
            }
            studentsPage.append('<li><a href="#">&raquo;</a></li>');
        }
    });
}