import ref = require("ref");
import {MaterialControllerBase} from "common/controllers/material_controller_base";
import {ClientData} from "common/models/client_data";
import {QueryData} from "common/models/query_data";
import {ToolbarItem} from "common/models/toolbar_item";
import {IConfirm} from "common/interfaces/confirm_data";
import * as _ from "lodash";

export abstract class MaterialGridController<T> extends MaterialControllerBase {
    /**
     * 选中的数据
     * */
    public selected: Array<T> = [];
    /**
     * 服务器数据
     * */
    public clientData: ClientData<T>;
    /**
     * 服务器交互基础数据
     * */
    public queryData: QueryData;
    /**
     * 是否是搜索模式
     * */
    public searchMode: boolean;
    /**
     * 搜索表单
     * */
    public searchForm: Array<any>;
    /**
     * 数据返回后进行适配方法
     * */
    public dataFilter: Function;
    /**
     * 搜索数据，存放搜索表单的数据
    **/
    public searchData: Object = {};
    /**
     * 列表中全局按钮
     * */
    public rootToolbars: Array<ToolbarItem> = [];
    /**
     * 选中后上的按钮
     * */
    public selectToolbars: Array<ToolbarItem> = [];
    /**
     * table上的按钮
     * */
    public itemToolbars: Array<ToolbarItem> = [];
    /**
     * 分页数量列表
     * */
    public rowSelect: Array<number> = [10, 30, 50];
    /**
     * 表格的列
     * */
    public columns: Array<any> = [];
    /**
     * 表单form
     */
    private $sForm: angular.IFormController;
    /**
     * 全局搜索条件
     *  */
    public defQuery: Object = {};
    /**
     * promise返回值
     */
    public deferred: angular.IPromise<any>;
    /**
     * 分页组件回调函数
     */
    public onPageChangeBind: Function;
    /**
     * 列表操作数据
     */
    public viewAction: any;
    /**
     * 当前页面的KEY
     */
    public key: string;

    constructor(args: IArguments, clearToolbar: boolean = true) {
        super(args);

        this.queryData = new QueryData();
        this.clientData = new ClientData<T>();
        this.$scope.$on("$destory", () => {
            this.abort();
        });
        this.onPageChangeBind = function(page: number, pageCount: number) {
            this.onPageChange(page, pageCount);
        }.bind(this);
        this.init();
    }

    initKey() {
        this.key = this.$stateParams["key"];
    }

    /**
     * 停止当前正在执行的ajax请求
     */
    abort() {
        this.$http && angular.forEach(this.$http.pendingRequests, (request: angular.IRequestConfig) => {
            if (request["cancel"] && request.timeout) {
                request["cancel"].resolve({
                    status: 200,
                    result_code: 0,
                    msg: "取消ajax加载！"
                });
            }
        });
    }
    /**
     * 确认操作
     * opts：确认设置
     * serverInterfaces：调用的接口信息
     * filterData：处理数据函数
     * success：成功的回调函数
     */
    confirm(opts: IConfirm, serverInterfaces, filterData: Function, action: any) {
        let confirm = this.$mdDialog.confirm()
            .title(opts.title)
            .textContent(opts.content)
            .targetEvent(opts.$event)
            .ok(opts.okContent || "确定")
            .cancel(opts.cancelContent || "取消");
        let promises: { [index: string]: angular.IPromise<any> } = {};
        let deferred = this.$q.defer();

        if (this.selected.length > 0 || opts.ignoreSelection) {
            this.$mdDialog.show(confirm).then(() => {
                if (action && action.interfaceObjects) {
                    _.forEach(action.interfaceObjects, (inteface) => {
                        let fn = serverInterfaces[inteface.key];

                        if (fn) {
                            inteface.needDatas && (fn = fn.bind(this, (filterData.call(this, this.selected)) || this.selected), null, inteface.needParams ? { filter: this.queryData } : null);
                            !inteface.needDatas && (fn = fn.bind(this, null, inteface.needParams ? { filter: this.queryData } : null));
                        }

                        promises[inteface.key] = fn();

                        // _.forEach(serverInterfaces, (fn: Function, key: string) => {
                        //     promises[key] = fn((filterData.call(this, this.selected)) || this.selected, null, { filter: this.queryData });
                        // }, this);
                    });
                }

                this.deferred = this.$q.all(promises).then((data) => {
                    opts.isRefresh && this.getServerData();
                    this.material.showMsg("执行成功!");
                    deferred.resolve(data);
                    // success && success.call(this, data);
                });
            });
        }

        return deferred.promise;
    }
    /**
     * 清理掉所有搜索字段
     */
    private clearWhere() {
        for (let p in this.queryData.where) {
            delete this.queryData.where[p];
        }
    }
    /**
     * 显示/隐藏搜索栏
     * 清除其他的参数
     * */
    toggleSearchBar() {
        const properties = ["page", "pageCount", "limit", "offset", "order", "include", "attributes"];

        this.searchMode = !this.searchMode;
        if (this.searchMode === false) {
            for (let p in this.queryData) {
                if (this.queryData.hasOwnProperty(p) && !properties.some(function(property) {
                    return property === p;
                })) {
                    this.queryData[p] = null;
                }
                this.queryData.where = {};
            }
            this.$sForm && this.$sForm.$submitted && ((this.$sForm = null) || true) && this.getServerData();
        }
    }
    /**
     * 清理掉所有搜索字段
     */
    resetSearch() {
        this.clearWhere();
        this.searchData = {};
    }
    /**
     * 搜索功能
     * 拿到所有前缀带r-的字段，然后拼接成搜索串返回服务器
     * */
    doSearch(form: angular.IFormController) {
        let searchFilters = {};

        if (form.$dirty) {
            this.clearWhere();
            for (let p in this.searchData) {
                if (!this.searchData.hasOwnProperty(p)) continue;
                if (p.search("r-") === 0) {
                    this.queryData.where[p.replace("r-", "")] = this.searchData[p];
                }
            }
            form.$setPristine();
            this.onPageChange(1, this.queryData.pageCount);
            this.getServerData();
            this.$sForm = form;
        }
    }
    /**
     * 清除选中的数据
     * */
    clearSelected() {
        this.selected.length = 0;
    }
    /**
     * 拉取服务器数据
     * */
    getServerData() {
        let promises: { [index: string]: ng.IPromise<any> } = {};

        if (this.isBusy) return;
        this.clearSelected();
        this.isBusy = true;
        this.abort();

        !this.searchMode && this.clearWhere();
        angular.extend(this.queryData.where, this.defQuery);

        promises = this.dealInterfaces(this.viewAction.interfaceObjects, this.serverInterfaces, null, this.viewAction._queryParams);
        // angular.forEach(this.serverInterfaces, (fn: Function, key: string) => {
        //     promises[key] = fn(null, null, this.viewAction._queryParams);
        // });

        this.deferred = this.$q.all(promises).then((data) => {
            this.dataFilter && (this.clientData = this.dataFilter(data));
        }, (data) => {
            console.log(data);
        }).finally(() => {
            this.isBusy = false;
        });

        return this.deferred;
    }
    /**
     * 分页改变时候调用
     * page ：当前第几页
     * pageCount：每页多少数据
     * */
    onPageChange(page: number, pageCount: number) {
        if (pageCount) {
            this.queryData.pageCount = pageCount;
            this.queryData.limit = pageCount;
        }
        page && (this.queryData.page = page);
        this.queryData.offset = this.queryData.pageCount * (this.queryData.page - 1);

        return this.getServerData();
    }
    /**
     * 排序改变时候调用
     * */
    onOrderChange(order) {
        this.queryData.order = order;
        return this.getServerData();
    }
    /**
     * 初始化表格列
     */
    abstract initColumns()
    /**
     * 初始化操作
     */
    abstract initToolbar()
    /**
     * 初始化搜索
     */
    abstract initSearch(action: any)
    /**
     * 初始化
     */
    abstract init();
}