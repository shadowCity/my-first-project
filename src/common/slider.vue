<template>
    <span class="sliderInputClass greenSliderLeft" @click="valueMinus"></span><div id="greenSliderDivId" class="sliderDivClass"></div><span class="sliderInputClass greenSliderRight" @click="valuePlus"></span>
</template>
<script>
var slider = require('./slider.js');
var _self = null;
module.exports = {
    props: ['threshold'],
    ready: function() {
        $(".sliderDivClass").slider({
            orientation: "horizontal",
            range: "min",
            max: 100,
            value: this.threshold,
            slide: updateSwatch,
            change: updateSwatch
        }); // End of slider() method
        $(".sliderDivClass").slider("value", this.threshold); // Initialize for first display
        $(".ui-slider-handle").attr("data-value", this.threshold);
    },
    compiled: function() {
        _self = this;
    },
    watch: {
        "threshold": function(val) {
            if (val >= 0) {
                $(".sliderDivClass").slider({
                    orientation: "horizontal",
                    range: "min",
                    max: 100,
                    value: this.threshold,
                    slide: updateSwatch,
                    change: updateSwatch
                }); // End of slider() method
                $(".sliderDivClass").slider("value", this.threshold); // Initialize for first display
                $(".ui-slider-handle").attr("data-value", this.threshold);
            }
        }
    },
    methods:{
        valueMinus:function()
        {
            this.threshold = this.threshold-1;
            $(".sliderDivClass").slider("value", this.threshold); // Initialize for first display
            $(".ui-slider-handle").attr("data-value", this.threshold);
        },
        valuePlus:function()
        {
            this.threshold = this.threshold+1;
            $(".sliderDivClass").slider("value", this.threshold); // Initialize for first display
            $(".ui-slider-handle").attr("data-value", this.threshold);
        }
    }
};

function updateSwatch() {
    var redWork = $("#redSliderDivId").slider("value"); // Assign the current slider values
    var greenWork = $("#greenSliderDivId").slider("value");
    var blueWork = $("#blueSliderDivId").slider("value");
    var rgbWork = "rgb(" + redWork + "," + greenWork + "," + blueWork + ")"; // Assign concatenated values
    $(".rgbSwatchClass").css("background-color", rgbWork); // Display the RBG Slider Values
    $("#redSliderInputId").val(redWork); // Show individual RGB Values
    $("#blueSliderInputId").val(blueWork);
    $("#greenSliderInputId").text(greenWork);
    _self.threshold = greenWork;
    $("#rgbGroupId").val(rgbWork); // Show the RGB values together
    var redOppositeWork = 255 - redWork; // Get the opposite color for the Swatch Demo text
    var greenOppositeWork = 255 - greenWork;
    var blueOppositeWork = 255 - blueWork;
    var rgbOppositeWork = "rgb(" + redOppositeWork + "," + greenOppositeWork + "," + blueOppositeWork + ")"; // Concatenate the values for the text color
    if (redWork == 127 && blueWork == 127 && greenWork == 127) {
        rgbOppositeWork = "rgb(255,255,255)";
    };
    $(".rgbSwatchClass span").css("color", rgbOppositeWork); // Set the Swatch Demo text color
};
</script>
<style>
.ui-slider-handle
{
    border:0px!important;
    border-radius:0px!important;
    -webkit-touch-action: none;
}
.ui-slider,.ui-slider-range
{
    border-radius:0px!important;
}
.ui-slider-handle:before {
    content: attr(data-value);
    color: #2d87f9;
    position: relative;
    top: -16px;
    width: 40px;
    text-align: center;
    /*display: inline-block;*/
    margin-left: -15px;
    left:-2px;
}
.ui-slider-handle:focus
{
    outline: none!important;
}
.greenSliderLeft
{
    transform:rotate(90deg);
    -ms-transform:rotate(90deg);
}
.greenSliderRight
{
    transform:rotate(-90deg);
    -ms-transform:rotate(-90deg);
}
.sliderInputClass,
.rgbGroupClass {
    display: inline-block;
    border: none;
    color: #999;
    font-weight: bolder;
    cursor: pointer;
    width: 9px;
    height: 5px;
    background: url("../resource/images/settings/icon-down.png") no-repeat;
    background-size:cover;
    top: -1px;
    vertical-align: middle;
    position: relative;
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
    margin-left: 10px;
}

.ui-state-default,
.ui-widget-content .ui-state-default,
.ui-widget-header .ui-state-default {
    border: 1px solid #d3d3d3;
    /*background: #B7B7B7 url("images/ui-bg_glass_75_e6e6e6_1x400.png") 50% 50% repeat-x;*/
    font-weight: normal;
    color: #555555;
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



</style>
