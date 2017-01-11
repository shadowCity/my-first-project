<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="model-dialog-tree" v-if="response.show" v-bind:class="{'modelAfter':true}" style="z-index:101" transition="opacityShowTips">
        <div class="img-panel">
            <div class="img-content-panel">
                <div class="judgeButtonClose" ><i style="font-size: 15px;" v-on:click="closeDialog">X</i></div>
                <div id="judgeImgShow" class="judgeDetailsImg" :style="{'background-image': 'url(' + this.response.imageUrl + ')'}"></div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
module.exports = {

    //父组件数据的属性
    props: ['response'],

    //数据对象
    data: function() {
        return {

        }
    },
    //计算属性
    computed: {},

    //操作组件的方法
    methods: {
        closeDialog: function() {
            this.response.isOk = false;
            this.response.show = false;
        }
    },
    compiled: function() {
        //service.postVueData(this);
    },
    watch: {
        'response.show': function(value) {
            var self = this;
            if (value) {


            }
        }
    },
    ready: function() {

    },
    attached: function() {

    }
}
</script>
<style scoped>
.img-panel {
    margin: 20px auto;
    text-align: center;
    overflow: hidden;
    position: absolute;
    z-index: 101;
    left: 50%;
    top: 50%;
    margin-left: -227px;
    margin-top: -257px;
}

.img-content-panel {
    box-sizing: border-box;
    width: 800px;
    height: 450px;
    /*border: 1px solid #cccccc;*/
    display: inline-block;
    overflow: hidden;
    background: #fff;
    position: relative;
    border-radius: 5px;
}

.judgeDetailsImg {
    width: 100%;
    height: 100%;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    /*position: absolute;*/
    clear: both;
}

.judgeButtonClose {
    margin: 3px 15px 0 0;
    float: right;
    cursor: pointer;
    height:20px;

}

.judgeButtonClose:hover {
    background-position: -20px -724px;
}
</style>
