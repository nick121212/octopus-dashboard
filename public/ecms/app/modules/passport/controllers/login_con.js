var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_popup_controller"], function (require, exports, material_popup_controller_1) {
    "use strict";
    var PassportLoginController = (function (_super) {
        __extends(PassportLoginController, _super);
        function PassportLoginController() {
            _super.call(this, arguments);
            this.init();
        }
        PassportLoginController.prototype.initInterfaces = function () {
            return this.dealInterfaces([{
                    "key": "loginCheck",
                    "needDatas": true,
                    "needParams": false
                }], this.serverInterfaces, this.formData, {});
        };
        PassportLoginController.prototype.init = function () {
            var _this = this;
            this.initSchema();
            this.serverInterfaces = {
                "loginCheck": this.Restangular.oneUrl("/", "/ecms").one("login").doPOST
            };
            this.dialogCloseFn = function () {
                _this.material.showMsg("登录成功");
                _this.$state.go("home");
            };
        };
        PassportLoginController.prototype.initSchema = function () {
            this.schema = {
                type: "object",
                required: ["username", "password"],
                properties: {
                    username: {
                        type: "string",
                        minLength: 4,
                        maxLength: 30,
                        title: "用户名",
                        description: ""
                    },
                    password: {
                        type: "string",
                        title: "密码",
                        minLength: 4,
                        maxLength: 30,
                        description: ""
                    }
                }
            };
            this.form = [
                {
                    key: "username",
                    type: "string",
                    icon: {
                        icon: "person",
                    },
                    htmlClass: "md-icon-float md-has-icon",
                    description: "用户名"
                }, {
                    key: "password",
                    type: "password",
                    icon: {
                        icon: "lock_outline"
                    },
                    htmlClass: "md-icon-float md-has-icon",
                    description: "用户密码"
                }];
            this.formData = {};
        };
        PassportLoginController._name = "PassportLoginController";
        PassportLoginController.$inject = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
        return PassportLoginController;
    }(material_popup_controller_1.MaterialPopupController));
    exports.PassportLoginController = PassportLoginController;
});
//# sourceMappingURL=login_con.js.map