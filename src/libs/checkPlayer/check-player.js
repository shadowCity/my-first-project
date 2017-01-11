/**
 * ocx版本检查及更新
 */
define([], function() {
    var self=this;
    var check=function(){
    	var self=this;
		self.NPPLAYER_VERSION = "";
		self.NPPLAYER_NAME = "";
		self.NPPLAYER_INFO = "";
		self.getVersionConf();
    };
    check.prototype.getVersionConf=function(){
		//获取ocx配置文件
		var self=this;
		self.NPPLAYER_INFO = window.ocxInfo;
		self.NPPLAYER_VERSION = window.ocxInfo["fop-ver"];
		self.NPPLAYER_NAME = window.ocxInfo.name + " " + window.ocxInfo.version + window.ocxInfo.extname;
    };
    check.prototype.bindEvents=function(){
    	//下载播放器
    	var self=this;
		$(".plugin-download-panel .downloadPlayer").off("click").on("click", function() {
            var playerEXE=require('src/plugins/media/'+self.NPPLAYER_NAME);
			window.open(playerEXE, "downloadPlayer");
		});
    };
    check.prototype.showDialog=function(type){
    	var self=this;
        var content = [
			'<div class="plugin-download-panel">',
			(type === "install") ? '<i class="fn-icon player-install-icon"></i>' : '<i class="fn-icon player-update-icon"></i>',
			'	<div class="section1">',
			'		<h3>网页播放器</h3>',
			'		<em>解决网页中多种视频格式的播放。<br>(若为谷歌浏览器，请保证版本为chrome 40 及以下)</em>',
			'	</div>',
			'	<div class="section2 ui input">',
			'		<input class="downloadPlayer fn-btn fn-green-btn" value="立即下载" />',
			'	</div>',
			'</div>'];
		//渲染弹出层
		var dialogParam = {
			"title": "插件" + ((type === "install") ? "安装" : "更新"),
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
		//打印日志
		if(type === "install"){
			console.info("check player msg: player install progress.");
		} else {
			console.info("check player msg: player update progress.");
		}
    };
    check.prototype.checkPlayerForDown=function(){
    	var self=this;
        var OCX = jQuery(".UIOCX")[0];
		//第一步，检查ocx是否存在
		if (!OCX) {
			alert("当前页面中暂未包含播放器插件");
			return false;
		}
		//第二步，检查是否安装过，通过访问函数实现
		if (!OCX.GetOption) {
			//提示安装
			self.showDialog("install");
			return false;
		}
		//第三步，检查是否需要更新
		try {
			var confParam = {
					isupgrade: self.NPPLAYER_INFO
				}
			var updateFlag = JSON.parse(OCX.IsUpgradeVersion(JSON.stringify(confParam)));
			//判断是否要升级
			if (updateFlag.isupgrade) {
				//需要升级
				self.showDialog("update");
				return false;
			} else {
				//判断是否需要强制升级
				if (window.ocxForceUpdate) {
					//需要升级
					self.showDialog("update");
					return false;
				}
			}
		} catch (e) {
			//提示升级
			self.showDialog("update");
			//打印日志
			console.warn("check player msg:", e.message);
			return false;
		}
		//不需要升级
		return true;    	
    }


    check.prototype.checkPlayer=function(){
    	var self=this;
        var OCX = jQuery(".UIOCX")[0];
		//第一步，检查ocx是否存在
		if (!OCX) {
			alert("当前页面中暂未包含播放器插件");
			return false;
		}
		//第二步，检查是否安装过，通过访问函数实现
		if (!OCX.GetOption) {
			//提示安装
			self.showDialog("install");
			return false;
		}
		//第三步，检查是否需要更新
		try {
			var confParam = {
					isupgrade: self.NPPLAYER_INFO
				}
			var updateFlag = JSON.parse(OCX.GetOption(JSON.stringify(confParam)));
			//判断是否要升级
			if (updateFlag.isupgrade) {
				//需要升级
				self.showDialog("update");
				return false;
			} else {
				//判断是否需要强制升级
				if (window.ocxForceUpdate) {
					//需要升级
					self.showDialog("update");
					return false;
				}
			}
		} catch (e) {
			//提示升级
			self.showDialog("update");
			//打印日志
			console.warn("check player msg:", e.message);
			return false;
		}
		//不需要升级
		return true;    	
    }
    return check;
});