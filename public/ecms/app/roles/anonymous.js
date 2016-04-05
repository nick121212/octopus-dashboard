/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.init = function ($q, Permission, Restangular) {
        var promise = Restangular.oneUrl("/", "/ecms").one("login", "user").doGET;
        Permission.defineRole("anonymous", function () {
            var deferred = $q.defer();
            $q.all([promise()]).then(function (results) {
                deferred.reject();
            }).catch(function () {
                deferred.resolve();
            });
            return deferred.promise;
        });
    };
});
//# sourceMappingURL=anonymous.js.map