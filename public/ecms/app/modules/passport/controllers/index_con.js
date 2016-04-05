var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "common/controllers/material_controller_base"], function (require, exports, material_controller_base_1) {
    "use strict";
    var PassportIndexController = (function (_super) {
        __extends(PassportIndexController, _super);
        function PassportIndexController() {
            _super.call(this, arguments);
        }
        PassportIndexController._name = "PassportIndexController";
        PassportIndexController.$inject = ["$rootScope", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material"];
        return PassportIndexController;
    }(material_controller_base_1.MaterialControllerBase));
    exports.PassportIndexController = PassportIndexController;
});
//# sourceMappingURL=index_con.js.map