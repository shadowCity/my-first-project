define([], function () {
var Base=require("../base/base.js")
var URLS = {
    LIST: '/dict/dictionary/listAll',
    MERGE: '/service/system/user/saveOrUpdate'
}
var vueResource=null;
var service = {
    postVueData:function(Vue){
      vueResource=Vue;
    },
    getList: function(filter) {
        return Base.CommonHttpCallback(vueResource.$http.get(URLS.LIST, {
            params : filter
        }));
    },
    save: function(d) {
        return Base.CommonHttpCallback(vueResource.$http.post(URLS.MERGE, d)).then(function(data) {
            return data;
        });
    }
};
  return service;

});