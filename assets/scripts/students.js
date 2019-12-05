var studentsTableTBody = $('#studentsTableTBody');
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
            for (var i = 0, length = studentsArray.length; i < length; i++) {
                console.log(studentsArray[i]);
                var item = studentsArray[i];
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
        }
    });
}