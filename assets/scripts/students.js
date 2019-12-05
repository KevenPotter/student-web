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
                    '<td>' + item.grade + '</td>' +
                    '<td>' + item.clazz + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '</tr>');
            }
            var pages = data.data.pages;
            console.log(data.data.pages);
            studentsPage.append('<li><a href="#">&laquo;</a></li>');
            for (var pageIndex = 1; pageIndex <= pages; pageIndex++) {
                studentsPage.append('<li><a href="#">' + pageIndex + '</a></li>');
            }
            studentsPage.append('<li><a href="#">&raquo;</a></li>');
        }
    });
}