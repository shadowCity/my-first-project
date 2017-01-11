<template>
    <div class="model-dialog" v-if="response.dialogShow" v-bind:class="{'modelAfter':bounceInUp}">
        <div class="dialog-main" v-bind:class="{'bounceInUp':bounceInUp,'bounceOutDown':bounceOutDown}">
            <p class="dialog-title-box"><span class="dialog-title">{{response.title}}</span>
                <a href="javascript:void(0)" class="fr icon-dialog-close" v-on:click="closeDialog"></a>
            </p>
            <div style="height:100%">
                <slot name="libBox">
                </slot>
                <slot name="realTimeBox">
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['response'],
    ready: function() {

    },
    watch: {
        'response.dialogShow': function(value) {
            if (value) {
                $("body").find(".view").addClass("overflowY");
            } else {
                $("body").find(".view").removeClass("overflowY");
            }
        }
    },
    data: function() {

        return {
            // show:true,
            modelBg: false,
            bounceInUp: true,
            bounceOutDown: false,
        }
    },
    events: {
        'close-dialog' () {
            this.closeDialog();
        }
    },
    methods: {
        /**
         * 关闭弹层
         * @return {[type]} [description]
         */
        closeDialog: function() {
            this.response.dialogShow = "closeUpVideoPlay";//先关闭视频回显
            this.$nextTick(function(){
                this.bounceInUp = false;
                this.bounceOutDown = true;
                try {
                    $("body").find(".realTimeOcxBoxVideo").empty()
                } catch (e) {

                }
                setTimeout(() => {
                    this.response.dialogShow = false;
                    this.bounceInUp = true;
                    this.bounceOutDown = false;
                    this.$dispatch('child-close', true);
                }, 1000)
            });
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.overflowY {
    overflow-y: hidden!important;
    overflow-x: hidden!important;
}
</style>
