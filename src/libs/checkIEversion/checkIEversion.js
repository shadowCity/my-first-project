/**
 * ocx版本检查及更新
 */
define([], function() {
    var self=this;
    var checkIEversion=function(){
    	var self=this;
		self.WEB_ENHANCE_NAME = "";
		self.getVersionConf();
    };
    checkIEversion.prototype.getVersionConf=function(){
		//获取ocx配置文件
		var self=this;
		self.WEB_ENHANCE_NAME = window.web_enhance_name;
    };
    checkIEversion.prototype.bindEvents=function(){
    	//下载播放器
    	var self=this;
		$(".plugin-download-panel .downloadPlayer").off("click").on("click", function() {
            var playerEXE=require('src/plugins/webenhance/'+self.WEB_ENHANCE_NAME+".exe");
			window.open(playerEXE, "downloadPlayer");
		});
    };
    checkIEversion.prototype.showDialog=function(){
    	var self=this;
        var content = [
			'<div class="plugin-download-panel">',
			 '<i class="fn-icon player-install-icon"></i>',
			'	<div class="section1">',
			'		<h3>谷歌插件</h3>',
			'		<em>解决低版本ie的兼容性。</em>',
			'	</div>',
			'	<div class="section2 ui input">',
			'		<input class="downloadPlayer fn-btn fn-green-btn" value="立即下载" />',
			'	</div>',
			'</div>'];
		//渲染弹出层
		var dialogParam = {
			"title": "插件安装",
			"width": 480,
			"height": 130,
			"content": content.join("")
		};
		//弹出web信息窗
		window.dialog(dialogParam).showModal();
		$("[tabindex='0']").css("z-index","999999999999999999999999999999");
		$("[tabindex='1']").css("z-index","999999999999999999999999999999");
		$("[tabindex='-1']").css({"z-index":"999999999999999999999999999999","left":"50%","margin-left":"-240px"});
		//绑定事件
		self.bindEvents();
    };
    //判断浏览器版本是否低于IE9
	checkIEversion.prototype.checkIEVersionFlag=function () {
		return (navigator.userAgent.indexOf("MSIE 9.0") >= 0 ||navigator.userAgent.indexOf("MSIE 8.0") >= 0 || navigator.userAgent.indexOf("MSIE 7.0") >= 0 || navigator.userAgent.indexOf("MSIE 6.0") >= 0);
	};
	checkIEversion.prototype.getIEVersion=function () {
		if (navigator.userAgent.indexOf("MSIE 9.0") >= 0) {
			return "Internet Explorer 9";
		} 
		if (navigator.userAgent.indexOf("MSIE 8.0") >= 0) {
			return "Internet Explorer 8";
		} else if (navigator.userAgent.indexOf("MSIE 7.0") >= 0) {
			return "Internet Explorer 7";
		} else if (navigator.userAgent.indexOf("MSIE 6.0") >= 0) {
			return "Internet Explorer 6";
		}
		return "";
	};
    checkIEversion.prototype.checkIE=function(){
    	var self=this;
    	//self.showDialog();
    	if(self.checkIEVersionFlag()){
           self.showDialog();
    	}

   	
    }
    return checkIEversion;
});