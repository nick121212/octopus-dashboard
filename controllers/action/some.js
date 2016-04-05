import utils from '../../utils';
import _ from 'lodash';

exports = module.exports = (app, db) => {
    let name = utils.modelNames.action;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let filter = utils.query(req);

        Model.findAndCountAll().then((result) => {
            result.rows = _.map(result.rows, (d) => {
                try { d.columns = JSON.parse(d.columns); } catch (e) { }
                try { d.interfaces = JSON.parse(d.interfaces); } catch (e) { }

                return d;
            });
            res.json(result);
        }, next);
    };
}