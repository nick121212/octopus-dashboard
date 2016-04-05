define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.init = function ($urlRouterProvider, $stateProvider) {
        $stateProvider.state("home.pagetag", {
            url: "pagetag/:key",
            data: {
                permissions: {
                    except: ["anonymous"],
                    only: ["user"]
                }
            },
            views: {
                "content_main": {
                    templateUrl: "ecms/app/modules/ecms/tpls/pagetag.html",
                    controller: "PageTagManagerController",
                    controllerAs: "managerCtl"
                }
            }
        });
    };
});
//# sourceMappingURL=router.js.map