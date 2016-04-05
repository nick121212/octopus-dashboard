import ref = require("ref");

export var init = ($urlRouterProvider, $stateProvider) => {
    $stateProvider.state("home", {
        url: "/",
        data: {
            permissions: {
                except: ["anonymous"],
                only: ["user"]
            }
        },
        views: {
            "": {
                templateUrl: "ecms/app/modules/home/tpls/index.html",
                controller: "HomeIndexController",
                controllerAs: "homeIndexCtl",
            },
            "sidenav_right@home": {
                templateUrl: "ecms/app/modules/home/tpls/right.html",
                controller: "HomeRightController",
                controllerAs: "homeRightCtl"
            },
            "sidenav_left@home": {
                templateUrl: "ecms/app/modules/home/tpls/left.html",
                controller: "HomeLeftController",
                controllerAs: "homeLeftCtl"
            },
            "content_main@home": {
                templateUrl: "ecms/app/modules/home/tpls/content.html",
                controller: "HomeContentController",
                controllerAs: "homeContentCtl"
            }
        }
    });

};