/**
 * Created by NICK on 15/6/8.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require("ref");
import {MaterialControllerBase} from "common/controllers/material_controller_base";
import * as _ from "lodash";

export class HomeLeftController extends MaterialControllerBase {
    public static $inject: Array<string> = ["$rootScope", "$scope", "$mdDialog", "Restangular", "mdSideMenuSections", "mdSideMenuFactory"];
    public static _name = "HomeLeftController";

    public modules: Array<any>;
    public selectedNodes: any;
    public filterExpression: string = "";
    public filterComparator: boolean = false;

    private mdSideMenuSections: any;
    private mdSideMenuFactory: any;

    constructor() {
        super(arguments);
        this.init();
    }

    menuLoop(datas: any, depth: number = 0) {
        let nodes = _.filter(datas, (d) => {
            return d["depth"] === depth;
        });

        _.forEach(nodes, (node) => {
            if (datas[node["parentKey"]]) {
                !datas[node["parentKey"]].nodes && (datas[node["parentKey"]].nodes = []);
                node["isShow"] && datas[node["parentKey"]].nodes.push(node);
            }
        });
        nodes.length && this.menuLoop(datas, depth + 1);
    }

    init() {
        this.Restangular.one("menus", "all").get().then((data) => {
            if (!data.length) return;
            data = _.keyBy(data, "key");
            this.menuLoop(data, 0);
            this.modules = _.find(data, (d) => {
                return d["depth"] === 0;
            })["nodes"];
            this.selectedNodes = _.keyBy(_.filter(data, (d) => {
                return d["depth"] === 1;
            }), "key");
            this.mdSideMenuSections.sections = this.modules;
            this.mdSideMenuFactory.onStateChangeStart(null, null, null);
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
    }
}