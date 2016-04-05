var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/controller_base"], function (require, exports, controller_base_1) {
    "use strict";
    var MaterialControllerBase = (function (_super) {
        __extends(MaterialControllerBase, _super);
        /**
         * 构造
         * args: arguments
         * */
        function MaterialControllerBase(args) {
            _super.call(this, args);
            /**
             * 是否处于忙碌状态
             * */
            this.isBusy = false;
            /**
             * 用于多个接口同时返回
             * */
            this.serverInterfaces = {};
        }
        /**
             * 关闭表单
             */
        MaterialControllerBase.prototype.close = function () {
            this.$mdDialog && this.$mdDialog.cancel();
        };
        /**
         * 处理地址，menus/:id => menus/1
         */
        MaterialControllerBase.prototype.initHref = function (inteface, item) {
            var _this = this;
            var restInterface = null;
            _.each(inteface.api.split("/"), function (href) {
                if (href.search(":") === 0) {
                    href = item[href.substring(1)];
                }
                if (!restInterface) {
                    restInterface = _this.Restangular.all(href);
                }
                else {
                    restInterface = restInterface.all(href);
                }
            }, this);
            return restInterface;
        };
        /**
         * 初始化接口信息，生成rest风格
         */
        MaterialControllerBase.prototype.initServerInterfaces = function (action, queryData, item) {
            var _this = this;
            if (item === void 0) { item = {}; }
            var defer = this.$q.defer();
            var promise = null;
            var params = {};
            var restInterface = null;
            var serverInterfaces = {};
            var interfaceKeys = [];
            var schemaKeys = [];
            // this.isBusy = true;
            interfaceKeys = _.map(JSON.parse(action.interfaces), function (inteface) {
                return inteface["inteface"];
            }, this);
            action.searchSchemaKey && schemaKeys.push(action.searchSchemaKey);
            action.formSchemaKey && schemaKeys.push(action.formSchemaKey);
            action.dataSchemaKey && schemaKeys.push(action.dataSchemaKey);
            this.$q.all({
                interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, { filter: { where: { key: { $in: interfaceKeys } } } })(),
                schemas: this.Restangular.all("schemas").doGET.bind(this, null, { filter: { where: { key: { $in: schemaKeys } } } })()
            }).then(function (results) {
                // 处理SCHEMA信息
                var schemas = _.keyBy(results["schemas"].rows, "key");
                action.searchSchema = schemas[action.searchSchemaKey];
                action.formSchema = schemas[action.formSchemaKey];
                action.dataSchema = schemas[action.dataSchemaKey];
                action.searchSchema && action.searchSchema.content && (action.searchSchema = JSON.parse(action.searchSchema.content));
                action.formSchema && action.formSchema.content && (action.formSchema = JSON.parse(action.formSchema.content));
                action.dataSchema && action.dataSchema.content && (action.dataSchema = JSON.parse(action.dataSchema.content));
                // 处理接口信息
                action.interfaceObjects = results["interfaces"].rows;
                _.each(action.interfaceObjects, function (inteface) {
                    // 本地接口
                    if (inteface.isSystem) {
                        restInterface = _this.initHref(inteface, _.extend({}, item, queryData));
                        inteface.needParams && (params[inteface.prefix || "filter"] = queryData);
                        if (inteface.needParams) {
                            restInterface = restInterface["do" + inteface.verb].bind(_this, null, params);
                        }
                        else {
                            restInterface = restInterface["do" + inteface.verb].bind(_this);
                        }
                    }
                    else {
                        restInterface = _this.Restangular.one("interfaces", inteface.key).all("execute");
                        inteface.needParams && (params[inteface.prefix || "filter"] = queryData);
                        inteface.needParams && (action._queryParams = params);
                        restInterface = restInterface.customPOST;
                    }
                    serverInterfaces[inteface.key] = restInterface;
                }, _this);
                // 返回promise
                defer.resolve(serverInterfaces);
            }).finally(function () {
                // this.isBusy = false;
            });
            return defer.promise;
        };
        MaterialControllerBase.prototype.dealInterfaces = function (interfaceObjects, interfaces, data, params) {
            var promises = {};
            _.each(interfaceObjects, function (inteface) {
                var fn = interfaces[inteface.key];
                promises[inteface.key] = fn(inteface.needDatas ? data : null, null, inteface.needParams ? params : null);
            });
            return promises;
        };
        MaterialControllerBase.prototype.dealResults = function (action, results) {
            var _this = this;
            _.each(action.interfaceObjects, function (inteface) {
                var result = results[inteface.key];
                if (!result) {
                    return;
                }
                if (typeof inteface.fields === "string") {
                    inteface.fields = JSON.parse(inteface.fields);
                }
                _.each(inteface.fields, function (field) {
                    var pd;
                    _.each(field.path.split("."), function (path) {
                        if (!pd) {
                            pd = result[path];
                        }
                        else {
                            pd = pd[path];
                        }
                        if (!pd) {
                            return false;
                        }
                    }, _this);
                    _this[field.field] = pd;
                }, _this);
            }, this);
        };
        /**
         * 删除所有的自定义属性
         */
        MaterialControllerBase.prototype.deleteNullProperty = function (data) {
            _.each(data, function (d, key) {
                if (d == null || d === undefined) {
                    delete data[key];
                }
            }, this);
        };
        return MaterialControllerBase;
    }(controller_base_1.ControllerBase));
    exports.MaterialControllerBase = MaterialControllerBase;
});
//# sourceMappingURL=material_controller_base.js.map