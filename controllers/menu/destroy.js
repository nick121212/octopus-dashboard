import async from 'async';
import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let {models, sequelize} = db;
    let name = utils.modelNames.menu;
    let Model = models[name];

    return (req, res, next) => {
        let id = req.params[name];

        if (!id) {
            return next(new errors.ArgumentError("id不正确！"));
        }
        console.log(id);

        let removeModel = (t) => {
            return new sequelize.Promise((resolve, reject) => {
                async.auto({
                    model: (cb) => {
                        Model.findById(id).then((result) => cb(null, result), cb);
                    },
                    check: ["model", (cb, results) => {
                        if (!results.model) {
                            return cb(new errors.NotFoundError(`id[${id}] not exist!`));
                        }
                        cb();
                    }],
                    del: ["check", (cb, results) => {
                        sequelize.query('delete from menu where lft between $1 and $2;', {
                            transaction: t,
                            bind: [results.model.lft, results.model.rgt]
                        }).then((result) => cb(null, result), cb);
                    }],
                    lft: ["del", (cb, results) => {
                        sequelize.query('update menu set lft=lft-$1 where lft > $2;', {
                            transaction: t,
                            bind: [results.model.rgt - results.model.lft + 1, results.model.rgt]
                        }).then((result) => cb(null, result), cb);
                    }],
                    rgt: ["del", (cb, results) => {
                        sequelize.query('update menu set rgt=rgt-$1 where rgt > $2;', {
                            transaction: t,
                            bind: [results.model.rgt - results.model.lft + 1, results.model.rgt]
                        }).then((result) => cb(null, result), cb);
                    }]
                }, (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }
                    resolve(results);
                });
            });
        };

        sequelize.transaction().then((t) => {
            return removeModel(t).then((results) => {
                return t.commit().then(() => res.json(results), next);
            }, (err) => {
                return t.rollback().then(() => next(err), next);
            });
        }, next);
    };
}