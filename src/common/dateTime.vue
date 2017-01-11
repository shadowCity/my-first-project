<!-- /** * 时间组件参数： * * 参数名：datetimeopt * 参数值：Object * { * key 类型 可选性 默认取值 描述 * id String 必选 时间组件ID * format String 可选 'YYYY-MM-DD hh:mm:ss' 时间格式化字符串 * datetime Long时间戳 可选 初始时间, 同步时间数据 * placeholder String 可选 时间组件placeholder值 * birthday Boolean 可选 是否是生日组件 * } * 参数类型：同步 */ -->
<template>
    <div class="datetime-area">
        <input id="{{datetimeopt.id}}" class="datetime-input" readonly type="text" placeholder="{{datetimeopt.placeholder}}" />
    </div>
</template>
<script>
var _ = require('underscore');
module.exports = {
    props: ['datetimeopt'],
    watch: {
        'datetimeopt.datetime': {
            handler: function(val, oldVal) {
                var self = this;
                if (val == "") {
                    $('#' + self.datetimeopt.id).val("");
                };
                var setting = {
                    dateCell: '#' + self.datetimeopt.id,
                    format: self.datetimeopt.format || 'YYYY-MM-DD hh:mm:ss',
                    minDate: '1970-01-01 00:00:00',
                    maxDate: self.datetimeopt.birthday ? $.nowDate() : '2099-12-31 23:59:59',
                    isinitVal: _.isNumber(val),
                    initVal: val,
                    isTime: true,
                    ishmsLimit: false,
                    ishmsVal: true,
                    isClear: true,
                    clearRestore: true,
                    festival: false,
                    zIndex: 999,
                    marks: null,
                    choosefun: function(elem, val) {
                        /*self.datetimeopt.datetime = new Date(val).getTime();*/
                        var time = val.toString();
                        self.datetimeopt.datetime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();
                    },
                    clearfun: function(elem, val) {
                        self.datetimeopt.datetime = "";
                    },
                    okfun: function(elem, val) {
                        var time = val.toString();
                        self.datetimeopt.datetime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();
                        /*self.datetimeopt.datetime = new Date(val).getTime();*/
                    }
                };
                $.jeDate(setting.dateCell,setting);
            },
            deep: true
        }
    },
    ready: function() {
        var self = this;
        var setting = {
            dateCell: '#' + self.datetimeopt.id,
            format: self.datetimeopt.format || 'YYYY-MM-DD hh:mm:ss',
            minDate: '1900-08-19 00:00:00',
            maxDate: self.datetimeopt.birthday ? $.nowDate() : '2099-12-31 23:59:59',
            isinitVal: _.isNumber(self.datetimeopt.datetime),
            initVal: self.datetimeopt.datetime,
            isTime: true,
            ishmsLimit: false,
            ishmsVal: true,
            isClear: true,
            clearRestore: true,
            festival: false,
            zIndex: 999,
            marks: null,
            choosefun: function(elem, val) {
                var time = val.toString();
                self.datetimeopt.datetime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();
            },
            clearfun: function(elem, val) {
                self.datetimeopt.datetime = "";
            },
            okfun: function(elem, val) {
                var time = val.toString();
                self.datetimeopt.datetime = new Date(Date.parse(time.replace(/-/g, "/"))).getTime();
                /*self.datetimeopt.datetime = new Date(val).getTime();*/
            }
        };
        $.jeDate(setting.dateCell,setting);
    }
}
</script>
<style scoped>
@import "../libs/jedate/skin/jedate.css";
.datetime-area {
    width: auto;
    height: 25px;
    border: 1px;
}

.datetime-area .datetime-input {
    text-indent: 5px;
    min-width: 160px;
    text-align: left;
    background: #ffffff url("../resource/images/common/datetime-icon.png") no-repeat 98% 2.4px;
    border: 1px solid #ccc;
}
</style>
