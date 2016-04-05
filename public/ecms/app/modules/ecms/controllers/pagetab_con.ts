import ref = require("ref");
import {PageManagerController} from "modules/page/controllers/manager_con";
import {ToolbarItem} from "common/models/toolbar_item";
import * as _ from "lodash";

export class PageTagManagerController extends PageManagerController {
    public static $inject: Array<any> = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular"];
    public static _name = "PageTagManagerController";

    public tags: Array<Object>;
    public saveAction: any;
    public $form: angular.IFormController;

    init() {
        super.init();
    }
    initDataFilter(): Function {
        let fn = super.initDataFilter();

        return this.dataFilter = (results) => {
            fn(results);
            this.clientData["post_classes"] = _.map(this.clientData["post_classes"], (item) => {
                return item["name"];
            }, this);
            this.clientData["video_classes"] = _.map(this.clientData["video_classes"], (item) => {
                return item["name"];
            }, this);
            this.clientData["index_post_tags"] = _.map(this.clientData["index_post_tags"], (item) => {
                return item["name"];
            }, this);
            this.clientData["index_video_tags"] = _.map(this.clientData["index_video_tags"], (item) => {
                return item["name"];
            }, this);
            this.clientData["hot_tags"] = _.map(this.clientData["hot_tags"], (item) => {
                return item["name"];
            }, this);

            return this.clientData;
        };
    }
    initSearch(action) {
        this.initSchema();
        let tool = new ToolbarItem({
            title: this.saveAction.title,
            icon: this.saveAction.icon,
            onClick: function($event, item) {
                this.$rootScope.$broadcast("schemaFormValidate");
                if (this.$form.$dirty && this.$form.$valid && !this.isBusy) {
                    this.doAction($event, this.clientData, this.saveAction);
                }
            }.bind(this)
        });
        this.rootToolbars.push(tool);
        this.rootToolbars.push(new ToolbarItem({
            title: "刷新",
            icon: "refresh",
            onClick: ($event) => {
                this.getServerData();
            }
        }));
    }
    initToolbar() { }
    initSchema() {
        this.saveAction = _.find(this.menu.actions, (act) => {
            return act["key"] === "pagetag-save";
        });

        this.saveAction && this.initServerInterfaces(this.saveAction, this.queryData, {}).then((serverInterfaces) => {

        });
    }
}