var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base", "common/models/client_data", "common/models/query_data", "lodash"], function (require, exports, material_controller_base_1, client_data_1, query_data_1, _) {
    "use strict";
    var MaterialGridController = (function (_super) {
        __extends(MaterialGridController, _super);
        function MaterialGridController(args, clearToolbar) {
            var _this = this;
            if (clearToolbar === void 0) { clearToolbar = true; }
            _super.call(this, args);
            /**
             * 选中的数据
             * */
            this.selected = [];
            /**
             * 搜索数据，存放搜索表单的数据
            **/
            this.searchData = {};
            /**
             * 列表中全局按钮
             * */
            this.rootToolbars = [];
            /**
             * 选中后上的按钮
             * */
            this.selectToolbars = [];
            /**
             * table上的按钮
             * */
            this.itemToolbars = [];
            /**
             * 分页数量列表
             * */
            this.rowSelect = [10, 30, 50];
            /**
             * 表格的列
             * */
            this.columns = [];
            /**
             * 全局搜索条件
             *  */
            this.defQuery = {};
            this.queryData = new query_data_1.QueryData();
            this.clientData = new client_data_1.ClientData();
            this.$scope.$on("$destory", function () {
                _this.abort();
            });
            this.onPageChangeBind = function (page, pageCount) {
                this.onPageChange(page, pageCount);
            }.bind(this);
            this.init();
        }
        MaterialGridController.prototype.initKey = function () {
            this.key = this.$stateParams["key"];
        };
        /**
         * 停止当前正在执行的ajax请求
         */
        MaterialGridController.prototype.abort = function () {
            this.$http && angular.forEach(this.$http.pendingRequests, function (request) {
                if (request["cancel"] && request.timeout) {
                    request["cancel"].resolve({
                        status: 200,
                        result_code: 0,
                        msg: "取消ajax加载！"
                    });
                }
            });
        };
        /**
         * 确认操作
         * opts：确认设置
         * serverInterfaces：调用的接口信息
         * filterData：处理数据函数
         * success：成功的回调函数
         */
        MaterialGridController.prototype.confirm = function (opts, serverInterfaces, filterData, action) {
            var _this = this;
            var confirm = this.$mdDialog.confirm()
                .title(opts.title)
                .textContent(opts.content)
                .targetEvent(opts.$event)
                .ok(opts.okContent || "确定")
                .cancel(opts.cancelContent || "取消");
            var promises = {};
            var deferred = this.$q.defer();
            if (this.selected.length > 0 || opts.ignoreSelection) {
                this.$mdDialog.show(confirm).then(function () {
                    if (action && action.interfaceObjects) {
                        _.forEach(action.interfaceObjects, function (inteface) {
                            var fn = serverInterfaces[inteface.key];
                            if (fn) {
                                inteface.needDatas && (fn = fn.bind(_this, (filterData.call(_this, _this.selected)) || _this.selected), null, inteface.needParams ? { filter: _this.queryData } : null);
                                !inteface.needDatas && (fn = fn.bind(_this, null, inteface.needParams ? { filter: _this.queryData } : null));
                            }
                            promises[inteface.key] = fn();
                            // _.forEach(serverInterfaces, (fn: Function, key: string) => {
                            //     promises[key] = fn((filterData.call(this, this.selected)) || this.selected, null, { filter: this.queryData });
                            // }, this);
                        });
                    }
                    _this.deferred = _this.$q.all(promises).then(function (data) {
                        opts.isRefresh && _this.getServerData();
                        _this.material.showMsg("执行成功!");
                        deferred.resolve(data);
                        // success && success.call(this, data);
                    });
                });
            }
            return deferred.promise;
        };
        /**
         * 清理掉所有搜索字段
         */
        MaterialGridController.prototype.clearWhere = function () {
            for (var p in this.queryData.where) {
                delete this.queryData.where[p];
            }
        };
        /**
         * 显示/隐藏搜索栏
         * 清除其他的参数
         * */
        MaterialGridController.prototype.toggleSearchBar = function () {
            var properties = ["page", "pageCount", "limit", "offset", "order", "include", "attributes"];
            this.searchMode = !this.searchMode;
            if (this.searchMode === false) {
                var _loop_1 = function(p) {
                    if (this_1.queryData.hasOwnProperty(p) && !properties.some(function (property) {
                        return property === p;
                    })) {
                        this_1.queryData[p] = null;
                    }
                    this_1.queryData.where = {};
                };
                var this_1 = this;
                for (var p in this.queryData) {
                    _loop_1(p);
                }
                this.$sForm && this.$sForm.$submitted && ((this.$sForm = null) || true) && this.getServerData();
            }
        };
        /**
         * 清理掉所有搜索字段
         */
        MaterialGridController.prototype.resetSearch = function () {
            this.clearWhere();
            this.searchData = {};
        };
        /**
         * 搜索功能
         * 拿到所有前缀带r-的字段，然后拼接成搜索串返回服务器
         * */
        MaterialGridController.prototype.doSearch = function (form) {
            var searchFilters = {};
            if (form.$dirty) {
                this.clearWhere();
                for (var p in this.searchData) {
                    if (!this.searchData.hasOwnProperty(p))
                        continue;
                    if (p.search("r-") === 0) {
                        this.queryData.where[p.replace("r-", "")] = this.searchData[p];
                    }
                }
                form.$setPristine();
                this.onPageChange(1, this.queryData.pageCount);
                this.getServerData();
                this.$sForm = form;
            }
        };
        /**
         * 清除选中的数据
         * */
        MaterialGridController.prototype.clearSelected = function () {
            this.selected.length = 0;
        };
        /**
         * 拉取服务器数据
         * */
        MaterialGridController.prototype.getServerData = function () {
            var _this = this;
            var promises = {};
            if (this.isBusy)
                return;
            this.clearSelected();
            this.isBusy = true;
            this.abort();
            !this.searchMode && this.clearWhere();
            angular.extend(this.queryData.where, this.defQuery);
            promises = this.dealInterfaces(this.viewAction.interfaceObjects, this.serverInterfaces, null, this.viewAction._queryParams);
            // angular.forEach(this.serverInterfaces, (fn: Function, key: string) => {
            //     promises[key] = fn(null, null, this.viewAction._queryParams);
            // });
            this.deferred = this.$q.all(promises).then(function (data) {
                _this.dataFilter && (_this.clientData = _this.dataFilter(data));
            }, function (data) {
                console.log(data);
            }).finally(function () {
                _this.isBusy = false;
            });
            return this.deferred;
        };
        /**
         * 分页改变时候调用
         * page ：当前第几页
         * pageCount：每页多少数据
         * */
        MaterialGridController.prototype.onPageChange = function (page, pageCount) {
            if (pageCount) {
                this.queryData.pageCount = pageCount;
                this.queryData.limit = pageCount;
            }
            page && (this.queryData.page = page);
            this.queryData.offset = this.queryData.pageCount * (this.queryData.page - 1);
            return this.getServerData();
        };
        /**
         * 排序改变时候调用
         * */
        MaterialGridController.prototype.onOrderChange = function (order) {
            this.queryData.order = order;
            return this.getServerData();
        };
        return MaterialGridController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.MaterialGridController = MaterialGridController;
});
//# sourceMappingURL=material_grid_controller.js.map