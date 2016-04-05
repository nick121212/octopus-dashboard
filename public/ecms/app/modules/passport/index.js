define(["require", "exports", "module", "modules/passport/router", "modules/passport/controllers/index_con", "modules/passport/controllers/login_con", "common/services/material_provider"], function (require, exports, config, router, index_con_1, login_con_1, material_provider_1) {
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
            this.module
                .controller(index_con_1.PassportIndexController._name, index_con_1.PassportIndexController)
                .controller(login_con_1.PassportLoginController._name, login_con_1.PassportLoginController);
        };
        HomeModule.prototype.config = function () {
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                function ($stateProvider, $urlRouterProvider) {
                    router.init($urlRouterProvider, $stateProvider);
                }]);
        };
        HomeModule.prototype.run = function () {
            this.module.run([
                "$state",
                "$stateParams",
                "Permission",
                function ($state, $stateParams, Permission) {
                    console.log("passport_module running！");
                }
            ]);
        };
        return HomeModule;
    }());
    exports.module = new HomeModule("passport_module").module;
});
//# sourceMappingURL=index.js.map