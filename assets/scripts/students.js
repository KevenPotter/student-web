var studentsTableTBody = $('#studentsTableTBody');
var studentsPage = $('#studentsPage');
var studentId = null;
var studentName = null;
var departmentsSelect = $('#departmentsSelect');
var pageIndex = 1;

$(document).ready(function () {
    loadStudentsList(studentId, studentName, pageIndex);
    a();
});

function loadStudentsList(studentId, studentName, pageIndex) {
    clearHtml(studentsTableTBody);
    clearHtml(studentsPage);
    var requestParam = {"studentId": studentId, "name": studentName, "pageNo": pageIndex, "pageSize": 5};
    $.ajax({
        url: studentManagementSystem + "/student/students",
        type: "GET",
        dataType: "json",
        data: requestParam,
        success: function (data) {
            if (data.code == "100002") return;
            var studentsArray = data.data.list;
            for (var studentIndex = 0, length = studentsArray.length; studentIndex < length; studentIndex++) {
                var item = studentsArray[studentIndex];
                studentsTableTBody.append('<tr> ' +
                    '<td>' + item.id + '</td>' +
                    '<td>' + item.studentId + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.sex + '</td>' +
                    '<td id="departmentId_' + studentIndex + '">' + item.departmentId + '</td>' +
                    '<td>' + item.majorId + '</td>' +
                    '<td>' + item.grade + '</td>' +
                    '<td>' + item.clazz + '</td>' +
                    '<td>' + item.address + '</td>' +
                    '</tr>');
                $.ajax({
                    url: studentManagementSystem + "/department/department/" + item.departmentId,
                    type: "GET",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $('#departmentId_' + studentIndex + '').html(data.data.departmentName);
                    }
                });
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

function a() {
    $.ajax({
        url: studentManagementSystem + "/department/departments",
        type: "GET",
        dataType: "json",
        success: function (data) {
            var departmentsArray = data.data;
            departmentsSelect.append('<option value="' + 0 + '">请选择系别</option>');
            for (var departmentIndex = 0, length = departmentsArray.length; departmentIndex < length; departmentIndex++) {
                var item = departmentsArray[departmentIndex];
                departmentsSelect.append('<option id="' + departmentIndex + '" value="' + item.departmentId + '">' + item.departmentName + '</option>');
                departmentsSelect.selectpicker("refresh");
                departmentsSelect.selectpicker("render");
            }
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
