define(["require", "exports", "angular", "modules/home/index", "modules/passport/index", "modules/page/index", "modules/ecms/index", "app"], function (require, exports, angular, homeModule, passportModule, pageModule, ecmsModule, appModule) {
    "use strict";
    // 启动
    angular.bootstrap(document, [
        homeModule.module.name,
        passportModule.module.name,
        pageModule.module.name,
        ecmsModule.module.name,
        appModule.module.name
    ]);
});
//# sourceMappingURL=bootstrap.js.map