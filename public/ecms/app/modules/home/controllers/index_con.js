/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base"], function (require, exports, material_controller_base_1) {
    "use strict";
    var HomeIndexController = (function (_super) {
        __extends(HomeIndexController, _super);
        function HomeIndexController() {
            _super.call(this, arguments);
            this.$rootScope["title"] = "CMS";
        }
        HomeIndexController.prototype.doOpenMenu = function () {
            this.material.buildToggler("left").call(this);
        };
        HomeIndexController.prototype.doOpenRightMenu = function () {
            this.material.buildToggler("right").call(this);
        };
        HomeIndexController._name = "HomeIndexController";
        HomeIndexController.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material"];
        return HomeIndexController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.HomeIndexController = HomeIndexController;
});
//# sourceMappingURL=index_con.js.map