/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base", "lodash"], function (require, exports, material_controller_base_1, _) {
    "use strict";
    var HomeLeftController = (function (_super) {
        __extends(HomeLeftController, _super);
        function HomeLeftController() {
            _super.call(this, arguments);
            this.filterExpression = "";
            this.filterComparator = false;
            this.init();
        }
        HomeLeftController.prototype.menuLoop = function (datas, depth) {
            if (depth === void 0) { depth = 0; }
            var nodes = _.filter(datas, function (d) {
                return d["depth"] === depth;
            });
            _.forEach(nodes, function (node) {
                if (datas[node["parentKey"]]) {
                    !datas[node["parentKey"]].nodes && (datas[node["parentKey"]].nodes = []);
                    node["isShow"] && datas[node["parentKey"]].nodes.push(node);
                }
            });
            nodes.length && this.menuLoop(datas, depth + 1);
        };
        HomeLeftController.prototype.init = function () {
            var _this = this;
            this.Restangular.one("menus", "all").get().then(function (data) {
                if (!data.length)
                    return;
                data = _.keyBy(data, "key");
                _this.menuLoop(data, 0);
                _this.modules = _.find(data, function (d) {
                    return d["depth"] === 0;
                })["nodes"];
                _this.selectedNodes = _.keyBy(_.filter(data, function (d) {
                    return d["depth"] === 1;
                }), "key");
                _this.mdSideMenuSections.sections = _this.modules;
                _this.mdSideMenuFactory.onStateChangeStart(null, null, null);
            });
            this.mdSideMenuSections.options = {
                children: "nodes",
                key: "key",
                filterExpression: "",
                showSearchBar: true,
                dirSelectable: false,
                orderBy: "id",
                filterField: "title"
            };
        };
        HomeLeftController.$inject = ["$rootScope", "$scope", "$mdDialog", "Restangular", "mdSideMenuSections", "mdSideMenuFactory"];
        HomeLeftController._name = "HomeLeftController";
        return HomeLeftController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.HomeLeftController = HomeLeftController;
});
//# sourceMappingURL=left_con.js.map