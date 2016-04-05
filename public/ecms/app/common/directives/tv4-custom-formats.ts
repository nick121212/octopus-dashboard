import * as tv4 from "tv4";
import * as validator from "validator";

export var init = () => {
    // 验证email
    tv4.addFormat("email", (data, schema): any => {
        if (validator.isEmail(data)) {
            return true;
        }

        return 10000;
    });

    // 验证手机
    tv4.addFormat("mobile", (data, schema): any => {
        if (validator.isMobilePhone(data, "zh-CN")) {
            return null;
        }

        return 10003;
    });

    // 验证json
    tv4.addFormat("json", (data, schema): any => {
        if (validator.isJSON(data)) {
            return null;
        }

        return 10004;
    });
}
