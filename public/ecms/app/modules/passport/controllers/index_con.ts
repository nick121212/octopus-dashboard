
import ref = require("ref");
import {MaterialControllerBase} from "common/controllers/material_controller_base";

export class PassportIndexController extends MaterialControllerBase {
    public static _name: string = "PassportIndexController";
    public static $inject: Array<any> = ["$rootScope", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material"];

    constructor() {
        super(arguments);
    }
}