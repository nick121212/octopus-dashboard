import ref = require("ref");

export class CompileDirective {
    /**
     * 指令的名称
     */
    public static _name: string = "dyCompile";
    /**
     * 初始化函数
     */
    public static init(mod: angular.IModule) {
        mod.directive(CompileDirective._name, CompileDirective.directive);
    }
    /**
     * 定义指令
     */
    public static directive: Array<string | Function> = [
        "$compile",
        ($compile) => {
            let directive: angular.IDirective = {
                replace: true,
                restrict: "A",
                scope: {
                    item: "=",
                    $index: "@"
                },
                link: ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes) => {
                    let dummyScope = {
                        $destroy: angular.noop
                    },
                        childScope: angular.IScope,
                        content: string,
                        destoryChildScope = () => {
                            (childScope || dummyScope).$destroy();
                        };
                    $attrs.$observe("html", (html: string) => {
                        if (html) {
                            destoryChildScope();
                            childScope = $scope.$new(false);
                            childScope["item"] = $scope["item"];
                            childScope["$index"] = $scope["$index"];
                            if (html.search("<") === 0) {
                                content = $compile(html)(childScope);
                                $element.replaceWith(content);
                            } else {
                                content = childScope.$eval(html);
                                $element.text(content);
                            }
                        }
                    });
                }
            };

            return directive;
        }
    ];
}