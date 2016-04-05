define(["require", "exports", "module", "modules/home/router", "modules/home/controllers/index_con", "modules/home/controllers/left_con", "modules/home/controllers/right_con", "modules/home/controllers/content_con", "common/services/material_provider", "common/directives/fileupload_directive"], function (require, exports, config, router, index_con_1, left_con_1, right_con_1, content_con_1, material_provider_1, fileupload_directive_1) {
    "use strict";
    var HomeModule = (function () {
        function HomeModule(name) {
            this.module = angular.module(name, config.config().deps);
            this.config();
            this.run();
            this.initControllers();
        }
        HomeModule.prototype.initControllers = function () {
            new material_provider_1.MaterialServiceCon(this.module);
            fileupload_directive_1.FileUploadDirective.init(this.module);
            this.module
                .controller(index_con_1.HomeIndexController._name, index_con_1.HomeIndexController)
                .controller(left_con_1.HomeLeftController._name, left_con_1.HomeLeftController)
                .controller(right_con_1.HomeRightController._name, right_con_1.HomeRightController)
                .controller(content_con_1.HomeContentController._name, content_con_1.HomeContentController);
        };
        HomeModule.prototype.config = function () {
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                "$mdThemingProvider",
                "mdSideMenuSectionsProvider",
                function ($stateProvider, $urlRouterProvider, $mdThemingProvider, mdSideMenuSectionsProvider) {
                    router.init($urlRouterProvider, $stateProvider);
                }]);
        };
        HomeModule.prototype.run = function () {
            this.module.run([
                "$state",
                "$stateParams",
                "Permission",
                function ($state, $stateParams, Permission) {
                    console.log("home_module running！");
                }
            ]);
        };
        return HomeModule;
    }());
    exports.module = new HomeModule("home_module").module;
});
//# sourceMappingURL=index.js.map