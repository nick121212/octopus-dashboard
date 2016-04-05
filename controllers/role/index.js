import utils from '../../utils';
import _ from 'lodash';

exports = module.exports = (app, db) => {
    let name = utils.modelNames.role;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let filter = utils.query(req);

        Model.findAndCountAll(filter).then((result) => {
            res.json(result);
        }, next);
    };
}