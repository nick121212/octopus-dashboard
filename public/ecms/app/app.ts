import ref = require("ref");
import config = require("module");
import darkTheme = require("themes/dark");
import anonymousRole = require("roles/anonymous");
import useRole = require("roles/user");

import {init} from "common/directives/tv4-custom-formats";

class AppModule {
    module: angular.IModule;

    constructor(name: string) {
        this.module = angular.module(name, config.config().deps);
        this.initHttpInterceptor();
        // FileUploadDirective.init(this.module);
        this.module.directive("root", ["$rootScope", "$state", "material", ($rootScope, $state, material) => {
            return {
                link: () => {
                    console.log("root directive complete!");
                    $rootScope.user = {
                        nickname: "未设置",
                        avatarUrl: ""
                    };
                    // 显示错误信息
                    $rootScope.$on("showError", (state, ename, data) => {
                        material.showMsg(data);
                    });
                    // 未登录
                    $rootScope.$on("userIntercepted", (state, ename, data) => {
                        $state.go(data || "passport");
                    });
                    // 用户信息
                    $rootScope.$on("userInfo", (state, user) => {
                        if (!user || typeof user !== "object") {
                            return;
                        }
                        $rootScope.user.nickname = user.display_name;
                    });
                }
            };
        }]);
        this.config();
        this.run();
    }

    initHttpInfo($httpProvider: angular.IHttpProvider) {
        $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
        $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        // Override $http service"s default transformRequest
        $httpProvider.defaults["transformRequest"] = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            let param = function(obj) {
                let query = "";
                let name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Date) {
                        query += encodeURIComponent(name) + "="
                            + "\/Date(" + value.getTime() + "-0000)\/" + "&";
                    }
                    else if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + "[" + i + "]";
                            // fullSubName = name + "[]";
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + "&";
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + "[" + subName + "]";
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + "&";
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + "="
                            + encodeURIComponent(value) + "&";
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== "[object File]"
                ? param(data)
                : data;
        }];
        // 添加http拦截器
        $httpProvider.interceptors.push("errorInterceptor");
    }

    initHttpInterceptor() {
        this.module.factory("errorInterceptor", ["$rootScope", "$q", ($rootScope: angular.IRootScopeService, $q: angular.IQService): any => {
            return {
                "request": (httpConfig) => {
                    let deferred;

                    if (httpConfig.needCancel === true) {
                        deferred = $q.defer();
                        httpConfig.timeout = deferred.promise;
                        httpConfig.cancel = deferred;
                    }

                    return httpConfig;
                },
                "responseError": (response) => {
                    if (response.data.error) {
                        $rootScope.$emit("showError", "error", response.data.error.message);
                    }
                    else {
                        switch (response.status) {
                            case 0:
                                $rootScope.$emit("showError", "error", "net::ERR_CONNECTION_REFUSED");
                                break;
                            case 403:
                                $rootScope.$emit("userIntercepted", "passport");
                                break;
                            case 404:
                                $rootScope.$emit("showError", "error", "404");
                                break;
                            case 400:
                                $rootScope.$emit("showError", "error", response.data.error ? response.data.error.message : 400);
                                break;
                            case 500:
                                $rootScope.$emit("showError", "error", "500");
                                break;
                            default:
                                console.log(response.status);
                        }
                    }

                    return $q.reject(response);
                },
                "response": (response) => {
                    if (response.status === 200 && response.data instanceof Object) {
                        if (response.data.flag) {
                            $rootScope.$emit(response.data.flag, response.data.data);
                        }
                    }
                    return response;
                }
            };
        }]);
    }

    initRoles($q, Permission, Restangular) {
        anonymousRole.init($q, Permission, Restangular);
        useRole.init($q, Permission, Restangular);
    }

    config() {
        this.module.config([
            "$stateProvider",
            "$urlRouterProvider",
            "$httpProvider",
            "$mdThemingProvider",
            "sfErrorMessageProvider",
            "$locationProvider",
            "schemaFormDecoratorsProvider",
            ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, sfErrorMessageProvider, $locationProvider, schemaFormDecoratorsProvider, sfErrorMessage) => {
                $urlRouterProvider.otherwise(($injector) => {
                    let $state = $injector.get("$state");
                    $state.go("home");
                });
                // 默认material样式
                darkTheme.init($mdThemingProvider);
                // 开启html5模式
                // $locationProvider.html5Mode(true);
                // 初始化http拦截器信息
                this.initHttpInfo($httpProvider);
                // 添加schemaform中的自定义组件
                schemaFormDecoratorsProvider.addMapping("materialDecorator", "jsoneditor", "ecms/app/common/material-decorator/jsoneditor.html");
                schemaFormDecoratorsProvider.addMapping("materialDecorator", "ueditor", "ecms/app/common/material-decorator/ueditor.html");
                schemaFormDecoratorsProvider.addMapping("materialDecorator", "fileupload", "ecms/app/common/material-decorator/fileupload.html");
                // 自定义错误信息
                init();

                sfErrorMessageProvider.setDefaultMessage(10000, "邮箱格式不正确");
                sfErrorMessageProvider.setDefaultMessage(10001, "两次密码不一致");
                sfErrorMessageProvider.setDefaultMessage(10002, "用户名中存在非法字符");
                sfErrorMessageProvider.setDefaultMessage(10003, "手机格式不正确");
                sfErrorMessageProvider.setDefaultMessage(10004, "JSON格式不正确");
                sfErrorMessageProvider.setDefaultMessage(302, "[{{title}}]是必填项");
                sfErrorMessageProvider.setDefaultMessage("url", "[{{title}}]格式不正确");
                sfErrorMessageProvider.setDefaultMessage("103", "[{{title}}]超过了最大值{{schema.maximum}}");
                sfErrorMessageProvider.setDefaultMessage("101", "[{{title}}]小于最小值{{schema.minimum}}");
                sfErrorMessageProvider.setDefaultMessage("200", "[{{title}}]字符长度小于最小值({{schema.minLength}})");
                sfErrorMessageProvider.setDefaultMessage("201", "[{{title}}]字符长度大于最大值({{schema.maxLength}})");
            }]
        );
    }

    run() {
        this.module.run([
            "$rootScope",
            "Permission",
            "Restangular",
            "$q",
            ($rootScope, Permission, Restangular, $q): void => {
                console.log("app_module running!");
                this.initRoles($q, Permission, Restangular);
                Restangular.setBaseUrl("/ecms/api");
            }
        ]);
    }
}

export var module = new AppModule("app_module").module;