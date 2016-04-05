/**
 * Created by NICK on 15/10/30.
 * email:nick121212@126.com
 * qq:289412378
 * copyright NICK
 */

import ref = require("ref");

export var init = ($q: ng.IQService, Permission, Restangular) => {
    let promise = Restangular.oneUrl("/", "/ecms").one("login", "user").doGET;

    Permission.defineRole("anonymous", () => {
        let deferred = $q.defer();

        $q.all([promise()]).then((results) => {
            deferred.reject();
        }).catch(() => {
            deferred.resolve();
        });

        return deferred.promise;
    });
};