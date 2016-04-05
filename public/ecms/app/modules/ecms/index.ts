import ref = require("ref");
import config = require("module");
import router = require("modules/ecms/router");

import {PageTagManagerController} from "modules/ecms/controllers/pagetab_con";
import {GroupActionManagerController} from "modules/ecms/controllers/group_action_con";
import {RoleGroupManagerController} from "modules/ecms/controllers/role_group_con";
import {MaterialServiceCon} from "common/services/material_provider";

class Module {
    module: angular.IModule;

    constructor(name: string) {
        this.module = angular.module(name, config.config().deps);
        this.config();
        this.run();
        this.initControllers();
    }

    initControllers() {
        new MaterialServiceCon(this.module);
        // CompileDirective.init(this.module);
        // GridMenuDirective.init(this.module);
        this.module
            .controller(PageTagManagerController._name, PageTagManagerController)
            .controller(GroupActionManagerController._name, GroupActionManagerController)
            .controller(RoleGroupManagerController._name, RoleGroupManagerController)
            ;
    }

    config() {
        this.module.config([
            "$stateProvider",
            "$urlRouterProvider",
            "$mdThemingProvider",
            ($stateProvider, $urlRouterProvider, $mdThemingProvider): void => {
                router.init($urlRouterProvider, $stateProvider);
            }]
        );
    }

    run() {
        this.module.run([
            "$state",
            "$stateParams",
            "Permission",
            ($state, $stateParams, Permission): void => {
                console.log("page_module running！");
            }
        ]);
    }
}

export var module = new Module("ecms_module").module;