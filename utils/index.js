import qs from 'qs';
import _ from 'lodash';

exports = module.exports = {
    modelNames: {
        interface: 'interface',
        menu: 'menu',
        schema: 'schema',
        action: 'action',
        server: 'server',
        group: 'group',
        groupaction: 'groupaction',
        role: 'role',
        rolegroup: 'rolegroup'
    },
    query: (req) => {
        let query = qs.parse(req.query, { plainObjects: true });
        let filter = query.filter;

        try {
            filter = JSON.parse(filter);
        } catch (e) {
            filter = {};
        }

        _.extend({
            limit: 10,
            offset: 0
        }, filter);

        if (filter.attributes && typeof filter.attributes === "array") {
            !filter.attributes.length && delete filter.attributes;
        } else {
            delete filter.attributes;
        }

        return filter;
    },
    convertJson: (data) => {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query = '';
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Date) {
                    query += encodeURIComponent(name) + '='
                        + '\/Date(' + value.getTime() + '-0000)\/' + '&';
                }
                else if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        // fullSubName = name + '[' + i + ']';
                        fullSubName = name + '[]';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                        + encodeURIComponent(value) + '&';
                }
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return param(data);
    },
    dataConvert: (convert, data) => {
        let rtnData = null;

        switch (convert.type) {
            case "join":
                _.isArray(data) && (rtnData = data.join(convert.divided || ","));
                break;
        }
        return rtnData;
    }
}