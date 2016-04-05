import ref = require("ref");

export var init = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("passport", {
        url: "/passport",
        data: {
            // permissions: {
            //     only: ["anonymous"]
            // }
        },
        views: {
            "": {
                templateUrl: "ecms/app/modules/passport/tpls/index.html",
                controller: "PassportIndexController",
                controllerAs: "passportIndexController"
            },
            "content_main@passport": {
                templateUrl: "ecms/app/modules/passport/tpls/login.html",
                controller: "PassportLoginController",
                controllerAs: "passportLoginController"
            }
        }
    });

};