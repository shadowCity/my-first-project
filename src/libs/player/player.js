/**
 * 人脸系统播放器业务控制对象
 */
define([], function() {
    var self = this;

    var newPlayer = function(options) {
        var self = this;
        self.options = options;
        //初始化
        $.extend(self.options, options);
        //初始化播放器对象

        self.playerObj = window.document.getElementById(options.ocxid);
        //初始化配置
        try {
            self.playerObj.SetConfig(JSON.stringify(window.ocxConfig));
        } catch (e) {
            console.log(e)
        }

        //绑定事件
        //self.bindEvents();
    };
    /**
     * 对外暴露事件接口
     * @param name - 事件的名字
     * @param fn - 事件的回调函数
     */
    newPlayer.prototype.on = function(name, fn) {
        var self = this;
        //构造别名
        var EventNames = {
            "click": "Click",
            "dblclick": "DblClick",
            "mouseleave": "MouseLeave",
            "mouseenter": "MouseEnter",
            "minmaxchanged": "MinMaxPixChanged",
            "detectionareachanged": "DetectionAreaChanged"
        };
        //匹配
        for (var x in EventNames) {
            if (EventNames.hasOwnProperty(x) && name === x) {
                //获取ocx原生事件
                name = EventNames[x];
            }
        }
        //给对象添加事件
        self.addEvent(name, fn);
    };
    /**
     * 播放器对象事件
     */
    newPlayer.prototype.bindEvents = function() {
        var self = this;
        var EventList = [
            "Click", //单击事件
            "DblClick", //双击事件
            "MouseLeave", //鼠标移出事件
            "MouseEnter", //鼠标移入事件
            "MinMaxPixChanged", //最小最大像素框变化事件
            "DetectionAreaChanged" //人脸检测区域变动事件
        ];
        /**
         * 事件绑定程序
         * @param name - 事件响应名字
         */
        var func = function(name) {
            return function() {
                //在响应事件中触发自定义事件回调
                self.fireEvent(name, arguments);
            };
        };
        //遍历
        $.each(EventList, function(index) {
            var name = EventList[index] + "";
            if (self.playerObj.attachEvent) {
                //取消绑定
                self.playerObj.detachEvent("on" + name, func);
                //绑定事件
                self.playerObj.attachEvent("on" + name, func.call(self, name, arguments));
            } else {
                //取消绑定
                self.playerObj.removeEventListener(name, func, false);
                //绑定事件
                self.playerObj.addEventListener(name, func.call(self, name, arguments), false);
            }
        });
    };
    /**
     * 播放主函数
     */
    newPlayer.prototype.play = function() {
        var self = this;
        var playParamStr = JSON.stringify(self.options.playParam);
        //先调用关闭接口
        self.stop();
        //调用播放接口
        try {
            self.playerObj.SetConfig(JSON.stringify(window.ocxConfig));
        } catch (e) {
            console.log(e);
        }

        console.info("ocx msg:");
        console.log("play param:", playParamStr);
        self.playerObj.Play(playParamStr,"","",self.options.callback.playCallback, 1);

        return self;
    };
    /**
     * 监听事件绑定
     */
    newPlayer.prototype.on = function(name,fn) {
        var self = this;
        //构造别名
        var EventNames = {
            "click": "Click",
            "dblclick": "DblClick",
            "mouseleave": "MouseLeave",
            "mouseenter": "MouseEnter",
            "minmaxchanged": "MinMaxPixChanged",
            "detectionareachanged":"DetectionAreaChanged"
        };
        //匹配
        for (var x in EventNames) {
            if (EventNames.hasOwnProperty(x) && name === x) {
                //获取ocx原生事件
                name = EventNames[x];
            }
        }
        if (self.playerObj.attachEvent) {
            //取消绑定
            self.playerObj.detachEvent("on" + name, fn);
            //绑定事件
            self.playerObj.attachEvent("on" + name, fn.call(self, name, arguments));
        } else {
            //取消绑定
            self.playerObj.removeEventListener(name, fn);
            //绑定事件
            self.playerObj.addEventListener(name, fn);
        }
    };
    /**
     * 关闭主函数
     */
    newPlayer.prototype.stop = function() {
        var self = this;
        try {
            var res = self.playerObj.Stop();
            if (res !== 0) {
                console.log("关闭播放器失败");
            } else {
                console.log("成功关闭播放器");
            }
        } catch (e) {}
        return self;
    };
    /**
     * 设置ocx参数
     * @param data - 参数信息，json对象
     * @returns {Player}
     */
    newPlayer.prototype.setOptions = function(data) {
        var self = this;
        try {
            self.playerObj.SetOption(JSON.stringify(data));
        } catch (e) {
            console.log(e);
        }

        return self;
    };
    /** 获取配置信息
     * remark
     *  返回Json格式的配置信息，如果返回""表示获取配置信息失败。
     *  可以在任意时刻调用。
     */
    newPlayer.prototype.getConfig = function() {
        var self = this;
        return self.playerObj.GetConfig();
    };
    return newPlayer;

});
