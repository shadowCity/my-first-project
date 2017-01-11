<template>
    <div class="wrap">
        <div class="header">
            <a class="logo">

            </a>
            <div class="navs">
                <ul>
                    <li class="nav" v-for='item in module_data' :class="{moduleIsActive:isActive==$index}" v-if="item.openStatus==1"><a @click="change($index,$event)" data-model="{{item.model}}">{{item.name}}</a></li>
                </ul>
            </div>
            <div class="user">
                <span>
                  <i class="fn-icon skin-icon" @click="switchSkin"></i>
                  <i class="fn-icon user-icon"></i>
                  <em class="current-user"></em>
                  <i class="fn-icon nav-split-icon"></i>
                  <a @click="logout">登出</a>
                </span>
            </div>
            <div class="skinContent" v-show="isShowSwitchSkin">
                <div class="blue" @click="changeSkin('blue')">墨蓝</div>
                <div class="default" @click="changeSkin()">默认</div>
            </div>

        </div>
        <div class="content">
            <router-view transition-mode="in-out"></router-view>
        </div>
        <iframe id="pvdMonitorTemp" style="display:none;"></iframe>
    </div>
</template>
<script>
//nginx转发前缀
window.ctx = '/vdt';

//引人jquery
var JQuery = require('../src/libs/jquery/jquery-1.10.2.min')
window.jQuery = window.$ = JQuery
var JQueryUI = require('../src/libs/jquery/jquery-ui-1.10.4.min')
var JQmousewheel = require('src/libs/jquery/jquery.mousewheel.min.js');
var JQueryTimePicker = require('../src/libs/jquery/jquery-ui-timepicker-addon')
var selectFull = require('src/libs/select/select2.full.js');
var checkIEversion = require("src/libs/checkIEversion/checkIEversion.js")
var select = require('src/libs/select/select2.js');
var md5 = require('src/libs/md5/md5.min.js');
var Dialog = require("src/libs/dialog/dialog.js")
var CanvasLoader = require("src/libs/canvasLoader/jquery.classyloader.js")
var SysConfig = require("src/base/system.conf.js")
var Service = require('./appService.js')
var Filter = require('src/base/filter.js')
var Amq = require("src/libs/amq/amq.js")
var Stomp = require("src/libs/amq/stomp.js")
var message = require("src/libs/amq/message.js")
var countUp = require('../src/libs/countJs/count.js');
var Vue = require('vue')
var Router = require('vue-router')
var vueResource = require('vue-resource')
var VueAnimatedList = require('vue-animated-list')
Vue.use(VueAnimatedList)
Vue.use(vueResource)
Vue.use(Router)
var router = new Router()
Vue.http.options.root = '/root'
    /*Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'
    Vue.http.options.emulateJSON = true
    Vue.http.options.emulateHTTP = true;*/
    //请求超时时间设置
Vue.http.options.timeout = 3000;
export default {
    init: function() {
        var self = this;

        Vue.config.silent = true;
        //传递此vue对象到service，用来调用vueRescoure发请求
        Service.postVueData(this);
        //vue 拦截器
        Vue.http.interceptors.push(function(request, next) {
            var timeTemp;

            //request.headers["Pragma"]="no-cache";
            //request.headers["Expires"]="0";
            //接口名关键字：超时时间
            var requestFilterObj={
                "amq":0,
                "health":12000,
                "spss":10000,
                "trackingFace":0,
                "frequenPass":0,
                "accompany":0,
                "personTrace":0,
                "collision":0,
                "detect":0,
                "searchimage":10000,
                "video/thumbnail":10000,
                "intelligent/macFindFace":0,
                "intelligent/logFindFace":0,
                "intelligent/faceFindMac":0,
            }
            var logoutRequestFlag = false;

            for(var x in requestFilterObj){
                if(-1!==request.url.indexOf(x)){
                    request.timeout = requestFilterObj[x];
                } 
            }
            if (-1 !== request.url.indexOf("logout")) {
                logoutRequestFlag = true;
            }

           
            // 请求发送前的处理逻辑
            // 连接超时判断
            if (request.timeout) {
                timeTemp = setTimeout(() => {　　　　　　　　
                    next(request.respondWith(request.body, {
                        status: 408,
                        statusText: '请求超时'
                    }));

                }, request.timeout);
            };
            next(function(res) {
            //res.headers["Pragma"]="no-cache";
            //res.headers["Expires"]="0";
                if (res.headers["Redirect-Url"]) {
                    if (logoutRequestFlag) {
                        self.$router.go("/index");
                    } else {
                    }
                    window.location.href = res.headers["Redirect-Url"];
                    sessionStorage.loginLogFlg = "";
                }
                // 更具请求的状态， response参数会返回给 successCallback或errorCallback
                return res
            });

        });

    },
    compiled: function() {
        //判断屏幕尺寸
        if (1023 < window.screen.width && window.screen.width < 1200) {
            window.pageNumber = 10; //tabl显示条数
            window.sizeNum = 42; //图片显示条数
        } else if (1199 < window.screen.width && window.screen.width < 1281) {
            window.pageNumber = 12;
            window.sizeNum = 54;
        } else if (1281 < window.screen.width && window.screen.width < 1439) {
            window.pageNumber = 12;
            window.sizeNum = 60;
        } else if (1439 < window.screen.width && window.screen.width < 1599) {
            window.pageNumber = 14;
            window.sizeNum = 60;
        } else if (1599 < window.screen.width && window.screen.width < 1919) {
            window.pageNumber = 16;
            window.sizeNum = 84;
        } else if (1919 < window.screen.width) {
            window.pageNumber = 20;
            window.sizeNum = 84;
        }
        // 填充数据
        // window.writeOperateLog("login_login", "login", []);
    },
    ready: function() {
        $("head").append('<link rel="shortcut icon" type="image/png" href="'+this.logo+'" sizes="32x32">')
    },

    events: {
        'renderNav': function(data) {
            if (!this.isFromNav) {
                var self = this;
                if (data[0].isShow == 1) {
                    // window.localStorage.oldNavList = data[0].params;
                    window.localStorage.newNavList = data[0].params;
                } else {
                    // window.localStorage.oldNavList = data[1].params;
                    window.localStorage.newNavList = data[1].params;
                }
                this.module_data = JSON.parse(window.localStorage.newNavList);
                //如果请求到数据为空，显示默认数据
                if (this.module_data.length <= 0) {
                    this.module_data = window.module_data1;
                }
                for (var i = 0; i < this.module_data.length; i++) {
                    // 找到第一个openStatus==1的模块，否则继续循环
                    if (this.module_data[i].openStatus != 1) {
                        continue;
                    }
                    if (this.module_data[i].model == "settings") {
                        this.isActive = 0;
                        this.$router.go({
                            name: this.module_data[i].model,
                            params: {
                                navIndex: i
                            }
                        });
                        return;
                    } else {
                        this.isActive = 0;
                        //如果第一个不是setting，跳到第一个显示的模块
                        this.$router.go({
                            name: this.module_data[i].model
                        });
                        return;
                    }
                }
            }
        }
    },
    components: {},
    methods: {
        changeSkin:function(className){
            $("body").removeAttr("class");
            $("body").addClass(className);
            this.isShowSwitchSkin=false;
        },
        switchSkin:function(){
            if(this.isShowSwitchSkin){
                this.isShowSwitchSkin=false;
            }else{
                this.isShowSwitchSkin=true;
            }
        },
        logout: function() {
            window.writeOperateLog(logReport.login_logout, logReport.logout, logReport.login_1, {
                imagePath: "",
                values: []
            }).then(function() {
                Service.logout({}).then(function(res) {
                    //sessionStorage.setItem("username", "");
                    //sessionStorage.setItem("userId", "");
                    sessionStorage.loginLogFlg = "";
                    //window.location.href=res.url;
                    this.$router.go({
                        name: "index"
                    });
                    this.isFromNav = false;
                })
            })

        },

    },
    data: function() {
        return {
            isShowSwitchSkin:false,
            isActive: 0,
            isFromNav: false,
            logo:require("./favicon.png"),
        }
    }
}
</script>
<style>
@import "skin/skin_blue.css";
@import "skin/screen999.css";
@import "skin/screen1024.css";
@import "skin/screen1280.css";
@import "skin/screen1366.css";
@import "skin/screen1440.css";
@import "skin/screen1600.css";
@import "skin/screen1920.css";
</style>
