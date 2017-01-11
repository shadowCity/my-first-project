<template>
    <div class="pop-model-dialog" v-show="response.dialogShow" v-bind:class="{'modelAfter':bounceInUp}">
        <div class="pop-dialog-main" v-bind:class="{'bounceInUp':bounceInUp,'bounceOutDown':bounceOutDown}">
            <p class="pop-dialog-title-box"><span class="pop-dialog-title">{{response.title}}</span>
                <a href="javascript:void(0)" class="icon-dialog-close-black fr" v-on:click="closeDialog"></a>
            </p>
            <div class="pop-dialog-box">
                <div class="pop-showTips">
                    <div class="hexagon icon-error">
                        <!-- <div class="hexagon-squ"></div>
                        <div class="hexagon-round"></div> -->
                    </div>
                    <span>{{response.desc}}</span>
                </div>
                <p>
                    <div class="tc submit-box"><a href="javascript:void(0)" class="btnOK button fc-cf9 deleteMessageBtn" v-on:click="conformOk">{{response.btnName}}</a>
                        <a href="javascript:void(0)" class="btn-cancel deleteMessageBtn ml33" v-on:click="cancelEvent">取消</a></div>
                    </div>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['response'],
    data: function() {
        return {
            bounceInUp: true, //控制弹出效果
            bounceOutDown: false, //控制关闭效果
            redWarn: false,
        }
    },
    methods: {
        /**
         * 关闭弹层
         * @return {[type]} [description]
         */
        closeDialog: function() {
            this.bounceInUp = false;
            this.bounceOutDown = true;
            // 弹层延迟关闭
            setTimeout(() => {
                this.response.dialogShow = false;
                this.bounceInUp = true;
                this.bounceOutDown = false;
            }, 1000)
        },
        cancelEvent: function() {
            this.bounceInUp = false;
            this.bounceOutDown = true;
            // 弹层延迟关闭
            setTimeout(() => {
                this.response.dialogShow = false;
                this.bounceInUp = true;
                this.bounceOutDown = false;
            }, 1000)
        },
        /**
         * 确定按钮
         * @return {[type]} [description]
         */
        conformOk: function() {
            //alert(this.response.isDelete);
            var message = false;
            this.$dispatch('confirm-ok', message=true);
            message=false;
            this.closeDialog();
        }
    }
}
</script>
<style>

</style>
