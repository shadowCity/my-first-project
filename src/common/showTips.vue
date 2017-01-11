<template>
    <div id="showTips" v-show="message.show">
        <div :transition="opacityShowTips">
            <p>{{message.text}}</p>
        </div>
    </div>
</template>
<script>
var _self=null;
export default {
    props: ['message'],
    data: function() {
        return {
            time: 1000,
        }
    },
    ready: function() {
        _self = this;
    },
    watch: {
        'message.show': {
            handler: function(val) {
                if (val) {
                    setTimeout(() => {
                        _self.message.show = false;
                    }, _self.time);
                }
            },
            deep: true
        }
        // 
        // 'show': function() {
        //     // setTimeout(() => {
        //     //     _self.message.show = false;
        //     // }, _self.time);
        // }
    }
}
</script>
<style>
#showTips {
    float: none;
    height: auto;
    width: auto;
    position: absolute;
    height: 40px;
    width: 200px;
    top: 20%;
    left: 50%;
    min-height: 0px;
    margin-top: -50px;
    margin-left: -100px;
    background: rgba(100, 99, 101, 0.6);
    border-radius: 8px;
    color: #fff;
    text-align: center;
    line-height: 40px;
}
</style>
