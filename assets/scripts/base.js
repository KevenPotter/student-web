/**
 * @description 页面初始化加载事件
 */
$(document).ready(function () {
    // 进行WebSocket请求建立连接以统计在线浏览网站用户数量
    onlineUserCounts();
});

/*请求地址*/
var studentManagementSystem = "http://localhost:8081";
var studentManagementSystemWebSocket = "ws://localhost:8081";
var studentImagesSystem = "http://www.123.com/images";
/*layer提示icon*/
var GREEN_CHECK_MARK = 1;
var RED_ERROR_MARK = 2;
var YELLOW_QUESTION_MARK = 3;
var GRAY_LOCKING_MARK = 4;
var RED_CRYING_MARK = 5;
var GREEN_SMILE_MARK = 6;
/*网站浏览人数*/
var WEBSITE_VISITORS = 0;
/*公用学生编号*/
var STUDENT_ID;
/*公用教师编号*/
var TEACHER_ID;
/*公用系别编号*/
var DEPARTMENT_ID;
/*公用专业编号*/
var MAJOR_ID;

/**
 * @author KevenPotter
 * @date 2019-21-27 15:01:12
 * @description 对后端服务器发送请求以统计在线人数
 */
function onlineUserCounts() {
    if (!checkWebSocket()) {
        layerMsg('该浏览器暂不支持WebSocket', GREEN_SMILE_MARK, 3000);
        return;
    }
    var onlineUserCountSocket = new WebSocket(studentManagementSystemWebSocket + "/dashboard");
    onlineUserCountSocket.onmessage = function (msg) {
        $('#visits').text(msg.data);
        WEBSITE_VISITORS = msg.data;
    };
    onlineUserCountSocket.onclose = function (msg) {
        console.log(msg);
    };
    onlineUserCountSocket.onerror = function (msg) {
        console.log(msg);
    };
    $(window).on("unload", function (e) {
        onlineUserCountSocket.close();
    });
}

/**
 * @returns {boolean}
 * @author KevenPotter
 * @date 2019-12-31 11:32:44
 * @description 检测该浏览器是否支持WebSocket
 */
function checkWebSocket() {
    return 'WebSocket' in window || 'MozWebSocket' in window;
}

/**
 * @param msg 日志消息
 * @author KevenPotter
 * @date 2020-01-06 16:32:03
 * @description 进行日志记录,将结果输出到控制台上
 */
function log(msg) {
    console.log(msg);
}