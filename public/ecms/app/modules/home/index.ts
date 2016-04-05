import ref = require("ref");
import config = require("module");
import router = require("modules/home/router");

import {HomeIndexController} from "modules/home/controllers/index_con";
import {HomeLeftController} from "modules/home/controllers/left_con";
import {HomeRightController} from "modules/home/controllers/right_con";
import {HomeContentController} from "modules/home/controllers/content_con";

import {MaterialServiceCon} from "common/services/material_provider";
import {FileUploadDirective} from "common/directives/fileupload_directive";


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
        FileUploadDirective.init(this.module);
        this.module
            .controller(HomeIndexController._name, HomeIndexController)
            .controller(HomeLeftController._name, HomeLeftController)
            .controller(HomeRightController._name, HomeRightController)
            .controller(HomeContentController._name, HomeContentController)
            ;
    }

    config() {
        this.module.config([
            "$stateProvider",
            "$urlRouterProvider",
            "$mdThemingProvider",
            "mdSideMenuSectionsProvider",
            ($stateProvider, $urlRouterProvider, $mdThemingProvider, mdSideMenuSectionsProvider): void => {
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
                console.log("home_module running！");
            }
        ]);
    }
}

export var module = new HomeModule("home_module").module;