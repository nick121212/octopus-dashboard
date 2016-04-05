import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let {models} = db;
    let name = utils.modelNames.menu;
    let Model = models[name];

    return (req, res, next) => {
        let key = req.params[name];

        if (!key) {
            return next(new errors.ArgumentError("key不正确！"));
        }

        Model.findOne({
            where: {
                key: key
            }
        }).then((modelInstance) => {
            if (!modelInstance) {
                return next(new errors.NotFoundError(`key[${key}] not exist!`));
            }
            res.json(modelInstance);
        }, next);
    };
}