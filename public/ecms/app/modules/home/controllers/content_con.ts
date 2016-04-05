
import ref = require("ref");
import {MaterialPopupController} from "common/controllers/material_popup_controller";

export class HomeContentController extends MaterialPopupController<Object> {
    public static $inject: Array<any> = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
    public static _name = "HomeContentController";

    constructor() {
        super(arguments);
    }

    initInterfaces() { }
}