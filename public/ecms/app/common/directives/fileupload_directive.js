var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "modules/page/controllers/manager_con"], function (require, exports, manager_con_1) {
    "use strict";
    var FileUploadController = (function (_super) {
        __extends(FileUploadController, _super);
        function FileUploadController() {
            _super.apply(this, arguments);
        }
        FileUploadController.prototype.initKey = function () {
            this.key = "fileupload";
        };
        FileUploadController.prototype.init = function () {
            var _this = this;
            this.initUploader();
            this.$scope.$watch("url", function (newValue, oldValue) {
                _this.url = newValue;
            });
        };
        FileUploadController.prototype.doSelect = function (item) {
            item.url && (this.$scope["url"] = this.url = item.url);
        };
        FileUploadController.prototype.showList = function () {
            this.isShowList = !this.isShowList;
            if (!this.isInited) {
                this.queryData.limit = this.queryData.pageCount = 9;
                _super.prototype.init.call(this);
                this.isInited = true;
                this.rowSelect = [9, 27];
                return;
            }
            this.getServerData();
        };
        FileUploadController.prototype.initUploader = function () {
            var _this = this;
            var uploader = this.uploader = new this.FileUploader({
                url: this.uploadPath,
                alias: "upfile",
                autoUpload: true
            });
            uploader.filters.push({
                "name": "custom",
                fn: function (item, options) {
                    var type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
                    return _this.filters.indexOf(type) !== -1;
                }
            });
            uploader.onWhenAddingFileFailed = function (item, filter, options) {
                console.info("onWhenAddingFileFailed", item, filter, options);
            };
            uploader.onAfterAddingFile = function (fileItem) {
                console.info("onAfterAddingFile", fileItem);
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                console.info("onAfterAddingAll", addedFileItems);
            };
            uploader.onBeforeUploadItem = function (item) {
                console.info("onBeforeUploadItem", item);
            };
            uploader.onProgressItem = function (fileItem, progress) {
                console.info("onProgressItem", fileItem, progress);
                _this.progress = progress;
            };
            uploader.onProgressAll = function (progress) {
                console.info("onProgressAll", progress);
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
                console.info("onSuccessItem", fileItem, response, status, headers);
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                console.info("onErrorItem", fileItem, response, status, headers);
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info("onCancelItem", fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                console.info("onCompleteItem", fileItem, response, status, headers);
                _this.doSelect(response);
            };
            uploader.onCompleteAll = function () {
                console.info("onCompleteAll");
            };
        };
        FileUploadController.$inject = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular", "FileUploader"];
        FileUploadController._name = "FileUploadController";
        return FileUploadController;
    }(manager_con_1.PageManagerController));
    var FileUploadDirective = (function () {
        function FileUploadDirective() {
        }
        /**
         * 初始化函数
         */
        FileUploadDirective.init = function (mod) {
            mod.controller(FileUploadController._name, FileUploadController);
            mod.directive(FileUploadDirective._name, FileUploadDirective.directive);
            mod.directive(FileUploadDirective._name1, FileUploadDirective.ngThumb);
            mod.filter(FileUploadDirective._name2, FileUploadDirective.zoomFilter);
        };
        /**
         * 指令的名称
         */
        FileUploadDirective._name = "fileUpload";
        FileUploadDirective._name1 = "ngThumb";
        FileUploadDirective._name2 = "zoom";
        FileUploadDirective.zoomFilter = function () {
            var func = function (imagePath, zoomStr) {
                if (typeof imagePath === "string" && typeof zoomStr === "string") {
                    var dotIndex = imagePath.lastIndexOf(".");
                    if (dotIndex > 0) {
                        imagePath = imagePath.substring(0, dotIndex) + zoomStr + imagePath.substring(dotIndex);
                    }
                }
                return imagePath;
            };
            return func;
        };
        /**
         * 定义指令1
         */
        FileUploadDirective.ngThumb = [
            "$window",
            function ($window) {
                var helper = {
                    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                    isFile: function (item) {
                        return angular.isObject(item) && item instanceof $window.File;
                    },
                    isImage: function (file) {
                        var type = "|" + file.type.slice(file.type.lastIndexOf("/") + 1) + "|";
                        return "|jpg|png|jpeg|bmp|gif|".indexOf(type) !== -1;
                    }
                };
                return {
                    restrict: "A",
                    template: "<canvas/>",
                    link: function (scope, element, attributes) {
                        if (!helper.support)
                            return;
                        var params = scope.$eval(attributes["ngThumb"]);
                        if (!helper.isFile(params.file))
                            return;
                        if (!helper.isImage(params.file))
                            return;
                        var canvas = element.find("canvas");
                        var reader = new FileReader();
                        reader.onload = onLoadFile;
                        reader.readAsDataURL(params.file);
                        function onLoadFile(event) {
                            var img = new Image();
                            img.onload = onLoadImage;
                            img.src = event.target.result;
                        }
                        function onLoadImage() {
                            var width = params.width || this.width / this.height * params.height;
                            var height = params.height || this.height / this.width * params.width;
                            canvas.attr({ width: width, height: height });
                            canvas[0].getContext("2d").drawImage(this, 0, 0, width, height);
                        }
                    }
                };
            }
        ];
        /**
         * 定义指令
         */
        FileUploadDirective.directive = [
            "$compile",
            "FileUploader",
            function ($compile, FileUploader) {
                var directive = {
                    replace: true,
                    require: "^?ngModel",
                    restrict: "EA",
                    transclude: true,
                    templateUrl: "ecms/app/common/directives/fileupload.tpl.html",
                    scope: true,
                    bindToController: {
                        uploadPath: "=",
                        filters: "=",
                        title: "="
                    },
                    controller: "FileUploadController",
                    controllerAs: "fileUploadCtl",
                    link: function ($scope, $element, $attrs, $ctrl) {
                        $scope.$watch($attrs["ngModel"], function () {
                            $scope["url"] = $ctrl.$viewValue;
                        });
                        $scope.$watch("url", function (newValue, oldValue) {
                            if (oldValue !== newValue) {
                                $ctrl.$setViewValue(newValue);
                            }
                        });
                    }
                };
                return directive;
            }
        ];
        return FileUploadDirective;
    }());
    exports.FileUploadDirective = FileUploadDirective;
});
//# sourceMappingURL=fileupload_directive.js.map