define(["require", "exports", "tv4", "validator"], function (require, exports, tv4, validator) {
    "use strict";
    exports.init = function () {
        // 验证email
        tv4.addFormat("email", function (data, schema) {
            if (validator.isEmail(data)) {
                return true;
            }
            return 10000;
        });
        // 验证手机
        tv4.addFormat("mobile", function (data, schema) {
            if (validator.isMobilePhone(data, "zh-CN")) {
                return null;
            }
            return 10003;
        });
        // 验证json
        tv4.addFormat("json", function (data, schema) {
            if (validator.isJSON(data)) {
                return null;
            }
            return 10004;
        });
    };
});
//# sourceMappingURL=tv4-custom-formats.js.map