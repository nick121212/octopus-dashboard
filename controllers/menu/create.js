import async from 'async';
import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.menu;
    let {models, sequelize} = db;
    let Model = models[name];

    return (req, res, next) => {
        let model = req.body;

        if (typeof model !== "object" || !model.title) {
            return next(new errors.ValidationError("数据没有填写完整！", 412));
        }

        let addModel = (t) => {
            return new sequelize.Promise((resolve, reject) => {
                async.auto({
                    parent: (cb) => {
                        Model.findOne({
                            where: {
                                key: model.parentKey || ""
                            }
                        }).then((result) => cb(null, result), cb);
                    },
                    count: (cb) => {
                        Model.count({
                            where: {
                                lft: 1
                            }
                        }).then((result) => cb(null, result), cb);
                    },
                    check: ["parent", "count", (cb, results) => {
                        if (results.count && !results.parent) {
                            return cb(new Error("没有指定父节点！"));
                        }
                        cb();
                    }],
                    lft: ["check", (cb, results) => {
                        if (results.parent) {
                            sequelize.query('update menu set lft=lft+2 where lft > $1;', {
                                transaction: t,
                                bind: [results.parent.rgt]
                            }).then((result) => cb(null, result), cb);
                        } else {
                            cb();
                        }
                    }],
                    rgt: ["check", (cb, results) => {
                        if (results.parent) {
                            sequelize.query('update menu set rgt=rgt+2 where rgt >= $1;', {
                                transaction: t,
                                bind: [results.parent.rgt]
                            }).then((result) => cb(null, result), cb);
                        } else {
                            cb();
                        }
                    }],
                    add: ["lft", "rgt", (cb, results) => {
                        if (!results.parent) {
                            model.lft = 1;
                            model.rgt = 2;
                        } else {
                            model.lft = results.parent.rgt;
                            model.rgt = results.parent.rgt + 1;
                        }
                        Model.create(model, { transaction: t }).then((result) => cb(null, result), cb);
                    }]
                }, (err, results) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
            });
        }

        sequelize.transaction().then((t) => {
            return addModel(t).then((results) => {
                return t.commit().then(() => res.json(results), next);
            }, (err) => {
                return t.rollback().then(() => next(err), next);
            });
        }, next);
    };
}