import utils from "../../utils";
import _ from "lodash";
import * as superagent from "superagent";
import superagentProxy from "superagent-proxy";
import async from "async";

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.interface;
    let {models} = db;
    let Model = models[name];
    let Server = models[utils.modelNames.server];
    let Sequelize = db.Sequelize;

    superagentProxy(superagent);

    let executeCommand = (server, modelInstance, filter, data, access_token) => {
        let params = {
            access_token: access_token
        }, uri, htp, optdata;

        try { modelInstance.params = JSON.parse(modelInstance.params) } catch (e) { }

        if (modelInstance.needParams && modelInstance.params) {
            // 遍历参数
            console.log(typeof filter, modelInstance.params.params);
            _.forEach(modelInstance.params.params, (param, key) => {
                let pd;
                _.forEach(param.split("."), function(path) {
                    if (!pd) {
                        pd = filter[path];
                    } else {
                        pd = pd[path];
                    }
                    // if (!pd) {
                    //     return false;
                    // }
                });
                pd && (params[key] = pd);
            }, this);
            // 遍历数据
            modelInstance.needDatas && modelInstance.params && _.forEach(modelInstance.params.data, (d, key) => {
                let pd;
                _.forEach(d.path.split("."), function(path) {
                    if (!pd) {
                        pd = data[path];
                    } else {
                        pd = pd[path];
                    }
                    if (!pd) {
                        return false;
                    }
                });
                pd && !optdata && (optdata = {});
                pd && (optdata[key] = pd);
            });
            optdata && (data = optdata);
            // 遍历数据变换项
            modelInstance.needDatas && modelInstance.params && _.forEach(modelInstance.params.convert, (converts, key) => {
                let pd;

                _.forEach(key.split("."), function(path) {
                    if (!pd) {
                        pd = data[path];
                    } else {
                        pd = pd[path];
                    }
                    if (!pd) {
                        return false;
                    }
                });

                if (pd) {
                    if (_.isArray(pd)) {
                        console.log(pd);
                        _.forEach(pd, (d) => {
                            console.log(d);
                            _.forEach(converts, (con) => {
                                console.log(utils.dataConvert(con, d[con.key]));
                                d[con.key] = utils.dataConvert(con, d[con.key]);
                            });
                        });
                    }
                }
            });
        }

        // 返回promise对象
        return new Sequelize.Promise((resolve, reject) => {
            // 拼接接口地址
            if (!modelInstance.baseUrl) {
                uri = server.verb.toLowerCase() + "://" + server.baseUrl + ":" + (server.port || 80) + modelInstance.api;
            } else if (server && server.baseUrl) {
                uri = "http://" + modelInstance.baseUrl + ":" + (modelInstance.port || 80) + modelInstance.api;
            } else {
                return reject(new errors.ArgumentError("没有设置baseUrl或者默认服务器！"));
            }

            if (modelInstance.key === "ueditor_config" && params.action === "update") {
                modelInstance.verb = "post";
            }

            // 初始化htp
            switch (modelInstance.verb.toUpperCase()) {
                case "GET":
                    htp = superagent.get(uri)
                        .query(params)
                        .query(data)
                        .timeout(5000);
                    break;
                case "POST":
                    htp = superagent.post(uri)
                        .type("form")
                        .send(!modelInstance.needDatas ? null : utils.convertJson(data))
                        .timeout(5000);
                    modelInstance.needParams && htp.query(params);
                    break;
            }
            htp.withCredentials();

            console.log("filter:", filter);
            console.log("uri:", uri);
            console.log("param:", params);
            console.log("data:", data);
            console.log("coverData", decodeURIComponent(utils.convertJson(data)));

            // 转发请求
            if (htp) {
                console.log("-----------------------------------------------");
                // proxy设置
                // htp.proxy("http://localhost:8888")
                htp.end(function(err, res) {
                    console.log("err:", err);
                    console.log("text:", res.text);
                    console.log("body:", res.body);

                    if (err) {
                        return reject(err);
                    }
                    let result = res.text;
                    if (typeof result !== "object") {
                        try { result = JSON.parse(result); } catch (e) { }
                    }
                    if (result.state !== "SUCCESS") {
                        return reject(new errors.Error(result.state || "错误"));
                    }
                    console.log("------------------resolve-----------------------------");
                    resolve(result);
                });
            } else {
                return reject(new errors.InvalidOperationError("接口类型不支持！"));
            }
        });
    };

    return (interfaceKey, filter, data, access_token) => {
        // let filter = _.extend({}, utils.query(req), req.query);
        // let data = req.body;

        // 返回promise对象
        return new Sequelize.Promise((resolve, reject) => {
            if (!interfaceKey) {
                return reject(new errors.ArgumentError("interfaceKey不正确！"));
            }
            // 查找interface是否存在
            // 查找server是否存在
            // 执行接口
            async.auto({
                inteface: (cb) => {
                    Model.findOne({
                        where: {
                            key: interfaceKey
                        }
                    }).then((result) => cb(null, result), cb);
                },
                server: ["inteface", (cb, results) => {
                    Server.findOne({
                        where: {
                            type: results.inteface.type || 1,
                            isDefault: true
                        }
                    }).then((result) => cb(null, result), cb);
                }],
                execute: ["server", (cb, results) => {
                    executeCommand(results.server, results.inteface, filter, data, access_token).then((result) => cb(null, result), cb);
                }]
            }, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.execute);
            });
        });
    };
}