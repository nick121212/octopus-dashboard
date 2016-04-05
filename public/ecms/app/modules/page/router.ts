import ref = require("ref");

export var init = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("home.page", {
        url: "pages/:key",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "content_main": {
                templateUrl: "ecms/app/modules/page/tpls/manager.html",
                controller: "PageManagerController",
                controllerAs: "managerCtl"
            }
        }
    });

};