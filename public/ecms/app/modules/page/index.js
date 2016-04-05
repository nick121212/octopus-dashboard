define(["require", "exports", "module", "modules/page/router", "common/directives/compile_directive", "common/directives/gridmenu_directive", "modules/page/controllers/manager_con", "modules/page/controllers/manager_form_con", "common/services/material_provider"], function (require, exports, config, router, compile_directive_1, gridmenu_directive_1, manager_con_1, manager_form_con_1, material_provider_1) {
    "use strict";
    var Module = (function () {
        function Module(name) {
            this.module = angular.module(name, config.config().deps);
            this.config();
            this.run();
            this.initControllers();
        }
        Module.prototype.initControllers = function () {
            new material_provider_1.MaterialServiceCon(this.module);
            compile_directive_1.CompileDirective.init(this.module);
            gridmenu_directive_1.GridMenuDirective.init(this.module);
            this.module
                .controller(manager_con_1.PageManagerController._name, manager_con_1.PageManagerController)
                .controller(manager_form_con_1.PageManagerFormController._name, manager_form_con_1.PageManagerFormController);
        };
        Module.prototype.config = function () {
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                "$mdThemingProvider",
                function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
                    router.init($urlRouterProvider, $stateProvider);
                }]);
        };
        Module.prototype.run = function () {
            this.module.run([
                "$state",
                "$stateParams",
                "Permission",
                function ($state, $stateParams, Permission) {
                    console.log("page_module running！");
                }
            ]);
        };
        return Module;
    }());
    exports.module = new Module("page_module").module;
});
//# sourceMappingURL=index.js.map