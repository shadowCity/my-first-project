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
            //orientation: "horizontal",
            range: true,
            min: 0,
            max: 120,
            values: [this.faceminage, this.facemaxage],
            slide: function(event, ui) {
                $("#minAge").text(ui.values[0]);
                $("#maxAge").text(ui.values[1]);
                 _self.faceminage = ui.values[0];
                 _self.facemaxage = ui.values[1];
                $($(".ui-slider-handle")[0]).attr("data-value", ui.values[0]);
                $($(".ui-slider-handle")[1]).attr("data-value", ui.values[1]);
            }
        });
        $("#minAge").text($("#greenSliderDivId").slider("values", 0));
        $("#maxAge").text($("#greenSliderDivId").slider("values", 1));
        $($(".ui-slider-handle")[0]).attr("data-value", $("#greenSliderDivId").slider("values", 0));
        $($(".ui-slider-handle")[1]).attr("data-value", $("#greenSliderDivId").slider("values", 1));
        //change: updateSwatch
        // End of slider() method
        //$(".sliderDivClass").slider("value", this.threshold); // Initialize for first display

    },
    compiled: function() {
        _self = this;
    },
    watch: {
        "faceminage": function(val) {
            if (val >= 0) {
                $("#greenSliderDivId").slider({
                    //orientation: "horizontal",
                    range: true,
                    min: 0,
                    max: 120,
                    values: [this.faceminage, this.facemaxage],
                    slide: function(event, ui) {
                        _self.faceminage = ui.values[0];
                        _self.facemaxage = ui.values[1];
                        $("#minAge").text(ui.values[0]);
                        $("#maxAge").text(ui.values[1]);
                    }
                });
                $("#minAge").text($("#greenSliderDivId").slider("values", 0));
                $("#maxAge").text($("#greenSliderDivId").slider("values", 1));
                $($(".ui-slider-handle")[0]).attr("data-value", $("#greenSliderDivId").slider("values", 0));
            }
        },
        "facemaxage": function(val) {
            if (val >= 0) {
                $("#greenSliderDivId").slider({
                    //orientation: "horizontal",
                    range: true,
                    min: 0,
                    max: 120,
                    values: [this.faceminage, this.facemaxage],
                    slide: function(event, ui) {
                        $("#minAge").text(ui.values[0]);
                        $("#maxAge").text(ui.values[1]);
                         _self.faceminage = ui.values[0];
                         _self.facemaxage = ui.values[1];
                    }
                });
                $("#minAge").text($("#greenSliderDivId").slider("values", 0));
                $("#maxAge").text($("#greenSliderDivId").slider("values", 1));
                $($(".ui-slider-handle")[1]).attr("data-value", $("#greenSliderDivId").slider("values", 1));
            }
        }
    },
    methods:{
        valueMinus:function()
        {
            // $("#minAge").text(this.faceminage -1);
            this.faceminage = this.faceminage-1;
            if(this.faceminage<0)
            {
                this.faceminage = 0;
            }
            $("#greenSliderDivId").slider("values",[this.faceminage, this.facemaxage]);
            $($(".ui-slider-handle")[0]).attr("data-value", this.faceminage);
        },
        valuePlus:function()
        {
            this.facemaxage = this.facemaxage +1;
            $("#greenSliderDivId").slider("values", [this.faceminage, this.facemaxage]);
            $($(".ui-slider-handle")[1]).attr("data-value", this.facemaxage);
        }
    }
};
</script>
<style>
.ui-slider-handle:focus
{
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
    margin-right: 10px;
    margin-left: 5px;
}

.faceroute-label-contain .sliderDivClass {
    width: 120px!important;
}

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default {
    border: 1px solid #d3d3d3;
    /*background: #B7B7B7 url("images/ui-bg_glass_75_e6e6e6_1x400.png") 50% 50% repeat-x;*/
    font-weight: normal;
    color: #555555;
    cursor: pointer;
}

#redSliderDivId .ui-slider-range {
    background: red;
}

#redSliderDivId .ui-slider-handle {
    background: pink;
}

#greenSliderDivId .ui-slider-range {
    background: green;
}

#greenSliderDivId .ui-slider-handle {
    background: lightgreen;
}

#blueSliderDivId .ui-slider-range {
    background: blue;
}

#blueSliderDivId .ui-slider-handle {
    background: lightblue;
}

#rgbSwatchId {
    margin: 0 auto;
    width: 425px;
    height: 50px;
    background-image: none;
}

#rgbSwatchId span {
    display: block;
    margin: 0 auto;
    padding-top: 13px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

/*.sliderInputClass,
.rgbGroupClass {
    display: inline-block;
    border: none;
    background: transparent;
}*/
</style>
