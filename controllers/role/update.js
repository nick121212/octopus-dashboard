import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.role;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let model = req.body;
        let id = ~~req.params[name];

        if (!id) {
            return next(new errors.ArgumentError("id不正确！"));
        }

        Model.findById(id).then((modelInstance) => {
            if (!modelInstance) {
                return next(new errors.NotFoundError(`id[${id}] not exist!`));
            }

            delete model.createdAt;
            model.updatedAt = new Date();
            modelInstance.updateAttributes(model).then((newModel) => {
                res.json(newModel);
            }, next);
        }, next);
    };
}