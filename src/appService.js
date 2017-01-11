define([], function() {
    var jeDate = require('src/libs/jedate/jedate.js');
    var Base = require("src/base/base.js")
    var URLS = {
        LOGOUT: '/logout'
    }
    var vueResource = null;
    var service = {

        postVueData: function(Vue) {
            vueResource = Vue;

        },
        logout: function(filter) {
            return Base.CommonHttpCallback(vueResource.$http.get(URLS.LOGOUT, filter));
        },
    };

    /***
     * 写日志模块
     * @param key 具体操作
     * @param moduleName 模块名称
     * @param params {
     *      imagePath:"",
     *      values:[] //占位替换的内容
     *
     * }
     */
    window.writeOperateLog = function(key, moduleName, fn, params) {

        var detail = replaceLogParam(key, params.values || []);

        return window.requestLogs(params.imagePath || "", detail, moduleName, fn);
        //console.info("writeOperateLog key=" + key + " module=" + moduleName + " params=" + JSON.stringify(params));
    };

    /**
     * 获取当前登录用户的用户名
     * @returns {*}
     */
    window.currentUser = function() {
        var loginInfo = localStorage.getItem("loginInfo");
        if (loginInfo) {
            return JSON.parse(loginInfo).userName;
        }
        return "";
    };

    window.requestLogs = function(imagePath, details, modelName, fn) {
        var requestParams = {
            "imageUrl": imagePath || "",
            "description": details || "",
            "module": modelName || "",
            "function": fn || ""
        };
        return Base.CommonHttpCallback(vueResource.$http.post(URLS.RECORD_LOG, requestParams));
    };
    window.replaceLogParam = function(key, params) {
        var returnDetails = key;
        if (key) {
            for (var i = 0; i < params.length; i++) {
                var details = params[i];
                var args = "args" + (i + 1);
                returnDetails = key = key.replace(args, details);
            }
        }

        return returnDetails;
    };
    return service;

});
