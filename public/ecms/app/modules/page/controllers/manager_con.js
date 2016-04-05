var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_grid_controller", "modules/page/controllers/manager_form_con", "common/models/toolbar_item", "lodash"], function (require, exports, material_grid_controller_1, manager_form_con_1, toolbar_item_1, _) {
    "use strict";
    var PageManagerController = (function (_super) {
        __extends(PageManagerController, _super);
        function PageManagerController() {
            _super.call(this, arguments);
        }
        /**
         * 页面初始化
         * 获取menu的详情信息
         * 获取操作信息
         */
        PageManagerController.prototype.init = function () {
            var _this = this;
            this.isBusy = true;
            this.initKey();
            this.$q.all({
                menu: this.Restangular.one("menus", this.key).all("edit").doGET(),
                actions: this.Restangular.all("actions").doGET.bind(this, null, { filter: { where: { parentKey: this.key } } })()
            }).then(function (results) {
                _this.menu = results["menu"];
                _this.menu.actions = results["actions"].rows;
                _this.initView();
                document.title = _this.menu.title;
            });
        };
        /**
         * 查找到带有view的操作
         * 找到则继续操作，否则报出错误信息
         */
        PageManagerController.prototype.initView = function () {
            var _this = this;
            var err = function () {
                _this.material.alert(_this.title, "没有配置带有view的操作!").finally(function () {
                    // this.$state.go("home");
                });
                return;
            };
            this.viewAction = _.find(this.menu.actions, function (act) {
                return act["isList"] === true;
            });
            if (!this.viewAction) {
                return err();
            }
            this.initServerInterfaces(this.viewAction, this.queryData).then(function (serverInterfaces) {
                _this.serverInterfaces = serverInterfaces;
                _this.initDataFilter();
                _this.isBusy = false;
                _this.initSearch(_this.viewAction);
                _this.getServerData();
            });
            this.initColumns();
            this.initToolbar();
        };
        /**
         * 确认操作
         */
        PageManagerController.prototype.doConfirm = function ($event, itemData, action) {
            var _this = this;
            this.initServerInterfaces(action, this.queryData, itemData).then(function (serverInterfaces) {
                _this.confirm({
                    title: action.title,
                    content: "确认吗?",
                    $event: $event,
                    isRefresh: action.isRefresh,
                    ignoreSelection: true
                }, serverInterfaces, function () {
                    return itemData;
                }, action).then(function (data) {
                    console.log(data);
                });
            });
        };
        /**
         * 跳转操作
         */
        PageManagerController.prototype.doLink = function ($event, itemData, action) {
            var _this = this;
            var routes = [];
            _.each(action.linkUrl.split("/"), function (href) {
                if (href.search(":") === 0) {
                    routes.push(itemData[href.substring(1)] || _this.$stateParams[href.substring(1)]);
                }
            }, this);
            routes.length && (location.hash = routes.join(""));
        };
        /**
         * 弹窗操作
         */
        PageManagerController.prototype.doPopup = function ($event, itemData, action) {
            var dialogOptions = {
                controller: action.controller || manager_form_con_1.PageManagerFormController._name,
                templateUrl: action.templateUrl || manager_form_con_1.PageManagerFormController._templateUrl,
                controllerAs: "formCtl",
                clickOutsideToClose: false,
                escapeToClose: false,
                targetEvent: $event,
                locals: {
                    "managerGrid": this,
                    "currentItem": itemData,
                    "action": action,
                    "menu": this.menu
                }
            };
            this.$mdDialog.show(dialogOptions);
        };
        /**
         * 按钮点击事件
         * 1：无操作
         * 2：确认操作
         * 3：跳转操作
         * 4：弹窗操作
         * 5：自定义操作
         */
        PageManagerController.prototype.doAction = function ($event, itemData, action) {
            switch (~~action.optype) {
                case 2:
                    this.doConfirm($event, itemData, action);
                    break;
                case 3:
                    this.doLink($event, itemData, action);
                    break;
                case 4:
                case 5:
                    this.doPopup($event, itemData, action);
                    break;
            }
        };
        /**
         * 处理返回的数据
         * 根据接口中fields中的数据进行赋值
         */
        PageManagerController.prototype.initDataFilter = function () {
            var _this = this;
            return this.dataFilter = function (results) {
                _this.clientData.datas.length = 0;
                _.each(_this.viewAction.interfaceObjects, function (inteface) {
                    var result = results[inteface.key];
                    if (!result) {
                        return;
                    }
                    if (typeof inteface.fields === "string") {
                        inteface.fields = JSON.parse(inteface.fields);
                    }
                    _.each(inteface.fields, function (field) {
                        _this.clientData[field.field] = result[field.path];
                    }, _this);
                }, _this);
                return _this.clientData;
            };
        };
        /**
         * 初始化表头
         */
        PageManagerController.prototype.initColumns = function () {
            this.columns = JSON.parse(this.viewAction.columns);
        };
        /**
         * 初始化菜单
         * 处理单个数据菜单和顶级菜单
         * 暂不处理多选菜单
         * 1：系统操作菜单
         * 2：单个数据菜单
         * 3：多选菜单
         * 4：顶级菜单
         */
        PageManagerController.prototype.initToolbar = function () {
            var _this = this;
            var tool = null;
            _.each(this.menu.actions, function (action) {
                tool = new toolbar_item_1.ToolbarItem({
                    title: action.title,
                    icon: action.icon,
                    onClick: function ($event, item) {
                        _this.doAction($event, item, action);
                    }
                });
                switch (~~action["type"]) {
                    case 2:
                        _this.itemToolbars.push(tool);
                        break;
                    case 3:
                        break;
                    case 4:
                        _this.rootToolbars.push(tool);
                        break;
                }
            }, this);
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "刷新",
                icon: "refresh",
                onClick: function ($event) {
                    _this.getServerData();
                }
            }));
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "搜索",
                icon: "search",
                onClick: function ($event) {
                    _this.toggleSearchBar();
                }
            }));
        };
        /**
         * 初始化搜索
         * 设置schema信息
         * 设置默认的查询数据
         * 设置搜索栏的默认显示状态
         * 设置查询数据的limit值
         */
        PageManagerController.prototype.initSearch = function (action) {
            var _this = this;
            this.defQuery = {};
            this.schema = action.dataSchema;
            this.searchForm = action.searchSchema ? action.searchSchema.form : null;
            if (!this.searchForm || !this.schema) {
                this.rootToolbars.pop();
            }
            else {
                _.forEach(action.searchSchema.query, function (d, key) {
                    _this.defQuery[key] = _this.$stateParams[d] || d;
                });
                console.log(this.defQuery);
                this.searchMode = !!this.searchForm["searchMode"];
                action.searchSchema.form && action.searchSchema["limit"] && (this.queryData.pageCount = this.queryData.limit = action.searchSchema["limit"]);
            }
        };
        PageManagerController._name = "PageManagerController";
        PageManagerController.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$q", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
        return PageManagerController;
    }(material_grid_controller_1.MaterialGridController));
    exports.PageManagerController = PageManagerController;
});
//# sourceMappingURL=manager_con.js.map