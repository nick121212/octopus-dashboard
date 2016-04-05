import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.groupaction;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let key = req.params[name];

        if (!key) {
            return next(new errors.ArgumentError("key不正确！"));
        }

        Model.findAndCountAll({
            where: {
                groupKey: key
            }
        }).then((result) => res.json(result), next);

    };
}