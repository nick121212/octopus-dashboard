import ref = require("ref");
import {MaterialPopupController} from "common/controllers/material_popup_controller";
import {ToolbarItem} from "common/models/toolbar_item";
import {QueryData} from "common/models/query_data";
import {ClientData} from "common/models/client_data";
import * as _ from "lodash";

export class PageManagerFormController extends MaterialPopupController<Object> {
    public static $inject: Array<string> = ["$rootScope", "$scope", "$q", "$http", "$mdDialog", "$mdToast", "material", "managerGrid", "Restangular", "currentItem", "$state", "$stateParams", "action", "menu", "sfPath"];

    public static _name: string = "PageManagerFormController";
    public static _templateUrl = "ecms/app/modules/page/tpls/manager_form.html";

    protected action: any;
    protected menu: any;
    protected detailAction: any;
    protected sfPath: any;

    constructor() {
        super(arguments);
        this.init();
    }
    /**
     * 初始化
     * 查找detailView，如果有，则调用detailView中的接口，覆盖currentItem的值
     */
    init() {
        this.title = this.action.title;
        this.detailAction = _.find(this.menu.actions, (act) => {
            return act["key"].search("detail") >= 0;
        });
        if (this.detailAction && this.action.isNeedDetail) {
            this.initServerInterfaces(this.detailAction, this.currentItem, {}).then((serverInterfaces) => {
                this.isBusy = false;
                this.getDetailInfo(serverInterfaces, this.detailAction.interfaceObjects).then((results) => {
                    _.each(this.detailAction.interfaceObjects, (inteface) => {
                        let result = results[inteface.key];

                        if (!result) {
                            return;
                        }

                        if (typeof inteface.fields === "string") {
                            inteface.fields = JSON.parse(inteface.fields);
                        }

                        _.each(inteface.fields, (field) => {
                            this[field.field] = result[field.path];
                        }, this);
                    }, this);
                    this.initForm();
                });
            });
        } else {
            this.initForm();
        }
    }
    initInterfaces() {
        return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, this.formData, this.params);
    }
    /**
     * 获取详情信息
     */
    getDetailInfo(interfaces: { [index: string]: Function }, interfaceObjects) {
        let promises: { [index: string]: ng.IPromise<any> } = {};

        if (this.isBusy) return;

        this.isBusy = true;

        promises = this.dealInterfaces(interfaceObjects, interfaces, this.currentItem, this.params);
        // _.each(interfaceObjects, (inteface) => {
        //     let fn = interfaces[inteface.key];

        //     promises[inteface.key] = fn(inteface.needDatas ? this.currentItem : null, null, inteface.needParams ? this.params : null);
        // });

        // _.each(this.serverInterfaces, (fn: Function, key: string) => {
        //     if (this.needData) {
        //         promises[key] = fn(this.currentItem, null, this.params);
        //     } else {
        //         promises[key] = fn(null, null, this.params);
        //     }
        // }, this);
        // angular.forEach(interfaces, function(fn: Function, key: string) {
        //     promises[key] = fn(this.currentItem || {});
        // }.bind(this));

        return this.$q.all(promises)
            .finally(() => {
                this.isBusy = false;
            });
    }
    /**
     * 初始化表单
     * 获取表单所需接口信息
     * 获取schema信息
     * 设置默认值
     * 设置关闭回调函数
     */
    initForm() {
        this.initServerInterfaces(this.action, this.currentItem).then((serverInterfaces) => {
            this.serverInterfaces = serverInterfaces;
            this.params = this.action._queryParams;
            this.schema = this.action.dataSchema;
            this.action.formSchema && (this.form = this.action.formSchema.form);
        });

        this.needData = true; // this.action.needDatas;
        this.currentItem = this.currentItem || {};
        this.formData = angular.extend({}, this.currentItem);

        // 是否需要清除当前的数据。
        // 例子：menu需要parentId的时候，但是不需要parentId对应的数据
        if (this.action.clearCurrentItem) {
            this.formData = {};
        }
        // 处理默认值方法
        if (typeof this.action.defaultDatas === "string") {
            this.action.defaultDatas = JSON.parse(this.action.defaultDatas);
        }
        _.each(this.action.defaultDatas, (field, key) => {
            let val = null;

            _.each(this.sfPath.parse(field.path), (path) => {
                if (val) {
                    val = val[path];
                } else {
                    val = this[path];
                }
            }, this);

            val && (this.formData[key] = val);
        }, this);

        this.deleteNullProperty(this.formData);
        this.content = this.action.title + "成功";
        this.dialogCloseFn = function() {
            this.material.alert(this.title, this.content).finally(() => {
                this.action.isRefresh && this.managerGrid && this.managerGrid.getServerData && this.managerGrid.getServerData();
            });
        }.bind(this);
    }
}