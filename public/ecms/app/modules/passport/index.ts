import ref = require("ref");
import config = require("module");
import router = require("modules/passport/router");

import {PassportIndexController} from "modules/passport/controllers/index_con";
import {PassportLoginController} from "modules/passport/controllers/login_con";

// import {HomeLeftController} from "modules/home/controllers/left_con";
// import {HomeRightController} from "modules/home/controllers/right_con";

import {MaterialServiceCon} from "common/services/material_provider";

class HomeModule {
    module: angular.IModule;

    constructor(name: string) {
        this.module = angular.module(name, config.config().deps);
        this.config();
        this.run();
        this.initControllers();
    }

    initControllers() {
        new MaterialServiceCon(this.module);
        this.module
            .controller(PassportIndexController._name, PassportIndexController)
            .controller(PassportLoginController._name, PassportLoginController);
    }

    config() {
        this.module.config([
            "$stateProvider",
            "$urlRouterProvider",
            ($stateProvider, $urlRouterProvider): void => {
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
                console.log("passport_module running！");
            }
        ]);
    }
}

export var module = new HomeModule("passport_module").module;