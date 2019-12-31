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
/*layer提示icon*/
var GREEN_CHECK_MARK = 1;
var RED_ERROR_MARK = 2;
var YELLOW_QUESTION_MARK = 3;
var GRAY_LOCKING_MARK = 4;
var RED_CRYING_MARK = 5;
var GREEN_SMILE_MARK = 6;
/*网站浏览人数*/
var WEBSITE_VISITORS = 0;

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