var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_form_con"], function (require, exports, manager_form_con_1) {
    "use strict";
    var RoleGroupManagerController = (function (_super) {
        __extends(RoleGroupManagerController, _super);
        function RoleGroupManagerController() {
            _super.apply(this, arguments);
            this.roleGroups = {};
        }
        /**
         * 验证是否选中
         */
        RoleGroupManagerController.prototype.checked = function (item) {
            return this.roleGroups.hasOwnProperty(item["key"]);
        };
        /**
         * 初始化接口信息和数据
         */
        RoleGroupManagerController.prototype.initInterfaces = function () {
            var datas = [];
            datas = _.map(this.roleGroups, function (ga) {
                return ga;
            });
            return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, {
                roleKey: this.currentItem["key"],
                rolegroups: datas
            }, this.params);
        };
        /**
         * 初始化表单
         */
        RoleGroupManagerController.prototype.initForm = function () {
            _super.prototype.initForm.call(this);
            console.log(this.rolegroups);
            this.roleGroups = _.keyBy(this.rolegroups, "groupKey");
            console.log(this.roleGroups);
        };
        /**
         * 选中/取消当前项目
         */
        RoleGroupManagerController.prototype.toggleAction = function (item) {
            if (this.roleGroups.hasOwnProperty(item["key"])) {
                delete this.roleGroups[item["key"]];
            }
            else {
                this.roleGroups[item["key"]] = {
                    roleKey: this.currentItem["key"],
                    groupKey: item.key
                };
            }
        };
        RoleGroupManagerController.$inject = manager_form_con_1.PageManagerFormController.$inject.concat([]);
        RoleGroupManagerController._name = "RoleGroupManagerController";
        return RoleGroupManagerController;
    }(manager_form_con_1.PageManagerFormController));
    exports.RoleGroupManagerController = RoleGroupManagerController;
});
//# sourceMappingURL=role_group_con.js.map