<template>
    <span id="minAge" style="border:0; color:#2d87f9; font-weight:bold;display:none"></span>
    <span class="sliderInputClass greenSliderLeft" @click="valueMinus"></span>
    <div id="greenSliderDivId" class="sliderDivClass"></div>
    <span id="maxAge" style="border:0; color:#2d87f9; font-weight:bold;display:none"></span>
    <span class="sliderInputClass greenSliderRight" @click="valuePlus"></span>
</template>
<script>
var slider = require('./slider.js');
var _self = null;
module.exports = {
    props: ['faceminage', 'facemaxage'],
    ready: function() {
        $("#greenSliderDivId").slider({
            orientation: "horizontal",
            range: "max",
            min: 50,
            max: 100,
            value: this.faceminage,
            slide: function(event, ui) {
                _self.faceminage =  ui.value;
                $(".ui-slider-handle").attr("data-value", ui.value);
            }
        });
        $("#greenSliderDivId").slider("value", this.faceminage);
        $(".ui-slider-handle").attr("data-value",this.faceminage);

    },
    compiled: function() {
        _self = this;
    },
    watch: {
        "faceminage": function(val) {
            if (val >= 0) {
                $("#greenSliderDivId").slider({
                    //orientation: "horizontal",
                    range: "max",
                    min: 50,
                    max: 100,
                    values: this.faceminage,
                    slide: function(event, ui) {
                        _self.faceminage =  ui.value;
                        $(".ui-slider-handle").attr("data-value", ui.value);
                    }
                });
                $("#greenSliderDivId").slider("value", this.faceminage);
                $(".ui-slider-handle").attr("data-value",this.faceminage);
            }
        },
        "facemaxage": function(val) {
            if (val >= 0) {
                $("#greenSliderDivId").slider({
                    //orientation: "horizontal",
                    range: "max",
                    min: 0,
                    max: 100,
                    values: [this.faceminage, this.facemaxage],
                    slide: function(event, ui) {
                        
                    }
                });
                $("#greenSliderDivId").slider("value", this.faceminage);
                $(".ui-slider-handle").attr("data-value",this.faceminage);
            }
        }
    },
    methods: {
        valueMinus: function() {
            // $("#minAge").text(this.faceminage -1);
            this.faceminage = this.faceminage - 1;
            if (this.faceminage < 50) {
                this.faceminage = 50;
            }
            $("#greenSliderDivId").slider("value", this.faceminage);
            $(".ui-slider-handle").attr("data-value",this.faceminage);
        },
        valuePlus: function() {
            this.faceminage = this.faceminage + 1;
            if (this.faceminage > 100) {
                this.faceminage = 100;
            }
            $("#greenSliderDivId").slider("value", this.faceminage);
            $(".ui-slider-handle").attr("data-value",this.faceminage);
        }
    }
};
</script>
<style>
.ui-slider-handle:focus {
    outline: none!important;
}
</style>
<style scoped>
@import "../libs/jquery/jquery-ui-slider.css";
.sliderDivClass {
    display: inline-block;
    width: 163px;
    height: 7px;
    vertical-align: middle;
    top: -1px;
    margin-right: 5px;
    margin-left: 5px;
}

.faceroute-label-contain .sliderDivClass {
    width: 120px!important;
}
</style>
