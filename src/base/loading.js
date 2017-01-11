define([], function(jQuery) {
    var Loading = function() {

    };
    Loading.prototype = {
        // showLoading: function(word) {
        //     word = word||"努力加载中"
        //     var tmpl = '<div class="model-dialog loaderModel modelAfter">';
        //     tmpl += '<div class="loader">';
        //     tmpl += '<div class ="loader-inner line-scale">';
        //     tmpl += '<div></div>';
        //     tmpl += '<div></div>';
        //     tmpl += '<div></div>';
        //     tmpl += '<div></div>';
        //     tmpl += '<div></div>';
        //     tmpl += '</div>';
        //     tmpl += '<p class="fs14 mt15">'+word+'</p';
        //     tmpl += '</div>';
        //     tmpl += '</div>';
        //     if(!$("body").find(".model-dialog").hasClass("loaderModel"))
        //     {
        //      $("body").append(tmpl);
        //     }
        // },
        showLoading: function(word) {
            if(window.isShowLoadding){
                word = word||"正在读取数据，请稍候..."
                var tmpl = '<div class="loaderModel loader-Model">';
                tmpl += '<div class="loader">';
                tmpl += '<div class ="loader-inner">';
                tmpl += '</div>';
                tmpl += '<p class="fs16 mt15 fc-cff">'+word+'</p';
                tmpl += '</div>';
                tmpl += '</div>';
                if(!$("body").find(".loader-Model").hasClass("loaderModel"))
                {
                    $("body").append(tmpl);
                }     
            }

        },
        hideLoading: function() {
        	if($("body").find(".loader-Model").hasClass("loaderModel"))
            {
            	$(".loaderModel").remove();
            }
        }
    };
    window.loading = new Loading();
    
});
