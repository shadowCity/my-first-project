/**
 * Created by ZhangXiao on 2016/8/8.
 */
define([], function () {
    //zTree
    var zTree = require('../libs/ztree/3.5.24/js/jquery.ztree.all.min');
    var zTreeExHide = require('../libs/ztree/3.5.24/js/jquery.ztree.exhide.min');

    var Base = require("../base/base.js");

    var Urls = {
        device_tree: window.ctx + "/system/device/tree/full", //完整设备树
        dispatched_tree: window.ctx + "/system/device/tree/dispatched", //布控设备树
        structured_tree: window.ctx + "/system/device/tree/structured" //结构化设备树
    };

    var _ = require('underscore');

    /**
     * VUE组件
     *
     * @type {null}
     */
    var vueResource = null;

    var isCrollContent = null;

    /**
     * 设备树相关的
     *
     * 方法
     *
     * 事件处理
     *
     */

    var service = {

        /**
         * 持有vue对象
         * @param Vue
         */
        postVueData: function (Vue) {
            vueResource = Vue;
        },
        /**
         * 接受传入的isCroll对象
         * @param isCroll
         */
        postIscrollData: function (isCroll) {
            isCrollContent = isCroll;
        },

        refreshIscroll: function () {
            isCrollContent.refresh();
            
            /*setTimeout(function()
            {
                $(".device-tree-panel .tree").css("max-height","none");
            },20)*/
             $(".device-tree-panel .tree").css({"max-height":"none","transition":"all 0.2s ease"});
        },

        /**
         * 设备树请求
         * @returns {*}
         */
        deviceTree: function () {
            return Base.CommonHttpCallback(vueResource.$http.get(Urls.device_tree));
        },

        /**
         * 布防布控请求
         * @returns {*}
         */
        dispatchedTree: function () {
            return Base.CommonHttpCallback(vueResource.$http.get(Urls.dispatched_tree));
        },

        /**
         * 实时结构化请求
         * @returns {*}
         */
        structuredTree: function () {
            return Base.CommonHttpCallback(vueResource.$http.get(Urls.structured_tree));
        },

        /**
         *  通过结点构造数据对象
         * @param node
         * @returns {{id: *, name: *, ext: *}}
         */
        deviceData: function (node) {
            return {
                id: node.id,
                name: node.name,
                tId: node.tId,
                ext: node.ext
            };
        },

        /**
         * 结点点击事件处理
         * @param event
         * @param treeId
         * @param treeNode
         */
        onCheck: function (event, treeId, treeNode) {
            var self = vueResource;
            var tree = service.getTree();
            //单选按钮
            if (tree.setting.check.chkStyle == 'radio') {
                if (treeNode.checked) {
                    self.devices = [service.deviceData(treeNode)];
                    $(".ico_docu").removeClass('ico_docu_active').next().removeClass("fc-cf9");
                    $("#" + treeNode.tId).find(".ico_docu").addClass('ico_docu_active').next().addClass("fc-cf9");
                } else {
                    self.devices = [];
                    $("#" + treeNode.tId).find(".ico_docu").removeClass('ico_docu_active').removeClass("fc-cf9");
                }
            } else {
                //多选按钮
                var devices = [];
                var selected = [];
                if (treeNode.isParent) {
                    var childrenArray = treeNode.children || [];
                    for (var i = 0, len = childrenArray.length; i < len; i++) {
                        var c = childrenArray[i];
                        selected.push(service.deviceData(c));
                    }
                } else {
                    selected.push(service.deviceData(treeNode));
                }
                var origin = vueResource.devices.map(function (item) {
                    return service.deviceData(item);
                });

                //找出a不在b中存在的
                var diff = function (a, b) {
                    return _.filter(a, function (o) {
                        for (var i = 0, len = b.length; i < len; i++) {
                            if (o.id == b[i].id) {
                                return false;
                            }
                        }
                        return true;
                    })
                };
                var push = function (values) {
                    _.each(values, function (item, index, target) {
                        devices.push(item);
                    })
                };
                if (treeNode.checked) {
                    //选中
                    if (origin.length >= selected.length) {
                        push(diff(selected, origin));
                        push(origin);
                    } else {
                        push(diff(origin, selected));
                        push(selected);
                    }
                    $("#" + treeNode.tId).find(".ico_docu").addClass('ico_docu_active');
                } else {
                    //取消
                    push(diff(origin, selected));
                    $("#" + treeNode.tId).find(".ico_docu").removeClass('ico_docu_active');
                }
                self.devices = devices;
            }
        },


        /**
         * 点击展开结点
         * @param event
         * @param treeId
         * @param treeNode
         */
        onExpand: function (event, treeId, treeNode) {
            var self = this;
            service._modifyNodeClass();
            $(".device-tree-panel .tree").css("max-height","300px");
            $(".device-tree-panel .tree").css("transition","all 2s ease");
            service.refreshIscroll();
        },

        /**
         * 修改结点样式
         * @private
         */
        _modifyNodeClass: function () {
            var self = this;
            var ids = service.structuredtIds();
            _.each(ids, function (id, index, target) {
                $('#' + id + '_span').attr("style", 'color:#ff5476!important');
            })
        },

        /**
         * 初始化zTree方法
         * @param setting
         *
         * {
         *
         *  id:"abc",  //ID
         *  chkStyle:"radio||checkbox" //类型，默认radio单选
         *  reqCallback: function(){}, //请求方法
         *  completeCallback:function(){} //树构造完成之后回调
         *  selected: [];//选择的相机
         * }
         *
         */
        initTree: function (setting) {
            var self = vueResource;
            $(".zTreeSubmit").css({"bottom":"0px","padding-bottom":"15px","background-color":"#fff"});
            setting['reqCallback']().then(function (data) {
                //zTree容器
                var zTreeNode = $("#" + setting.id);
                //zTree的设置
                var zTreeSetting = {
                    check: {
                        enable: true,
                        chkStyle: setting.chkStyle || 'radio',
                        radioType: 'all',
                        chkDisabledInherit: false
                    },
                    view: {
                        showLine: true,
                        expandSpeed: 500
                    },
                    callback: {
                        //节点选择处理
                        onCheck: service.onCheck,
                        onExpand: service.onExpand
                    }
                };
                _.each(data, function (item, index, target) {
                    if (item.isParent) {
                        // item.chkDisabled = true;
                        item.nocheck = true;
                    }
                });
                var ztree = $.fn.zTree.init(zTreeNode, zTreeSetting, data);
                var parentNodes = ztree.getNodes();
                if (setting.selected && setting.selected.length > 0) {
                    //非初始化的树
                    var selected = (setting.chkStyle == 'radio') ? [setting.selected[0]] : setting.selected;
                    var nodes = ztree.transformToArray(parentNodes);
                    _.each(nodes, function (item, index, target) {
                        if (
                            _.some(selected, function (id) {
                                return item.id == id;
                            })) {
                            ztree.checkNode(item, true, true, true);
                        }
                    });
                } else {
                    //初始化树，什么都不做
                }


                if (parentNodes.length > 0) {
                    var firstNode = parentNodes[0];
                    ztree.expandNode(firstNode, true, true, true, true);//自动回调onExpand
                }
                self.treeData = data;
                service._modifyNodeClass();
                try {
                    setting['completeCallback']();
                } catch (e) {
                }
            });
            self.treeId = setting.id;
        },

        /**
         * 获取设备树对象
         * @returns {*}
         */
        getTree: function () {
            var self = vueResource;
            return $.fn.zTree.getZTreeObj(self.treeId);
        },

        /**
         * 搜索设备
         * @param event
         */
        onSearch: function (event) {
            var self = vueResource;
            var tree = service.getTree();
            var nodes = tree.transformToArray(tree.getNodes());
            tree.showNodes(nodes);
            function isShow(node, searchText) {
                return _.isString(node.name) && node.name.indexOf(searchText) != -1;
            }

            if (self.searchText.trim().length > 0) {
                var hideNodes = _.reject(nodes, function (node) {
                    var rs = isShow(node, self.searchText);
                    if (!rs) {
                        if (node.isParent) {
                            var childrenArray = node.children || [];
                            rs = _.some(childrenArray, function (c) {
                                return isShow(c, self.searchText);
                            });
                        }
                    }
                    return rs;
                });
                tree.hideNodes(hideNodes);
            }
            tree.expandAll(tree);
        },

        /**
         * 恢复结点显示
         * @param event
         */
        onRecovery: function (event) {
            var self = vueResource;
            self.searchText = "";
            var tree = service.getTree();
            tree.expandAll(false);
            var nodes = tree.transformToArray(tree.getNodes());
            tree.showNodes(nodes);
        },

        /**
         * 删除已选择的结点
         * @param event
         */
        onDelete: function (event) {
            var self = vueResource;
            var target = event.currentTarget;
            var nodeId = $(target).data("id");
            self.devices = _.reject(self.devices, function (item) {
                return item.id == nodeId;
            });
            service._updateNode();
        },
        /**
         * 删除已选择的结点id
         * @param event
         */
        onDeleteById: function (nodeId) {
            var self = vueResource;
            self.devices = _.reject(self.devices, function (item) {
                return item.id == nodeId;
            });
            service._updateNode();
        },
        /**
         * 更新设备树状态
         */
        _updateNode: function () {
            var self = vueResource;
            var tree = service.getTree();
            var nodes = tree.getNodesByParam("checked", true, null);
            _.each(nodes, function (node, index, target) {
                var flag = _.some(self.devices, function (device) {
                    return device.id == node.id;
                });
                if (!flag) {
                    node.checked = false;
                    tree.updateNode(node);
                }
            })
        },

        /**
         * 获取所有结点
         */
        getAllNodes: function () {
            var tree = service.getTree();
            return tree.transformToArray(tree.getNodes());
        },

        /**
         * 获取已经结构化的设备的Dom结点id(tId)的数组
         */
        structuredtIds: function () {
            var self = vueResource;
            var allNodes = service.getAllNodes();
            var data = self.treeData;

            function hasTask(device) {
                var ext = device.ext;
                return ext.hasOwnProperty("task"); // ext.task.params.length > 0
            }

            var ids = [];
            _.each(data, function (item, index, target) {
                if (item.isParent) {
                    var children = item.children;
                    for (var i = 0, len = children.length; i < len; i++) {
                        var c = children[i];
                        if (hasTask(c)) {
                            ids.push(c.id);
                        }
                    }
                } else {
                    if (hasTask(item)) {
                        ids.push(item.id);
                    }
                }
            });
            var tIds = [];
            _.each(allNodes, function (node, index, target) {
                if (_.some(ids, function (id) {
                        return !node.isParent && id == node.id;
                    })) {
                    tIds.push(node.tId);
                }
            });
            return tIds;
        }
    };
    return service;
});
