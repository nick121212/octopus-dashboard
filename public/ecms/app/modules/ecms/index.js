define(["require", "exports", "module", "modules/ecms/router", "modules/ecms/controllers/pagetab_con", "modules/ecms/controllers/group_action_con", "modules/ecms/controllers/role_group_con", "common/services/material_provider"], function (require, exports, config, router, pagetab_con_1, group_action_con_1, role_group_con_1, material_provider_1) {
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
            // CompileDirective.init(this.module);
            // GridMenuDirective.init(this.module);
            this.module
                .controller(pagetab_con_1.PageTagManagerController._name, pagetab_con_1.PageTagManagerController)
                .controller(group_action_con_1.GroupActionManagerController._name, group_action_con_1.GroupActionManagerController)
                .controller(role_group_con_1.RoleGroupManagerController._name, role_group_con_1.RoleGroupManagerController);
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
    exports.module = new Module("ecms_module").module;
});
//# sourceMappingURL=index.js.map