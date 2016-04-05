var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_popup_controller"], function (require, exports, material_popup_controller_1) {
    "use strict";
    var HomeContentController = (function (_super) {
        __extends(HomeContentController, _super);
        function HomeContentController() {
            _super.call(this, arguments);
        }
        HomeContentController.prototype.initInterfaces = function () { };
        HomeContentController.$inject = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
        HomeContentController._name = "HomeContentController";
        return HomeContentController;
    }(material_popup_controller_1.MaterialPopupController));
    exports.HomeContentController = HomeContentController;
});
//# sourceMappingURL=content_con.js.map