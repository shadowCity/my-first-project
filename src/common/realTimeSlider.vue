<template>
    <div id="greenSliderDivId" class="sliderDivClass" ><span class="leftsliderInputClass">{{response.min}}</span><span id="{{response.showId}}" class="sliderInputClass rightsliderInputClass"></span></div>
</template>
<script>
var slider = require('./slider.js');
var _self = null;
module.exports = {
    props: ['response'],
    ready: function() {
        $(".sliderDivClass").slider({
            orientation: "horizontal",
            range: "min",
            min:this.response.min,
            max: this.response.max,
            value:this.response.value,
            slide: updateSwatch1,
            change: updateSwatch1
        }); // End of slider() method
        // $(".sliderDivClass").slider("value", this.response.value); // Initialize for first display
    },
    compiled: function() {
       _self = this;
     
    },
    methods: function(argument) {

    }
};

function updateSwatch1() {

    var redWork = $("#redSliderDivId").slider("value"); // Assign the current slider values
    var greenWork = $("#"+_self.response.showId).closest(".sliderDivClass").slider("value");
    var blueWork = $("#blueSliderDivId").slider("value");
    var rgbWork = "rgb(" + redWork + "," + greenWork + "," + blueWork + ")"; // Assign concatenated values
    $(".rgbSwatchClass").css("background-color", rgbWork); // Display the RBG Slider Values
    $("#redSliderInputId").val(redWork); // Show individual RGB Values
    $("#blueSliderInputId").val(blueWork);
    $("#"+_self.response.showId).text(greenWork);
    console.log(greenWork);
    _self.response.value = greenWork;
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
<style scoped>
.ui-slider {
    position: relative;
    text-align: left;
}
.ui-slider .ui-slider-handle {
    position: absolute;
    z-index: 2;
    width: 1.2em;
    height: 1.2em;
    cursor: default;
    -ms-touch-action: none;
    touch-action: none;
}

.ui-slider .ui-slider-range {
    position: absolute;
    z-index: 1;
    font-size: .7em;
    display: block;
    border: 0;
    background-position: 0 0;
}


/* support: IE8 - See #6727 */

.ui-slider.ui-state-disabled .ui-slider-handle,
.ui-slider.ui-state-disabled .ui-slider-range {
    filter: inherit;
}

.ui-slider-horizontal {
    height: .8em;
}

.ui-slider-horizontal .ui-slider-handle {
    top: -.3em;
    margin-left: -.6em;
}

.ui-slider-horizontal .ui-slider-range {
    top: 0;
    height: 100%;
}

.ui-slider-horizontal .ui-slider-range-min {
    left: 0;
}

.ui-slider-horizontal .ui-slider-range-max {
    right: 0;
}

.ui-slider-vertical {
    width: .8em;
    height: 100px;
}

.ui-slider-vertical .ui-slider-handle {
    left: -.3em;
    margin-left: 0;
    margin-bottom: -.6em;
}

.ui-slider-vertical .ui-slider-range {
    left: 0;
    width: 100%;
}

.ui-slider-vertical .ui-slider-range-min {
    bottom: 0;
}

.ui-slider-vertical .ui-slider-range-max {
    top: 0;
}
.ui-widget-header {
    background: #2d87f9!important;
    color: #222222;
    font-weight: bold;
}
.sliderDivClass {
    display: inline-block;
    width: 163px;
    height: 7px;
    vertical-align: middle;
    top: -1px;
    margin-right: 10px;
    position: relative;
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

.leftsliderInputClass
{
    position: absolute;
    left:0px;
    top:-20px;
}
.rightsliderInputClass
{
    position: absolute;
    right:0px;
    top:-20px;
}
.rgbGroupClass,.sliderInputClass {
    display: inline-block;
    border: none;
    background: transparent;
}
</style>
