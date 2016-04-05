var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_popup_controller", "lodash"], function (require, exports, material_popup_controller_1, _) {
    "use strict";
    var PageManagerFormController = (function (_super) {
        __extends(PageManagerFormController, _super);
        function PageManagerFormController() {
            _super.call(this, arguments);
            this.init();
        }
        /**
         * 初始化
         * 查找detailView，如果有，则调用detailView中的接口，覆盖currentItem的值
         */
        PageManagerFormController.prototype.init = function () {
            var _this = this;
            this.title = this.action.title;
            this.detailAction = _.find(this.menu.actions, function (act) {
                return act["key"].search("detail") >= 0;
            });
            if (this.detailAction && this.action.isNeedDetail) {
                this.initServerInterfaces(this.detailAction, this.currentItem, {}).then(function (serverInterfaces) {
                    _this.isBusy = false;
                    _this.getDetailInfo(serverInterfaces, _this.detailAction.interfaceObjects).then(function (results) {
                        _.each(_this.detailAction.interfaceObjects, function (inteface) {
                            var result = results[inteface.key];
                            if (!result) {
                                return;
                            }
                            if (typeof inteface.fields === "string") {
                                inteface.fields = JSON.parse(inteface.fields);
                            }
                            _.each(inteface.fields, function (field) {
                                _this[field.field] = result[field.path];
                            }, _this);
                        }, _this);
                        _this.initForm();
                    });
                });
            }
            else {
                this.initForm();
            }
        };
        PageManagerFormController.prototype.initInterfaces = function () {
            return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, this.formData, this.params);
        };
        /**
         * 获取详情信息
         */
        PageManagerFormController.prototype.getDetailInfo = function (interfaces, interfaceObjects) {
            var _this = this;
            var promises = {};
            if (this.isBusy)
                return;
            this.isBusy = true;
            promises = this.dealInterfaces(interfaceObjects, interfaces, this.currentItem, this.params);
            // _.each(interfaceObjects, (inteface) => {
            //     let fn = interfaces[inteface.key];
            //     promises[inteface.key] = fn(inteface.needDatas ? this.currentItem : null, null, inteface.needParams ? this.params : null);
            // });
            // _.each(this.serverInterfaces, (fn: Function, key: string) => {
            //     if (this.needData) {
            //         promises[key] = fn(this.currentItem, null, this.params);
            //     } else {
            //         promises[key] = fn(null, null, this.params);
            //     }
            // }, this);
            // angular.forEach(interfaces, function(fn: Function, key: string) {
            //     promises[key] = fn(this.currentItem || {});
            // }.bind(this));
            return this.$q.all(promises)
                .finally(function () {
                _this.isBusy = false;
            });
        };
        /**
         * 初始化表单
         * 获取表单所需接口信息
         * 获取schema信息
         * 设置默认值
         * 设置关闭回调函数
         */
        PageManagerFormController.prototype.initForm = function () {
            var _this = this;
            this.initServerInterfaces(this.action, this.currentItem).then(function (serverInterfaces) {
                _this.serverInterfaces = serverInterfaces;
                _this.params = _this.action._queryParams;
                _this.schema = _this.action.dataSchema;
                _this.action.formSchema && (_this.form = _this.action.formSchema.form);
            });
            this.needData = true; // this.action.needDatas;
            this.currentItem = this.currentItem || {};
            this.formData = angular.extend({}, this.currentItem);
            // 是否需要清除当前的数据。
            // 例子：menu需要parentId的时候，但是不需要parentId对应的数据
            if (this.action.clearCurrentItem) {
                this.formData = {};
            }
            // 处理默认值方法
            if (typeof this.action.defaultDatas === "string") {
                this.action.defaultDatas = JSON.parse(this.action.defaultDatas);
            }
            _.each(this.action.defaultDatas, function (field, key) {
                var val = null;
                _.each(_this.sfPath.parse(field.path), function (path) {
                    if (val) {
                        val = val[path];
                    }
                    else {
                        val = _this[path];
                    }
                }, _this);
                val && (_this.formData[key] = val);
            }, this);
            this.deleteNullProperty(this.formData);
            this.content = this.action.title + "成功";
            this.dialogCloseFn = function () {
                var _this = this;
                this.material.alert(this.title, this.content).finally(function () {
                    _this.action.isRefresh && _this.managerGrid && _this.managerGrid.getServerData && _this.managerGrid.getServerData();
                });
            }.bind(this);
        };
        PageManagerFormController.$inject = ["$rootScope", "$scope", "$q", "$http", "$mdDialog", "$mdToast", "material", "managerGrid", "Restangular", "currentItem", "$state", "$stateParams", "action", "menu", "sfPath"];
        PageManagerFormController._name = "PageManagerFormController";
        PageManagerFormController._templateUrl = "ecms/app/modules/page/tpls/manager_form.html";
        return PageManagerFormController;
    }(material_popup_controller_1.MaterialPopupController));
    exports.PageManagerFormController = PageManagerFormController;
});
//# sourceMappingURL=manager_form_con.js.map