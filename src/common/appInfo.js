/**
 * Created by ZhangXiao on 2016/8/15.
 */
define([], function () {

  var Base = require("../base/base.js");
  var Urls = {
    app_info: window.ctx + "/base/common/info" //应用信息
  };

  var vueResource = null;
  var service = {

    postVueData: function (Vue) {
      vueResource = Vue;
      
    },

    appInfo: function () {
      
      return Base.CommonHttpCallback(vueResource.$http.get(Urls.app_info));
    }
  };

  return service;
});
