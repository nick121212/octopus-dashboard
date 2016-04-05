define(["require", "exports"], function (require, exports) {
    "use strict";
    var CompileDirective = (function () {
        function CompileDirective() {
        }
        /**
         * 初始化函数
         */
        CompileDirective.init = function (mod) {
            mod.directive(CompileDirective._name, CompileDirective.directive);
        };
        /**
         * 指令的名称
         */
        CompileDirective._name = "dyCompile";
        /**
         * 定义指令
         */
        CompileDirective.directive = [
            "$compile",
            function ($compile) {
                var directive = {
                    replace: true,
                    restrict: "A",
                    scope: {
                        item: "=",
                        $index: "@"
                    },
                    link: function ($scope, $element, $attrs) {
                        var dummyScope = {
                            $destroy: angular.noop
                        }, childScope, content, destoryChildScope = function () {
                            (childScope || dummyScope).$destroy();
                        };
                        $attrs.$observe("html", function (html) {
                            if (html) {
                                destoryChildScope();
                                childScope = $scope.$new(false);
                                childScope["item"] = $scope["item"];
                                childScope["$index"] = $scope["$index"];
                                if (html.search("<") === 0) {
                                    content = $compile(html)(childScope);
                                    $element.replaceWith(content);
                                }
                                else {
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
        return CompileDirective;
    }());
    exports.CompileDirective = CompileDirective;
});
//# sourceMappingURL=compile_directive.js.map