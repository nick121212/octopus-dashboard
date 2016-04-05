/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require("ref");

export var init = ($q: ng.IQService, Permission, Restangular) => {
    let promise = Restangular.oneUrl("/", "/ecms").one("login", "user").doGET;

    Permission.defineRole("user", () => {
        let deferred = $q.defer();

        $q.all([promise()]).then((results) => {
            deferred.resolve(results[0]);
        }).catch(() => {
            deferred.reject(403);
        });

        return deferred.promise;
    });
};