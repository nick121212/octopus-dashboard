import ref = require("ref");
import {PageManagerFormController} from "modules/page/controllers/manager_form_con";
import {ToolbarItem} from "common/models/toolbar_item";

export class GroupActionManagerController extends PageManagerFormController {
    public static $inject: Array<any> = PageManagerFormController.$inject.concat([]);
    public static _name = "GroupActionManagerController";

    private groupActions: any = {};
    public actions: Array<any>;
    public menus: Array<any>;
    public groupactions: Array<any>;

    /**
     * 验证是否选中
     */
    checked(item) {
        return this.groupActions.hasOwnProperty(item["key"]);
    }
    /**
     * 初始化接口信息和数据
     */
    initInterfaces() {
        let datas = [];

        datas = _.map(this.groupActions, (ga) => {
            return ga;
        });

        return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, {
            groupKey: this.currentItem["key"],
            groupactions: datas
        }, this.params);
    }
    /**
     * 初始化表单
     */
    initForm() {
        super.initForm();
        console.log(this.groupactions);
        this.groupActions = _.keyBy(this.groupactions, "actionKey");
        console.log(this.groupActions);
    }
    /**
     * 选中/取消当前项目
     */
    toggleAction(item) {
        if (this.groupActions.hasOwnProperty(item["key"])) {
            delete this.groupActions[item["key"]];
        } else {
            this.groupActions[item["key"]] = {
                groupKey: this.currentItem["key"],
                actionKey: item.key
            };
        }
    }
}