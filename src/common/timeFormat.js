define([], function() {
    var timeTransform = {
        timeTransform: function(TimeMillis) {
            var data = new Date(TimeMillis);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            var time = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + ss;
            return time;
        },
        timeTransformTMD: function(TimeMillis) {
            var data = new Date(TimeMillis);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            var time = year + "/" + month + "/" + day + " ";
            return time;
        },
        timeTransformTMDHM: function(TimeMillis) {
            var data = new Date(TimeMillis);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            var time = year + "/" + month + "/" + day + " " + hours + ":" + minutes;
            return time;
        },
        // 时：分 :秒
       timeTransformDHMS: function(value) {
            //to do
          if(value =="0"){
            value="长期有效";
          }else {
            var data = new Date(value);
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            value = month + "/"+day + " "+hours + ":" + minutes+":"+ss;
          }
            return value;
        }
    };
    return timeTransform;
});
