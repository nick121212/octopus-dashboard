import ref = require("ref");

export class GridMenuDirective {
    public static _name: string = "gridmenu";
    /**
     * 初始化函数
     */
    public static init(mod: angular.IModule) {
        mod.directive(GridMenuDirective._name, GridMenuDirective.directive);
    }
    public static directive: Array<any> = ["material", (material) => {
        let directive: ng.IDirective = {};

        directive.require = "^?ngModel";
        directive.scope = {
            tools: "=tools",
            isBusy: "=isBusy",
            openMenu: "&openMenu",
            item: "=item",
            width: "@width"
        };
        directive.replace = false;
        directive.template = "<md-menu>\n" +
            "    <md-button class=\"md-icon-button\"\n" +
            "               ng-disabled=\"isBusy\"\n" +
            "               aria-label=\"button\"\n" +
            "               ng-click=\"openMenu()($mdOpenMenu,$event)\">\n" +
            "        <ng-md-icon icon=\"{{ isBusy?'not_interested':'keyboard_arrow_down' }}\"></ng-md-icon>\n" +
            "    </md-button>\n" +
            "    <md-menu-content width=\"{{ width }}\">\n" +
            "        <md-menu-item ng-repeat=\"tool in tools\">\n" +
            "            <md-button aria-label=\"button\" ng-click=\"tool.onClick($event,item)\">\n" +
            "                <ng-md-icon icon=\"{{ tool.icon }}\"></ng-md-icon>\n" +
            "                {{ tool.title }}\n" +
            "            </md-button>\n" +
            "        </md-menu-item>\n" +
            "    </md-menu-content>\n" +
            "</md-menu>";
        directive.link = ($scope) => {
            !$scope["width"] && ($scope["width"] = 6);
        };

        return directive;
    }];
}
