import utils from '../../utils';
import _ from 'lodash';

exports = module.exports = (app, db) => {
    let name = utils.modelNames.interface;
    let {models} = db;
    let Model = models[name];

    return (req, res, next) => {
        let filter = utils.query(req);

        Model.findAndCountAll(filter).then((result) => {
            result.rows = _.map(result.rows, (d) => {
                // try { d.fields = JSON.parse(d.fields); } catch (e) { }
                // try { d.params = JSON.parse(d.params); } catch (e) { }

                return d;
            });
            res.json(result);
        }, next);
    };
}