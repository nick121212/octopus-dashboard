import a = require("ref");
import {PageManagerController} from "modules/page/controllers/manager_con";

class FileUploadController extends PageManagerController {
    public static $inject: Array<any> = ["$rootScope", "$q", "$scope", "$state", "$stateParams", "$mdBottomSheet", "$mdToast", "$mdDialog", "material", "Restangular", "FileUploader"];
    public static _name = "FileUploadController";
    // 上传组件实例
    public uploader: any;
    private FileUploader: any;
    public uploadPath: string;
    public filters: string;
    public url: string;
    public progress: number;
    public isShowList: boolean;
    private isInited: boolean;

    initKey() {
        this.key = "fileupload";
    }

    init() {
        this.initUploader();
        this.$scope.$watch("url", (newValue, oldValue) => {
            this.url = newValue as string;
        });
    }

    doSelect(item) {
        item.url && (this.$scope["url"] = this.url = item.url);
    }

    showList() {
        this.isShowList = !this.isShowList;
        if (!this.isInited) {
            this.queryData.limit = this.queryData.pageCount = 9;
            super.init();
            this.isInited = true;
            this.rowSelect = [9, 27];
            return;
        }
        this.getServerData();
    }

    initUploader() {
        let uploader = this.uploader = new this.FileUploader({
            url: this.uploadPath,
            alias: "upfile",
            autoUpload: true
        });

        uploader.filters.push({
            "name": "custom",
            fn: (item, options) => {
                let type = "|" + item.type.slice(item.type.lastIndexOf("/") + 1) + "|";
                return this.filters.indexOf(type) !== -1;
            }
        });
        uploader.onWhenAddingFileFailed = (item, filter, options) => {
            console.info("onWhenAddingFileFailed", item, filter, options);
        };
        uploader.onAfterAddingFile = (fileItem) => {
            console.info("onAfterAddingFile", fileItem);
        };
        uploader.onAfterAddingAll = (addedFileItems) => {
            console.info("onAfterAddingAll", addedFileItems);
        };
        uploader.onBeforeUploadItem = (item) => {
            console.info("onBeforeUploadItem", item);
        };
        uploader.onProgressItem = (fileItem, progress) => {
            console.info("onProgressItem", fileItem, progress);
            this.progress = progress;
        };
        uploader.onProgressAll = (progress) => {
            console.info("onProgressAll", progress);
        };
        uploader.onSuccessItem = (fileItem, response, status, headers) => {
            console.info("onSuccessItem", fileItem, response, status, headers);
        };
        uploader.onErrorItem = (fileItem, response, status, headers) => {
            console.info("onErrorItem", fileItem, response, status, headers);
        };
        uploader.onCancelItem = (fileItem, response, status, headers) => {
            console.info("onCancelItem", fileItem, response, status, headers);
        };
        uploader.onCompleteItem = (fileItem, response, status, headers) => {
            console.info("onCompleteItem", fileItem, response, status, headers);
            this.doSelect(response);
        };
        uploader.onCompleteAll = () => {
            console.info("onCompleteAll");
        };
    }


}

export class FileUploadDirective {
    /**
     * 指令的名称
     */
    public static _name: string = "fileUpload";
    public static _name1: string = "ngThumb";
    public static _name2: string = "zoom";
    /**
     * 初始化函数
     */
    public static init(mod: angular.IModule) {
        mod.controller(FileUploadController._name, FileUploadController);
        mod.directive(FileUploadDirective._name, FileUploadDirective.directive);
        mod.directive(FileUploadDirective._name1, FileUploadDirective.ngThumb);
        mod.filter(FileUploadDirective._name2, FileUploadDirective.zoomFilter);
    }

    public static zoomFilter = () => {
        let func = function(imagePath, zoomStr) {
            if (typeof imagePath === "string" && typeof zoomStr === "string") {
                let dotIndex = imagePath.lastIndexOf(".");
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
    public static ngThumb: Array<string | Function> = [
        "$window",
        ($window): angular.IDirective => {
            let helper = {
                support: !!($window.FileReader && $window.CanvasRenderingContext2D),
                isFile: function(item) {
                    return angular.isObject(item) && item instanceof $window.File;
                },
                isImage: function(file) {
                    let type = "|" + file.type.slice(file.type.lastIndexOf("/") + 1) + "|";
                    return "|jpg|png|jpeg|bmp|gif|".indexOf(type) !== -1;
                }
            };

            return {
                restrict: "A",
                template: "<canvas/>",
                link: function(scope, element, attributes) {
                    if (!helper.support) return;

                    let params = scope.$eval(attributes["ngThumb"]);

                    if (!helper.isFile(params.file)) return;
                    if (!helper.isImage(params.file)) return;

                    let canvas = element.find("canvas");
                    let reader = new FileReader();

                    reader.onload = onLoadFile;
                    reader.readAsDataURL(params.file);

                    function onLoadFile(event) {
                        let img = new Image();
                        img.onload = onLoadImage;
                        img.src = event.target.result;
                    }

                    function onLoadImage() {
                        let width = params.width || this.width / this.height * params.height;
                        let height = params.height || this.height / this.width * params.width;
                        canvas.attr({ width: width, height: height });
                        (canvas[0] as HTMLCanvasElement).getContext("2d").drawImage(this, 0, 0, width, height);
                    }
                }
            };
        }
    ];
    /**
     * 定义指令
     */
    public static directive: Array<string | Function> = [
        "$compile",
        "FileUploader",
        ($compile, FileUploader) => {
            let directive: angular.IDirective = {
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
                link: ($scope: angular.IScope, $element: angular.IAugmentedJQuery, $attrs: angular.IAttributes, $ctrl: angular.INgModelController) => {
                    $scope.$watch($attrs["ngModel"], () => {
                        $scope["url"] = $ctrl.$viewValue;
                    });
                    $scope.$watch("url", (newValue, oldValue) => {
                        if (oldValue !== newValue) {
                            $ctrl.$setViewValue(newValue);
                        }
                    });
                }
            };
            return directive;
        }
    ];
}