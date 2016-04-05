/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require("ref");
import {MaterialControllerBase} from "common/controllers/material_controller_base";

export class HomeRightController extends MaterialControllerBase {
    public static $inject: Array<string> = ["$rootScope", "$scope", "$mdDialog", "Restangular", "mdSideMenuSections", "mdSideMenuFactory"];
    public static _name = "HomeRightController";

    constructor() {
        super(arguments);
    }

    doExit($event: MouseEvent) {
        let confirm = this.$mdDialog.confirm()
            .title("退出登录")
            .textContent("确定要退出登录吗？")
            .ariaLabel("退出登录")
            .ok("知道了")
            .cancel("取消")
            .targetEvent($event);

        this.$mdDialog.show(confirm).then(() => {
            this.Restangular.oneUrl("/", "/ecms").all("logout").doPOST();
        });
    }
}