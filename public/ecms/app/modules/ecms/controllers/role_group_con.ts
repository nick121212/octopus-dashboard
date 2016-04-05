import ref = require("ref");
import {PageManagerFormController} from "modules/page/controllers/manager_form_con";
import {ToolbarItem} from "common/models/toolbar_item";

export class RoleGroupManagerController extends PageManagerFormController {
    public static $inject: Array<any> = PageManagerFormController.$inject.concat([]);
    public static _name = "RoleGroupManagerController";

    private roleGroups: any = {};
    public rolegroups: Array<any>;

    /**
     * 验证是否选中
     */
    checked(item) {
        return this.roleGroups.hasOwnProperty(item["key"]);
    }
    /**
     * 初始化接口信息和数据
     */
    initInterfaces() {
        let datas = [];

        datas = _.map(this.roleGroups, (ga) => {
            return ga;
        });

        return this.dealInterfaces(this.action.interfaceObjects, this.serverInterfaces, {
            roleKey: this.currentItem["key"],
            rolegroups: datas
        }, this.params);
    }
    /**
     * 初始化表单
     */
    initForm() {
        super.initForm();
        console.log(this.rolegroups);
        this.roleGroups = _.keyBy(this.rolegroups, "groupKey");
        console.log(this.roleGroups);
    }
    /**
     * 选中/取消当前项目
     */
    toggleAction(item) {
        if (this.roleGroups.hasOwnProperty(item["key"])) {
            delete this.roleGroups[item["key"]];
        } else {
            this.roleGroups[item["key"]] = {
                roleKey: this.currentItem["key"],
                groupKey: item.key
            };
        }
    }
}