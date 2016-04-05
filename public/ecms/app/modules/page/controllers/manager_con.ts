
import ref = require("ref");
import {MaterialGridController} from "common/controllers/material_grid_controller";
import {PageManagerFormController} from "modules/page/controllers/manager_form_con";
import {ToolbarItem} from "common/models/toolbar_item";
import {QueryData} from "common/models/query_data";
import {ClientData} from "common/models/client_data";
import * as _ from "lodash";

export class PageManagerController extends MaterialGridController<Object> {
    public static _name: string = "PageManagerController";
    public static $inject: Array<any> = ["$rootScope", "$scope", "$state", "$stateParams", "$q", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
    public menu: any;

    constructor() {
        super(arguments);
    }
    /**
     * 页面初始化
     * 获取menu的详情信息
     * 获取操作信息
     */
    init() {
        this.isBusy = true;
        this.initKey();
        this.$q.all({
            menu: this.Restangular.one("menus", this.key).all("edit").doGET(),
            actions: this.Restangular.all("actions").doGET.bind(this, null, { filter: { where: { parentKey: this.key } } })()
        }).then((results: Object) => {
            this.menu = results["menu"];
            this.menu.actions = results["actions"].rows;
            this.initView();
            document.title = this.menu.title;
        });
    }
    /**
     * 查找到带有view的操作
     * 找到则继续操作，否则报出错误信息
     */
    initView() {
        let err = () => {
            this.material.alert(this.title, "没有配置带有view的操作!").finally(() => {
                // this.$state.go("home");
            });
            return;
        };

        this.viewAction = _.find(this.menu.actions, (act) => {
            return act["isList"] === true;
        });

        if (!this.viewAction) {
            return err();
        }
        this.initServerInterfaces(this.viewAction, this.queryData).then((serverInterfaces) => {
            this.serverInterfaces = serverInterfaces;
            this.initDataFilter();
            this.isBusy = false;
            this.initSearch(this.viewAction);
            this.getServerData();
        });
        this.initColumns();
        this.initToolbar();
    }
    /**
     * 确认操作
     */
    protected doConfirm($event, itemData, action) {
        this.initServerInterfaces(action, this.queryData, itemData).then((serverInterfaces) => {
            this.confirm({
                title: action.title,
                content: "确认吗?",
                $event: $event,
                isRefresh: action.isRefresh,
                ignoreSelection: true
            }, serverInterfaces, () => {
                return itemData;
            }, action).then((data) => {
                console.log(data);
            });
        });
    }
    /**
     * 跳转操作
     */
    protected doLink($event, itemData, action) {
        let routes = [];

        _.each(action.linkUrl.split("/"), (href) => {
            if (href.search(":") === 0) {
                routes.push(itemData[href.substring(1)] || this.$stateParams[href.substring(1)]);
            }
        }, this);

        routes.length && (location.hash = routes.join(""));
    }
    /**
     * 弹窗操作
     */
    protected doPopup($event, itemData, action) {
        let dialogOptions: angular.material.IDialogOptions = {
            controller: action.controller || PageManagerFormController._name,
            templateUrl: action.templateUrl || PageManagerFormController._templateUrl,
            controllerAs: "formCtl",
            clickOutsideToClose: false,
            escapeToClose: false,
            targetEvent: $event,
            locals: {
                "managerGrid": this,
                "currentItem": itemData,
                "action": action,
                "menu": this.menu
            }
        };

        this.$mdDialog.show(dialogOptions);
    }
    /**
     * 按钮点击事件
     * 1：无操作
     * 2：确认操作
     * 3：跳转操作
     * 4：弹窗操作
     * 5：自定义操作
     */
    doAction($event: MouseEvent, itemData, action) {
        switch (~~action.optype) {
            case 2:
                this.doConfirm($event, itemData, action);
                break;
            case 3:
                this.doLink($event, itemData, action);
                break;
            case 4:
            case 5:
                this.doPopup($event, itemData, action);
                break;
        }
    }
    /**
     * 处理返回的数据
     * 根据接口中fields中的数据进行赋值
     */
    initDataFilter(): Function {
        return this.dataFilter = (results) => {
            this.clientData.datas.length = 0;

            _.each(this.viewAction.interfaceObjects, (inteface) => {
                let result = results[inteface.key];

                if (!result) {
                    return;
                }

                if (typeof inteface.fields === "string") {
                    inteface.fields = JSON.parse(inteface.fields);
                }

                _.each(inteface.fields, (field) => {
                    this.clientData[field.field] = result[field.path];
                }, this);
            }, this);

            return this.clientData;
        };
    }
    /**
     * 初始化表头
     */
    initColumns() {
        this.columns = JSON.parse(this.viewAction.columns);
    }
    /**
     * 初始化菜单
     * 处理单个数据菜单和顶级菜单
     * 暂不处理多选菜单
     * 1：系统操作菜单
     * 2：单个数据菜单
     * 3：多选菜单
     * 4：顶级菜单
     */
    initToolbar() {
        let tool = null;

        _.each(this.menu.actions, (action) => {
            tool = new ToolbarItem({
                title: action.title,
                icon: action.icon,
                onClick: ($event, item) => {
                    this.doAction($event, item, action);
                }
            });
            switch (~~action["type"]) {
                case 2:
                    this.itemToolbars.push(tool);
                    break;
                case 3:
                    break;
                case 4:
                    this.rootToolbars.push(tool);
                    break;
            }
        }, this);

        this.rootToolbars.push(new ToolbarItem({
            title: "刷新",
            icon: "refresh",
            onClick: ($event) => {
                this.getServerData();
            }
        }));
        this.rootToolbars.push(new ToolbarItem({
            title: "搜索",
            icon: "search",
            onClick: ($event) => {
                this.toggleSearchBar();
            }
        }));
    }
    /**
     * 初始化搜索
     * 设置schema信息
     * 设置默认的查询数据
     * 设置搜索栏的默认显示状态
     * 设置查询数据的limit值
     */
    initSearch(action) {
        this.defQuery = {};
        this.schema = action.dataSchema;
        this.searchForm = action.searchSchema ? action.searchSchema.form : null;

        if (!this.searchForm || !this.schema) {
            this.rootToolbars.pop();
        } else {
            _.forEach(action.searchSchema.query, (d, key) => {
                this.defQuery[key] = this.$stateParams[d] || d;
            });
            console.log(this.defQuery);
            this.searchMode = !!this.searchForm["searchMode"];
            action.searchSchema.form && action.searchSchema["limit"] && (this.queryData.pageCount = this.queryData.limit = action.searchSchema["limit"]);
        }
    }
}