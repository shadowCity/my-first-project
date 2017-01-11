<template>
    <p class="fc-cff kakoPosition">流量（条）</p>
    <!-- <span class="fc-cf9 ml20">{{nowTime|timeTransformTMDHM}}</span> -->
    <div id="eChart-container" class="eChart"></div>
</template>
<script>
var echartsx = require('./echarts.js')
var Service = require('../model/monitor/monitorService.js')
var myChart = {};
var xData = [];
var yData = [0, '-', '-', '-', '-', '-', '-', '-', '-', '-'];
var timeTicket = null;
var timeS = 1;
var deviceData = "";
module.exports = {
    //父组件数据的属性flag=1人脸2车辆,3人体
    props: ['flag', 'human', 'face', 'vehicle'],
    //数据对象
    data: function() {
        return {
            nowTime: new Date().getTime(),
            staticData: "",
            staticName: "",
            firstRequsetData: 0,
            addData: 0,
            initRequsetData: []

        };
    },
    beforeDestroy: function() {
        clearInterval(timeTicket);
    },
    computed: {},
    methods: {},
    compiled: function() {
        Service.postVueData(this);
    },
    watch: {

    },
    ready: function() {
        //获取经典统计并初始化数据
        var self = this;
        deviceData = Service.getDeviceData();
        yData = [0, '-', '-', '-', '-', '-', '-', '-', '-', '-'];
        timeS = 1;
        if (this.flag == "1") {
            this.staticName = "人体";
            // this.staticData = this.face;
        } else if (this.flag == "2") {
            this.staticName = "人脸";
            // this.staticData = this.vehicle;
        } else if (this.flag == "3") {
            this.staticName = "车辆";
            // this.staticData = this.human;
        }
        Service.getDayStaticsData({
                captureType: this.flag,
                cameraId: deviceData.id
            }).then(function(data) {
                self.firstRequsetData = data;
            })
            // 初始化前1分钟的数据
        Service.getTimeDuringStaticsData({
            captureType: this.flag,
            cameraId: deviceData.id
        }).then(function(data) {
            var data = JSON.parse(data);
            self.initRequsetData = data.slice(-10);

            // 基于准备好的dom，初始化echarts实例
            myChart = echartsx.init(document.getElementById('eChart-container'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '卡口流量',
                    left: 'left',
                    show: false,
                },
                tooltip: {
                    position: 'bottom',
                    trigger: 'item',
                    formatter: function(item) {
                        var html = "";
                        var Time = new Date().getHours();
                        var hour = Time;
                        if (item.dataIndex == 12) {
                            hour = Time + 1;
                        }
                        var html = '时间：<span class="fc-cf9">' + item.name + '</span><br>';
                        html += item.seriesName + "：" + item.value;
                        return html
                    },
                    position: 'top',
                    // backgroundColor: "#485158",
                    textStyle: {
                        color: '#fff',
                    }
                },
                grid: {
                    x: '6%',
                    y: '20%',
                    width: '88%',
                    borderWidth: '0px',
                    borderColor: 'transparent',
                },
                xAxis: {
                    type: 'category',
                    // name: 'x',
                    splitLine: {
                        show: false,
                    },
                    boundaryGap: false,
                    axisLine: {
                        onZero: true,
                        lineStyle: {
                            color: '#2b5180',
                        },
                    },
                    axisLabel: {
                        //X轴刻度配置
                        interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数,
                    },
                    data: (function() {
                        var now = new Date().getTime();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(timeTransformHS(now)); //获取当前秒数(0-59));
                            now = now - 1000 * 6 * (10 - len + 1);
                        }
                        return res.reverse();
                    })()
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    axisLine: {
                        onZero: true,
                        lineStyle: {
                            color: '#2b5180',
                        }
                    },
                    axisLabel: {
                        show: true,
                        formatter: function(a) {
                            var str;
                            if (a < 10000) {
                                str = a;
                            } else if (a < 100000000) {
                                str = (a / 10000.0).toFixed(1) + '万';
                            } else {
                                str = (a / 100000000.0).toFixed(1) + '亿';
                            }
                            return str;
                        }
                    },
                    minInterval: 1
                },
                series: [{
                    sampling: 'max',
                    itemStyle: {
                        normal: {
                            color: 'rgba(35,58,92,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echartsx.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(35,58,92,0.5)'
                            }, {
                                offset: 0,
                                color: 'rgba(35,58,92,0.5)'
                            }])
                        }
                    },
                    smooth: true,
                    name: this.staticName,
                    type: 'line',
                    animationDurationUpdate:1000,
                    data: self.initRequsetData,
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.onresize = myChart.resize;
            self.pushData();
        })
    },
    methods: {
        pushData: function() {
            var self = this;
            clearInterval(timeTicket);
            timeTicket = setInterval(function() {

                var now = new Date().getTime();
                Service.getDayStaticsData({
                    captureType: self.flag,
                    cameraId: deviceData.id
                }).then(function(data) {
                    var option = myChart.getOption();
                    self.addData = Math.abs(data - self.firstRequsetData); //求差值
                    // if (timeS <= 9) {
                    //     option.series[0].data[timeS] = self.addData;
                    //     // option.xAxis[0].data.push(timeTransformHS(now));
                    // } else {
                    //     option.xAxis[0].data.shift();
                    //     option.xAxis[0].data.push(timeTransformHS(now));
                    //     option.series[0].data.shift();
                    //     option.series[0].data.push(self.addData);
                    //     // option.series[0].data.push(Math.random()*20);
                    // }
                    // timeS++;
                    self.initRequsetData.push(self.addData);
                    option.xAxis[0].data.push(timeTransformHS(now));
                    self.initRequsetData.shift();
                    option.xAxis[0].data.shift();
                    // option.series[0].data.push();
                    option.series[0].data=self.initRequsetData;
                    
                    
                   
                    
                    myChart.setOption(option);
                    self.firstRequsetData = data;
                })

            }, 6000);
        }
    }
}
</script>
<style scoped>
.eChart {
    /*width: 100%;*/
    height: 245px;
    position: relative;
    /*margin-left: -10px;*/
}

.kakoPosition {
    position: relative;
    margin-top: 20px;
    padding-left: 40px;
    margin-bottom: -30px;
    padding-left: 40px;
}

@media (max-width: 1639px) and (min-width: 1364px) {
    .kakoPosition {
        margin-top: 60px;
        padding-left: 20px;
        margin-bottom: -30px;
    }
}
</style>
