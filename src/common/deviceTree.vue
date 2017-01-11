<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="device-panel">
    <div class="device-tree-panel">
      <div class="title">摄像机选择：</div>
      <input class="search" placeholder="请输入要搜索的摄像机信息" v-model="searchText" v-on:keyup.esc="onRecovery"
             v-on:keyup.enter="onSearch"/>
      <div class="tree">
        <ul id="task-trees" class="ztree"></ul>
      </div>
    </div>
    <div class="device-selected-panel">
      <div class="title">已选摄像机：</div>
      <div id="deviceSelected" class="selected scroll" v-for="item in devices">
        <span class="item-content">{{item.name}}</span>
        <span class="delete-btn" data-id="{{item.id}}" v-on:click="onDelete">删除</span>
      </div>
    </div>
  </div>
</template>

<script>

  var service = require('./deviceTree');
  var zTree = require('./deviceTree');
  var _ = require('underscore');
  var IScroll = require('src/libs/iscroll/iscroll.js');

  var deviceTreeScroll;
  var deviceSelectedScroll;

  module.exports = {

    //父组件数据的属性
    props: ['devicetreeopt'],

    //数据对象
    data: function () {
      return {
        devices: [], //已经选择的设备
        searchText: "", //设备树搜索栏信息
        treeData: []  //设备树请求结果数据
      }
    },
    //计算属性
    computed: {},

    //操作组件的方法
    methods: {
      //搜索设备信息
      onSearch: service.onSearch,
      //恢复节点显示
      onRecovery: service.onRecovery,
      //删除已选设备
      onDelete: service.onDelete
    },
    watch: {},

    compiled: function () {
      service.postVueData(this);
    },

    ready: function () {
      var self = this;
      var id = "task-trees";
      //构造一个实时结构化的设备树zTree
       service.initTree({
         id: id,
         chkStyle:"checkbox",
         reqCallback: service.dispatchedTree,
         completeCallback: function () {
         }
       });
      //绑定事件
      $("input.search").bind("input propertychange", function () {
        self.onSearch(null);
      });
    },
    attached: function () {

    }
  }
</script>

<style scoped>
  @import "../libs/ztree/3.5.24/css/metroStyle/metroStyle.css";
  .device-panel {
    margin: 20px;
    width: 700px;
    height: 480px;
    border: 1px solid rgba(136, 18, 49, 0.74);
  }

  .device-tree-panel {
    width: 380px;
    border: 2px solid gainsboro;
    display: inline-block;
    float: left;
  }

  div.title {
    width: auto;
    height: 28px;
    line-height: 28px;
    text-align: left;
    text-indent: 1em;
    font-weight: bold;
    border-top-color: gainsboro;
    background-color: #9da0a4;
    border-bottom-color: gainsboro;
  }

  .device-tree-panel .search {
    margin: 20px 40px 10px;
    width: 300px;
    height: 35px;
    border: 1px solid #dedede;
    font-size: medium;
    padding-left: 10px;
  }

  .device-tree-panel .search:focus {
    border-color: #2d87f9;
  }

  .device-tree-panel .tree {
    margin: 0 40px 20px;
    width: 300px;
    height: 360px;
    overflow-y: scroll;
  }

  .device-selected-panel {
    width: 300px;
    display: inline-block;
    border: 1px solid gainsboro;
  }

  .device-selected-panel.selected {
    width: 280px;
    height: 20px;
  }

  .device-selected-panel .selected span {
    display: inline-block;
    border: 1px solid skyblue;
  }

  .device-selected-panel .selected span.item-content {
    width: 200px;
    float: left;
  }

  .device-selected-panel .selected span.delete-btn {
    width: 70px;
    float: right;
  }
</style>
