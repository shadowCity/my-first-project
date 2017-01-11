/**
 * 系统消息处理程序
 * @version $Id$
 */
define([], function () {

    /**
     * amq消息处理，具有兼容性
     */
    var customers = new Array();
    window.AMQ = (function (scope) {
        /**
         * 初始化amq
         */
        var amq = org.activemq.Amq;
        /*amq.init({
         uri: window.requestConf.tag + "amq",
         logging: true,
         timeout: 20
         });*/
        /**
         * 定义监听
         * @type {{rcvMessage: Function}}
         */
        var myHandler = {
            //pvg异步监听
            rcvMessage: function (message) {
                alert("received " + message);
            }
        };
        /**
         * 根据消息的不同消息句柄监听消息
         * @param handler - 消息句柄
         */
        scope.listenMessage = function (handler) {
            /**
             * 监听主题
             */
          //  amq.addListener(handler, "topic://Face.PvgSync", myHandler.rcvMessage);
        };

        return scope;

    }({}));
    /**
     * websocket消息处理，只支持HTML5
     */
    window.WebSocketMsg = (function (scope) {

        var //消息推送对象
            _client = null,
            //标记连接状态，默认失败
            _status = "UNCONNECTED",

            _options = null,
            //消息连接的延迟处理对象
            _deffered = $.Deferred();

        /**
         * 初始化
         */
        scope.init = function () {
            //创建推送客户端
            _client = Stomp.client(window.pageActiveMQUrl);
            //返回自身便于链式调用
            return scope;
        };
        /**
         * 创建连接
         */
        scope.connect = function () {
            _client.connect("", "", function () {
                _status = "CONNECTED";
                //执行相关订阅
                _deffered.resolve();
                scope.subscribe();
                //输出日志
                console.info("socketMsg:连接成功");
            }, function () {
               
                //输出日志
                scope.disconnect();
                scope.init();
                scope.connect();
                console.info("重连.....");
            });
        };
        /**
         * 取消连接
         */
        scope.disconnect = function () {
            //关闭连接
            _client.disconnect();
            console.info("socketMsg:连接关闭");
        };
        /**
         * 添加订阅
         * @param options - 消息订阅配置项
         */
        scope.subscribe = function (options) {
            console.info("订阅... ... ...");
            if(options != null) {
                _options = options;
            }
            if(_options != null) {
                $.each(_options, function (index, item) {
                //获取主题
                var headers;
                if(item.selector) {
                    headers = {id:item.id,'selector': "cameraId = '"+item.selector+"'"};
                } else {
                    if(item.id === 'AllCapture') {
                        headers = {id:item.id};
                    } else {
                        headers = {id:item.id};    
                    }
                }
               
                var msgId = _client.subscribe(item.topic, (function () {
                    return function (msg) {
                        //格式化消息体
                       
                        var msgData = JSON.parse(msg.body);
                        //触发回调
                        item.callback(msgData, item.id);
                    };
                }()),headers);
                customers.push(msgId);
                console.info("subscribe success." + msgId + "....selector : " + headers.selector);
            });
            }
        };

        /**
         * 取消订阅
         * @param idArr - 取消订阅的数组
         */
        scope.unSubscribe = function (idArr) {
            for(var i=0;i<idArr.length;i++){
                 _client.unsubscribe(idArr[i]);
                 console.info("socketMsg: unSubscribe success,topic is ... ... ... " + idArr[i]);
            }
            customers.length = 0;
        };
        /**
         * 获取消息连接的延时对象
         */
        scope.getDeffered = function () {
            return _deffered.promise();
        };

        return scope;
    }({}));
});