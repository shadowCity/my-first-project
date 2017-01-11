<template>
  <div class="app-info">
    <span>应用：{{info.name}}</span>
    <span>版本：{{info.version}}</span>
    <span>简介：{{info.description}}</span>
  </div>
</template>

<script>
  var service = require('./appInfo.js');
  module.exports = {
    props: ['message'],
    data: function () {
      return {
        info: {
          name: "视频大数据.mock",
          version: "1.0.0.mock",
          description: "视频大数据.mock"
        }
      };
    },
    compiled: function () {
      service.postVueData(this);
    },

    ready: function () {
      var self = this;
       service.appInfo().then(function (data) {
         self.info = data;
       });
    }
  }
</script>

<style scoped>
  .app-info span {
    background-color: honeydew;
    display: block;
    width: auto;
    height: auto;
    font-size: medium;
    color: #00a1f1;
  }
</style>
