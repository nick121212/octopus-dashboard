import async from 'async';
import utils from '../../utils';

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.schema;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let model = req.body;

        if (typeof model !== "object" || !model.key) {
            return next(new errors.ValidationError("数据没有填写完整！", 412));
        }

        Model.create(model).then((result) => res.json(result), next);
    };
}