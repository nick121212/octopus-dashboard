var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_con", "common/models/toolbar_item", "lodash"], function (require, exports, manager_con_1, toolbar_item_1, _) {
    "use strict";
    var PageTagManagerController = (function (_super) {
        __extends(PageTagManagerController, _super);
        function PageTagManagerController() {
            _super.apply(this, arguments);
        }
        PageTagManagerController.prototype.init = function () {
            _super.prototype.init.call(this);
        };
        PageTagManagerController.prototype.initDataFilter = function () {
            var _this = this;
            var fn = _super.prototype.initDataFilter.call(this);
            return this.dataFilter = function (results) {
                fn(results);
                _this.clientData["post_classes"] = _.map(_this.clientData["post_classes"], function (item) {
                    return item["name"];
                }, _this);
                _this.clientData["video_classes"] = _.map(_this.clientData["video_classes"], function (item) {
                    return item["name"];
                }, _this);
                _this.clientData["index_post_tags"] = _.map(_this.clientData["index_post_tags"], function (item) {
                    return item["name"];
                }, _this);
                _this.clientData["index_video_tags"] = _.map(_this.clientData["index_video_tags"], function (item) {
                    return item["name"];
                }, _this);
                _this.clientData["hot_tags"] = _.map(_this.clientData["hot_tags"], function (item) {
                    return item["name"];
                }, _this);
                return _this.clientData;
            };
        };
        PageTagManagerController.prototype.initSearch = function (action) {
            var _this = this;
            this.initSchema();
            var tool = new toolbar_item_1.ToolbarItem({
                title: this.saveAction.title,
                icon: this.saveAction.icon,
                onClick: function ($event, item) {
                    this.$rootScope.$broadcast("schemaFormValidate");
                    if (this.$form.$dirty && this.$form.$valid && !this.isBusy) {
                        this.doAction($event, this.clientData, this.saveAction);
                    }
                }.bind(this)
            });
            this.rootToolbars.push(tool);
            this.rootToolbars.push(new toolbar_item_1.ToolbarItem({
                title: "刷新",
                icon: "refresh",
                onClick: function ($event) {
                    _this.getServerData();
                }
            }));
        };
        PageTagManagerController.prototype.initToolbar = function () { };
        PageTagManagerController.prototype.initSchema = function () {
            this.saveAction = _.find(this.menu.actions, function (act) {
                return act["key"] === "pagetag-save";
            });
            this.saveAction && this.initServerInterfaces(this.saveAction, this.queryData, {}).then(function (serverInterfaces) {
            });
        };
        PageTagManagerController.$inject = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
        PageTagManagerController._name = "PageTagManagerController";
        return PageTagManagerController;
    }(manager_con_1.PageManagerController));
    exports.PageTagManagerController = PageTagManagerController;
});
//# sourceMappingURL=pagetab_con.js.map