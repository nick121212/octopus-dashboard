import ref = require("ref");
import {ControllerBase} from "common/controllers/controller_base";
import {IMaterialService} from "common/interfaces/material_service";

export class MaterialControllerBase extends ControllerBase {
    /**
     * ngMaterial的基础provider封装
     * */
    protected material: IMaterialService;
    /**
     * ngMaterial 弹窗服务
     * */
    protected $mdDialog: angular.material.IDialogService;
    /**
     * 是否处于忙碌状态
     * */
    public isBusy: boolean = false;
    /**
     * 用户表单的验证
     * */
    public schema: Object;
    /**
     * 用于多个接口同时返回
     * */
    public serverInterfaces: { [index: string]: angular.IPromise<any> } = {};
    /**
     * 标题  
     * */
    public title: string;
    /**
     * 图标，依赖于angular-material-icons
     * */
    public icon: any;
    /**
     * restangular
     */
    public Restangular: any;
    /**
     * 构造
     * args: arguments
     * */
    constructor(args: IArguments) {
        super(args);
    }
    /**
         * 关闭表单
         */
    close() {
        this.$mdDialog && this.$mdDialog.cancel();
    }
    /**
     * 处理地址，menus/:id => menus/1
     */
    private initHref(inteface, item?: {}) {
        let restInterface = null;

        _.each(inteface.api.split("/"), (href) => {
            if (href.search(":") === 0) {
                href = item[href.substring(1)];
            }
            if (!restInterface) {
                restInterface = this.Restangular.all(href);
            } else {
                restInterface = restInterface.all(href);
            }
        }, this);

        return restInterface;
    }
    /**
     * 初始化接口信息，生成rest风格
     */
    initServerInterfaces(action, queryData, item: Object = {}): angular.IPromise<any> {
        let defer = this.$q.defer();
        let promise = null;
        let params = {};
        let restInterface = null;
        let serverInterfaces = {};
        let interfaceKeys = [];
        let schemaKeys = [];

        // this.isBusy = true;
        interfaceKeys = _.map(JSON.parse(action.interfaces), (inteface) => {
            return inteface["inteface"];
        }, this);

        action.searchSchemaKey && schemaKeys.push(action.searchSchemaKey);
        action.formSchemaKey && schemaKeys.push(action.formSchemaKey);
        action.dataSchemaKey && schemaKeys.push(action.dataSchemaKey);

        this.$q.all({
            interfaces: this.Restangular.all("interfaces").doGET.bind(this, null, { filter: { where: { key: { $in: interfaceKeys } } } })(),
            schemas: this.Restangular.all("schemas").doGET.bind(this, null, { filter: { where: { key: { $in: schemaKeys } } } })()
        }).then((results) => {
            // 处理SCHEMA信息
            let schemas = _.keyBy(results["schemas"].rows, "key");
            action.searchSchema = schemas[action.searchSchemaKey];
            action.formSchema = schemas[action.formSchemaKey];
            action.dataSchema = schemas[action.dataSchemaKey];

            action.searchSchema && action.searchSchema.content && (action.searchSchema = JSON.parse(action.searchSchema.content));
            action.formSchema && action.formSchema.content && (action.formSchema = JSON.parse(action.formSchema.content));
            action.dataSchema && action.dataSchema.content && (action.dataSchema = JSON.parse(action.dataSchema.content));

            // 处理接口信息
            action.interfaceObjects = results["interfaces"].rows;
            _.each(action.interfaceObjects, (inteface) => {
                // 本地接口
                if (inteface.isSystem) {
                    restInterface = this.initHref(inteface, _.extend({}, item, queryData));
                    inteface.needParams && (params[inteface.prefix || "filter"] = queryData);
                    if (inteface.needParams) {
                        restInterface = restInterface["do" + inteface.verb].bind(this, null, params);
                    } else {
                        restInterface = restInterface["do" + inteface.verb].bind(this);
                    }
                } else {
                    restInterface = this.Restangular.one("interfaces", inteface.key).all("execute");
                    inteface.needParams && (params[inteface.prefix || "filter"] = queryData);
                    inteface.needParams && (action._queryParams = params);
                    restInterface = restInterface.customPOST;
                }
                serverInterfaces[inteface.key] = restInterface;
            }, this);
            // 返回promise
            defer.resolve(serverInterfaces);
        }).finally(() => {
            // this.isBusy = false;
        });

        return defer.promise;
    }
    dealInterfaces(interfaceObjects, interfaces, data, params) {
        let promises: { [index: string]: ng.IPromise<any> } = {};

        _.each(interfaceObjects, (inteface) => {
            let fn = interfaces[inteface.key];

            promises[inteface.key] = fn(inteface.needDatas ? data : null, null, inteface.needParams ? params : null);
        });

        return promises;
    }
    dealResults(action, results) {
        _.each(action.interfaceObjects, (inteface) => {
            let result = results[inteface.key];

            if (!result) {
                return;
            }

            if (typeof inteface.fields === "string") {
                inteface.fields = JSON.parse(inteface.fields);
            }

            _.each(inteface.fields, (field) => {
                let pd;

                _.each(field.path.split("."), (path) => {
                    if (!pd) {
                        pd = result[path];
                    } else {
                        pd = pd[path];
                    }
                    if (!pd) {
                        return false;
                    }
                }, this);
                this[field.field] = pd;
            }, this);
        }, this);
    }
    /**
     * 删除所有的自定义属性
     */
    deleteNullProperty(data: Object) {
        _.each(data, (d, key) => {
            if (d == null || d === undefined) {
                delete data[key];
            }
        }, this);
    }
}