import ref = require("ref");
import angular = require("angular");
import homeModule = require("modules/home/index");
import passportModule = require("modules/passport/index");
import pageModule = require("modules/page/index");
import ecmsModule = require("modules/ecms/index");

import appModule = require("app");

// 启动
angular.bootstrap(document, [
    homeModule.module.name,
    passportModule.module.name,
    pageModule.module.name,
    ecmsModule.module.name,
    appModule.module.name
]);