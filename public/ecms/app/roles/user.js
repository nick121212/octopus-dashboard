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
        Permission.defineRole("user", function () {
            var deferred = $q.defer();
            $q.all([promise()]).then(function (results) {
                deferred.resolve(results[0]);
            }).catch(function () {
                deferred.reject(403);
            });
            return deferred.promise;
        });
    };
});
//# sourceMappingURL=user.js.map