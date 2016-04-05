
import ref = require("ref");
import {MaterialPopupController} from "common/controllers/material_popup_controller";

export class PassportLoginController extends MaterialPopupController<Object> {
    public static _name: string = "PassportLoginController";
    public static $inject: Array<any> = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];

    constructor() {
        super(arguments);
        this.init();
    }

    initInterfaces() {
        return this.dealInterfaces([{
            "key": "loginCheck",
            "needDatas": true,
            "needParams": false
        }], this.serverInterfaces, this.formData, {});
    }

    init() {
        this.initSchema();
        this.serverInterfaces = {
            "loginCheck": this.Restangular.oneUrl("/", "/ecms").one("login").doPOST
        };
        this.dialogCloseFn = () => {
            this.material.showMsg("登录成功");
            this.$state.go("home");
        };
    }

    initSchema() {
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
    }
}